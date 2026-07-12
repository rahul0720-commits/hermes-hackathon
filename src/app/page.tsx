"use client";

import React, { useState, useEffect } from "react";
import ScoreCard from "@/components/ScoreCard";
import LeaderboardTable from "@/components/LeaderboardTable";

// Mock initial data for the Wall of Shame
const INITIAL_LEADERBOARD = [
  {
    _id: "mock-1",
    contentText: "Woke up at 4:30 AM. Cold plunge. 2 hours of deep work. Met with 5 founders. The fast-paced digital landscape requires robust paradigm shifts. Always be scaling your synergy.",
    sourceType: "text",
    status: "scored",
    fuMeter: 96,
    originalityScore: 8,
    fuScore: 98,
    verdict: "A critical exposure of peak LinkedIn hustle-culture radiation.",
    suspectedPrompt: "Write a preachy, insufferable LinkedIn post about my morning routine using words like robust and synergy.",
    breakdown: [
      "Used the word 'synergy' unironically in paragraph 1",
      "Mentioned cold plunges as a replacement for actual business strategy",
      "Standard 1-sentence paragraph structure perfect for robot eye tracking"
    ],
    bountyPoolAmount: 580,
    humanProofVideoUrl: "",
    isArchived: false,
  },
  {
    _id: "mock-2",
    contentText: "Here are 10 ChatGPT prompts that will save you 40 hours of work. In today's landscape, AI is not replacing you, but humans using AI are. Let's delve into this holistic thread.",
    sourceType: "text",
    status: "scored",
    fuMeter: 94,
    originalityScore: 14,
    fuScore: 92,
    verdict: "A perfect storm of copy-pasted prompt-engineering grift.",
    suspectedPrompt: "Generate a generic Twitter thread about saving 40 hours using ChatGPT. Use delve and landscape.",
    breakdown: [
      "Opens with 'In today's fast-paced landscape' - direct GPT boilerplate",
      "Used the forbidden verb 'delve' within the first 20 words",
      "Contains a listicle of 10 items with zero actual actionable insights"
    ],
    bountyPoolAmount: 320,
    humanProofVideoUrl: "",
    isArchived: false,
  },
  {
    _id: "mock-3",
    contentText: "How I built a $50M SaaS company with zero employees and zero lines of code. It all started with a robust, holistically aligned vision to empower creators. Let's unpack the synergy.",
    sourceType: "text",
    status: "scored",
    fuMeter: 88,
    originalityScore: 22,
    fuScore: 85,
    verdict: "Suspiciously clean grammar masking a completely fictional tech journey.",
    suspectedPrompt: "Write a viral thread about building a multi-million dollar SaaS using only no-code tools.",
    breakdown: [
      "Claims $50M valuation with zero code assets - statistical impossibility",
      "Unironic use of the word 'empower' twice in a three-sentence hook",
      "Structure mimics OpenAI's custom GPT-4-turbo default formatting"
    ],
    bountyPoolAmount: 150,
    humanProofVideoUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    isArchived: false,
  }
];

