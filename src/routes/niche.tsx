import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Compass, Flame, Play, Search, TrendingUp, Users } from "lucide-react";
import { GlassCard } from "@/components/app/Card";
import { PageHeader } from "@/components/app/PageHeader";

export const Route = createFileRoute("/niche")({
  head: () => ({
    meta: [
      { title: "Niche Intelligence — VIDPRO" },
      { name: "description", content: "Niche finder, niche bending, and creator analysis — cinematic intelligence for serious YouTube strategy." },
    ],
  }),
  component: NicheIntel,
});

const TABS = [
  { k: "finder", l: "Niche Finder", icon: Compass },
  { k: "bending", l: "Niche Bending", icon: Flame },
  { k: "creator", l: "Creator Analysis", icon: Users },
] as const;

const VIDEOS = [
  { t: "The Town That Vanished in 1953", v: "4.2M", r: "92%", grad: "from-violet to-magenta" },
  { t: "What Lives Below the Mariana", v: "8.7M", r: "88%", grad: "from-cyan to-violet" },
  { t: "The Cold War Bunker Nobody Found", v: "2.1M", r: "84%", grad: "from-amber to-magenta" },
  { t: "The Architect Who Never Existed", v: "3.6M", r: "90%", grad: "from-magenta to-violet" },
  { t: "Inside the Forbidden Library", v: "5.3M", r: "86%", grad: "from-emerald to-cyan" },
  { t: "The Last Recording From Apollo 18", v: "11M", r: "94%", grad: "from-violet to-cyan" },
];

function NicheIntel() {
  const [tab, setTab] = useState<typeof TABS[number]["k"]>("creator");
  const [openVideo, setOpenVideo] = useState<typeof VIDEOS[number] | null>(null);

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        eyebrow="Niche Intelligence"
        title="See the signal beneath the noise"
        description="Hunt niches, bend formats, and reverse-engineer the creators who define the meta."
      />

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              tab === t.k ? "bg-gradient-primary text-white shadow-glow" : "border border-glass-border bg-white/[0.03] text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="h-4 w-4" /> {t.l}
          </button>
        ))}
      </div>

      {/* Search */}
      <GlassCard glow className="mb-6 p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            aria-label="Niche intelligence search"
            placeholder={
              tab === "creator"
                ? "Search a YouTube channel or creator…"
                : tab === "bending"
                ? "Pick a niche to bend into a new format…"
                : "Search a niche, topic, or theme…"
            }
            className="h-12 w-full rounded-xl border border-glass-border bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-violet/40 focus:outline-none focus:ring-2 focus:ring-violet/20"
          />
        </div>
      </GlassCard>

      {tab === "creator" && (
        <CreatorAnalysis videos={VIDEOS} onOpen={setOpenVideo} />
      )}
      {tab === "finder" && <NicheFinder />}
      {tab === "bending" && <NicheBending />}

      {openVideo && <VideoBreakdown video={openVideo} onClose={() => setOpenVideo(null)} />}
    </div>
  );
}

