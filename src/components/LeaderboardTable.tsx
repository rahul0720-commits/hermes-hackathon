"use client";

import React from "react";

interface LeaderboardRoast {
  _id: string;
  contentText: string;
  sourceType: string;
  sourceUrl?: string;
  fuMeter?: number;
  fuScore?: number;
  bountyPoolAmount?: number;
  verdict?: string;
}

interface LeaderboardTableProps {
  roasts: LeaderboardRoast[];
  onSelectRoast: (id: string) => void;
  onAddBounty: (id: string, amount: number) => void;
}

export default function LeaderboardTable({ roasts, onSelectRoast, onAddBounty }: LeaderboardTableProps) {
  if (!roasts || roasts.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl bg-[#0a0a0c]">
        <p className="text-zinc-500 font-mono text-xs">NO ONE ROASTED YET... GO NOMINATE SOME SLOP!</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#070709] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-950/40 to-transparent border-b border-zinc-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🔥</span>
          <h3 className="font-black text-red-500 tracking-tight text-sm uppercase">THE DAILY SLOP BOARD</h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase">ranked by pooled outrage</span>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-zinc-900 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-950/50 border-b border-zinc-900 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              <th className="py-3 px-4 w-12 text-center">RANK</th>
              <th className="py-3 px-4">CONTENT PREVIEW</th>
              <th className="py-3 px-4 w-24 text-center">SLOP %</th>
              <th className="py-3 px-4 w-32 text-right">BOUNTY</th>
              <th className="py-3 px-4 w-24 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/60 font-mono">
            {roasts.map((roast, index) => {
              const rank = index + 1;
              const rankColor = rank === 1 ? "text-amber-500" : rank === 2 ? "text-zinc-300" : rank === 3 ? "text-amber-700" : "text-zinc-500";
              const rankEmoji = rank === 1 ? "👑 " : rank === 2 ? "🥈 " : rank === 3 ? "🥉 " : "";

              return (
                <tr 
                  key={roast._id} 
                  className="hover:bg-red-500/[0.015] transition-colors group cursor-pointer"
                  onClick={() => onSelectRoast(roast._id)}
                >
                  {/* Rank */}
                  <td className="py-4 px-4 text-center">
                    <span className={`font-black text-sm ${rankColor}`}>
                      {rankEmoji}{rank}
                    </span>
                  </td>

                  {/* Content Preview & Verdict */}
                  <td className="py-4 px-4 max-w-xs md:max-w-md">
                    <div className="flex flex-col space-y-1">
                      <span className="text-zinc-300 text-xs font-bold line-clamp-1 group-hover:text-zinc-100 transition-colors">
                        &ldquo;{roast.contentText}&rdquo;
                      </span>
                      <span className="text-[10px] text-zinc-500 line-clamp-1 italic">
                        Verdict: {roast.verdict}
                      </span>
                    </div>
                  </td>

                  {/* FU Meter Score */}
                  <td className="py-4 px-4 text-center">
                    <span className={`text-xs font-black px-2 py-0.5 rounded border ${
                      (roast.fuMeter || 0) > 80 
                        ? "bg-red-500/10 border-red-500/30 text-red-400" 
                        : (roast.fuMeter || 0) > 50 
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-400" 
                          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    }`}>
                      {roast.fuMeter || 0}%
                    </span>
                  </td>

                  {/* Bounty Pool Amount */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <span className="text-xs text-red-400 font-bold tracking-tight">
                        ${roast.bountyPoolAmount || 0}
                      </span>
                      <span className="text-xs">🔥</span>
                    </div>
                  </td>

                  {/* Select Roast Action */}
                  <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => onAddBounty(roast._id, 10)}
                        className="bg-red-950/40 hover:bg-red-900/50 border border-red-800/40 text-red-400 px-2 py-1 rounded text-[10px] font-black transition-colors"
                        title="Add +$10 Outrage Bounty"
                      >
                        + $10
                      </button>
                      <button
                        onClick={() => onSelectRoast(roast._id)}
                        className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded text-[10px] font-bold transition-colors"
                      >
                        VIEW
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
