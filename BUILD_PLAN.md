# FU — Build Plan

## Overview

- **Product:** FU (fu.app) — paste content → AI slop verdict card
- **Track:** Hermes Buildathon · Virality
- **Timeline:** 8 hours total
- **Stack:** Next.js 14 (App Router), Convex, Hermes + GPT-5.6, LinkUp, Cloudflare Pages, Datafast

---

## Phase 0 — Shared: Project Scaffold (30 min)

### 0.1 Repo + remote setup
- [x] GitHub repo created, code pushed
- [x] Branch protection / team access

### 0.2 Next.js scaffold
- [x] `npx create-next-app@14` with App Router + TypeScript + Tailwind
- [x] Clean boilerplate (default page, globals.css)
- [x] Set up path aliases (`@/` → `src/`)

### 0.3 Convex setup
- [x] `npm install convex`
- [x] `npx convex dev` → init project, get deployment URL
- [x] Create `convex/` directory with schema
- [x] Define tables: `roasts`, `users`, `scores`

### 0.4 Deploy target
- [ ] Push to Cloudflare Pages (first deploy via `wrangler` or Git)
- [ ] Set custom domain if available

### 0.5 Analytics
- [ ] Add Datafast snippet to `layout.tsx`
- [ ] Verify traffic shows in dashboard

**Dependency:** None

---

## Frontend Track

### Phase 1 — Input UI (45 min)

Files: `src/app/page.tsx`, `src/components/InputForm.tsx`, `src/styles/globals.css`

- [ ] Dark theme layout with Tailwind
- [ ] Hero: "FU — Roast AI slop in seconds"
- [ ] Subtitle: "Paste a URL or drop content text. Get a savage verdict card."
- [ ] Tab toggle: **URL** | **Paste text**
- [ ] URL mode: text input + "Roast it" button
- [ ] Text mode: `<textarea>` + "Roast it" button
- [ ] Toggle: **"Send as Anonymous Slop Bomb"** checkbox (passes `isSlopBomb` to backend)
- [ ] Client-side validation (empty check, URL format hint)
- [ ] "Analysing content..." spinner with animated dots
- [ ] Disable button during analysis
- [ ] Step indicator: Extracting → Searching → Scoring → Rendering
- [ ] Error states: invalid URL, analysis failure, rate limit hit

**API contract:** `POST /api/analyze` → `{ contentText, sourceType, sourceUrl?, isSlopBomb }` → `{ roastId }`
**Depends on:** Phase 0

---

### Phase 5 — Score Card UI (60 min)

Files: `src/components/ScoreCard.tsx`

- [ ] Dark background (`#0f0f0f`), rounded corners, subtle border
- [ ] Top: robot emoji + "FU" branding
- [ ] Content attribution: first 10 words + "@CreatorHandle" (if extractable)
- [ ] Archetype rendering: Prominent, savage title (e.g. "The ChatGPT Thought Leader")
- [ ] Receipts rendering: 3-item bulleted list calling out specific phrases
- [ ] Score bars:
  - "AI SLOP" — filled bar (red gradient), percentage right-aligned
  - "ORIGINALITY" — filled bar (green gradient), percentage right-aligned
- [ ] Footer: `fu.app/roast/[id]`
- [ ] Desktop: fixed width 500px
- [ ] Mobile: full width with padding
- [ ] Scores animate from 0 to final value on mount (CSS transition)
- [ ] Card fades in with slight scale

**Props contract:** `{ aiFU, originalityScore, fuScore, archetype, receipts, contentPreview, creatorHandle, roastId }`
**Depends on:** Phase 1 (page structure), Backend Phase 4 (data shape)

---

### Phase 6 — Client-Side PNG Export (45 min)

Files: `src/components/ScoreCard.tsx`, `src/lib/exportImage.ts`

- [ ] `npm install html-to-image` (or use standard Canvas API)
- [ ] Add a "Download Roast" button to the `<ScoreCard />` component
- [ ] Implement a client-side function `exportAsPNG(elementId)` that captures the DOM node of the scorecard
- [ ] Convert the captured DOM node to a PNG blob
- [ ] Trigger an automatic download of the blob to the user's local machine
- [ ] Remove all backend/Satori dependencies for image generation to avoid Cloudflare Pages C++ (sharp) runtime errors

**Depends on:** Phase 5 (card design)

---

### Phase 7 — Public Roast Page (45 min)

Files: `src/app/roast/[id]/page.tsx`

