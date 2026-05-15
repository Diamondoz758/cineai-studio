import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clapperboard, Download, FileUp, Film, Layers, Play, Sparkles, Upload, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { GlassCard } from "@/components/app/Card";
import { PageHeader } from "@/components/app/PageHeader";
import { getProject, type Project } from "@/lib/projects";

type VideoSearch = { project?: string };

export const Route = createFileRoute("/video")({
  validateSearch: (search: Record<string, unknown>): VideoSearch => ({
    project: typeof search.project === "string" ? search.project : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Video Studio — VIDPRO" },
      { name: "description", content: "Cinematic AI Video Studio: storyboard, scene breakdown, render queue, and immersive style controls." },
    ],
  }),
  component: VideoStudio,
});

const STYLES = [
  "Cinematic Realism", "2D Animated Storytelling", "Illustrated Documentary", "Anime Cinematic",
  "Analog Horror", "Hyper Realistic", "Dark Documentary", "Retro VHS", "Sci-Fi Futurism",
  "Fantasy Cinematic", "Motion Comic", "Dreamscape Visuals",
];
const DURATIONS = ["Shorts", "1–3 Min", "5–10 Min", "10–15 Min", "20+ Min"];

const DEFAULT_SCENES: Project["scenes"] = [
  { t: "00:00", title: "Cold Open — fog over the cliffs", mood: "Suspense", grad: "from-violet to-magenta" },
  { t: "00:14", title: "Lighthouse silhouette emerges", mood: "Awe", grad: "from-cyan to-violet" },
  { t: "00:42", title: "Cut to keeper's journal pages", mood: "Curiosity", grad: "from-amber to-magenta" },
  { t: "01:08", title: "Storm arrives — light goes out", mood: "Dread", grad: "from-magenta to-violet" },
  { t: "01:36", title: "Empty room, single chair", mood: "Quiet", grad: "from-emerald to-cyan" },
  { t: "02:04", title: "Reveal — what was kept out", mood: "Twist", grad: "from-amber to-violet" },
];

