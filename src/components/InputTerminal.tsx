"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingOverlay from "./LoadingOverlay";
import { saveRoast, newRoastId } from "@/lib/roastStore";
import { DEFAULT_ROAST } from "@/lib/mock";
import type { AnalyzeResponse, Roast } from "@/lib/types";

type Mode = "URL" | "RAW";

const STARTER_LOGS = [
  "SYSTEM_READY",
  "WAITING_FOR_INPUT...",
  "LINKUP_SEARCH_READY",
  "HERMES_MODEL_ONLINE",
  "CAUTION: SLOP_LEVELS_HIGH",
];

const FEED_LOGS = [
  "SCANNING_PACKETS...",
  "REJECTING_GENERIC_ADJECTIVES",
  "PATTERN_FOUND: 'THRILLED_TO_ANNOUNCE'",
  "AI_PROBABILITY: 98.4%",
  "INITIATING_DECONSTRUCTION",
  "WARNING: UNBEARABLE_OPTIMISM_DETECTED",
  "PURGING_SYNTHETIC_DATA",
];

function deriveHandle(url: string) {
  const m = url.match(/(youtu\.be\/|v=)([\w-]{6,})/);
  return m ? `@yt_${m[2].slice(0, 6)}` : undefined;
}

function nowStr() {
  return new Date().toLocaleTimeString("en-GB", { hour12: false });
}

