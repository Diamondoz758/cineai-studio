import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  PenLine,
  Clapperboard,
  AudioLines,
  Image as ImageIcon,
  Radar,
  Sparkles,
  Search,
  Bell,
  Command,
} from "lucide-react";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/script", label: "Script Studio", icon: PenLine },
  { to: "/video", label: "Video Studio", icon: Clapperboard },
  { to: "/voice", label: "Voice Studio", icon: AudioLines },
  { to: "/thumbnail", label: "Thumbnail Studio", icon: ImageIcon },
  { to: "/niche", label: "Niche Intelligence", icon: Radar },
  { to: "/onboarding", label: "Onboarding", icon: Sparkles },
] as const;

export function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen text-foreground">
      {/* ambient cinematic backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-violet/20 blur-[120px]" />
        <div className="absolute top-20 right-0 h-[36rem] w-[36rem] rounded-full bg-cyan/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[34rem] w-[34rem] rounded-full bg-magenta/15 blur-[140px]" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-glass-border bg-sidebar/60 backdrop-blur-xl md:flex">
          <div className="flex items-center gap-2 px-6 pt-6">
            <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <span className="font-display text-base font-bold text-white">V</span>
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
            </div>
            <div>
              <div className="font-display text-lg font-bold tracking-tight text-gradient">VIDPRO</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Creator OS</div>
            </div>
          </div>

          <nav className="mt-8 flex flex-col gap-1 px-3">
            {NAV.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                    active
                      ? "bg-white/[0.06] text-foreground"
                      : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-primary opacity-20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className="relative h-4 w-4" />
                  <span className="relative font-medium">{label}</span>
                  {active && <span className="relative ml-auto h-1.5 w-1.5 rounded-full bg-violet shadow-glow" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto m-3 rounded-2xl border border-glass-border bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 animate-pulse-glow rounded-full bg-emerald" />
              AI Engine online
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground/80">
              Render queue: <span className="text-foreground">3 active</span>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-30 border-b border-glass-border bg-background/60 backdrop-blur-xl">
            <div className="flex h-16 items-center gap-3 px-4 md:px-8">
              <div className="md:hidden font-display text-lg font-bold text-gradient">VIDPRO</div>
              <div className="relative ml-2 hidden flex-1 max-w-xl md:flex">
                <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  aria-label="Search projects, scripts, and creators"
                  placeholder="Search projects, scripts, creators…"
                  className="h-10 w-full rounded-xl border border-glass-border bg-white/[0.03] pl-10 pr-20 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-violet/40 focus:outline-none focus:ring-2 focus:ring-violet/20"
                />
                <kbd className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md border border-glass-border bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  <Command aria-hidden="true" className="h-3 w-3" /> K
                </kbd>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button aria-label="Notifications" className="grid h-9 w-9 place-items-center rounded-xl border border-glass-border bg-white/[0.03] text-muted-foreground hover:text-foreground">
                  <Bell className="h-4 w-4" />
                </button>
                <button className="hidden h-9 items-center gap-2 rounded-xl bg-gradient-primary px-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02] sm:flex">
                  <Sparkles className="h-4 w-4" /> New project
                </button>
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-cyan text-sm font-bold text-background">A</div>
              </div>
            </div>
          </header>

          <main className="relative flex-1 px-4 py-6 md:px-8 md:py-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
