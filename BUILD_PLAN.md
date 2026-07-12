# FU — Build Plan

## Overview

- **Product:** FU (fu.app) — paste content → AI slop verdict card
- **Track:** Hermes Buildathon · Virality
- **Timeline:** 8 hours total
- **Stack:** Next.js 14 (App Router), Convex, Hermes + GPT-5.6, LinkUp, Cloudflare Pages, Satori, Datafast

---

## Phase 0 — Shared: Project Scaffold (30 min)

### 0.1 Repo + remote setup
- [ ] GitHub repo created, code pushed
- [ ] Branch protection / team access

### 0.2 Next.js scaffold
- [ ] `npx create-next-app@14` with App Router + TypeScript + Tailwind
- [ ] Clean boilerplate (default page, globals.css)
- [ ] Set up path aliases (`@/` → `src/`)

### 0.3 Convex setup
- [ ] `npm install convex`
- [ ] `npx convex dev` → init project, get deployment URL
- [ ] Create `convex/` directory with schema
- [ ] Define tables: `roasts`, `users`, `scores`

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
- [ ] Client-side validation (empty check, URL format hint)
- [ ] "Analysing content..." spinner with animated dots
- [ ] Disable button during analysis
- [ ] Step indicator: Extracting → Searching → Scoring → Rendering
- [ ] Error states: invalid URL, analysis failure, rate limit hit

**API contract:** `POST /api/analyze` → `{ contentText, sourceType, sourceUrl? }` → `{ roastId }`
**Depends on:** Phase 0

---

### Phase 5 — Score Card UI (60 min)

Files: `src/components/ScoreCard.tsx`

- [ ] Dark background (`#0f0f0f`), rounded corners, subtle border
- [ ] Top: robot emoji + "FU" branding
- [ ] Content attribution: first 10 words + "@CreatorHandle" (if extractable)
- [ ] Score bars:
  - "AI SLOP" — filled bar (red gradient), percentage right-aligned
  - "ORIGINALITY" — filled bar (green gradient), percentage right-aligned
- [ ] FU Score: large centered number with label
- [ ] Verdict: italic, medium weight, quoted
- [ ] Footer: `fu.app/roast/[id]`
- [ ] Desktop: fixed width 500px
- [ ] Mobile: full width with padding
- [ ] Scores animate from 0 to final value on mount (CSS transition)
- [ ] Card fades in with slight scale
- [ ] Handle edge cases: all 0 (empty content), all 100 (max slop)

**Props contract:** `{ aiFU, originalityScore, fuScore, verdict, breakdown, contentPreview, creatorHandle, roastId }`
**Depends on:** Phase 1 (page structure), Backend Phase 4 (data shape)

---

### Phase 6 — PNG Export (45 min)

Files: `src/app/api/roast/[id]/image/route.ts`, `src/lib/satori.ts`

- [ ] `npm install satori sharp`
- [ ] Create `generateRoastOG.ts` — Satori component matching ScoreCard design
- [ ] Map scores/verdict to Satori JSX
- [ ] Load font (Inter or similar) from `public/fonts/`
- [ ] Render to SVG → `sharp` → PNG
- [ ] API route returns PNG with `Content-Type: image/png`
- [ ] Cache headers: `Cache-Control: public, max-age=3600`
- [ ] Download button in card UI → fetch image → blob → download
- [ ] Loading state while image generates

**Depends on:** Phase 5 (card design)

---

### Phase 7 — Public Roast Page (45 min)

Files: `src/app/roast/[id]/page.tsx`, `src/app/roast/[id]/opengraph-image.tsx`

- [ ] Next.js App Router: `app/roast/[id]/page.tsx`
- [ ] Fetch roast from Convex by ID
- [ ] If not found → 404 page
- [ ] If pending → polling every 2s until status === `scored`
- [ ] Display `<ScoreCard />` component
- [ ] "Share this roast" section:
  - [ ] Copy link button (copies `fu.app/roast/[id]`)
  - [ ] Download PNG button
  - [ ] Share to LinkedIn button (opens share dialog with card + text)
