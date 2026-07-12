import type { Roast } from "./types";

export const DEFAULT_ROAST: Roast = {
  id: "demo",
  contentText:
    "In the rapidly evolving landscape of digital transformation, it is imperative to leverage synergistic paradigms that empower stakeholders to achieve optimal outcomes through AI-driven methodologies...",
  sourceType: "text",
  creatorHandle: "@SYNTH_GURU_404",
  score: {
    fuMeter: 78,
    originalityScore: 31,
    fuScore: 82,
    verdict: "This reads like GPT rewrote a 2022 Medium article. Twice.",
    suspectedPrompt:
      "Write a preachy 3-part listicle about B2B sales but make it sound like a deeply personal revelation.",
    breakdown: [
      "Used 'imperative to leverage' — a phrase no human has ever said out loud.",
      "Perfect 3-part corporate listicle structure, zero deviation.",
      "Not a single specific example, anecdote, or original thought detected.",
    ],
  },
  searchResults: [
    {
      phrase: "In the rapidly evolving landscape of digital transformation",
      foundAtUrl: "https://linkedin.com/post/mock-123",
      similarity: 0.95,
    },
    {
      phrase: "leverage synergistic paradigms",
      foundAtUrl: "https://medium.com/@thoughtleader/mock-456",
      similarity: 0.88,
    },
  ],
};

export type LeaderboardEntry = {
  rank: number;
  title: string;
  handle: string;
  slop: number;
  originality: number;
  fuScore: number;
};

export const LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    title: "The Eternal Optimist Blaster",
    handle: "@SYNTH_GURU_404",
    slop: 99.8,
    originality: 0.2,
    fuScore: 99,
  },
  {
    rank: 2,
    title: "Midjourney Aesthetic Soup v9",
    handle: "@PROMPT_ENGINEER_KNG",
    slop: 94,
    originality: 6,
    fuScore: 91,
  },
  {
    rank: 3,
    title: "The 'Hustle' Newsletter, GPT-Generated",
    handle: "@HUSTLE_B0T",
    slop: 92,
    originality: 8,
    fuScore: 88,
  },
  {
    rank: 4,
    title: "Endless LinkedIn Inspiration Loop",
    handle: "@LINKEDIN_LURKER",
    slop: 89,
    originality: 11,
    fuScore: 84,
  },
];

export const LEADERBOARD_COMPACT = [
  { rank: 5, title: "Generic Sci-Fi City #9000", fuScore: 78 },
  { rank: 6, title: "Self-Help Guru Deepfake", fuScore: 75 },
  { rank: 7, title: "Corporate Memphis 2.0", fuScore: 72 },
  { rank: 8, title: "Infinite Loop House Beat", fuScore: 70 },
];
