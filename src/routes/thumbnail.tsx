import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, Layers, Sparkles, Type, Wand2 } from "lucide-react";
import { GlassCard } from "@/components/app/Card";
import { PageHeader } from "@/components/app/PageHeader";

export const Route = createFileRoute("/thumbnail")({
  head: () => ({
    meta: [
      { title: "Thumbnail Studio — VIDPRO" },
      { name: "description", content: "Cinematic AI thumbnail design with editable layers, CTR psychology, and viral composition controls." },
    ],
  }),
  component: ThumbnailStudio,
});

const STYLES = ["MrBeast CTR", "Cinematic Poster", "Documentary", "Horror", "Storytelling", "Minimalist", "Viral Reaction"];
const VARIANTS = [
  { title: "THE LAST KEEPER", grad: "from-violet via-magenta to-amber" },
  { title: "WHAT WAS INSIDE?", grad: "from-cyan via-violet to-magenta" },
  { title: "NOBODY TALKS ABOUT THIS", grad: "from-amber via-magenta to-violet" },
  { title: "GONE IN ONE NIGHT", grad: "from-emerald via-cyan to-violet" },
];

function ThumbnailStudio() {
  const [style, setStyle] = useState("Cinematic Poster");

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        eyebrow="Thumbnail Studio"
        title="The first frame of the film"
        description="A thumbnail is the trailer. Design with cinematic composition and CTR psychology in one workspace."
        actions={
          <button className="flex h-10 items-center gap-2 rounded-xl bg-gradient-primary px-4 text-sm font-medium text-white shadow-glow">
            <Sparkles className="h-4 w-4" /> Generate thumbnails
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          {/* Hero canvas */}
          <GlassCard glow className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Eye className="h-4 w-4 text-violet" />
              <span className="font-display text-sm font-semibold">Composition Canvas</span>
              <span className="ml-auto text-[11px] text-muted-foreground">1280 × 720 · YouTube</span>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-glass-border bg-gradient-to-br from-violet via-magenta to-amber">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] md:text-6xl">
                  The Last <span className="text-amber">Lighthouse</span> Keeper
                </div>
                <div className="mt-3 inline-block rounded-md bg-magenta px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-glow">
                  Disappeared in one night
                </div>
              </div>
              {/* layer markers */}
              <div className="absolute right-4 top-4 flex flex-col gap-1.5">
                {["BG", "Subject", "Text", "Accent"].map((l, i) => (
                  <div key={l} className="rounded-md border border-white/30 bg-black/30 px-2 py-0.5 text-[10px] font-mono text-white backdrop-blur">
                    L{i + 1} · {l}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Variants */}
          <GlassCard className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-cyan" />
              <span className="font-display text-sm font-semibold">AI Variants</span>
              <span className="ml-auto text-[11px] text-muted-foreground">A/B test ready</span>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {VARIANTS.map((v) => (
                <div key={v.title} className="group relative overflow-hidden rounded-xl border border-glass-border">
                  <div className={`relative aspect-video bg-gradient-to-br ${v.grad}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 font-display text-[11px] font-extrabold uppercase leading-tight text-white drop-shadow">
                      {v.title}
                    </div>
                    <div className="absolute right-2 top-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] font-mono text-emerald backdrop-blur">
                      CTR 9.2%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Layers */}
          <GlassCard className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Layers className="h-4 w-4 text-amber" />
              <span className="font-display text-sm font-semibold">Layers</span>
            </div>
            <div className="space-y-1.5">
              {["Title text", "Accent burst", "Subject cutout", "Lighting overlay", "Background plate"].map((l, i) => (
                <div key={l} className="flex items-center gap-3 rounded-lg border border-glass-border bg-white/[0.02] px-3 py-2">
                  <div className="grid h-8 w-12 place-items-center rounded bg-gradient-to-br from-violet to-magenta text-[10px] font-mono text-white">L{i + 1}</div>
                  <div className="text-sm text-foreground">{l}</div>
                  <div className="ml-auto flex gap-1 text-[10px] text-muted-foreground">
                    <span className="rounded bg-white/[0.04] px-1.5 py-0.5">opacity 100</span>
                    <span className="rounded bg-white/[0.04] px-1.5 py-0.5">multiply</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          <GlassCard glow className="p-5">
            <div className="mb-3 font-display text-sm font-semibold">Style</div>
            <div className="flex flex-wrap gap-1.5">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`rounded-full px-3 py-1.5 text-xs transition-all ${
                    style === s ? "border border-violet/40 bg-violet/15 text-foreground" : "border border-glass-border bg-white/[0.02] text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Type className="h-4 w-4 text-magenta" />
              <span className="font-display text-sm font-semibold">CTR Psychology</span>
            </div>
            <div className="space-y-3">
              {[
                { l: "Curiosity gap", v: 84 },
                { l: "Emotional contrast", v: 71 },
                { l: "Visual hierarchy", v: 92 },
                { l: "Color shock", v: 66 },
                { l: "Face dominance", v: 48 },
              ].map((s) => (
                <div key={s.l}>
                  <div className="mb-1 flex justify-between text-[11px]">
                    <span className="text-muted-foreground">{s.l}</span>
                    <span className="font-mono text-foreground">{s.v}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full bg-gradient-primary" style={{ width: `${s.v}%` }} />
                  </div>
                </div>
              ))}
              <div className="mt-3 rounded-xl border border-emerald/30 bg-emerald/10 p-3">
                <div className="text-[10px] uppercase tracking-wider text-emerald">Predicted CTR</div>
                <div className="font-display text-2xl font-bold text-emerald">9.4%</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-3 font-display text-sm font-semibold">Composition</div>
            {[
              { l: "Rule of thirds", v: 70 },
              { l: "Negative space", v: 45 },
              { l: "Lighting drama", v: 80 },
              { l: "Subject scale", v: 65 },
            ].map((s) => (
              <div key={s.l} className="mb-3">
                <div className="mb-1 flex justify-between text-[11px]">
                  <span className="uppercase tracking-wider text-muted-foreground">{s.l}</span>
                  <span className="font-mono text-foreground">{s.v}</span>
                </div>
                <input type="range" min={0} max={100} defaultValue={s.v} aria-label={s.l} className="h-1.5 w-full appearance-none rounded-full bg-white/[0.06] accent-violet" />
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
