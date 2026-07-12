import Link from "next/link";
import AppShell from "@/components/AppShell";
import LiveTerminalFeed from "@/components/LiveTerminalFeed";
import { LEADERBOARD, LEADERBOARD_COMPACT } from "@/lib/mock";

export const metadata = {
  title: "GLOBAL_SLOP_LEADERBOARD // SlopScore",
};

export default function LeaderboardPage() {
  const [top, ...rest] = LEADERBOARD;

  return (
    <AppShell active="leaderboard">
      <div className="p-margin-mobile md:p-margin-desktop">
        {/* Header */}
        <div className="mb-12 border-l-border-width-heavy border-primary pl-6">
          <h1 className="font-headline-lg text-[32px] md:text-headline-lg text-primary uppercase mb-2">
            GLOBAL_SLOP_LEADERBOARD
          </h1>
          <p className="font-code-sm text-code-sm text-on-surface-variant max-w-2xl">
            [SYSTEM_LOG] DETECTING HIGH CONCENTRATIONS OF DERIVATIVE CONTENT. THE FOLLOWING ENTRIES
            HAVE EXCEEDED ADMISSIBLE LEVELS OF GENERATIVE MEDIOCRITY. ROAST AT WILL.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Rank 01 large card */}
          <div className="md:col-span-8 border-border-width-heavy border-secondary-container bg-surface p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-secondary-container text-on-secondary-container px-4 py-1 font-label-bold text-label-bold uppercase">
              RANK_0{top.rank}
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-48 h-48 border-2 border-secondary-container bg-surface-container-highest flex-shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-[80px] opacity-70">
                  smart_toy
                </span>
              </div>
              <div className="flex-1">
                <h2 className="font-headline-lg text-headline-lg-mobile text-primary uppercase mb-1 glitch-hover cursor-default">
                  {top.title}
                </h2>
                <p className="font-code-sm text-code-sm text-secondary mb-4 uppercase">
                  {top.handle}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="border-l-2 border-secondary-container pl-3">
                    <div className="font-code-sm text-[10px] text-on-surface-variant">SLOP_RATE</div>
                    <div className="font-score-display text-[32px] text-secondary">{top.slop}%</div>
                  </div>
                  <div className="border-l-2 border-outline pl-3">
                    <div className="font-code-sm text-[10px] text-on-surface-variant">ORIGINALITY</div>
                    <div className="font-score-display text-[32px] text-on-surface-variant">
                      {top.originality}%
                    </div>
                  </div>
                  <div className="border-l-2 border-secondary-container pl-3 col-span-2 md:col-span-1">
                    <div className="font-code-sm text-[10px] text-on-surface-variant">FU_SCORE</div>
                    <div className="font-score-display text-[32px] text-error font-extrabold">
                      {top.fuScore}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link
              href="/roast/demo"
              className="w-full mt-4 border-2 border-secondary-container text-secondary py-3 font-label-bold text-label-bold uppercase hover:bg-secondary-container hover:text-on-secondary-container transition-none text-center"
            >
              ROAST THIS PATHETIC ATTEMPT
            </Link>
          </div>

          {/* Live status sidepiece */}
          <div className="md:col-span-4 border-border-width-heavy border-primary bg-primary p-6 flex flex-col justify-center text-background">
            <div className="font-code-sm text-code-sm uppercase mb-2">LIVE_STATUS</div>
            <div className="font-display-xl text-[40px] leading-tight tracking-tighter mb-4">
              TOTAL SLOP PURGED: 1.4M
            </div>
            <div className="h-2 w-full bg-background mb-6 relative">
              <div
                className="absolute left-0 top-0 h-full bg-secondary-container"
                style={{ width: "78%" }}
              />
            </div>
            <p className="font-label-bold text-label-bold uppercase">GLOBAL_CLEANSE_INDEX: 22%</p>
          </div>

          {/* Ranks 2-4 */}
          <div className="md:col-span-12 space-y-gutter mt-8">
            {rest.map((e) => (
              <div
                key={e.rank}
                className="border-2 border-primary bg-surface-container flex flex-col md:flex-row items-center p-4 gap-6 hover:bg-surface-container-high transition-none"
              >
                <div className="font-score-display text-[24px] text-primary w-12 text-center">
                  0{e.rank}
                </div>
                <div className="flex-1 w-full">
                  <h3 className="font-label-bold text-[18px] text-primary uppercase">{e.title}</h3>
                  <p className="font-code-sm text-code-sm text-on-surface-variant uppercase">
                    {e.handle}
                  </p>
                </div>
                <div className="flex gap-8 md:gap-12 w-full md:w-auto items-center justify-between md:justify-end">
                  <div className="text-right">
                    <div className="font-code-sm text-[10px] text-on-surface-variant">SLOP</div>
                    <div className="font-label-bold text-secondary">{e.slop}%</div>
                  </div>
                  <div className="text-right">
                    <div className="font-code-sm text-[10px] text-on-surface-variant">ORIGINALITY</div>
                    <div className="font-label-bold text-primary">{e.originality}%</div>
                  </div>
                  <div className="text-right">
                    <div className="font-code-sm text-[10px] text-on-surface-variant">FU_SCORE</div>
                    <div className="font-label-bold text-error">{e.fuScore}</div>
                  </div>
                  <Link
                    href="/roast/demo"
                    className="border-2 border-primary px-4 py-2 font-label-bold text-[12px] uppercase hover:bg-primary hover:text-background transition-none"
                  >
                    ROAST
                  </Link>
                </div>
              </div>
            ))}

            {/* Live analysis stream */}
            <div className="border-2 border-secondary bg-surface p-6 mt-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-error rounded-full animate-pulse" />
                <span className="font-code-sm text-code-sm text-error uppercase">
                  LIVE_ANALYSIS_STREAM
                </span>
              </div>
              <div className="font-code-sm text-code-sm text-on-surface-variant space-y-1 h-32 overflow-hidden">
                <LiveTerminalFeed
                  seed={[
                    "> ANALYZING ENTRY #0533... PATTERN MATCHED: GPT-4O_DEFAULT_ADJECTIVE_OVERUSE",
                    "> SCORING @LLM_WHISPERER... SLOP PROBABILITY: 99.4%",
                    "> ALERT: ZERO CREATIVE SOUL DETECTED IN 'TOP 10 AI TOOLS' THREAD",
                    "> CALCULATING FU_SCORE... FINALIZING RESULT...",
                    "> [SYSTEM] ROAST ENGINE ENGAGED. PREPARING INSULTS.",
                  ]}
                  pool={[
                    "> ANALYZING SYNTAX... PATTERN MATCHED: GPT-4",
                    "> DETECTED REPETITIVE STRUCTURE IN ENTRY #09",
                    "> @USER_X FLAGGED FOR EXCESSIVE ADJECTIVES",
                    "> PURGING LOW-VALUE DATA FROM BUFFER...",
                    "> SYSTEM_ALERT: SLOP THRESHOLD EXCEEDED",
                    "> INITIATING BRUTAL ROAST PROTOCOL...",
                    "> DATA_SCRAPE: SEARCHING FOR ORIGINALITY... [NONE FOUND]",
                  ]}
                  max={7}
                />
              </div>
            </div>

            {/* Compact 5-8 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {LEADERBOARD_COMPACT.map((e) => (
                <div
                  key={e.rank}
                  className="border-2 border-primary bg-surface p-4 flex justify-between items-center"
                >
                  <div>
                    <span className="font-code-sm text-primary">0{e.rank}.</span>
                    <span className="font-label-bold uppercase ml-2">{e.title}</span>
                  </div>
                  <div className="font-label-bold text-error">FU: {e.fuScore}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