function CreatorAnalysis({ videos, onOpen }: { videos: typeof VIDEOS; onOpen: (v: typeof VIDEOS[number]) => void }) {
  return (
    <div className="space-y-6">
      {/* Channel banner */}
      <GlassCard className="overflow-hidden">
        <div className="relative h-44 bg-gradient-to-br from-violet via-magenta to-amber">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
        <div className="flex flex-wrap items-end gap-4 p-5 -mt-12">
          <div className="grid h-24 w-24 place-items-center rounded-2xl border-4 border-background bg-gradient-cyan font-display text-3xl font-bold text-background shadow-cinema">A</div>
          <div className="flex-1">
            <div className="font-display text-2xl font-bold">Atlas Unfiltered</div>
            <div className="text-sm text-muted-foreground">Cinematic mystery & history · uploads weekly</div>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {[
              { l: "Subscribers", v: "4.7M" },
              { l: "Avg views", v: "3.1M" },
              { l: "Est. RPM", v: "$8.40" },
              { l: "Retention", v: "62%" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-glass-border bg-white/[0.03] px-3 py-2 text-center">
                <div className="font-display text-base font-bold">{s.v}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Upload grid */}
      <GlassCard glow className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-violet" />
          <span className="font-display text-sm font-semibold">Upload Grid</span>
          <span className="ml-auto text-[11px] text-muted-foreground">hover to preview · click for AI breakdown</span>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {videos.map((v, i) => (
            <motion.button
              key={v.t}
              onClick={() => onOpen(v)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -3 }}
              className="group relative overflow-hidden rounded-xl border border-glass-border text-left"
            >
              <div className={`relative aspect-video bg-gradient-to-br ${v.grad}`}>
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white/95 text-background shadow-glow">
                    <Play className="h-5 w-5 fill-current" />
                  </span>
                </div>
                <div className="absolute right-2 top-2 rounded bg-black/50 px-1.5 py-0.5 font-mono text-[10px] text-white backdrop-blur">
                  {v.v}
                </div>
                <div className="absolute bottom-2 left-2 rounded bg-emerald/90 px-1.5 py-0.5 font-mono text-[10px] text-background">
                  ret {v.r}
                </div>
              </div>
              <div className="bg-black/30 p-3 backdrop-blur">
                <div className="line-clamp-2 text-sm font-medium text-foreground">{v.t}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </GlassCard>

      {/* Style breakdown */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { l: "Storytelling", desc: "Layered mystery with reveal-per-chapter pacing.", v: 92 },
          { l: "Pacing", desc: "Slow-build openings, accelerating mid-act.", v: 78 },
          { l: "Retention", desc: "Strong 30s hook · cliffhangers every 90s.", v: 84 },
        ].map((b) => (
          <GlassCard key={b.l} className="p-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-display text-sm font-semibold">{b.l}</span>
              <span className="font-mono text-xs text-foreground">{b.v}</span>
            </div>
            <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full bg-gradient-primary" style={{ width: `${b.v}%` }} />
            </div>
            <p className="text-xs text-muted-foreground">{b.desc}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function NicheFinder() {
  const niches = [
    { n: "Lost Architectural Secrets", g: "+312%", h: 92 },
    { n: "Deep Sea Mysteries", g: "+184%", h: 78 },
    { n: "Cold War Files", g: "+147%", h: 71 },
    { n: "Forgotten Inventions", g: "+98%", h: 64 },
    { n: "Modern Folklore", g: "+76%", h: 58 },
    { n: "Pre-Internet Internet", g: "+62%", h: 51 },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {niches.map((n) => (
        <GlassCard key={n.n} interactive glow className="p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-display text-base font-semibold">{n.n}</span>
            <span className="rounded-full bg-emerald/15 px-2 py-0.5 text-[11px] font-mono text-emerald">{n.g}</span>
          </div>
          <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full bg-gradient-cyan" style={{ width: `${n.h}%` }} />
          </div>
          <div className="text-xs text-muted-foreground">Search velocity · low saturation · high RPM signal</div>
        </GlassCard>
      ))}
    </div>
  );
}

function NicheBending() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <GlassCard glow className="p-5">
        <div className="mb-3 font-display text-sm font-semibold">Bend a niche</div>
        <p className="mb-4 text-sm text-muted-foreground">
          Take a saturated niche and bend it through a new lens — format, tone, or visual style — to find white space.
        </p>
        <div className="space-y-3">
          {[
            { f: "True Crime", t: "Analog Horror" },
            { f: "Documentary", t: "Cinematic Narration" },
            { f: "Educational", t: "Suspense Storytelling" },
          ].map((b) => (
            <div key={b.f} className="flex items-center gap-3 rounded-xl border border-glass-border bg-white/[0.02] p-3">
              <div className="rounded-lg bg-white/[0.05] px-3 py-1.5 text-xs">{b.f}</div>
              <div className="text-muted-foreground">→</div>
              <div className="rounded-lg bg-gradient-primary px-3 py-1.5 text-xs font-medium text-white shadow-glow">{b.t}</div>
              <button className="ml-auto text-xs text-cyan">Generate angles</button>
            </div>
          ))}
        </div>
      </GlassCard>
      <GlassCard className="p-5">
        <div className="mb-3 font-display text-sm font-semibold">Predicted whitespace</div>
        <div className="grid h-64 place-items-center rounded-xl border border-glass-border bg-black/20">
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-gradient">3 niches</div>
            <div className="mt-1 text-sm text-muted-foreground">match your creator profile with low saturation</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function VideoBreakdown({ video, onClose }: { video: typeof VIDEOS[number]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl glass-strong shadow-cinema"
      >
        <div className={`relative h-56 bg-gradient-to-br ${video.grad}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/70">AI Cinematic Breakdown</div>
            <div className="mt-1 font-display text-2xl font-bold text-white">{video.t}</div>
          </div>
          <button onClick={onClose} className="absolute right-4 top-4 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur hover:bg-black/60">
            Close
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
          {[
            { i: Brain, l: "Hook Analysis", c: "Opens with a 4-second sensory image, then poses the question that anchors the entire video." },
            { i: TrendingUp, l: "Storytelling Structure", c: "Three-act with a mid-point reveal at 38%, second twist at 71%." },
            { i: Flame, l: "Pacing", c: "Slow open (0–0:30) → accelerating cuts (0:30–4:00) → reflective close." },
            { i: Search, l: "Thumbnail Psychology", c: "High-contrast subject, single bold word, eye-line directs to title gap." },
            { i: Compass, l: "Editing Rhythm", c: "Avg 2.4s between cuts during act 2; ambient music on a 12-second swell." },
            { i: Users, l: "Audience Psychology", c: "Targets curiosity-driven 22–34 cohort with documentary trust signals." },
          ].map((b) => (
            <div key={b.l} className="rounded-xl border border-glass-border bg-white/[0.03] p-4">
              <div className="mb-2 flex items-center gap-2">
                <b.i className="h-4 w-4 text-violet" />
                <span className="font-display text-sm font-semibold">{b.l}</span>
              </div>
              <p className="text-xs text-muted-foreground">{b.c}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