export default function InputTerminal() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("URL");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<{ time: string; text: string }[]>([]);
  const logsRef = useRef<HTMLDivElement>(null);

  // Seed the status monitor on mount (client-only — avoids SSR timestamp mismatch)
  useEffect(() => {
    setLogs(STARTER_LOGS.map((text) => ({ time: nowStr(), text })));
  }, []);

  // Idle status-monitor stream
  useEffect(() => {
    if (loading) return;
    const id = setInterval(() => {
      const text = FEED_LOGS[Math.floor(Math.random() * FEED_LOGS.length)];
      setLogs((l) => [...l.slice(-14), { time: nowStr(), text }]);
    }, 2600);
    return () => clearInterval(id);
  }, [loading]);

  useEffect(() => {
    if (logsRef.current) logsRef.current.scrollTop = logsRef.current.scrollHeight;
  }, [logs]);

  const runAnalysis = async () => {
    setError(null);
    const contentText = mode === "RAW" ? text.trim() : "";
    const sourceUrl = mode === "URL" ? url.trim() : "";

    if (mode === "RAW" && !contentText) {
      setError("BUFFER_EMPTY — PASTE CONTENT TO ANALYZE");
      return;
    }
    if (mode === "URL" && !sourceUrl) {
      setError("NO_PAYLOAD — ENTER A YOUTUBE URL");
      return;
    }

    setLoading(true);
    setDone(false);

    const started = Date.now();
    const id = newRoastId();

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "URL"
            ? { sourceType: "youtube", sourceUrl }
            : { sourceType: "text", contentText }
        ),
      });

      let roast: Roast;
      if (res.ok) {
        const data = (await res.json()) as AnalyzeResponse;
        roast = {
          id,
          contentText:
            mode === "RAW" ? contentText : `YouTube transcript · ${sourceUrl}`,
          sourceType: mode === "URL" ? "youtube" : "text",
          sourceUrl: mode === "URL" ? sourceUrl : undefined,
          creatorHandle: mode === "URL" ? deriveHandle(sourceUrl) : undefined,
          score: data.score,
          searchResults: data.searchResults,
        };
      } else {
        // Graceful prototype fallback — still show a card
        roast = { ...DEFAULT_ROAST, id };
      }

      saveRoast(roast);

      // Let the loading theatre play for at least ~2.6s
      const elapsed = Date.now() - started;
      const wait = Math.max(0, 2600 - elapsed);
      setTimeout(() => {
        setDone(true);
        setTimeout(() => router.push(`/roast/${id}`), 650);
      }, wait);
    } catch {
      const roast = { ...DEFAULT_ROAST, id };
      saveRoast(roast);
      setTimeout(() => {
        setDone(true);
        setTimeout(() => router.push(`/roast/${id}`), 650);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row overflow-hidden relative min-h-full">
      {loading && <LoadingOverlay done={done} />}

      {/* Central workspace */}
      <section className="flex-grow flex flex-col p-4 md:p-8 min-w-0">
        <div className="mb-8">
          <h1 className="font-display-xl text-[48px] md:text-display-xl uppercase leading-none mb-2">
            System_Input
          </h1>
          <p className="font-code-sm text-primary-fixed-dim uppercase tracking-widest">
            FEED THE MACHINE. EXPOSE THE MEDIOCRITY.
          </p>
        </div>

        <div className="flex-grow flex flex-col border-border-width-heavy border-primary bg-surface-container-lowest relative">
          <div className="scan-line" />
          {/* Mode toggles */}
          <div className="flex border-b-border-width border-primary">
            <button
              onClick={() => setMode("URL")}
              className={`flex-1 py-3 font-label-bold text-label-bold uppercase border-r-border-width border-primary transition-colors ${
                mode === "URL"
                  ? "bg-primary-fixed-dim text-on-primary-fixed"
                  : "text-primary hover:bg-surface-container-highest"
              }`}
            >
              URL_MODE (YOUTUBE)
            </button>
            <button
              onClick={() => setMode("RAW")}
              className={`flex-1 py-3 font-label-bold text-label-bold uppercase transition-colors ${
                mode === "RAW"
                  ? "bg-primary-fixed-dim text-on-primary-fixed"
                  : "text-primary hover:bg-surface-container-highest"
              }`}
            >
              RAW_TEXT_MODE (SOCIAL)
            </button>
          </div>

          <div className="p-6 flex-grow flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="font-code-sm text-on-surface-variant">BUFFER_ID: SC-8829-X</span>
              <span className="font-code-sm text-primary-fixed-dim blink">
                {error ? "" : "AWAITING_PAYLOAD..."}
              </span>
            </div>

            {mode === "URL" ? (
              <div className="flex-grow flex flex-col justify-center">
                <label className="font-label-bold text-[12px] uppercase mb-2 opacity-50">
                  INPUT YOUTUBE URL FOR TRANSCRIPT SCRAPING
                </label>
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && runAnalysis()}
                  className="w-full bg-transparent border-border-width border-primary p-4 font-score-display text-[24px] text-primary-fixed-dim placeholder:text-surface-container-highest focus:border-primary-fixed-dim outline-none"
                  placeholder="https://youtube.com/watch?v=..."
                  type="text"
                />
              </div>
            ) : (
              <div className="flex-grow flex flex-col">
                <label className="font-label-bold text-[12px] uppercase mb-2 opacity-50">
                  PASTE LINKEDIN/X CONTENT FOR LINGUISTIC DECAY ANALYSIS
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full flex-grow min-h-[220px] bg-transparent border-border-width border-primary p-4 font-body-md text-primary placeholder:text-surface-container-highest focus:border-primary-fixed-dim outline-none resize-none"
                  placeholder="I am thrilled to announce that I have reached a milestone in my journey..."
                />
              </div>
            )}

            {error && (
              <div className="mt-4 border-border-width border-secondary-container bg-secondary-container/10 text-secondary px-4 py-2 font-code-sm uppercase">
                &gt; {error}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="p-6 pt-0">
            <button
              onClick={runAnalysis}
              disabled={loading}
              className="w-full py-6 md:py-8 bg-primary-fixed-dim text-on-primary-fixed border-border-width-heavy border-primary flex items-center justify-between px-6 md:px-8 hover:bg-primary transition-all active:translate-y-1 group disabled:opacity-60"
            >
              <span className="font-display-xl text-[28px] md:text-[40px] font-black uppercase tracking-tighter">
                Run_Analysis
              </span>
              <span className="material-symbols-outlined text-[48px] md:text-[64px] group-hover:translate-x-4 transition-transform">
                arrow_right_alt
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Status monitor */}
      <aside className="w-full lg:w-80 bg-surface border-t-border-width-heavy lg:border-t-0 lg:border-l-border-width-heavy border-primary p-6 flex flex-col gap-6 flex-shrink-0">
        <div className="border-border-width border-primary p-4">
          <h3 className="font-label-bold text-label-bold uppercase mb-4 text-primary-fixed-dim flex items-center gap-2">
            <span className="w-2 h-2 bg-primary-fixed-dim rounded-full animate-pulse" />
            Status_Monitor
          </h3>
          <div
            ref={logsRef}
            className="font-code-sm space-y-2 h-64 lg:h-[360px] overflow-y-auto pr-2 terminal-scroll"
          >
            {logs.map((line, i) => (
              <div key={i} className="text-on-surface-variant">
                [{line.time}]{" "}
                <span
                  className={
                    line.text.startsWith("CAUTION") || line.text.startsWith("WARNING")
                      ? "text-secondary-container"
                      : "text-primary-fixed-dim"
                  }
                >
                  {line.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border-width border-primary p-4 bg-surface-container-high">
          <h4 className="font-label-bold text-[12px] uppercase mb-2">Neural_Engine</h4>
          <div className="flex items-end gap-1 h-12">
            <div className="w-3 bg-primary-fixed-dim h-full animate-[bounce_1s_infinite_100ms]" />
            <div className="w-3 bg-primary-fixed-dim h-1/2 animate-[bounce_1.5s_infinite_200ms]" />
            <div className="w-3 bg-primary-fixed-dim h-3/4 animate-[bounce_0.8s_infinite_300ms]" />
            <div className="w-3 bg-primary-fixed-dim h-2/3 animate-[bounce_2s_infinite_400ms]" />
            <div className="w-3 bg-primary-fixed-dim h-full animate-[bounce_1.2s_infinite_500ms]" />
          </div>
          <p className="font-code-sm mt-3 uppercase text-[10px]">
            Processing power optimized for semantic brutality. Calculating Overall FU Score...
          </p>
        </div>

        <div className="mt-auto">
          <div className="w-full aspect-square border-border-width border-primary relative overflow-hidden bg-surface-container-lowest flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-fixed-dim text-[120px] opacity-80">
              visibility
            </span>
            <div className="absolute bottom-0 left-0 right-0 bg-primary p-2 text-on-primary font-label-bold text-[10px] uppercase">
              EYE_OF_THE_BEHOLDER_V4
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
