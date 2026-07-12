import Link from "next/link";
import AppShell from "@/components/AppShell";

export const metadata = {
  title: "THE MANIFESTO // SlopScore",
};

export default function ManifestoPage() {
  return (
    <AppShell active="manifesto">
      <div className="relative">
        {/* Hero */}
        <section className="min-h-[80vh] flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-16 border-b-border-width-heavy border-primary">
          <div className="max-w-6xl">
            <h1 className="font-display-xl text-[56px] md:text-[120px] leading-[0.9] uppercase mb-8 glitch-hover">
              THE INTERNET IS <span className="text-secondary-container">DYING</span>
            </h1>
            <p className="font-headline-lg text-[24px] md:text-headline-lg max-w-4xl uppercase mb-12">
              WE ARE SUFFOCATING UNDER A TIDAL WAVE OF GENERATIVE MEDIOCRITY.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="border-border-width-heavy border-primary p-6 bg-surface">
                <span className="font-code-sm text-code-sm text-secondary-container mb-4 block">
                  [ERROR_LOG_001]
                </span>
                <p className="font-body-md text-on-surface">
                  Every second, millions of tokens are vomited into the digital ether. Meaningless
                  SEO shells. Synthetic textures. Hollow &quot;content&quot; designed to satisfy
                  algorithms while starving human souls.
                </p>
              </div>
              <div className="border-border-width-heavy border-primary p-6 bg-primary text-background">
                <span className="font-code-sm text-code-sm font-bold mb-4 block">[ANALYSIS]</span>
                <p className="font-body-md font-bold">
                  SLOPSCORE is not a filter. It is a forensic autopsy of the modern web. We identify
                  the synthetic rot so original creators can breathe again.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Truth */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop border-b-border-width-heavy border-primary bg-surface-container-lowest">
          <div className="flex flex-col md:flex-row gap-gutter">
            <div className="md:w-1/3">
              <h2 className="font-display-xl text-headline-lg uppercase text-primary md:sticky md:top-32">
                THE TRUTH
              </h2>
            </div>
            <div className="md:w-2/3 space-y-12">
              <div className="border-l-border-width-heavy border-secondary-container pl-8 py-4">
                <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase mb-4">
                  AI IS A FORCE MULTIPLIER FOR LAZINESS
                </h3>
                <p className="font-body-md text-on-surface-variant text-xl leading-relaxed">
                  When everyone can generate a thousand words in three seconds, words become
                  worthless. The &quot;democratization of creativity&quot; has become the
                  colonization of attention by statistical averages. We are being fed a slurry of
                  recycled patterns, presented as &quot;new.&quot;
                </p>
              </div>
              <div className="border-l-border-width-heavy border-primary pl-8 py-4">
                <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase mb-4">
                  THE ALGORITHM WANTS SLOP
                </h3>
                <p className="font-body-md text-on-surface-variant text-xl leading-relaxed">
                  Search engines and social feeds reward volume over value. This perverse incentive
                  structure has turned the internet into a factory for non-thought. If it looks like
                  a duck and quacks like a GPT-duck, it&apos;s slop.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Weapon */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop border-b-border-width-heavy border-primary">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <h2 className="font-display-xl text-headline-lg md:text-[96px] uppercase mb-12">
                THE WEAPON
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: "terminal",
                    title: "FORENSIC PATTERN MATCHING",
                    body: "We trace the synthetic syntax markers that AI cannot hide. We see the hallucinations before you do.",
                  },
                  {
                    icon: "security",
                    title: "CREATOR PROTECTION PROTOCOL",
                    body: "Verifying human provenance. Protecting the intellectual property of those who actually think.",
                  },
                  {
                    icon: "history",
                    title: "PERMANENT LEDGER OF SHAME",
                    body: "The SlopScore is forever. Once a domain is flagged as a synthetic mill, the record remains.",
                  },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="bg-surface-container-high p-4 border-border-width border-primary flex items-start gap-4"
                  >
                    <span
                      className="material-symbols-outlined text-primary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {f.icon}
                    </span>
                    <div>
                      <span className="font-label-bold text-label-bold uppercase block text-primary">
                        {f.title}
                      </span>
                      <p className="font-code-sm text-code-sm text-on-surface-variant">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-5 border-border-width-heavy border-primary bg-surface aspect-square relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-score-display text-score-display text-secondary-container mb-2">
                    99%
                  </div>
                  <div className="font-label-bold text-label-bold uppercase tracking-widest">
                    SLOP_PROBABILITY
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 w-full p-4 border-t-border-width border-primary bg-background">
                <div className="flex justify-between items-center font-code-sm text-code-sm">
                  <span>SCANNING_CONTENT_BUFFER...</span>
                  <span className="animate-pulse">● LIVE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Purge / CTA */}
        <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-primary text-background">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-display-xl text-[64px] md:text-[140px] uppercase leading-none mb-8">
              THE PURGE
            </h2>
            <p className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase mb-16 italic">
              DO NOT COMPLY WITH THE SYNTHETIC STATUS QUO.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-background text-primary border-border-width-heavy border-background px-8 md:px-12 py-6 font-display-xl text-xl md:text-2xl uppercase hover:bg-secondary-container hover:text-white transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              JOIN THE RESISTANCE
            </Link>
            <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12 font-code-sm text-code-sm uppercase opacity-70">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">verified</span> NO BOTS
                ALLOWED
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">bolt</span> FAST DETECTION
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">shield</span> DECENTRALIZED
                TRUTH
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
