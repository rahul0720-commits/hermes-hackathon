"use client";

import { useEffect, useState } from "react";
import type { Roast } from "@/lib/types";

function fuLabel(fuScore: number) {
  if (fuScore >= 85) return "CRITICAL CONTAMINATION DETECTED";
  if (fuScore >= 65) return "HIGH SLOP PROBABILITY CONFIRMED";
  if (fuScore >= 40) return "MODERATE SYNTHETIC RESIDUE";
  return "TRACE HUMAN SIGNAL DETECTED";
}

export default function ScoreCard({ roast }: { roast: Roast }) {
  const { score } = roast;
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/roast/${roast.id}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="brutalist-card bg-surface-container-lowest border-border-width-heavy border-primary p-gutter md:p-8 relative overflow-hidden">
      {/* Original snippet */}
      <div className="mb-8 border-border-width border-surface-variant p-4 bg-surface-dim">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-primary-fixed-dim text-[16px]">
            description
          </span>
          <span className="font-label-bold text-label-bold text-on-surface-variant uppercase">
            Original Input Fragment
          </span>
        </div>
        <p className="font-body-md italic text-on-surface-variant line-clamp-4">
          &ldquo;{roast.contentText}&rdquo;
        </p>
        {roast.creatorHandle && (
          <p className="font-code-sm text-secondary mt-3 uppercase">
            SUBJECT: {roast.creatorHandle}
          </p>
        )}
      </div>

      {/* Scores grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Slop */}
        <div className="flex flex-col">
          <div className="flex justify-between items-end mb-2">
            <span className="font-label-bold text-label-bold uppercase">AI SLOP CONTENT</span>
            <span className="font-score-display text-[40px] md:text-score-display text-primary-fixed-dim">
              {score.fuMeter}%
            </span>
          </div>
          <div className="h-8 w-full bg-surface-container border-border-width border-primary flex segment-bar overflow-hidden">
            <div
              className="bg-primary-fixed-dim h-full transition-[width] duration-1000 ease-out"
              style={{ width: mounted ? `${score.fuMeter}%` : "0%" }}
            />
          </div>
        </div>
        {/* Originality */}
        <div className="flex flex-col">
          <div className="flex justify-between items-end mb-2">
            <span className="font-label-bold text-label-bold uppercase">ORIGINALITY INDEX</span>
            <span className="font-score-display text-[40px] md:text-score-display text-error">
              {score.originalityScore}%
            </span>
          </div>
          <div className="h-8 w-full bg-surface-container border-border-width border-primary flex segment-bar overflow-hidden">
            <div
              className="bg-error h-full transition-[width] duration-1000 ease-out"
              style={{ width: mounted ? `${score.originalityScore}%` : "0%" }}
            />
          </div>
        </div>
      </div>

      {/* Huge FU score */}
      <div className="border-y-border-width-heavy border-primary py-8 mb-8 flex flex-col items-center justify-center bg-primary-fixed-dim text-background">
        <span className="font-label-bold text-label-bold uppercase mb-2">FINAL FU SCORE</span>
        <div className="font-display-xl text-[64px] md:text-display-xl leading-none">
          {score.fuScore}
          <span className="text-3xl">/100</span>
        </div>
        <div className="mt-4 font-code-sm text-code-sm font-bold uppercase tracking-widest text-center px-4">
          {fuLabel(score.fuScore)}
        </div>
      </div>

      {/* Savage verdict */}
      <div className="mb-12">
        <div className="font-label-bold text-label-bold uppercase text-primary-fixed-dim mb-4">
          THE SAVAGE VERDICT:
        </div>
        <div className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase italic bg-surface-container p-6 border-l-8 border-primary-fixed-dim text-primary-fixed-dim">
          &ldquo;{score.verdict}&rdquo;
        </div>
      </div>

      {/* Suspected prompt — reconstructed from the slop */}
      {score.suspectedPrompt && (
        <div className="mb-12 border-border-width border-secondary-container bg-surface-dim p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-secondary text-[16px]">
              smart_toy
            </span>
            <span className="font-label-bold text-label-bold uppercase text-secondary">
              Reconstructed Prompt
            </span>
          </div>
          <p className="font-body-md text-on-surface">
            <span className="text-on-surface-variant">&gt; </span>
            &ldquo;{score.suspectedPrompt}&rdquo;
          </p>
        </div>
      )}

      {/* Breakdown */}
      {score.breakdown?.length > 0 && (
        <div className="mb-12 border-border-width border-surface-variant p-6 bg-surface-dim">
          <div className="font-label-bold text-label-bold uppercase text-on-surface-variant mb-4">
            AUTOPSY REPORT
          </div>
          <ul className="space-y-3">
            {score.breakdown.map((point, i) => (
              <li key={i} className="flex gap-3 font-body-md text-on-surface">
                <span className="text-primary-fixed-dim font-bold">{String(i + 1).padStart(2, "0")}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Share */}
      <div className="border-t-border-width border-primary pt-8">
        <div className="font-label-bold text-label-bold uppercase mb-6 text-center">
          Export Analysis to Public Archive
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <button
            onClick={() =>
              alert("PNG export runs via Satori in production (see BUILD_PLAN Phase 6).")
            }
            className="bg-primary text-background py-4 font-label-bold text-label-bold uppercase border-border-width border-primary hover:bg-primary-fixed-dim transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span className="material-symbols-outlined">download</span> Download PNG
          </button>
          <button
            onClick={copyUrl}
            className="bg-transparent text-primary py-4 font-label-bold text-label-bold uppercase border-border-width border-primary hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span className="material-symbols-outlined">
              {copied ? "check" : "content_copy"}
            </span>
            {copied ? "COPIED" : "Copy URL"}
          </button>
        </div>
      </div>
    </div>
  );
}
