import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  roasts: defineTable({
    contentText: v.string(),
    sourceType: v.union(v.literal("text"), v.literal("youtube")),
    sourceUrl: v.optional(v.string()),
    status: v.union(v.literal("pending"), v.literal("search_complete"), v.literal("scored")),
    fuMeter: v.optional(v.number()),
    originalityScore: v.optional(v.number()),
    fuScore: v.optional(v.number()),
    verdict: v.optional(v.string()),
    breakdown: v.optional(v.array(v.string())),
    searchResults: v.optional(v.any()),
  }),
  users: defineTable({
    // empty for now
  }),
});