function VideoStudio() {
  const { project: projectSlug } = Route.useSearch();
  const project = getProject(projectSlug);

  const [style, setStyle] = useState(project?.style ?? "Cinematic Realism");
  const [duration, setDuration] = useState(project?.duration ?? "5–10 Min");
  const [script, setScript] = useState(project?.script ?? "");
  const [pacing, setPacing] = useState(60);
  const [intensity, setIntensity] = useState(75);
  const [motion_, setMotion] = useState(50);
  const [zoom, setZoom] = useState(40);
  const [transition, setTransition] = useState(35);
  const [rhythm, setRhythm] = useState(55);

  // Re-sync when switching projects via the URL
  useEffect(() => {
    if (project) {
      setStyle(project.style);
      setDuration(project.duration);
      setScript(project.script);
      toast.success(`Loaded "${project.title}"`, {
        description: `${project.scenes.length} scenes · ${project.style}`,
      });
    }
  }, [project?.slug]);

  const scenes = project?.scenes ?? DEFAULT_SCENES;

  const handleGenerate = () => {
    if (!script.trim()) {
      toast.error("Add a script first", { description: "Paste or import a script before generating." });
      return;
    }
    toast.success("Generation queued", {
      description: `${style} · ${duration} · ${scenes.length} scenes`,
    });
  };

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        eyebrow={project ? `Project · ${project.tone}` : "Video Studio"}
        title={project ? project.title : "Direct the frame, frame by frame"}
        description={
          project
            ? `Resuming production at ${project.progress}% — every scene, slider, and render restored.`
            : "A cinematic AI workspace for storyboards, scene breakdowns, and render orchestration."
        }
        actions={
          <>
            {project && (
              <Link
                to="/"
                className="hidden h-10 items-center gap-2 rounded-xl border border-glass-border bg-white/[0.04] px-3 text-sm text-muted-foreground hover:bg-white/[0.08] hover:text-foreground sm:flex"
              >
                <ArrowLeft className="h-4 w-4" /> All projects
              </Link>
            )}
            <button className="flex h-10 items-center gap-2 rounded-xl border border-glass-border bg-white/[0.04] px-4 text-sm text-foreground hover:bg-white/[0.08]">
              <FileUp className="h-4 w-4" /> Import script
            </button>
            <button
              onClick={handleGenerate}
              className="flex h-10 items-center gap-2 rounded-xl bg-gradient-primary px-4 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02]"
            >
              <Sparkles className="h-4 w-4" /> Generate video
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {/* Script input */}
          <GlassCard glow className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Film className="h-4 w-4 text-violet" />
              <span className="font-display text-sm font-semibold">Source Script</span>
              <span className="ml-auto flex items-center gap-2 text-[11px] text-muted-foreground">
                <button className="rounded-md border border-glass-border bg-white/[0.04] px-2 py-1 hover:text-foreground">Pull from Script Studio</button>
                <button className="flex items-center gap-1 rounded-md border border-glass-border bg-white/[0.04] px-2 py-1 hover:text-foreground">
                  <Upload className="h-3 w-3" /> .txt .pdf .docx
                </button>
              </span>
            </div>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Paste your script — the studio will break it into scenes, shots, and cinematic beats…"
              className="h-40 w-full resize-none rounded-xl border border-glass-border bg-white/[0.03] p-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-violet/40 focus:outline-none focus:ring-2 focus:ring-violet/20"
            />
          </GlassCard>

          {/* Storyboard */}
          <GlassCard className="p-5">
            <div className="mb-4 flex items-center gap-2">
              <Layers className="h-4 w-4 text-cyan" />
              <span className="font-display text-sm font-semibold">Cinematic Storyboard</span>
              <span className="ml-auto text-[11px] text-muted-foreground">{scenes.length} scenes · auto-generated</span>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {scenes.map((s, i) => (
                <motion.div
                  key={`${s.t}-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-xl border border-glass-border"
                >
                  <div className={`relative aspect-video bg-gradient-to-br ${s.grad}`}>
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute left-2 top-2 rounded-md bg-black/40 px-1.5 py-0.5 font-mono text-[10px] text-white backdrop-blur">
                      {s.t}
                    </div>
                    <button aria-label={`Preview scene at ${s.t} — ${s.title}`} className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100">
                      <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-white/95 text-background shadow-glow">
                        <Play className="h-4 w-4 fill-current" />
                      </span>
                    </button>
                  </div>
                  <div className="bg-black/30 p-2.5 backdrop-blur">
                    <div className="truncate text-xs font-medium text-foreground">{s.title}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.mood}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Timeline */}
          <GlassCard className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Clapperboard className="h-4 w-4 text-magenta" />
              <span className="font-display text-sm font-semibold">Visual Timeline</span>
              <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                00:00 — {scenes[scenes.length - 1]?.t ?? "00:00"}
              </span>
            </div>
            <div className="space-y-2">
              {["Visuals", "Voiceover", "Music", "SFX"].map((track, ti) => (
                <div key={track} className="flex items-center gap-3">
                  <div className="w-20 text-[11px] uppercase tracking-wider text-muted-foreground">{track}</div>
                  <div className="relative flex-1 overflow-hidden rounded-md border border-glass-border bg-white/[0.02]">
                    <div className="flex h-8">
                      {scenes.map((s, i) => {
                        const op = ti === 0 ? "opacity-80" : ti === 1 ? "opacity-60" : ti === 2 ? "opacity-40" : "opacity-30";
                        return (
                          <div
                            key={i}
                            className={`flex-1 border-r border-black/30 bg-gradient-to-r ${s.grad} ${op}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* AI correction */}
          <GlassCard glow className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-amber" />
              <span className="font-display text-sm font-semibold">AI Correction</span>
              <span className="ml-auto text-[11px] text-muted-foreground">tell the studio what to change</span>
            </div>
            <textarea
              placeholder="What didn't land? What should be regenerated? Be specific — 'scene 3 feels rushed, push the pause before the reveal'…"
              className="h-24 w-full resize-none rounded-xl border border-glass-border bg-white/[0.03] p-4 text-sm placeholder:text-muted-foreground/70 focus:border-amber/40 focus:outline-none focus:ring-2 focus:ring-amber/20"
            />
            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={() => toast("Suggested fixes ready", { description: "3 scenes flagged for pacing review." })}
                className="rounded-lg border border-glass-border bg-white/[0.03] px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
              >
                Suggest fixes
              </button>
              <button
                onClick={() => toast.success("Regeneration queued", { description: "Selected scenes will refresh." })}
                className="rounded-lg bg-gradient-amber px-3 py-2 text-xs font-medium text-background"
              >
                Regenerate selected
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          <GlassCard glow className="p-5">
            <div className="mb-3 font-display text-sm font-semibold">Visual Style</div>
            <div className="flex flex-wrap gap-1.5">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`rounded-full px-2.5 py-1 text-[11px] transition-all ${
                    style === s ? "border border-violet/40 bg-violet/15 text-foreground" : "border border-glass-border bg-white/[0.02] text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-3 font-display text-sm font-semibold">Duration</div>
            <div className="flex flex-wrap gap-1.5">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`rounded-full px-3 py-1.5 text-xs transition-all ${
                    duration === d ? "border border-cyan/40 bg-cyan/15 text-foreground" : "border border-glass-border bg-white/[0.02] text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-4 font-display text-sm font-semibold">Cinematic Controls</div>
            <Slider label="Pacing" value={pacing} onChange={setPacing} />
            <Slider label="Emotional Intensity" value={intensity} onChange={setIntensity} />
            <Slider label="Motion Style" value={motion_} onChange={setMotion} />
            <Slider label="Zoom Frequency" value={zoom} onChange={setZoom} />
            <Slider label="Transition Intensity" value={transition} onChange={setTransition} />
            <Slider label="Storytelling Rhythm" value={rhythm} onChange={setRhythm} />
          </GlassCard>

          <GlassCard glow className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse-glow rounded-full bg-amber" />
              <span className="font-display text-sm font-semibold">Render Queue</span>
            </div>
            <div className="space-y-3">
              {[
                { name: "Scene 04 · 4K", pct: 72 },
                { name: "Scene 02 · 4K", pct: 41 },
                { name: "Master cut · preview", pct: 12 },
              ].map((q) => (
                <div key={q.name}>
                  <div className="mb-1 flex justify-between text-[11px]">
                    <span className="text-muted-foreground">{q.name}</span>
                    <span className="text-foreground">{q.pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${q.pct}%` }} className="h-full bg-gradient-primary" />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => toast.success("Export started", { description: "Master cut will be ready in your Renders panel." })}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-glass-border bg-white/[0.04] py-2 text-xs text-foreground hover:bg-white/[0.08]"
            >
              <Download className="h-3.5 w-3.5" /> Export master
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="mb-4">
      <div className="mb-1.5 flex justify-between text-[11px]">
        <span className="uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground">{value}</span>
      </div>
      <input
        type="range" min={0} max={100} value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.08] accent-violet"
        style={{ background: `linear-gradient(to right, oklch(0.68 0.22 295) 0%, oklch(0.7 0.27 340) ${value}%, oklch(1 0 0 / 0.06) ${value}%)` }}
      />
    </div>
  );
}