- [ ] Next.js App Router: `app/roast/[id]/page.tsx`
- [ ] Fetch roast from Convex by ID
- [ ] If not found → 404 page
- [ ] If pending → polling every 2s until status === `scored`
- [ ] Display `<ScoreCard />` component
- [ ] "Share this roast" section:
  - [ ] Copy link button (copies `fu.app/roast/[id]`)
  - [ ] Download PNG button
  - [ ] Share to LinkedIn button (opens share dialog with card + text)
- [ ] **Slop Bomb Logic:** If `isSlopBomb` is true, trigger `markRoastAsRead` on page load so the sender gets a Read Receipt.

**Depends on:** Phase 6, Backend Phase 4

---

### Phase 8 — Monetization & Slop Bomb UX (45 min)

Files: `src/components/RansomModal.tsx`, `src/app/layout.tsx`, `src/app/roast/[id]/page.tsx`

- [ ] Render 24-hour countdown timer on Slop Bomb roasts.
- [ ] Show "De-escalation Ransom" payment button for targets to archive/hide the roast.
- [ ] Show "Outrage Bounty" payment button for others to boost the roast.
- [ ] Integrate Dodo Payments for checkout flows (Ransom: $5, Bounty: custom amounts).
- [ ] Webhook handler `/api/webhooks/dodo` → update roast visibility or bounty pool in Convex.

**Depends on:** Phase 7, Backend Phase 4

---

### Phase 9 — The Daily Slop Board (P1, 45 min)

Files: `src/app/leaderboard/page.tsx`, `src/components/LeaderboardTable.tsx`

- [ ] Leaderboard page: `/leaderboard` renamed to "The Daily Slop Board"
- [ ] Table: Rank | Content preview | Archetype | FU Score | Bounty Pool | Link
- [ ] Highlight Slop Bombs that have detonated (timer expired, ransom unpaid).
- [ ] Auto-refresh every 30s
- [ ] Nav link from landing page

**Depends on:** Backend Phase 4 (Convex query for top roasts)

---

## Backend Track

### Phase 2 — Content Extraction (45 min)

Files: `src/app/api/analyze/route.ts`, `src/lib/youtube.ts`, `convex/roasts.ts`

- [x] API route: `POST /api/analyze`
- [x] Text paste handler → send raw text to processing pipeline
- [x] YouTube URL handler:
  - [x] `npm install youtube-transcript-api` (or `youtubei.js`)
  - [x] Extract video ID (handle `watch?v=`, `youtu.be/`, shorts)
  - [x] Fetch transcript, trim to first 3,000 chars
  - [x] Fallback: "Could not fetch transcript. Try pasting text instead."
- [x] Convex mutation `createRoast`: `{ contentText, sourceType, sourceUrl?, isSlopBomb }` → `roastId`, status: `pending`

**Depends on:** Phase 0

---

### Phase 3 — LinkUp Originality Scan (45 min)

Files: `src/lib/linkup.ts`, `convex/roasts.ts`

- [x] Send content to LLM with prompt: "Extract 3–5 key claims or distinctive phrases. Return JSON array."
- [x] Parse response, validate array
- [x] `POST https://api.linkup.com/search` with each phrase
- [x] Collect results: `[{ phrase, foundAtUrl, similarity }]`
- [x] Deduplicate by URL
- [x] No results → return empty array (LLM scores without web data)
- [x] Convex mutation `updateRoastSearchResults`: attach `searchResults`, status: `search_complete`

**Depends on:** Phase 2, Hermes API key configured

---

### Phase 4 — LLM Scoring Pipeline (60 min)

Files: `src/lib/hermes.ts`, `convex/roasts.ts`

- [x] Set up Hermes client (API endpoint from Hermes docs, model: GPT-5.6)
- [x] Compose prompt with:
  - System prompt (AI slop detection expert)
  - LinkUp search results (if any)
  - Content text
  - Instruction to return JSON with `aiFU`, `originalityScore`, `fuScore`, `archetype`, `receipts`
- [x] Parse JSON from LLM response
- [x] Validate ranges and array lengths
- [x] Fallback: if JSON parsing fails, retry once with stricter prompt
- [x] Convex mutation `updateRoastScores`: store scores and archetype/receipts, status: `scored`

**Depends on:** Phase 3

---

### Phase 10 — Deprecated (Replaced by Phase 8)

*(General Dodo Payments tasks moved to Phase 8 to integrate tightly with the Slop Bomb/Bounty flow)*

---

## Shared

### Phase 11 — Polish & Launch (30 min)

