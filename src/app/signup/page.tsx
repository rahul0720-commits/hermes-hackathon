import AppShell from "@/components/AppShell";

export const metadata = {
  title: "ACCESS RESTRICTED // SlopScore",
};

const perks = [
  {
    icon: "terminal",
    title: "Unlimited History",
    body: "Access every roast and analysis string ever generated from your ID.",
  },
  {
    icon: "share",
    title: "Public Sharing",
    body: "Export your findings to the global slop-feed for others to see.",
  },
  {
    icon: "monitoring",
    title: "Advanced Metrics",
    body: "Deep-dive into entropy scores and linguistic hallucination patterns.",
  },
];

export default function SignupPage() {
  return (
    <AppShell active="analyze">
      <div className="min-h-full flex items-center justify-center p-gutter md:p-margin-desktop relative brutalist-grid">
        {/* Decorative rotated cards */}
        <div className="absolute top-20 right-10 hidden lg:block opacity-10 rotate-12 pointer-events-none">
          <div className="border-border-width-heavy border-error w-56 h-72 bg-background flex flex-col p-4">
            <div className="font-score-display text-score-display text-error">98%</div>
            <div className="font-label-bold text-label-bold text-error uppercase mt-auto">
              PURE_SLOP
            </div>
          </div>
        </div>
        <div className="absolute bottom-20 left-10 hidden lg:block opacity-10 -rotate-12 pointer-events-none">
          <div className="border-border-width-heavy border-primary-container w-56 h-72 bg-background flex flex-col p-4">
            <div className="font-score-display text-score-display text-primary-container">02%</div>
            <div className="font-label-bold text-label-bold text-primary-container uppercase mt-auto">
              ORIGINAL_DNA
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-4xl border-border-width-heavy border-primary bg-background p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left: pitch */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-secondary-container text-on-secondary-container px-2 py-1 font-code-sm text-code-sm uppercase font-bold">
                  SESSION_LIMIT_REACHED
                </span>
              </div>
              <h1 className="font-headline-lg text-[32px] md:text-headline-lg uppercase mb-4 tracking-tighter leading-none">
                3 SLOP PURGES COMPLETE
              </h1>
              <p className="font-body-md text-on-surface-variant mb-8 max-w-md">
                Your temporary guest terminal has reached its tactical limit. To continue the
                resistance against generative mediocrity, you must establish a permanent operator
                link.
              </p>
              <div className="space-y-4">
                {perks.map((p) => (
                  <div key={p.title} className="flex items-start gap-4">
                    <span
                      className="material-symbols-outlined text-primary-fixed text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {p.icon}
                    </span>
                    <div>
                      <h3 className="font-label-bold text-label-bold uppercase">{p.title}</h3>
                      <p className="font-code-sm text-code-sm text-on-surface-variant">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form (visual prototype — auth not wired) */}
            <div className="md:col-span-5 flex flex-col justify-center gap-4">
              <div className="border-border-width border-primary p-6 bg-surface">
                <h2 className="font-label-bold text-label-bold uppercase mb-6 text-center">
                  SIGN UP TO CONTINUE THE RESISTANCE
                </h2>
                <div className="space-y-3">
                  <button className="w-full border-border-width border-primary bg-primary text-background px-4 py-3 flex items-center justify-center gap-3 font-label-bold text-label-bold uppercase hover:bg-primary-container hover:border-primary-container transition-none active:translate-y-1">
                    <span className="material-symbols-outlined text-[18px]">account_circle</span>
                    CONTINUE WITH GOOGLE
                  </button>
                  <div className="flex items-center gap-4 my-4">
                    <div className="h-px flex-1 bg-outline-variant" />
                    <span className="font-code-sm text-code-sm text-on-surface-variant uppercase">
                      OR
                    </span>
                    <div className="h-px flex-1 bg-outline-variant" />
                  </div>
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="absolute -top-2 left-3 bg-surface px-1 font-code-sm text-[10px] text-primary uppercase z-10">
                        OPERATOR_EMAIL
                      </label>
                      <input
                        className="w-full bg-background border-border-width border-primary text-primary font-body-md focus:border-primary-fixed placeholder:text-surface-variant p-3 outline-none"
                        placeholder="USER@TERMINAL.NET"
                        type="email"
                      />
                    </div>
                    <div className="relative">
                      <label className="absolute -top-2 left-3 bg-surface px-1 font-code-sm text-[10px] text-primary uppercase z-10">
                        SECURE_CREDENTIAL
                      </label>
                      <input
                        className="w-full bg-background border-border-width border-primary text-primary font-body-md focus:border-primary-fixed placeholder:text-surface-variant p-3 outline-none"
                        placeholder="••••••••"
                        type="password"
                      />
                    </div>
                    <button className="w-full border-border-width border-primary py-3 font-label-bold text-label-bold uppercase hover:bg-primary hover:text-background transition-none active:bg-primary-fixed">
                      INITIALIZE ACCOUNT
                    </button>
                  </div>
                </div>
                <p className="font-code-sm text-[10px] text-on-surface-variant mt-6 text-center leading-tight">
                  BY INITIALIZING, YOU AGREE TO THE ANTI-SLOP MANIFESTO AND DATA TRANSMISSION
                  PROTOCOLS.
                </p>
              </div>
              <div className="border-border-width border-primary-fixed p-3 bg-surface-container-lowest">
                <div className="font-code-sm text-code-sm text-primary-fixed uppercase flex justify-between items-center">
                  <span>TERMINAL_STATUS</span>
                  <span className="animate-pulse">WAITING_FOR_AUTH</span>
                </div>
                <div className="mt-2 h-1 w-full bg-surface-variant">
                  <div className="h-full bg-primary-fixed w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
