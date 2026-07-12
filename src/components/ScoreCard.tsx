"use client";

import React, { useState } from "react";

interface ScoreCardProps {
  roast: {
    _id: string;
    contentText: string;
    sourceType: string;
    sourceUrl?: string;
    status: string;
    fuMeter?: number;
    originalityScore?: number;
    fuScore?: number;
    verdict?: string;
    suspectedPrompt?: string;
    breakdown?: string[];
    bountyPoolAmount?: number;
    humanProofVideoUrl?: string;
    isArchived?: boolean;
  };
  onAddBounty?: (amount: number) => void;
  onArchive?: () => void;
  onSubmitProof?: (url: string) => void;
}

export default function ScoreCard({ roast, onAddBounty, onArchive, onSubmitProof }: ScoreCardProps) {
  const [proofUrl, setProofUrl] = useState("");
  const [showProofInput, setShowProofInput] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [showExtortModal, setShowExtortModal] = useState(false);

  const handleCopyLink = () => {
    setIsCopying(true);
    const link = `${window.location.origin}/?roastId=${roast._id}`;
    navigator.clipboard.writeText(link);
    setTimeout(() => setIsCopying(false), 2000);
  };

  const getStatusMessage = () => {
    switch (roast.status) {
      case "extracting_transcript":
        return "Extracting YouTube transcript... 📡";
      case "scanning_plagiarism":
        return "Scanning key claims with LinkUp... 🔎";
      case "scoring":
        return "Analyzing slop density via GPT-4o... 🧠";
      case "failed":
        return "Analysis failed. Content is either un-scrapable or too holy to roast. ❌";
      default:
        return "Loading... ⏳";
    }
  };

  if (roast.status !== "scored") {
    return (
      <div className="w-full max-w-xl mx-auto bg-zinc-950 border border-zinc-800 p-8 rounded-2xl flex flex-col items-center justify-center space-y-6 text-center animate-pulse">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-red-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-red-500 rounded-full animate-spin"></div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-zinc-100 uppercase tracking-widest">Running Roast Pipeline</h3>
          <p className="text-red-400 font-mono text-sm tracking-wide">{getStatusMessage()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-[#0a0a0c] border-2 border-red-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-red-500/50">
      {/* Aesthetic scan lines / cyber elements */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" />
      
      {/* Top Banner: Cyberpunk Badge & Bounty */}
      <div className="flex items-center justify-between mb-6 border-b border-zinc-800/80 pb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🤖</span>
          <div>
            <h2 className="text-xl font-black text-red-500 tracking-tighter uppercase">FU SLOP VERDICT</h2>
            <p className="text-[10px] font-mono text-zinc-500 uppercase">SYS-VER: HUMAN-DETECTOR-v1.2</p>
          </div>
        </div>
        
        {/* Bounty Badge */}
        <div className="flex flex-col items-end">
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 font-mono px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
            <span>🔥</span>
            <span className="tracking-tight">${roast.bountyPoolAmount || 0} BOUNTY</span>
          </div>
          <span className="text-[9px] text-zinc-500 font-mono mt-1">pooled outrage</span>
        </div>
      </div>

      {/* Content attribution preview */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 mb-6 relative">
        <span className="absolute -top-2 left-4 px-2 py-0.5 bg-[#0a0a0c] border border-zinc-800 rounded text-[9px] text-zinc-400 font-mono uppercase">Target Content Preview</span>
        <p className="text-zinc-300 text-sm italic line-clamp-2 mt-1">
          &ldquo;{roast.contentText}&rdquo;
        </p>
      </div>

      {/* THREE CORE METRICS */}
      <div className="space-y-4 mb-6">
        {/* FU METER */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono font-bold tracking-wider">
            <span className="text-red-400">🚨 FU METER (AI-SLOP DETECTED)</span>
            <span className="text-red-400 text-sm font-black">{roast.fuMeter}%</span>
          </div>
          <div className="h-4 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${roast.fuMeter}%` }}
            />
          </div>
        </div>

        {/* ORIGINALITY */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono font-bold tracking-wider">
            <span className="text-emerald-400">🧬 ORIGINALITY (HUMAN FOOTPRINT)</span>
            <span className="text-emerald-400 text-sm font-black">{roast.originalityScore}%</span>
          </div>
          <div className="h-4 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-red-600 via-yellow-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${roast.originalityScore}%` }}
            />
          </div>
        </div>

        {/* OVERALL FU SCORE */}
        <div className="bg-zinc-950/80 border border-zinc-900 rounded-2xl p-4 flex items-center justify-between shadow-inner">
          <div>
            <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Overall FU Score</span>
            <p className="text-[10px] text-zinc-500 font-mono leading-none mt-1">combined slop & cringe metrics</p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500 tracking-tighter">
              {roast.fuScore}
            </span>
            <span className="text-xs font-mono text-zinc-500"> / 100</span>
          </div>
        </div>
      </div>

      {/* SAVAGE VERDICT */}
      <div className="border-l-4 border-red-500 bg-red-500/5 p-4 rounded-r-xl mb-6">
        <span className="text-[9px] font-mono text-red-400 uppercase tracking-widest font-black">Savage Verdict</span>
        <p className="text-zinc-100 font-bold text-base mt-1 leading-snug italic">
          &ldquo;{roast.verdict}&rdquo;
        </p>
      </div>

      {/* DE-LAUNDERED PROMPT REVEAL (NOVELTY) */}
      <div className="bg-zinc-950 border border-dashed border-zinc-800 p-4 rounded-xl mb-6 relative">
        <span className="absolute -top-2 left-4 px-2 py-0.5 bg-[#0a0a0c] border border-zinc-800 rounded text-[9px] text-amber-400 font-mono uppercase tracking-widest font-bold">Laundered Prompt Revealed</span>
        <p className="text-zinc-400 font-mono text-xs leading-relaxed mt-1">
          <span className="text-amber-500 font-bold">&gt; AI instruction: </span>
          &ldquo;{roast.suspectedPrompt}&rdquo;
        </p>
      </div>

      {/* DETECTED STRUCTURAL VIOLATIONS (BREAKDOWN) */}
      <div className="space-y-2 mb-6">
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Structural Violations</span>
        <ul className="space-y-1.5 text-xs text-zinc-400 font-mono">
          {roast.breakdown?.map((item, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-red-500 mt-0.5">✕</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* PROOF OF HUMANITY ROW (INFLUENCER VERIFICATION) */}
      {roast.humanProofVideoUrl ? (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-xs font-mono flex items-center justify-between mb-6">
          <span className="flex items-center space-x-1">
            <span>✅</span>
            <span className="font-bold">Human Proof Submitted:</span>
          </span>
          <a 
            href={roast.humanProofVideoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline hover:text-emerald-300 flex items-center space-x-1"
          >
            <span>View Proof Link ↗</span>
          </a>
        </div>
      ) : (
        <div className="mb-6">
          {showProofInput ? (
            <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 block font-bold">Paste proof of humanity (e.g. video link of you writing it):</span>
              <div className="flex space-x-2">
                <input
                  type="url"
                  placeholder="https://youtube.com/... or https://x.com/..."
                  value={proofUrl}
                  onChange={(e) => setProofUrl(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 rounded px-2 py-1.5 flex-1 focus:outline-none focus:border-emerald-500 font-mono"
                />
                <button
                  onClick={() => {
                    if (proofUrl && onSubmitProof) {
                      onSubmitProof(proofUrl);
                      setShowProofInput(false);
                      setProofUrl("");
                    }
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-zinc-100 text-xs font-bold px-3 py-1.5 rounded transition-all font-mono"
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowProofInput(true)}
              className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 hover:underline block"
            >
              🙋 Are you the owner? Submit Proof of Humanity to clear your name
            </button>
          )}
        </div>
      )}

      {/* CORE VIRAL / MONETIZATION CALL TO ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-3 border-t border-zinc-900 pt-4">
        {/* Share Link */}
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center space-x-2 bg-zinc-950 hover:bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-xl py-3 text-xs font-bold transition-all"
        >
          <span>🔗</span>
          <span>{isCopying ? "Copied!" : "Copy Share Link"}</span>
        </button>

        {/* Up-Roast Outrage Bounty */}
        <button
          onClick={() => onAddBounty && onAddBounty(10)}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white rounded-xl py-3 text-xs font-black transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.3)] animate-pulse"
        >
          <span>🔥</span>
          <span>Add +$10 Outrage Bounty</span>
        </button>
      </div>

      {/* RANSOM BUTTON */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowExtortModal(true)}
          className="text-[9px] font-mono text-red-500/60 hover:text-red-500 hover:underline tracking-widest uppercase font-black"
        >
          ⚠️ Pay $49 Extortion Fee to Hide and Un-index This Roast
        </button>
      </div>

      {/* EXTORTION DIALOG */}
      {showExtortModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#0e0e12] border-2 border-red-600 rounded-2xl max-w-sm p-6 text-center space-y-4 shadow-[0_0_40px_rgba(220,38,38,0.25)]">
            <span className="text-4xl block">🕵️‍♂️</span>
            <h3 className="text-xl font-black text-red-500 tracking-tight uppercase">Reputation Protection Protocol</h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-mono">
              Are you suffering from public embarrassment? Our proprietary system offers premium un-indexing.
              For a flat-rate protection fee of <span className="text-red-400 font-bold">$49</span>, we will erase this card from the Leaderboard and prevent any future search indexing.
            </p>
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3 text-xs font-mono text-zinc-500 text-left">
              <span className="text-red-400 block font-bold mb-1">PRO-SUBSCRIBE BENEFIT:</span>
              • Removed from Leaderboard<br />
              • Blocked Google SEO crawling<br />
              • Locked edit capabilities
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  if (onArchive) onArchive();
                  setShowExtortModal(false);
                }}
                className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-lg flex-1 font-mono transition-all uppercase"
              >
                Pay Ransom ($49)
              </button>
              <button
                onClick={() => setShowExtortModal(false)}
                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs px-4 py-2 rounded-lg font-mono transition-all"
              >
                Refuse Fee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