- [ ] Test full flow: paste text → roast card → download → share
- [ ] Test Slop Bomb flow: countdown, read receipt, ransom payment
- [ ] Test error states (invalid URL, API failure, rate limit)
- [ ] Datafast tracking all pages
- [ ] Custom events: `roast_created`, `bomb_dropped`, `ransom_paid`
- [ ] Pre-generate 2–3 roast cards for well-known slop creators
- [ ] Draft LinkedIn post text
- [ ] DM list prepared for dropping Slop Bombs
- [ ] Final push to Cloudflare Pages
- [ ] Verify custom domain (if any)
- [ ] Confirm all env vars set on Cloudflare dashboard

**Depends on:** All phases

---

## Dependency Graph

```
Phase 0 (Scaffold)
  ├── Frontend Track
  │   ├── Phase 1 (Input UI)
  │   ├── Phase 5 (Score Card UI) ← needs BE Phase 4 data shape
  │   ├── Phase 6 (Client-Side PNG Export) ← needs Phase 5
  │   ├── Phase 7 (Roast Page) ← needs Phase 6 + BE Phase 4
  │   ├── Phase 8 (Monetization & Slop Bomb UX) ← needs Phase 7
  │   └── Phase 9 (The Daily Slop Board) ← needs BE Phase 4
  └── Backend Track
      ├── Phase 2 (Content Extraction)
      ├── Phase 3 (LinkUp Scan) ← needs Phase 2
      └── Phase 4 (LLM Scoring) ← needs Phase 3
```

**Parallel work possible after Phase 0:**
- FE Phase 1 + BE Phase 2 can run simultaneously
- FE Phase 5 can start once Phase 4 data shape is agreed (even before BE Phase 4 is deployed)
- BE Phase 3 + Phase 4 are strictly sequential

---

## Timeline Summary

| Time | Frontend | Backend |
|------|----------|---------|
| T+0:00 | Phase 0 (Shared) | Phase 0 (Shared) |
| T+0:30 | Phase 1 — Input UI | Phase 2 — Content Extraction |
| T+1:15 | Phase 5 — Score Card UI | Phase 3 — LinkUp Scan |
| T+2:00 | Phase 5 (cont.) | Phase 4 — LLM Scoring |
| T+2:45 | Phase 6 — Client-Side PNG Export | Phase 4 (cont.) |
| T+3:30 | Phase 7 — Roast Page | Phase 4 (cont.) |
| T+4:15 | Phase 8 — Monetization & Slop Bomb UX | (catch up / P1) |
| T+5:00 | Phase 9 — Daily Slop Board (P1) | (catch up) |
| T+5:45 | Phase 11 — Polish & Launch | Phase 11 — Polish & Launch |
| T+6:15 | **SHIP** | **SHIP** |

**Cut line:** At T+4:00, drop Phase 9 if behind.

---

## Environment Variables

```env
# Convex
CONVEX_DEPLOYMENT=

# Hermes / OpenAI
HERMES_API_KEY=
OPENAI_API_KEY=

# LinkUp
LINKUP_API_KEY=

# Dodo Payments
DODO_API_KEY=
DODO_WEBHOOK_SECRET=

# Datafast
DATFAST_SNIPPET_ID=
```

## File Structure

```
fu/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                          # FE Phase 1
│   │   ├── roast/
│   │   │   └── [id]/
│   │   │       └── page.tsx                  # FE Phase 7
│   │   ├── leaderboard/
│   │   │   └── page.tsx                      # FE Phase 9
│   │   └── api/
│   │       ├── analyze/route.ts              # BE Phase 2
│   │       └── webhooks/dodo/route.ts        # Phase 8
│   ├── components/
│   │   ├── ScoreCard.tsx                     # FE Phase 5
│   │   ├── InputForm.tsx                     # FE Phase 1
│   │   ├── RansomModal.tsx                   # FE Phase 8
│   │   └── LeaderboardTable.tsx              # FE Phase 9
│   ├── lib/
│   │   ├── hermes.ts                         # BE Phase 4
│   │   ├── linkup.ts                         # BE Phase 3
│   │   ├── youtube.ts                        # BE Phase 2
│   │   └── exportImage.ts                    # FE Phase 6
│   └── styles/
│       └── globals.css
├── convex/
│   ├── schema.ts                             # Phase 0
│   ├── roasts.ts                             # BE Phase 2/3/4
│   └── users.ts                              # Phase 8
├── public/
│   └── fonts/
├── .env.local
├── wrangler.toml
├── tailwind.config.ts
└── package.json
```