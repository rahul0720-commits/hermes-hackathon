import AppShell from "@/components/AppShell";
import LiveTerminalFeed from "@/components/LiveTerminalFeed";

export const metadata = {
  title: "UPGRADE // SlopScore Pro",
};

const features = [
  {
    icon: "search_insights",
    title: "Priority LinkUp",
    body: "Bypass the queue. Your slop analysis requests are moved to the top of our high-performance cluster.",
  },
  {
    icon: "reorder",
    title: "Batch Processing",
    body: "Upload entire manifestos. Analyze multiple URLs or documents simultaneously for efficient slop detection.",
  },
  {
    icon: "share",
    title: "Global Broadcast",
    body: "Export reports in raw terminal formats or clean PDFs with no watermarks. Your truth, unrestricted.",
  },
];

export default function ProPage() {
  return (
    <AppShell active="pro" scanline>
      <div className="p-margin-mobile md:p-margin-desktop">
        <div className="max-w-6xl mx-auto">
          {/* Military header */}
          <div className="border-border-width-heavy border-primary p-6 mb-8 bg-surface-container-low flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-acid-green animate-pulse" />
                <span className="font-code-sm text-code-sm text-acid-green tracking-widest uppercase">
                  Encryption Status: ACTIVE
                </span>
              </div>
              <h1 className="font-headline-lg text-[32px] md:text-headline-lg uppercase tracking-tighter terminal-glow">
                UPGRADE TO FULL OPERATOR STATUS
              </h1>
              <p className="font-body-md text-on-surface-variant max-w-xl mt-4 border-l-border-width border-primary pl-4 uppercase">
                Unlock unrestricted surveillance and roasting capabilities. Strip the AI-generated
                veneer from reality with heavy-duty tools.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <span className="font-code-sm text-code-sm uppercase opacity-50 mb-1">
                Operation Cost
              </span>
              <div className="font-score-display text-score-display text-acid-green">
                $5<span className="text-2xl font-code-sm">/MO</span>
              </div>
            </div>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-8 border-border-width border-primary p-8 bg-surface relative overflow-hidden group hover:border-acid-green transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <span
                  className="material-symbols-outlined text-8xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
              </div>
              <h3 className="font-headline-lg text-headline-lg-mobile text-acid-green uppercase mb-4">
                Unlimited Roasts
              </h3>
              <p className="font-body-md text-on-surface mb-8 max-w-md">
                No daily limits. Destroy low-effort content until the servers smoke. Full access to
                the brutalist roast engine with enhanced sarcasm modules.
              </p>
              <div className="flex gap-2">
                <div className="h-1 flex-grow bg-acid-green" />
                <div className="h-1 flex-grow bg-acid-green opacity-50" />
                <div className="h-1 flex-grow bg-acid-green opacity-20" />
              </div>
            </div>

            {/* CTA */}
            <div className="md:col-span-4 border-border-width border-acid-green p-8 bg-surface flex flex-col justify-between">
              <div>
                <div className="font-code-sm text-code-sm text-acid-green mb-2 uppercase">
                  Protocol Authorization
                </div>
                <h2 className="font-label-bold text-4xl uppercase mb-6 leading-none">
                  Activate Unlimited
                </h2>
                <ul className="space-y-4 mb-8">
                  {[
                    "Priority LinkUp Search",
                    "Batch URL Input (x50)",
                    "No limits on sharing",
                    "Pro Operator Badge",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span
                        className="material-symbols-outlined text-acid-green"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span className="font-code-sm text-code-sm uppercase">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full bg-acid-green text-background font-display-xl text-3xl py-6 uppercase font-black hover:invert transition-all border-border-width-heavy border-acid-green active:scale-95">
                ACTIVATE
              </button>
            </div>

            {/* Feature cards */}
            {features.map((f) => (
              <div
                key={f.title}
                className="md:col-span-4 border-border-width border-primary p-6 bg-surface-container-low hover:bg-surface-variant transition-colors"
              >
                <span className="material-symbols-outlined text-primary mb-4">{f.icon}</span>
                <h4 className="font-label-bold text-label-bold uppercase mb-2">{f.title}</h4>
                <p className="font-code-sm text-code-sm text-on-surface-variant">{f.body}</p>
              </div>
            ))}
          </div>

          {/* Terminal feed */}
          <div className="mt-8 border-border-width border-primary bg-black p-4 font-code-sm text-acid-green h-32 overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black to-transparent z-10" />
            <div className="space-y-1">
              <LiveTerminalFeed
                seed={[
                  "> INITIALIZING UPGRADE SEQUENCE...",
                  "> LOADING PAYMENT_GATEWAY_V4.0...",
                  "> BYPASSING GENERATIVE_LATENCY...",
                  "> ESTABLISHING SECURE OPERATOR LINK...",
                  "> STATUS: WAITING FOR AUTHORIZATION",
                  "> $5.00/MONTH DETECTED...",
                ]}
                pool={[
                  "> ANALYZING TRANSACTION PROTOCOL...",
                  "> ENCRYPTING PAYMENT CHANNEL...",
                  "> UPDATING OPERATOR PERMISSIONS...",
                  "> DISABLING SLOP_QUOTA...",
                  "> OVERRIDING LIMITS...",
                  "> STATUS: OPERATIONAL",
                  "> WAITING FOR INPUT...",
                ]}
                intervalMs={1500}
                max={9}
              />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