export default function Home() {
  const [sourceType, setSourceType] = useState<"text" | "youtube">("text");
  const [inputText, setInputText] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [activeRoast, setActiveRoast] = useState<typeof INITIAL_LEADERBOARD[0] | null>(null);
  const [leaderboard, setLeaderboard] = useState<typeof INITIAL_LEADERBOARD>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStatus, setProcessStatus] = useState<"extracting_transcript" | "scanning_plagiarism" | "scoring" | "scored" | "idle">("idle");
  const [isUrlParamLoaded, setIsUrlParamLoaded] = useState(false);

  // Initialize Leaderboard on mount
  useEffect(() => {
    // Load from localStorage if available, else load mock defaults
    const cached = localStorage.getItem("fu_leaderboard");
    if (cached) {
       try {
         setLeaderboard(JSON.parse(cached));
       } catch {
         setLeaderboard(INITIAL_LEADERBOARD);
       }
    } else {
      setLeaderboard(INITIAL_LEADERBOARD);
    }
  }, []);

  // Save Leaderboard on updates
  const saveLeaderboard = (newBoard: typeof INITIAL_LEADERBOARD) => {
    setLeaderboard(newBoard);
    localStorage.setItem("fu_leaderboard", JSON.stringify(newBoard));
  };

  // Parse roastId from query parameters to support public sharing urls
  useEffect(() => {
    if (typeof window !== "undefined" && leaderboard.length > 0 && !isUrlParamLoaded) {
      const urlParams = new URLSearchParams(window.location.search);
      const roastId = urlParams.get("roastId");
      if (roastId) {
        const selected = leaderboard.find((r) => r._id === roastId);
        if (selected) {
          setActiveRoast(selected);
          // Scroll to card
          setTimeout(() => {
            document.getElementById("roast-card-section")?.scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
      }
      setIsUrlParamLoaded(true);
    }
  }, [leaderboard, isUrlParamLoaded]);

  // Handle running a new roast
  const handleStartRoast = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = sourceType === "text" ? inputText : youtubeUrl;
    if (!content.trim()) return;

    setIsProcessing(true);
    setActiveRoast(null);

    // Sequence Simulation matching your state-machine transitions
    if (sourceType === "youtube") {
      setProcessStatus("extracting_transcript");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    setProcessStatus("scanning_plagiarism");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setProcessStatus("scoring");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate simulated scores based on text contents or defaults
    const slopScore = content.toLowerCase().includes("synergy") || content.toLowerCase().includes("robust") || content.toLowerCase().includes("delve") ? 95 : Math.floor(Math.random() * 40) + 50;
    const originality = Math.floor(Math.random() * 30) + 5;
    const finalScore = Math.floor((slopScore + (100 - originality)) / 2);

    const generatedVerdict = getSavageVerdict(content, slopScore);
    const generatedPrompt = getSuspectedPrompt(content);
    const generatedBreakdown = getBreakdown();

    const newRoast = {
      _id: `roast-${Date.now()}`,
      contentText: sourceType === "text" ? content : `YouTube Video Roast (${content})`,
      sourceType,
      sourceUrl: sourceType === "youtube" ? youtubeUrl : undefined,
      status: "scored",
      fuMeter: slopScore,
      originalityScore: originality,
      fuScore: finalScore,
      verdict: generatedVerdict,
      suspectedPrompt: generatedPrompt,
      breakdown: generatedBreakdown,
      bountyPoolAmount: 10, // Initial Outrage Bounty
      humanProofVideoUrl: "",
      isArchived: false,
    };

    // Update active roast and add to leaderboard
    setActiveRoast(newRoast);
    saveLeaderboard([newRoast, ...leaderboard]);
    setIsProcessing(false);
    setProcessStatus("scored");

    // Scroll to the card
    setTimeout(() => {
      document.getElementById("roast-card-section")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  // Add Bounty mutation
  const handleAddBounty = (id: string, amount: number) => {
    const updated = leaderboard.map((r) => {
      if (r._id === id) {
        return { ...r, bountyPoolAmount: (r.bountyPoolAmount || 0) + amount };
      }
      return r;
    });
    saveLeaderboard(updated);
    if (activeRoast && activeRoast._id === id) {
      setActiveRoast({ ...activeRoast, bountyPoolAmount: (activeRoast.bountyPoolAmount || 0) + amount });
    }
  };

  // Archive / Ransom mutation
  const handleArchive = (id: string) => {
    const updated = leaderboard.map((r) => {
      if (r._id === id) {
        return { ...r, isArchived: true };
      }
      return r;
    });
    saveLeaderboard(updated);
    if (activeRoast && activeRoast._id === id) {
      setActiveRoast(null); // Clear from active view
    }
  };

  // Submit Proof mutation
  const handleSubmitProof = (id: string, url: string) => {
    const updated = leaderboard.map((r) => {
      if (r._id === id) {
        return { ...r, humanProofVideoUrl: url, originalityScore: Math.min(100, (r.originalityScore || 0) + 40), fuMeter: Math.max(0, (r.fuMeter || 0) - 40) };
      }
      return r;
    });
    saveLeaderboard(updated);
    if (activeRoast && activeRoast._id === id) {
      setActiveRoast({ 
        ...activeRoast, 
        humanProofVideoUrl: url, 
        originalityScore: Math.min(100, (activeRoast.originalityScore || 0) + 40),
        fuMeter: Math.max(0, (activeRoast.fuMeter || 0) - 40)
      });
    }
  };

  // Utility mock generators
  const getSavageVerdict = (_text: string, score: number) => {
    if (score > 90) return "Reads like GPT-4 had a stroke while reading atomic habits twice.";
    if (score > 75) return "We calculated your burstiness. It proves you're a robot.";
    return "A high concentration of corporate jargon, but barely holds a pulse.";
  };

  const getSuspectedPrompt = (text: string) => {
    if (text.toLowerCase().includes("woke up") || text.toLowerCase().includes("morning")) {
      return "Write a preachy, highly detailed LinkedIn morning routine thread to make readers feel inadequate.";
    }
    return "Write a generic thought-leader post using corporate buzzwords but provide zero concrete evidence.";
  };

  const getBreakdown = () => {
    return [
      "Contains high ratio of empty buzzwords ('holistic', 'synergy')",
      "Classic three-part structure mimicking standard ChatGPT formatting",
      "Lacks any verifiable data or personal human anecdotes"
    ];
  };

  // Filter out archived roasts for the public slop board view
  const visibleLeaderboard = leaderboard.filter((r) => !r.isArchived);

  return (
    <main className="min-h-screen bg-[#050507] text-zinc-100 flex flex-col items-center py-12 px-4 md:px-8 overflow-hidden relative">
      {/* Background glowing decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="text-center max-w-2xl space-y-4 mb-12 z-10">
        <div className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full text-xs font-mono text-red-400">
          <span>🔥</span>
          <span className="tracking-widest uppercase font-bold">HACKATHON LAUNCH PROTOCOL</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none">
          <span className="text-zinc-100">FU</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-amber-500">SLOP</span>
        </h1>
        <p className="text-zinc-400 font-mono text-sm tracking-wide max-w-lg mx-auto">
          The dystopian, crowd-funded Wall of Shame. Audit LinkedIn grift, pool outrage bounties, and force influencers to submit Proof of Humanity.
        </p>
      </div>

      {/* MAIN INPUT CARD */}
      <div className="w-full max-w-xl bg-[#09090c] border border-zinc-800/80 rounded-2xl p-6 shadow-2xl mb-12 z-10 relative">
        {/* Tab Selection */}
        <div className="flex border-b border-zinc-900 mb-6 font-mono text-xs">
          <button
            onClick={() => { setSourceType("text"); setInputText(""); }}
            className={`flex-1 pb-3 font-bold transition-all ${
              sourceType === "text" 
                ? "border-b-2 border-red-500 text-red-500" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            📋 PASTE GRITTY TEXT
          </button>
          <button
            onClick={() => { setSourceType("youtube"); setYoutubeUrl(""); }}
            className={`flex-1 pb-3 font-bold transition-all ${
              sourceType === "youtube" 
                ? "border-b-2 border-red-500 text-red-500" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            📺 YOUTUBE TRANSCRIPT
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleStartRoast} className="space-y-4">
          {sourceType === "text" ? (
            <textarea
              required
              placeholder="Paste the insufferable LinkedIn post, X thread, or corporate slop here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-32 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          ) : (
            <div className="space-y-2">
              <input
                required
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
              <span className="text-[10px] font-mono text-zinc-500 block">We will fetch, parse, and verify the video transcript automatically.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:via-rose-500 hover:to-amber-500 text-white font-black uppercase text-xs tracking-wider py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] disabled:opacity-50 font-mono"
          >
            {isProcessing ? "INITIALIZING ROAST ENGINES..." : "🔥 NOMINATE & ROAST GRITTY CONTENT"}
          </button>
        </form>
      </div>

      {/* PIPELINE SIMULATOR STATUS INDICATOR */}
      {isProcessing && (
        <div className="w-full max-w-xl bg-[#09090c] border border-red-500/20 p-6 rounded-2xl mb-12 flex flex-col space-y-4 font-mono text-xs z-10">
          <span className="text-red-400 font-bold tracking-widest uppercase">PIPELINE EXECUTION LOGS</span>
          <div className="space-y-2 text-zinc-400">
            <div className={`flex items-center space-x-2 ${processStatus === "extracting_transcript" ? "text-red-400 animate-pulse font-black" : ""}`}>
              <span>{sourceType === "youtube" ? (processStatus !== "extracting_transcript" ? "✅" : "⏳") : "⏭️"}</span>
              <span>[1/3] Extracting YouTube Transcript Data</span>
            </div>
            <div className={`flex items-center space-x-2 ${processStatus === "scanning_plagiarism" ? "text-red-400 animate-pulse font-black" : ""}`}>
              <span>{processStatus === "extracting_transcript" ? "⬜" : processStatus === "scanning_plagiarism" ? "⏳" : "✅"}</span>
              <span>[2/3] Extracting Key Claims & Scanning LinkUp Database</span>
            </div>
            <div className={`flex items-center space-x-2 ${processStatus === "scoring" ? "text-red-400 animate-pulse font-black" : ""}`}>
              <span>{processStatus === "scoring" ? "⏳" : processStatus === "scored" ? "✅" : "⬜"}</span>
              <span>[3/3] Cynical GPT-4o Quality Evaluation & Scoring Pipeline</span>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE ROAST DISPLAY */}
      {activeRoast && (
        <div id="roast-card-section" className="w-full max-w-xl mb-16 z-10 scroll-mt-6">
          <ScoreCard 
            roast={activeRoast} 
            onAddBounty={(amount) => handleAddBounty(activeRoast._id, amount)}
            onArchive={() => handleArchive(activeRoast._id)}
            onSubmitProof={(url) => handleSubmitProof(activeRoast._id, url)}
          />
        </div>
      )}

      {/* LEADERBOARD WALL OF SHAME */}
      <div className="w-full max-w-4xl z-10">
        <LeaderboardTable 
          roasts={visibleLeaderboard} 
          onSelectRoast={(id) => {
            const selected = leaderboard.find((r) => r._id === id);
            if (selected) {
              setActiveRoast(selected);
              setTimeout(() => {
                document.getElementById("roast-card-section")?.scrollIntoView({ behavior: "smooth" });
              }, 200);
            }
          }} 
          onAddBounty={handleAddBounty}
        />
      </div>

      {/* FOOTER */}
      <div className="mt-20 text-center font-mono text-[10px] text-zinc-600 uppercase tracking-widest z-10 border-t border-zinc-900 pt-8 w-full max-w-4xl">
        <span>© 2026 FU SLOP CO. • BRINGING FINISHED WORK, NOT PROBLEMS • MIT LICENSE</span>
      </div>
    </main>
  );
}
