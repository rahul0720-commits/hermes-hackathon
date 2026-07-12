import dynamic from "next/dynamic";

export const metadata = {
  title: "GLOBAL_SLOP_LEADERBOARD // SlopScore",
};

const LeaderboardContent = dynamic(() => import("@/components/LeaderboardContent"), {
  ssr: false,
  loading: () => (
    <div className="p-margin-mobile md:p-margin-desktop">
      <div className="mb-12 border-l-border-width-heavy border-primary pl-6">
        <h1 className="font-headline-lg text-[32px] md:text-headline-lg text-primary uppercase mb-2">
          GLOBAL_SLOP_LEADERBOARD
        </h1>
      </div>
      <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl bg-[#0a0a0c]">
        <p className="text-zinc-500 font-mono text-xs">LOADING...</p>
      </div>
    </div>
  ),
});

export default function LeaderboardPage() {
  return <LeaderboardContent />;
}
