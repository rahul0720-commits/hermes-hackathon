# FU — API Contract & Integration Guide

This document defines the exact contract between the Frontend (FE) and Backend (BE) to allow parallel development. The backend has been fully implemented in `/api/analyze` and Convex mutations.

## 1. Main Analysis Endpoint
**Route:** `POST /api/analyze`
**Purpose:** Takes raw text or a YouTube URL, runs the LinkUp originality scan, and generates the LLM FU Score.

### Request Body
```json
{
  "sourceType": "text" | "youtube",
  "contentText": "The raw text to roast. Optional if sourceType is youtube.",
  "sourceUrl": "https://youtube.com/watch?v=... (Optional if sourceType is text)"
}
```

### Successful Response (200 OK)
```json
{
  "success": true,
  "textExtracted": true,
  "length": 2500,
  "phrases": [
    "In today's fast-paced digital landscape",
    "Unlock your true potential",
    "Synergize cross-functional paradigms"
  ],
  "searchResults": [
    {
      "phrase": "In today's fast-paced digital landscape",
      "foundAtUrl": "https://linkedin.com/post/mock-123",
      "similarity": 0.95
  // Monetization / Reputation Management
  isArchived?: boolean, // If the target paid the $49 "Reputation Management Fee" to hide the roast
  humanProofVideoUrl?: string, // If the target submitted proof to clear their name
  bountyPoolAmount?: number, // The pooled credits (Outrage Bounty)
}
  ],
  "score": {
    "fuMeter": 85,
    "originalityScore": 12,
    "fuScore": 92,
    "verdict": "Reads like GPT-4 had a stroke while reading atomic habits.",
    "suspectedPrompt": "Write a preachy 3-part listicle about B2B sales but make it sound like a deeply personal revelation.",
    "breakdown": [
      "Uses the word 'delve' unironically",
      "3-part listicle structure identical to default Claude output",
      "Zero personal anecdotes or specific evidence provided"
    ]
  }
}
```

### Error Responses
**400 Bad Request (YouTube transcript failed)**
```json
{
  "error": "Failed to extract YouTube transcript",
  "details": "Could not find video ID or transcript disabled"
}
```
**500 Internal Server Error (LLM / Pipeline failed)**
```json
{
  "error": "Internal server error",
  "details": "Rate limit exceeded"
}
```

---

## 2. Convex Database Schema (`convex/schema.ts`)
The FE must use the Convex React hooks to mutate and query state. 

### Tables
1. `roasts`
2. `users`

### Document Structure: `roasts`
```typescript
{
  _id: Id<"roasts">,
  _creationTime: number,
  contentText: string,
  sourceType: string, // "text" | "youtube"
  sourceUrl?: string,
  status: string, // "extracting_transcript" | "scanning_plagiarism" | "scoring" | "scored" | "failed"
  
  // Appears after scanning_plagiarism
  searchResults?: Array<{ phrase: string, foundAtUrl: string, similarity: number }>,
  
  // Appears after scored
  fuMeter?: number,
  originalityScore?: number,
  fuScore?: number,
  verdict?: string,
  suspectedPrompt?: string,
  breakdown?: string[]
}
```

---

## 3. Frontend -> Backend Flow

To run a roast with rich UX polling, the frontend should execute this sequence:

### Step 1: Create the DB Record
Call Convex mutation `createRoast` from the frontend to establish the initial state.
```typescript
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

const createRoast = useMutation(api.roasts.createRoast);
const roastId = await createRoast({ 
  contentText: "...", 
  sourceType: "text" // or "youtube"
});

// FE UI State: Reactively listen to `roast.status` via useQuery
// `roast.status` will start as "extracting_transcript" (if youtube) or "scanning_plagiarism" (if text)
```

### Step 2: Trigger the Background Job
Fire the Next.js API route to run the heavy lifting asynchronously. Do NOT block the UI awaiting this fetch. 
*Note: In a true production app, you would use Convex Actions or a message queue here. For this hackathon, we trigger the Next.js API route and manually patch the DB states to simulate a real-time progress bar.*
```typescript
// Don't await this blocking the UI thread! Let it run in the background.
fetch("/api/analyze", {
  method: "POST",
  body: JSON.stringify({ contentText: "...", sourceType: "text", roastId }) 
});
```

### Step 3: API Route Updates Convex (Handled by Backend)
As the Next.js API progresses through its pipeline, it will patch the Convex `status` field.
The frontend should simply use `useQuery` to watch the `status` field change in real-time:
1. `extracting_transcript` (UI: "Fetching YouTube video...")
2. `scanning_plagiarism` (UI: "Scanning 10,000 websites for plagiarism...")
3. `scoring` (UI: "Hermes LLM is judging you...")
4. `scored` (UI: BOOM! Render the ScoreCard)

---

## 4. Fallback Behavior Note
If `HERMES_API_KEY` or `LINKUP_API_KEY` are not set in `.env.local`, the `/api/analyze` endpoint will **gracefully fall back to mock data**. 

This means your frontend colleague can build and test the loading states, the `ScoreCard` animations, and the Convex mutations right now, without needing the actual API keys to be live.
