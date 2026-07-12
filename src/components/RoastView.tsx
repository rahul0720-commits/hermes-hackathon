"use client";

import { useEffect, useState } from "react";
import ScoreCard from "./ScoreCard";
import { loadRoast } from "@/lib/roastStore";
import { DEFAULT_ROAST } from "@/lib/mock";
import type { Roast } from "@/lib/types";

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function RoastView({ id }: { id: string }) {
  const [roast, setRoast] = useState<Roast | null>(null);

  useEffect(() => {
    const found = loadRoast(id);
    setRoast(found ?? { ...DEFAULT_ROAST, id });
  }, [id]);

  const confirmedSlop = (roast?.score.fuScore ?? 0) >= 60;

  return (
    <div className="p-margin-mobile md:p-margin-desktop bg-black min-h-full relative">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Verdict header */}
        <div className="mb-gutter border-l-border-width-heavy border-primary-fixed-dim pl-4 mb-8">
          <h1 className="font-display-xl text-[48px] md:text-display-xl uppercase tracking-tighter leading-none mb-2">
            VERDICT:
            <br />
            <span className={confirmedSlop ? "text-primary-fixed-dim" : "text-primary"}>
              {confirmedSlop ? "CONFIRMED SLOP" : "MOSTLY HUMAN"}
            </span>
          </h1>
          <p className="font-code-sm text-code-sm text-primary-fixed-dim opacity-70">
            HASH: 0x{id.toUpperCase()}_VERDICT_FINAL // ACCURACY: 99.8%
          </p>
        </div>

        {roast && <ScoreCard roast={roast} />}

        {/* Raw analysis feed */}
        <div className="bg-surface-container-low border-border-width border-primary p-gutter mt-12">
          <div className="flex items-center gap-2 mb-4 border-b border-surface-variant pb-2">
            <span className="material-symbols-outlined text-primary-fixed-dim">terminal</span>
            <span className="font-code-sm text-code-sm uppercase">Raw Analysis Feed</span>
          </div>
          <div className="font-code-sm text-code-sm space-y-1 text-on-surface-variant">
            <p>&gt; [0.00s] INITIALIZING NEURAL SCAN...</p>
            <p>&gt; [0.12s] PATTERN MATCHED: &quot;IMPERATIVE TO LEVERAGE&quot; (COEFFICIENT: 0.94)</p>
            <p>&gt; [0.45s] SYNTAX ANOMALY DETECTED: EXCESSIVE ADVERB DENSITY</p>
            <p>&gt; [0.89s] CROSS-REFERENCING LLM TRAINING BIAS... MATCH FOUND: GPT-4-TURBO</p>
            {roast?.searchResults?.map((r, i) => (
              <p key={i}>
                &gt; [1.{10 + i}s] ORIGINALITY HIT: &quot;{r.phrase.slice(0, 46)}&quot; @{" "}
                {hostnameOf(r.foundAtUrl)} ({Math.round(r.similarity * 100)}% MATCH)
              </p>
            ))}
            <p className="text-primary-fixed-dim font-bold">
              &gt; [1.22s] VERDICT: {confirmedSlop ? "HIGH SLOP PROBABILITY CONFIRMED." : "HUMAN SIGNAL DOMINANT."}
            </p>
            <p className="animate-pulse">&gt; _</p>
          </div>
        </div>
      </div>
    </div>
  );
}