- [ ] OG image route renders verdict card at request time

**Depends on:** Phase 6, Backend Phase 4

---

### Phase 8 — Signup Gate (45 min)

Files: `src/components/AuthModal.tsx`, `src/app/layout.tsx`

- [ ] `npm install @convex-dev/auth`
- [ ] Configure Google OAuth + email/password (or magic link)
- [ ] Auth UI component (Sign in with Google + email form)
- [ ] Track roast count per session (localStorage) and per user (Convex)
- [ ] Free tier: 3 roasts
- [ ] After 3rd roast: show "Sign up for unlimited roasts" modal
- [ ] "Share publicly" → if not signed in → auth modal
- [ ] After signup → redirect back to roast page with share action

**Depends on:** Phase 7, Backend Phase 4

---

### Phase 9 — Leaderboard (P1, 45 min)

Files: `src/app/leaderboard/page.tsx`, `src/components/LeaderboardTable.tsx`

- [ ] Leaderboard page: `/leaderboard`
- [ ] Table: Rank | Content preview | FU Meter % | FU Score | Link
- [ ] Auto-refresh every 30s
- [ ] "Most slopped content today" header
- [ ] Nav link from landing page

**Depends on:** Backend Phase 4 (Convex query for top roasts)

---

## Backend Track

### Phase 2 — Content Extraction (45 min)

Files: `src/app/api/analyze/route.ts`, `src/lib/youtube.ts`, `convex/roasts.ts`

- [ ] API route: `POST /api/analyze`
- [ ] Text paste handler → send raw text to processing pipeline
- [ ] YouTube URL handler:
  - [ ] `npm install youtube-transcript-api` (or `youtubei.js`)
  - [ ] Extract video ID (handle `watch?v=`, `youtu.be/`, shorts)
  - [ ] Fetch transcript, trim to first 3,000 chars
  - [ ] Fallback: "Could not fetch transcript. Try pasting text instead."
- [ ] Convex mutation `createRoast`: `{ contentText, sourceType, sourceUrl?, userId? }` → `roastId`, status: `pending`

**Depends on:** Phase 0

---

### Phase 3 — LinkUp Originality Scan (45 min)

Files: `src/lib/linkup.ts`, `convex/roasts.ts`

- [ ] Send content to LLM with prompt: "Extract 3–5 key claims or distinctive phrases. Return JSON array."
- [ ] Parse response, validate array
- [ ] `POST https://api.linkup.com/search` with each phrase
- [ ] Collect results: `[{ phrase, foundAtUrl, similarity }]`
- [ ] Deduplicate by URL
- [ ] No results → return empty array (LLM scores without web data)
- [ ] Convex mutation `updateRoastSearchResults`: attach `searchResults`, status: `search_complete`

**Depends on:** Phase 2, Hermes API key configured

---

### Phase 4 — LLM Scoring Pipeline (60 min)

Files: `src/lib/hermes.ts`, `convex/roasts.ts`

- [ ] Set up Hermes client (API endpoint from Hermes docs, model: GPT-5.6)
- [ ] Compose prompt with:
  - System prompt (AI slop detection expert)
  - LinkUp search results (if any)
  - Content text
  - Instruction to return JSON with `aiFU`, `originalityScore`, `fuScore`, `verdict`, `breakdown`
- [ ] Parse JSON from LLM response
- [ ] Validate ranges (0–100 for scores, verdict ≤15 words)
- [ ] Fallback: if JSON parsing fails, retry once with stricter prompt
- [ ] Convex mutation `updateRoastScores`: store scores, status: `scored`

**Depends on:** Phase 3

---

### Phase 10 — Dodo Payments (P1, 60 min)

Files: `src/app/api/create-checkout-session/route.ts`, `src/app/api/webhooks/dodo/route.ts`, `convex/users.ts`

