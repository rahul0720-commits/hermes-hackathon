# FU (working title: FU)

Hermes Buildathon · Virality Track · 8-hour build

## 1. Problem

The internet is drowning in AI-generated, plagiarised, recycled content — on LinkedIn, YouTube, and X. Everyone knows it's happening. Nobody has a fast, shareable way to prove it on a specific piece of content. People want to call it out. They have no weapon.

## 2. Solution

**FU** — paste a URL or drop content text → get a brutal, shareable verdict card that scores it on:

- **FU Meter %**
- **Originality Score** (plagiarism / recycled ideas)
- **Overall FU Score** (0–100)

The card is downloadable as a PNG and has a public shareable URL. Every roast becomes a social post.

## 3. Target User

- LinkedIn founders/builders who are sick of AI slop and want to publicly call it out
- Creators who want to defend their content ("see, I'm 100% original")
- Anyone who wants to drag a competitor or a ghost-written influencer

## 4. Core User Flow

```
Landing page
    ↓
Paste URL (YouTube) OR paste text (LinkedIn/X/anywhere)
    ↓
[Analysing...] — LLM + LinkUp web search runs
    ↓
Verdict card rendered:
  - FU Meter % with breakdown
  - Originality % with "sourced from" references
  - FU Score (0–100) with a one-line savage verdict
    ↓
"Share this roast" → copy link / download PNG
    ↓
[Soft gate] — to share publicly or run more than 3 roasts → sign up (email + first use event)
    ↓
Public roast page at fu.app/roast/[id]
```

## 5. Features (MVP — build order priority)

### P0 — Must ship

| # | Feature | Notes |
|---|---------|-------|
| 1 | Text input + URL input (YouTube only) | YouTube transcript via youtube-transcript-api. LinkedIn/X = paste text. |
| 2 | LLM analysis pipeline | GPT-5.6 via Hermes. Prompt scores AI-ness, recycled phrasing, originality. Returns structured JSON. |
| 3 | LinkUp web search for originality check | Feed key claims/phrases from content → LinkUp live search → see if they appear verbatim elsewhere. This is the plagiarism engine. Power-up earned. |
| 4 | Score card UI | FU Meter %, Originality %, FU Score. One-line savage verdict. Clean, bold, dark card design. |
| 5 | PNG export | satori or html2canvas — downloadable card. |
| 6 | Public shareable URL | /roast/[id] — anyone can open it without logging in. |
| 7 | Signup gate | After 3 free roasts, or to share publicly — Google/email signup. Convex auth. This is where signups are counted. |
| 8 | Analytics | Datafast snippet live from minute one. Read-only dashboard for judges. |

### P1 — Nice to have (if time)

| # | Feature | Notes |
|---|---------|-------|
| 9 | "Roast leaderboard" | Top 10 most slopped pieces of content roasted today — public feed. Drives return traffic. |
| 10 | Dodo Payments paywall | $5/month for unlimited roasts. Earns Revenue cross-track bonus (+50pts at half weight). Power-up earned. |
| 11 | Batch URL input | Drop 5 URLs, get 5 roast cards. Useful for agencies. |

### P2 — Cut if under time pressure

- Browser extension
- Twitter/X URL parsing (API issues)
- Email digest

## 6. The Score Card Design (critical for virality)

```
┌─────────────────────────────────────┐
│  🤖 FU                       │
│                                     │
│  "[Post title / first 10 words]"    │
│  by @CreatorHandle                  │
│                                     │
│  FU METER       ████████░░  78%      │
│  ORIGINALITY   ███░░░░░░░  31%      │
│                                     │
│  FU SCORE          82 / 100         │
│                                     │
│  "This reads like GPT rewrote a     │
│   2022 Medium article. Twice."      │
│                                     │
│  fu.app/roast/a8x3k          │
└─────────────────────────────────────┘
```

- Dark background, high contrast
- Bold percentage bars (like a progress bar)
- The one-liner verdict is the most shareable element — make it savage but specific
- Creator handle visible so when people share the card, it tags the target

## 7. LLM Prompt Architecture

### Step 1 — Extract content

- YouTube URL → pull transcript via youtube-transcript-api → send first 3,000 chars to LLM
- Text paste → send directly

