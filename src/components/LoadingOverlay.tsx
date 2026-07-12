"use client";

import { useEffect, useRef, useState } from "react";

const LOGS = [
  "INITIALIZING_LINKUP_SCAN...",
  "EXTRACTING_KEY_CLAIMS...",
  "CROSS_REFERENCING_LLM_PATTERNS...",
  "DETOXIFYING_ADJECTIVES...",
  "SENSING_GPT_STANK...",
  "PURGING_REDUNDANT_ADVERBS...",
  "MAPPING_SEMANTIC_VOID...",
  "DETECTING_OVERUSED_METAPHORS...",
  "CALIBRATING_TRUTH_INDEX...",
  "ISOLATING_CORPORATE_SOPHISTRY...",
  "FLUSHING_SYNTHETIC_EUPHEMISMS...",
  "DECRYPTING_HALLUCINATION_NOISE...",
  "FINALIZING_VERDICT...",
];

const STATUSES = [
  "SYNTAX_PURGE_IN_PROGRESS",
  "SCRAPING_DOM...",
  "FRACTAL_ANALYSIS_ACTIVE",
  "SMELL_TEST_ENGAGED",
  "ALMOST_THERE_HUMAN",
];

const TOTAL_BLOCKS = 24;

export default function LoadingOverlay({ done }: { done: boolean }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(STATUSES[0]);
  const [log, setLog] = useState<{ time: string; text: string }[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const logIndex = useRef(0);

  // Progress: creep to 90%, then snap to 100% when done
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (done) return Math.min(100, p + 6);
        if (p >= 90) return 90;
        return p + Math.random() * 3;
      });
    }, 120);
    return () => clearInterval(id);
  }, [done]);

  // Terminal log stream
  useEffect(() => {
    const id = setInterval(() => {
      const text = LOGS[logIndex.current % LOGS.length];
      logIndex.current += 1;
      const time = new Date().toLocaleTimeString("en-GB", { hour12: false });
      setLog((l) => [...l.slice(-8), { time, text }]);
      if (Math.random() > 0.7) {
        setStatus(STATUSES[Math.floor(Math.random() * STATUSES.length)]);
      }
    }, 550);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const filled = Math.floor((progress / 100) * TOTAL_BLOCKS);

  return (
    <div className="fixed inset-0 z-[100] bg-background overflow-y-auto flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop">
      {/* dotted grid + scanline atmosphere */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none brutalist-grid" />
      <div className="scan-line" />

      <div className="z-10 w-full max-w-4xl flex flex-col items-center space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1 bg-secondary-container text-primary font-code-sm text-code-sm border-border-width border-primary uppercase">
            Priority Scan: High Threat Detected
          </div>
          <h1 className="font-display-xl text-[48px] md:text-display-xl text-primary font-black uppercase leading-none tracking-tighter">
            DECONSTRUCTING_SLOP
          </h1>
        </div>

        {/* Progress */}
        <div className="w-full space-y-4">
          <div className="flex justify-between font-code-sm text-code-sm text-primary uppercase mb-2">
            <div>{done && progress >= 100 ? "VERDICT_READY" : status}</div>
            <div>{Math.floor(progress)}%</div>
          </div>
          <div className="h-16 w-full border-border-width-heavy border-primary bg-surface p-1 flex gap-1 overflow-hidden">
            {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
              <div
                key={i}
                className={`flex-grow h-full transition-colors duration-200 ${
                  i < filled
                    ? i % 9 === 8
                      ? "bg-secondary-container"
                      : "bg-primary-fixed-dim"
                    : "bg-surface-container-highest"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between font-code-sm text-code-sm text-primary/40 uppercase">
            <div>MEM_ADDR: 0x00FF42A</div>
            <div>THREAT_LVL: SEVERE</div>
          </div>
        </div>

        {/* Terminal log */}
        <div className="w-full border-border-width border-primary bg-surface-container-lowest p-6 h-56 relative terminal-scroll overflow-hidden">
          <div ref={logRef} className="font-code-sm text-code-sm text-primary-fixed-dim flex flex-col gap-1 h-full overflow-hidden">
            {log.map((line, i) => (
              <div key={i} className="flex gap-4 border-l-2 border-primary-fixed-dim pl-2">
                <span className="text-primary/40">[{line.time}]</span>
                <span>{line.text}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-2 right-4 text-primary font-code-sm opacity-50 flex items-center">
            ANALYZING... <span className="ml-2 h-4 w-2 bg-primary cursor-blink" />
          </div>
        </div>

        {/* Data grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {[
            { l: "Packet_Loss", v: "0.000%", c: "text-primary" },
            { l: "Stank_Density", v: "CRITICAL", c: "text-error" },
            { l: "Human_Trace", v: "NEG_ERR", c: "text-primary" },
            { l: "LLM_Signature", v: "98.4%", c: "text-primary-fixed-dim" },
          ].map((cell) => (
            <div key={cell.l} className="border-border-width border-primary p-4 bg-surface-container-high">
              <div className="text-[10px] text-primary/60 font-bold uppercase mb-1">{cell.l}</div>
              <div className={`font-score-display text-label-bold ${cell.c}`}>{cell.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
