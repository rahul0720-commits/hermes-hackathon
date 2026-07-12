# FU (working title: FU)

Hermes Buildathon · Virality Track · 8-hour build

## 1. Problem

The internet is drowning in AI-generated, plagiarised, recycled content — on LinkedIn, YouTube, and X. Everyone knows it's happening. Nobody has a fast, shareable way to prove it on a specific piece of content. People want to call it out. They have no weapon.

## 2. Solution

**FU** — paste a URL or drop content text → get a brutal, shareable verdict card. It operates on two vicious axes:

1. **"Spotify Wrapped" Ego-Sharing:** Expose the poster's exact brand of delusion with savage `Archetypes` and specific `Receipts`.
2. **"Anonymous Slop Bombs":** Weaponized paranoia. Drop an anonymous roast on a target. They have 24 hours to pay the "De-escalation Ransom", or the bomb detonates publicly on the Daily Slop Board.

The card is downloadable as a PNG and has a public shareable URL. Every roast becomes a social post.

## 3. Target User

- **The Vigilante:** LinkedIn founders/builders sick of AI slop who want to publicly and anonymously call it out.
- **The Paranoiac:** Creators terrified of being dragged, who will pay to hide their humiliation.
- **The Troll:** Anyone who wants to drop an anonymous Slop Bomb on a competitor or a ghost-written influencer.

## 4. Core User Flow

### Standard Flow
```
Landing page
    ↓
Paste URL (YouTube) OR paste text (LinkedIn/X/anywhere)
    ↓
[Analysing...] — LLM + LinkUp web search runs
    ↓
Verdict card rendered:
  - FU Meter % + Originality %
  - Archetype (e.g., "The ChatGPT Thought Leader")
  - Receipts (Humiliating callouts of specific phrases)
    ↓
"Share this roast" → copy link / download PNG
    ↓
Public roast page at fu.app/roast/[id]
```

### The Slop Bomb Flow
```
Bomber drops bomb (toggles "Slop Bomb" mode)
    ↓
Bomber sends the anonymous link to the Target
    ↓
Target clicks link
    ↓
Bomber gets a "💥 Read Receipt" (They saw it!)
    ↓
Target sees a 24-hour countdown. They must pay the "De-escalation Ransom" ($5).
    ↓
If unpaid after 24h, the roast detonates and is permanently pinned to The Daily Slop Board.
```

## 5. Features (MVP — build order priority)

### P0 — Must ship

| # | Feature | Notes |
|---|---------|-------|
| 1 | Text input + URL input (YouTube only) | YouTube transcript via youtube-transcript-api. LinkedIn/X = paste text. |
| 2 | LLM analysis pipeline | GPT-5.6 via Hermes. Prompt scores AI-ness and generates Archetype/Receipts. Returns structured JSON. |
| 3 | LinkUp web search for originality check | Feed key claims/phrases from content → LinkUp live search → see if they appear verbatim elsewhere. |
| 4 | Score card UI | Archetype, Receipts, FU Meter %, Originality %, FU Score. Clean, bold, dark card design. |
| 5 | PNG export | Client-side export — downloadable card. |
| 6 | Public shareable URL | /roast/[id] — anyone can open it. |
| 7 | Monetization Engine | Outrage Bounty (pay to boost a roast) & De-escalation Ransom (pay to hide). |
| 8 | Analytics | Datafast snippet live from minute one. Read-only dashboard for judges. |

### P1 — Nice to have (if time)

| # | Feature | Notes |
|---|---------|-------|
| 9 | "The Daily Slop Board" | Top 10 most slopped pieces of content roasted today. Public feed. Includes countdowns for active Slop Bombs. |
| 10 | Batch URL input | Drop 5 URLs, get 5 roast cards. Useful for agencies. |

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
│  THE VERDICT:                       │
│  "The ChatGPT Thought Leader"       │
│                                     │
│  RECEIPTS:                          │
│  • "In today's fast-paced world..." │
│  • "A testament to..."              │
│                                     │
│  FU METER       ████████░░  78%     │
│  ORIGINALITY    ███░░░░░░░  31%     │
│                                     │
│  fu.app/roast/a8x3k                 │
└─────────────────────────────────────┘
```

- Dark background, high contrast
- Features the brutal `Archetype` front and center
- Bulleted `Receipts` pointing out exact phrases
- The creator handle visible so when people share the card, it tags the target

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
- fuMeter: 0-100 (how AI-generated does this feel?)
- originality_score: 0-100 (inverse of plagiarism; how original are the ideas?)
- fu_score: 0-100 (overall "this is slop" rating)
- archetype: A savage, Spotify-Wrapped style persona name (e.g., "The LinkedIn Reply Guy", "The AI Recycler")
- receipts: Array of 3 specific, humiliating callouts (exact phrases from the text that prove it's slop)

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
| LLM | Hermes + GPT-5.6 | Required (Hermes rule) |
| Web search / originality | LinkUp API | +25 pts |
| Hosting | Cloudflare Pages | +25 pts |
| Payments | Dodo Payments | +25 pts |
| Card image export | Client-side PNG | — |
| Analytics | Datafast | Required for judging |
| YouTube transcript | youtube-transcript-api (Python) or youtubei.js (Node) | — |

**Total reachable power-up points: +100**

## 9. Distribution Strategy (Day-of)

### Hour 2–3 (as soon as core works):

Post on LinkedIn: "I built something that tells you how much AI slop a piece of content is. Drop a LinkedIn post URL in the comments — I'll run it live and share the card."

Seed with 2–3 pre-roasted cards of well-known AI slop creators (with their handles visible)

### Hour 4–5:

DM 10 founder/builder connections directly with an anonymous Slop Bomb of their latest post. Wait for the "💥 Read Receipt" and watch them panic over the De-escalation Ransom.

### Hour 6:

Post the Daily Slop Board: "Top 5 most AI-slopped LinkedIn posts we've roasted today, and the bounty pool on their heads."

This drives a second wave of engagement as the named creators respond and trolls pay to boost the roasts.

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
| Target refuses to pay Ransom | The public humiliation on the Daily Slop Board is the alternative. Trolls can still pay the Outrage Bounty. |

## 12. What Success Looks Like at 5pm

- Working product live at a real URL
- YouTube URL → roast card in under 30 seconds
- Text paste → roast card in under 20 seconds
- Slop Bomb flow tested: read receipt fires, 24h countdown works, ransom payment hides it.
- Datafast showing 300+ unique visitors with read-only access ready for judge
- Convex + LinkUp + Cloudflare power-ups verified working by a mentor
