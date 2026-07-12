import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  roasts: defineTable({
    contentText: v.string(),
    sourceType: v.union(v.literal("text"), v.literal("youtube")),
    sourceUrl: v.optional(v.string()),
    status: v.union(v.literal("extracting_transcript"), v.literal("scanning_plagiarism"), v.literal("scoring"), v.literal("scored"), v.literal("failed")),
    fuMeter: v.optional(v.number()),
    originalityScore: v.optional(v.number()),
    fuScore: v.optional(v.number()),
    verdict: v.optional(v.string()),
    suspectedPrompt: v.optional(v.string()),
    breakdown: v.optional(v.array(v.string())),
    searchResults: v.optional(v.any()),
    // Monetization & The Daily Slop Board
    isArchived: v.optional(v.boolean()),
    humanProofVideoUrl: v.optional(v.string()),
    bountyPoolAmount: v.optional(v.number()),
  }),
  users: defineTable({
    // empty for now
  }),
});