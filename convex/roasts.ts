import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { id: v.id("roasts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getLeaderboard = query({
  args: {},
  handler: async (ctx) => {
    const roasts = await ctx.db
      .query("roasts")
      .filter((q) => q.eq(q.field("isArchived"), false))
      .collect();
    
    // Sort by bountyPoolAmount descending, then fuScore descending
    return roasts.sort((a, b) => {
      const bountyA = a.bountyPoolAmount || 0;
      const bountyB = b.bountyPoolAmount || 0;
      if (bountyB !== bountyA) {
        return bountyB - bountyA;
      }
      return (b.fuScore || 0) - (a.fuScore || 0);
    }).slice(0, 20);
  },
});

export const createRoast = mutation({
  args: {
    contentText: v.string(),
    sourceType: v.union(v.literal("text"), v.literal("youtube")),
    sourceUrl: v.optional(v.string()),
    isSlopBomb: v.optional(v.boolean()),
    bomberId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const roastId = await ctx.db.insert("roasts", {
      contentText: args.contentText,
      sourceType: args.sourceType,
      sourceUrl: args.sourceUrl,
      status: args.sourceType === "youtube" ? "extracting_transcript" : "scanning_plagiarism",
      isArchived: false,
      bountyPoolAmount: 0,
      isSlopBomb: args.isSlopBomb,
      bomberId: args.bomberId,
      detonationTime: args.isSlopBomb ? Date.now() + 24 * 60 * 60 * 1000 : undefined,
    });
    return roastId;
  },
});

export const updateRoastStatus = mutation({
  args: {
    id: v.id("roasts"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
    });
  },
});

export const updateRoastSearchResults = mutation({
  args: {
    id: v.id("roasts"),
    searchResults: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      searchResults: args.searchResults,
      status: "search_complete",
    });
  },
});

export const archiveRoast = mutation({
  args: { id: v.id("roasts") },
  handler: async (ctx, args) => {
    // In a real app, verify user owns it or paid the extortion fee
    await ctx.db.patch(args.id, { isArchived: true });
  },
});

export const addBounty = mutation({
  args: { id: v.id("roasts"), amount: v.number() },
  handler: async (ctx, args) => {
    const roast = await ctx.db.get(args.id);
    if (!roast) throw new Error("Roast not found");
    const newBounty = (roast.bountyPoolAmount || 0) + args.amount;
    await ctx.db.patch(args.id, { bountyPoolAmount: newBounty });
  },
});

export const updateRoastScores = mutation({
  args: {
    id: v.id("roasts"),
    fuMeter: v.optional(v.number()),
    originalityScore: v.optional(v.number()),
    fuScore: v.optional(v.number()),
    verdict: v.optional(v.string()),
    suspectedPrompt: v.optional(v.string()),
    archetype: v.optional(v.string()),
    receipts: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...scores } = args;
    await ctx.db.patch(id, {
      ...scores,
      status: "scored",
    });
  },
});

export const markRoastAsRead = mutation({
  args: { id: v.id("roasts") },
  handler: async (ctx, args) => {
    const roast = await ctx.db.get(args.id);
    if (!roast) throw new Error("Roast not found");
    if (roast.targetReadAt === undefined) {
      await ctx.db.patch(args.id, { targetReadAt: Date.now() });
    }
  },
});

export const payRansom = mutation({
  args: { id: v.id("roasts") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isArchived: true });
  },
});