### Step 2 — LinkUp originality scan

1. Extract 3–5 key claims or distinctive phrases from the content
2. Run each through LinkUp live web search
3. Check if they appear verbatim or near-verbatim elsewhere online
4. Return: `[{ phrase, found_at_url, similarity }]`

### Step 3 — LLM scoring prompt

```
You are an expert at detecting AI-generated content and unoriginal ideas.

Analyse this content and return a JSON object with:
- fuMeter: 0-100 (how AI-generated does this feel? Look for: generic frameworks, listicle structure, hedging language, no personal anecdotes, "In today's fast-paced world" type openers)
- originality_score: 0-100 (inverse of plagiarism; how original are the ideas? Use the web search results below as evidence)
- fu_score: 0-100 (overall "this is slop" rating)
- verdict: one savage but specific sentence, max 15 words
- breakdown: 3 bullet points explaining the scores

Web search findings: [LinkUp results]

Content: [content text]
```

### Step 4 — Render + store

1. Store result in Convex
2. Render card
3. Generate public URL

## 8. Tech Stack

| Layer | Tool | Power-up? |
|-------|------|-----------|
| Framework | Next.js 14 (App Router) | — |
| Database + backend | Convex | +25 pts |
| LLM | Hermes + OpenAI GPT-5.6 | Required (Hermes rule) |
| Web search / originality | LinkUp API | +25 pts |
| Hosting | Cloudflare Pages | +25 pts |
| Payments (P1) | Dodo Payments | +25 pts |
| Card image export | Satori (OG image generation) | — |
| Analytics | Datafast | Required for judging |
| YouTube transcript | youtube-transcript-api (Python) or youtubei.js (Node) | — |

**Total reachable power-up points: +100 (or +125 if Wispr used for dictation)**

## 9. Distribution Strategy (Day-of)

### Hour 2–3 (as soon as core works):

Post on LinkedIn: "I built something that tells you how much AI slop a piece of content is. Drop a LinkedIn post URL in the comments — I'll run it live and share the card."

Seed with 2–3 pre-roasted cards of well-known AI slop creators (with their handles visible)

### Hour 4–5:

DM 10 founder/builder connections directly with a personalised roast of their latest post

Half will repost it — that's your L4 amplification signal (notable reshares)

### Hour 6:

Post the leaderboard: "Top 5 most AI-slopped LinkedIn posts we've roasted today"

This drives a second wave of engagement as the named creators respond (even if angry)

Signup trigger: Anyone who wants to roast more than 3 posts must sign up. Frictionless — just email or Google. This is your L3/L4 signup engine.

## 10. Scoring Forecast

| Parameter | Target | Expected Level | Points |
|-----------|--------|----------------|--------|
| Impressions | 3k–6k | L4 | 3 |
| Reactions | 30–60 | L4 | 6 |
| Amplification | 1–2 notable reshares | L4 | 9 |
| Visitors | 300–600 | L4 | 30 |
| Signups | 80–150 | L3–L4 | 50–75 |
| Power-ups (4×) | Convex, LinkUp, Cloudflare, Dodo | +100 | 100 |
| **TOTAL** | | | **~198–223 pts** |

## 11. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| YouTube transcript API breaks | Also support text-paste; YouTube is a nice-to-have layer, not the core |
| LinkUp results thin for niche content | LLM can still score AI-ness even without web search hits; clearly label "originality check: limited data" |
| Card looks amateur | Spend 45 minutes on card design upfront — it's your distribution engine |
| No notable reshares | Pre-seed with roasts of creators who have large audiences; they often respond even if angry (engagement = reach) |
| Signup conversion low | Make the 3-free-roasts limit hit naturally; don't gate the card view, only sharing and more roasts |

## 12. What Success Looks Like at 5pm

- Working product live at a real URL
- YouTube URL → roast card in under 30 seconds
- Text paste → roast card in under 20 seconds
- Datafast showing 300+ unique visitors with read-only access ready for judge
- 80+ signups in Convex auth table (not teammates)
- 1 notable reshare on LinkedIn visible in analytics
- Convex + LinkUp + Cloudflare power-ups verified working by a mentor