- [ ] Sign up for Dodo Payments, get API keys
- [ ] Create product: "FU Unlimited" — $5/month
- [ ] `POST /api/create-checkout-session` → redirect to Dodo hosted checkout
- [ ] Webhook handler `/api/webhooks/dodo` → update subscription status in Convex
- [ ] `getUserSubscription(userId)` → gates unlimited roasts

**Depends on:** Phase 8 (user auth exists)

---

## Shared

### Phase 11 — Polish & Launch (30 min)

- [ ] Test full flow: paste text → roast card → download → share
- [ ] Test YouTube URL → transcript → roast card
- [ ] Test signup gate at 3 roasts
- [ ] Test error states (invalid URL, API failure, rate limit)
- [ ] Datafast tracking all pages
- [ ] Custom events: `roast_created`, `roast_shared`, `user_signed_up`
- [ ] Confirm read-only dashboard access for judges
- [ ] Pre-generate 2–3 roast cards for well-known slop creators
- [ ] Draft LinkedIn post text
- [ ] DM list prepared
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
  │   ├── Phase 6 (PNG Export) ← needs Phase 5
  │   ├── Phase 7 (Roast Page) ← needs Phase 6 + BE Phase 4
  │   ├── Phase 8 (Signup Gate) ← needs Phase 7
  │   └── Phase 9 (Leaderboard) ← needs BE Phase 4
  └── Backend Track
      ├── Phase 2 (Content Extraction)
      ├── Phase 3 (LinkUp Scan) ← needs Phase 2
      ├── Phase 4 (LLM Scoring) ← needs Phase 3
      └── Phase 10 (Payments) ← needs Phase 8
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
| T+2:45 | Phase 6 — PNG Export | Phase 4 (cont.) |
| T+3:30 | Phase 7 — Roast Page | Phase 4 (cont.) |
| T+4:15 | Phase 8 — Signup Gate | (catch up / P1) |
| T+5:00 | Phase 9 — Leaderboard (P1) | Phase 10 — Payments (P1) |
| T+5:45 | Phase 11 — Polish & Launch | Phase 11 — Polish & Launch |
| T+6:15 | **SHIP** | **SHIP** |

**Cut line:** At T+4:00, drop Phases 9–10 if behind.

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

# Dodo Payments (P1)
DODO_API_KEY=
DODO_WEBHOOK_SECRET=

# Convex Auth
GOOGLE_OAUTH_CLIENT_ID=
AUTH_SECRET=

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
│   │   │       ├── page.tsx                  # FE Phase 7
│   │   │       └── opengraph-image.tsx       # FE Phase 7
│   │   ├── leaderboard/
│   │   │   └── page.tsx                      # FE Phase 9
│   │   └── api/
│   │       ├── analyze/route.ts              # BE Phase 2
│   │       ├── roast/[id]/image/route.ts     # FE Phase 6
│   │       ├── create-checkout-session/route.ts  # BE Phase 10
│   │       └── webhooks/dodo/route.ts        # BE Phase 10
│   ├── components/
│   │   ├── ScoreCard.tsx                     # FE Phase 5
│   │   ├── InputForm.tsx                     # FE Phase 1
│   │   ├── AuthModal.tsx                     # FE Phase 8
│   │   └── LeaderboardTable.tsx              # FE Phase 9
│   ├── lib/
│   │   ├── hermes.ts                         # BE Phase 4
│   │   ├── linkup.ts                         # BE Phase 3
│   │   ├── youtube.ts                        # BE Phase 2
│   │   └── satori.ts                         # FE Phase 6
│   └── styles/
│       └── globals.css
├── convex/
│   ├── schema.ts                             # Phase 0
│   ├── auth.config.ts                        # FE Phase 8
│   ├── auth.ts                               # FE Phase 8
│   ├── roasts.ts                             # BE Phase 2/3/4
│   └── users.ts                              # FE Phase 8 / BE Phase 10
├── public/
│   └── fonts/
├── .env.local
├── wrangler.toml
├── tailwind.config.ts
└── package.json
```
