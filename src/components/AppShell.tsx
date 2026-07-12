import Link from "next/link";

type NavKey = "analyze" | "leaderboard" | "manifesto" | "pro" | "history";

const topNav: { key: NavKey; label: string; href: string }[] = [
  { key: "analyze", label: "Feed", href: "/" },
  { key: "leaderboard", label: "Leaderboard", href: "/leaderboard" },
  { key: "manifesto", label: "Manifesto", href: "/manifesto" },
];

const sideNav: {
  key: NavKey;
  label: string;
  href: string;
  icon: string;
}[] = [
  { key: "analyze", label: "Analyze", href: "/", icon: "terminal" },
  { key: "history", label: "History", href: "/", icon: "history" },
  { key: "leaderboard", label: "Global Slop", href: "/leaderboard", icon: "public" },
  { key: "pro", label: "Upgrade", href: "/pro", icon: "payments" },
];

export default function AppShell({
  active,
  children,
  scanline = false,
}: {
  active: NavKey;
  children: React.ReactNode;
  scanline?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      {/* TopNavBar */}
      <header className="w-full z-50 bg-surface border-b-border-width-heavy border-primary flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 sticky top-0">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-headline-lg text-[24px] md:text-[32px] font-black tracking-tighter text-primary uppercase"
          >
            SLOPSCORE
          </Link>
          <nav className="hidden md:flex gap-6">
            {topNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-label-bold text-label-bold uppercase transition-colors ${
                  active === item.key
                    ? "text-primary-fixed-dim border-b-border-width border-primary-fixed-dim"
                    : "text-primary hover:text-primary-fixed-dim"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex flex-col items-end">
            <span className="font-code-sm text-primary-fixed-dim">3 FREE SCANS REMAINING</span>
            <span className="font-code-sm text-[10px] text-on-surface-variant">
              SIGN UP TO SHARE PUBLICLY.
            </span>
          </div>
          <Link
            href="/signup"
            className="px-6 py-2 border-border-width border-primary font-label-bold text-label-bold uppercase hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-all active:scale-95"
          >
            LOGIN
          </Link>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* SideNavBar */}
        <aside className="hidden md:flex sticky top-[73px] self-start h-[calc(100vh-73px)] w-64 bg-surface border-r-border-width-heavy border-primary flex-col p-gutter z-40 flex-shrink-0">
          <div className="mb-10">
            <h2 className="font-headline-lg text-[24px] text-primary">TERMINAL_V1</h2>
            <p className="font-code-sm text-primary-fixed-dim">STATUS: AGGRESSIVE</p>
          </div>
          <nav className="flex flex-col gap-2 flex-grow">
            {sideNav.map((item) => {
              const isActive = active === item.key;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={
                    isActive
                      ? "bg-primary-fixed-dim text-on-primary-fixed flex items-center p-unit border-border-width border-primary gap-3"
                      : "text-primary flex items-center p-unit border-border-width border-transparent gap-3 hover:bg-surface-container-highest transition-all"
                  }
                >
                  <span
                    className="material-symbols-outlined"
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.icon}
                  </span>
                  <span className="font-label-bold text-label-bold uppercase">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <Link
            href="/"
            className="mt-auto w-full py-4 border-border-width-heavy border-primary-fixed-dim bg-transparent text-primary-fixed-dim font-label-bold text-label-bold uppercase hover:bg-primary-fixed-dim hover:text-on-primary-fixed active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            NEW SCAN
          </Link>
        </aside>

        {/* Main workspace */}
        <main
          className={`flex-grow min-w-0 relative ${scanline ? "scanline" : ""}`}
        >
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full bg-surface border-t-border-width-heavy border-primary flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 z-50">
        <div className="font-code-sm text-primary uppercase text-[10px] md:text-code-sm">
          © 2026 SLOP-SCORE. NO AI WAS CONSULTED.
        </div>
        <div className="flex gap-4 md:gap-8 font-code-sm text-primary uppercase text-[10px] md:text-code-sm">
          <a className="hover:bg-secondary-container hover:text-on-secondary-container px-2" href="#">
            API_DOCS
          </a>
          <a className="hover:bg-secondary-container hover:text-on-secondary-container px-2" href="#">
            SOURCE
          </a>
          <a
            className="text-secondary-container font-bold hover:bg-secondary-container hover:text-on-secondary-container px-2"
            href="#"
          >
            REPORT_SLOP
          </a>
        </div>
      </footer>
    </div>
  );
}
