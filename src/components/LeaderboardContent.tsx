"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const apiRef = api as any;
import AppShell from "@/components/AppShell";
import LeaderboardTable from "@/components/LeaderboardTable";
import LiveTerminalFeed from "@/components/LiveTerminalFeed";
import { useRouter } from "next/navigation";

export default function LeaderboardContent() {
  const router = useRouter();
  const roasts = useQuery(apiRef.roasts.list);
  const addBounty = useMutation(apiRef.roasts.addBounty);

  const handleSelectRoast = (id: string) => {
    router.push(`/roast/${id}`);
  };

  const handleAddBounty = async (id: string, amount: number) => {
    await addBounty({ id, amount });
  };

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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Main leaderboard table */}
          <div className="md:col-span-8">
            {roasts === undefined ? (
              <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl bg-[#0a0a0c]">
                <p className="text-zinc-500 font-mono text-xs">LOADING...</p>
              </div>
            ) : (
              <LeaderboardTable
                roasts={roasts}
                onSelectRoast={handleSelectRoast}
                onAddBounty={handleAddBounty}
              />
            )}
          </div>

          {/* Live status sidepiece */}
          <div className="md:col-span-4 border-border-width-heavy border-primary bg-primary p-6 flex flex-col justify-center text-background">
            <div className="font-code-sm text-code-sm uppercase mb-2">LIVE_STATUS</div>
            <div className="font-display-xl text-[40px] leading-tight tracking-tighter mb-4">
              TOTAL ROASTS: {roasts?.length ?? 0}
            </div>
            <div className="h-2 w-full bg-background mb-6 relative">
              <div
                className="absolute left-0 top-0 h-full bg-secondary-container"
                style={{ width: `${Math.min(100, (roasts?.length ?? 0) * 10)}%` }}
              />
            </div>
            <p className="font-label-bold text-label-bold uppercase">GLOBAL_CLEANSE_INDEX: 22%</p>

            {/* Live analysis stream */}
            <div className="mt-8 border border-background/20 p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-background rounded-full animate-pulse" />
                <span className="font-code-sm text-code-sm uppercase">
                  LIVE_ANALYSIS_STREAM
                </span>
              </div>
              <div className="font-code-sm text-code-sm text-background/70 space-y-1 h-32 overflow-hidden">
                <LiveTerminalFeed
                  seed={[
                    "> ANALYZING ENTRY... PATTERN MATCHED: GPT-4O_DEFAULT_ADJECTIVE_OVERUSE",
                    "> SCORING @LLM_WHISPERER... SLOP PROBABILITY: 99.4%",
                    "> ALERT: ZERO CREATIVE SOUL DETECTED",
                    "> CALCULATING FU_SCORE... FINALIZING RESULT...",
                    "> [SYSTEM] ROAST ENGINE ENGAGED. PREPARING INSULTS.",
                  ]}
                  pool={[
                    "> ANALYZING SYNTAX... PATTERN MATCHED: GPT-4",
                    "> DETECTED REPETITIVE STRUCTURE",
                    "> FLAGGED FOR EXCESSIVE ADJECTIVES",
                    "> PURGING LOW-VALUE DATA FROM BUFFER...",
                    "> SYSTEM_ALERT: SLOP THRESHOLD EXCEEDED",
                    "> INITIATING BRUTAL ROAST PROTOCOL...",
                  ]}
                  max={5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
