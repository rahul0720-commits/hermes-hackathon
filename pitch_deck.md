# PITCH DECK: FU (Fully Unique & Outrage Bounties)
## Hackathon Presentation Outline & Source Document for Slide Generation
*Designed for Google NotebookLM, Slides, or Presentation Builders*

---

## SLIDE 1: TITLE SLIDE
### The Grift Detector & Outrage Economy
* **Project Name:** FU (Dual Meaning: "Fully Unique" or "Fuck You, Slop!")
* **Sub-title:** The crowd-funded Wall of Shame for AI-generated corporate slop and ghostwritten influencer hype.
* **Tagline:** Nominate slop. Pool bounties. Verify humanity.
* **Track:** Virality Track (Hermes Buildathon)

---

## SLIDE 2: THE PROBLEM
### The Internet is Drowning in Synthetic Garbage
* **The Slop Apocalypse:** Platforms like LinkedIn, X, and Medium are overrun by plagiarized, automated, and AI-laundered content ("In today's fast-paced digital landscape...", "Let's delve...").
* **Fake Authority:** Ghostwritten influencers and corporate grifters use AI to fabricate professional authority, drown out real human creators, and manipulate audiences.
* **No Weapon for Humans:** Readers know content is fake, but have no quick, shareable, or objective way to publicly call it out and verify it.

---

## SLIDE 3: THE SOLUTION
### FU — Evolving a Joke into a Public Protocol
We built a dual-sided ecosystem that leverages viral outrage to fund truth and original writing.
* **1. For the Public (FU - Outrage Board):** An interactive, crowd-funded Wall of Shame. Users paste a text block or YouTube URL to roast it, scoring it on AI-ness, Plagiarism, and Cringe.
* **2. For Creators (FU - Fully Unique):** A positive publishing protocol. Verified human creators showcase their low "Slop Scores" with live badges, proving 100% human authenticity.

---

## SLIDE 4: THE VIRAL PRODUCT LOOP
### How the "Outrage Bounty" Works
1. **Nomination:** Anyone can nominate an insufferable piece of content for a roast.
2. **Analysis:** The pipeline analyzes the content using GPT-4o and LinkUp Web Search.
3. **Outrage Pooling:** Users who agree the post is garbage put down micro-payments (e.g., $1 or $10) to grow the public "Outrage Bounty Pool" on that grifter.
4. **Social Outcry:** The grifter is tagged on social media: *"A $500 Outrage Bounty has been placed on your post. Clear your name or remain on the Wall of Shame."*

---

## SLIDE 5: THE HUMANITY CLEARINGHOUSE
### How Grifters Escape the Wall of Shame
We don't just mock people; we provide an escape hatch.
* **The "Proof of Humanity" Claim:** The target can submit an unedited video, handwritten draft, or research trail to prove they wrote the content themselves.
* **The Redemption Arc:** If their proof is verified, their Originality Score rises, their slop rating drops, and they claim the Outrage Bounty pool!
* **The Result:** We gamify the verification of real, original human writing.

---

## SLIDE 6: THE DYSTOPIAN BUSINESS MODEL
### Monetization Powered by Reputation Management
* **1. "Pay-to-Bury" Extortion Fee ($49):** High-profile targets suffering from public embarrassment can pay a flat $49 ransom fee to immediately archive their card, remove it from the Leaderboard, and block search engine indexing. (Extremely high margin B2C).
* **2. Micro-Bounties:** Users pay tiny fees to cast outrage votes or up-roast posts, instantly covering LLM and Search API costs.
* **3. B2B Verified Human Badges ($19/mo):** Content agencies and writers pay a monthly subscription to get verified human-written certificates and live API widgets for their substacks or newsletters.

---

## SLIDE 7: TECHNICAL INNOVATION
### High-Performance, Reactive State Machine
* **Next.js & Cloudflare Edge:** Highly scalable, localized frontend.
* **Convex Real-Time Database:** Operates as a reactive state machine. When a roast starts, the UI seamlessly polls background steps (`extracting_transcript` ➔ `scanning_plagiarism` ➔ `scoring` ➔ `scored`) without locking browser threads or triggering serverless timeouts.
* **LinkUp Plagiarism Search:** Extracts distinct claims from text, searches the web, and constructs an objective lineage graph of where the ideas were copied from.
* **Client-Side Canvas Export:** Bypasses heavy native C++ server dependencies (like Sharp) by rendering and downloading viral PNG cards directly inside the user's browser.

---

## SLIDE 8: DE-LAUNDERED PROMPT REVEAL
### Stripping Away the Illusion
Our proprietary AI pipeline doesn't just score slop—it **reconstructs the exact instructions** the creator typed into ChatGPT.
* **Example Target Post:** *"Woke up at 4:30 AM. Cold plunge. 2 hours of deep work. Always align your holistic synergy."*
* **De-Laundered Prompt Revealed:** *"Write an insufferable LinkedIn morning routine listicle using words like 'holistic' and 'synergy' to make readers feel inadequate."*
* **Impact:** Nothing humiliates a corporate grifter more than revealing their simple prompts to the public.

---

## SLIDE 9: TRACTION & VIRALITY FORECAST
### Low Cost, Exponential Growth
* **Zero Marketing Cost:** Every roast card downloaded contains a shareable URL and creator handles, turning every angry target and laughing reader into a referral agent.
* **Low Server Overhead:** Scheduled background tasks, caching of matching claims, and browser-based rendering keep operational costs near-zero.
* **Success Metric at 5 PM:** 
  * Live reactive web app deployed.
  * Interactive, stateful Simulator mode fully functional.
  * Verified Convex state-machine database architecture.

---

## SLIDE 10: CONCLUSION
### Join the Anti-Slop Revolution
* **FU** is more than a roast app—it is the first **Reputation Protocol for the AI Era**.
* It turns public cynicism into a self-funding business model.
* It defends human writers by making originality profitable, and automation expensive.
* **Our Motto:** Bring finished work, not problems.
