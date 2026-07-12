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
    }
  ],
  "score": {
    "fuMeter": 85,
    "originalityScore": 12,
    "fuScore": 92,
    "verdict": "Reads like GPT-4 had a stroke while reading atomic habits.",
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
  status: string, // "pending" | "search_complete" | "scored"
  
  // Appears after search_complete
  searchResults?: Array<{ phrase: string, foundAtUrl: string, similarity: number }>,
  
  // Appears after scored
  fuMeter?: number,
  originalityScore?: number,
  fuScore?: number,
  verdict?: string,
  breakdown?: string[]
}
```

---

## 3. Frontend -> Backend Flow

To run a roast, the frontend should execute this sequence:

### Step 1: Create the DB Record
Call Convex mutation `createRoast` from the frontend to establish the pending state.
```typescript
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

const createRoast = useMutation(api.roasts.createRoast);
const roastId = await createRoast({ 
  contentText: "...", 
  sourceType: "text" 
});
// FE UI State: "Analysing content..."
```

### Step 2: Call the API Route
Hit the Next.js API route to run the heavy lifting (this prevents tying up a Convex function with long-running LLM calls).
```typescript
const response = await fetch("/api/analyze", {
  method: "POST",
  body: JSON.stringify({ contentText: "...", sourceType: "text" })
});
const data = await response.json();
```

### Step 3: Update DB with Results
Call Convex mutations to save the API results back to the database.
```typescript
const updateSearch = useMutation(api.roasts.updateRoastSearchResults);
const updateScores = useMutation(api.roasts.updateRoastScores);

// Save search results
await updateSearch({ 
  id: roastId, 
  searchResults: data.searchResults 
});

// Save final scores
await updateScores({
  id: roastId,
  fuMeter: data.score.fuMeter,
  originalityScore: data.score.originalityScore,
  fuScore: data.score.fuScore,
  verdict: data.score.verdict,
  breakdown: data.score.breakdown
});
// FE UI State: Render ScoreCard
```

---

## 4. Fallback Behavior Note
If `HERMES_API_KEY` or `LINKUP_API_KEY` are not set in `.env.local`, the `/api/analyze` endpoint will **gracefully fall back to mock data**. 

This means your frontend colleague can build and test the loading states, the `ScoreCard` animations, and the Convex mutations right now, without needing the actual API keys to be live.
