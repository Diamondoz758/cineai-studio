import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  Clapperboard,
  Eye,
  Film,
  Flame,
  PenLine,
  Play,
  Plus,
  Sparkles,
  TrendingUp,
  Wand2,
  Zap,
} from "lucide-react";
import { GlassCard } from "@/components/app/Card";
import { PageHeader } from "@/components/app/PageHeader";
import { PROJECTS } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — VIDPRO" },
      { name: "description", content: "Your cinematic creator command center: projects, renders, AI status, and trends." },
    ],
  }),
  component: Dashboard,
});


const RENDERS = [
  { name: "ep_07_final_4k.mp4", time: "2m ago", status: "Rendered", tone: "text-emerald" },
  { name: "voice_take_03.wav", time: "11m ago", status: "Processing", tone: "text-amber" },
  { name: "thumb_v4.png", time: "1h ago", status: "Rendered", tone: "text-emerald" },
  { name: "scene_breakdown.json", time: "3h ago", status: "Queued", tone: "text-cyan" },
];

const NICHES = [
  { name: "Lost Cities", growth: "+312%", heat: 92 },
  { name: "Deep Sea Mysteries", growth: "+184%", heat: 78 },
  { name: "Cold War Files", growth: "+147%", heat: 71 },
  { name: "Forbidden Architecture", growth: "+98%", heat: 64 },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        eyebrow="Command Center"
        title="Welcome back, Director"
        description="Your cinematic operating system — every project, render, and signal in one frame."
        actions={
          <>
            <button className="hidden h-10 items-center gap-2 rounded-xl border border-glass-border bg-white/[0.04] px-4 text-sm text-foreground hover:bg-white/[0.08] sm:flex">
              <Wand2 className="h-4 w-4" /> Quick generate
            </button>
            <button className="flex h-10 items-center gap-2 rounded-xl bg-gradient-primary px-4 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02]">
              <Plus className="h-4 w-4" /> New project
            </button>
          </>
        }
      />

      {/* Stat row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Active projects", value: "12", icon: Film, accent: "from-violet to-magenta" },
          { label: "Renders today", value: "47", icon: Activity, accent: "from-cyan to-emerald" },
          { label: "AI generations", value: "1,284", icon: Sparkles, accent: "from-amber to-magenta" },
          { label: "Avg retention", value: "68%", icon: Eye, accent: "from-violet to-cyan" },
        ].map((s, i) => (
          <GlassCard key={s.label} glow className="p-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</span>
                <div className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${s.accent}`}>
                  <s.icon className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="mt-3 font-display text-3xl font-bold text-foreground">{s.value}</div>
              <div className="mt-1 text-[11px] text-emerald">▲ trending up this week</div>
            </motion.div>
          </GlassCard>
        ))}
      </div>

      {/* Main grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Projects */}
        <div className="lg:col-span-2">
          <SectionTitle icon={Clapperboard} title="Active Projects" hint="Auto-saved · last 24h" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <Link
                key={p.title}
                to="/video"
                aria-label={`Open project: ${p.title}`}
                className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet"
              >
                <GlassCard interactive glow className="overflow-hidden">
                  <div className={`relative h-32 bg-gradient-to-br ${p.thumb}`}>
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <span className="rounded-full border border-white/20 bg-black/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white backdrop-blur">
                        {p.tone}
                      </span>
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-white/95 text-background shadow-glow transition-transform group-hover:scale-110">
                        <Play className="h-4 w-4 fill-current" />
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="font-display font-semibold text-foreground">{p.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{p.style}</div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${p.progress}%` }}
                        transition={{ duration: 1.2, delay: 0.1 * i, ease: "easeOut" }}
                        className="h-full bg-gradient-primary"
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                      <span>Production</span>
                      <span className="text-foreground">{p.progress}%</span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>

          {/* Trending niches */}
          <div className="mt-8">
            <SectionTitle icon={Flame} title="Trending Niches" hint="Real-time signals" />
            <GlassCard className="p-2">
              <div className="divide-y divide-white/[0.06]">
                {NICHES.map((n) => (
                  <div key={n.name} className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-white/[0.03]">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-amber">
                      <TrendingUp className="h-4 w-4 text-background" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{n.name}</div>
                      <div className="text-xs text-muted-foreground">90-day search velocity</div>
                    </div>
                    <div className="hidden w-40 sm:block">
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <div className="h-full bg-gradient-cyan" style={{ width: `${n.heat}%` }} />
                      </div>
                    </div>
                    <div className="font-display text-sm font-semibold text-emerald">{n.growth}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* AI status */}
          <GlassCard glow className="p-5">
            <SectionTitle icon={Zap} title="AI Engine" hint="Live" inline />
            <div className="mt-4 space-y-3">
              {[
                { label: "Script model", value: "Online", dot: "bg-emerald" },
                { label: "Video pipeline", value: "Online", dot: "bg-emerald" },
                { label: "Voice synthesis", value: "Online", dot: "bg-emerald" },
                { label: "Thumbnail engine", value: "Online", dot: "bg-emerald" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between rounded-xl border border-glass-border bg-white/[0.02] px-3 py-2.5">
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className="flex items-center gap-2 text-xs">
                    <span className={`h-2 w-2 rounded-full ${row.dot} animate-pulse-glow`} />
                    <span className="text-foreground">{row.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Recent renders */}
          <GlassCard className="p-5">
            <SectionTitle icon={Activity} title="Recent Renders" inline />
            <div className="mt-4 space-y-2">
              {RENDERS.map((r) => (
                <div key={r.name} className="flex items-center gap-3 rounded-xl border border-glass-border bg-white/[0.02] px-3 py-2.5">
                  <div className="h-8 w-1 rounded-full bg-gradient-primary" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-mono text-xs text-foreground">{r.name}</div>
                    <div className="text-[11px] text-muted-foreground">{r.time}</div>
                  </div>
                  <span className={`rounded-full border border-glass-border bg-white/[0.04] px-2 py-0.5 text-[10px] ${r.tone}`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quick actions */}
          <GlassCard glow className="p-5">
            <SectionTitle icon={Sparkles} title="Quick Create" inline />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { label: "Script", icon: PenLine, accent: "from-violet to-magenta" },
                { label: "Video", icon: Clapperboard, accent: "from-cyan to-emerald" },
                { label: "Voice", icon: Activity, accent: "from-amber to-magenta" },
                { label: "Thumb", icon: Eye, accent: "from-violet to-cyan" },
              ].map((a) => (
                <button
                  key={a.label}
                  className="group relative overflow-hidden rounded-xl border border-glass-border bg-white/[0.03] p-3 text-left transition-all hover:border-violet/40 hover:bg-white/[0.06]"
                >
                  <div className={`mb-2 grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${a.accent}`}>
                    <a.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-sm font-medium text-foreground">{a.label}</div>
                  <div className="text-[11px] text-muted-foreground">Generate now</div>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  hint,
  inline,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  hint?: string;
  inline?: boolean;
}) {
  return (
    <div className={`mb-3 flex items-center gap-2 ${inline ? "" : "mt-2"}`}>
      <Icon className="h-4 w-4 text-violet" />
      <span className="font-display text-sm font-semibold tracking-wide text-foreground">{title}</span>
      {hint && <span className="ml-auto text-[11px] text-muted-foreground">{hint}</span>}
    </div>
  );
}
