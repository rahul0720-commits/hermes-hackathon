import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createRoast = mutation({
  args: {
    contentText: v.string(),
    sourceType: v.union(v.literal("text"), v.literal("youtube")),
    sourceUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const roastId = await ctx.db.insert("roasts", {
      contentText: args.contentText,
      sourceType: args.sourceType,
      sourceUrl: args.sourceUrl,
      status: "pending",
    });
    return roastId;
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

export const updateRoastScores = mutation({
  args: {
    id: v.id("roasts"),
    aiSlopScore: v.optional(v.number()),
    originalityScore: v.optional(v.number()),
    fuScore: v.optional(v.number()),
    verdict: v.optional(v.string()),
    breakdown: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...scores } = args;
    await ctx.db.patch(id, {
      ...scores,
      status: "scored",
    });
  },
});