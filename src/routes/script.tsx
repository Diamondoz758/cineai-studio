import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, Brain, FileText, Save, Sparkles, Wand2 } from "lucide-react";
import { GlassCard } from "@/components/app/Card";
import { PageHeader } from "@/components/app/PageHeader";

export const Route = createFileRoute("/script")({
  head: () => ({
    meta: [
      { title: "Script Studio — VIDPRO" },
      { name: "description", content: "AI Script Studio: cinematic writing workspace, structured & full script modes, autosave, prompt vault, creator memory." },
    ],
  }),
  component: ScriptStudio,
});

const DURATIONS = ["Shorts", "1–3 Min", "5–10 Min", "10–15 Min", "20+ Min"];
const TONES = [
  "Curiosity-Driven", "Documentary", "Suspense", "Horror", "Investigative",
  "Emotional Storytelling", "Educational", "Viral Retention", "Psychological",
  "Cinematic Narration", "Commentary", "Analog Horror", "Deep Storytelling", "True Crime",
];

function ScriptStudio() {
  const [mode, setMode] = useState<"structured" | "full">("structured");
  const [duration, setDuration] = useState("5–10 Min");
  const [tone, setTone] = useState("Cinematic Narration");
  const [idea, setIdea] = useState("");

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        eyebrow="Script Studio"
        title="Write the cinema, not the copy"
        description="A cinematic writing workspace tuned for narrative pacing, retention, and emotional rhythm."
        actions={
          <>
            <button className="flex h-10 items-center gap-2 rounded-xl border border-glass-border bg-white/[0.04] px-4 text-sm text-muted-foreground">
              <Save className="h-4 w-4" /> Autosaved
            </button>
            <button className="flex h-10 items-center gap-2 rounded-xl bg-gradient-primary px-4 text-sm font-medium text-white shadow-glow">
              <Sparkles className="h-4 w-4" /> Generate
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        {/* Workspace */}
        <div className="space-y-6">
          <GlassCard glow className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              <ModePill active={mode === "structured"} onClick={() => setMode("structured")}>Structured Mode</ModePill>
              <ModePill active={mode === "full"} onClick={() => setMode("full")}>Full Script Mode</ModePill>
              <span className="ml-auto text-[11px] text-muted-foreground">creator memory active</span>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-[11px] uppercase tracking-wider text-muted-foreground">Idea / Hook</label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Drop your concept. The more specific the spark, the sharper the script…"
                className="h-28 w-full resize-none rounded-xl border border-glass-border bg-white/[0.03] p-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-violet/40 focus:outline-none focus:ring-2 focus:ring-violet/20"
              />
            </div>

            {/* Cinematic editor canvas */}
            <div className="relative mt-5 overflow-hidden rounded-2xl border border-glass-border bg-gradient-to-b from-black/40 to-black/10">
              <div className="flex items-center gap-2 border-b border-glass-border bg-white/[0.02] px-4 py-2 text-[11px] text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-magenta" />
                <span className="h-2 w-2 rounded-full bg-amber" />
                <span className="h-2 w-2 rounded-full bg-emerald" />
                <span className="ml-3 font-mono">script_draft_07.cin</span>
                <span className="ml-auto">2,418 words · ~12 min read</span>
              </div>

              {mode === "structured" ? (
                <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-2">
                  {[
                    { k: "Cold Open", c: "Disorienting visual. A whisper of a question the viewer can't ignore." },
                    { k: "Hook", c: "Promise the payoff. Compress mystery into 7 seconds." },
                    { k: "Setup", c: "Stakes, world, the rules of the story you're about to break." },
                    { k: "Rising Tension", c: "Cadence accelerates. Every sentence pulls one layer deeper." },
                    { k: "Twist", c: "The pivot the audience didn't see — but earned." },
                    { k: "Resolution", c: "Land the emotion. Leave one breath of unanswered air." },
                  ].map((b, i) => (
                    <motion.div
                      key={b.k}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="group rounded-xl border border-glass-border bg-white/[0.02] p-4 transition-colors hover:border-violet/30"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-display text-sm font-semibold text-violet">{b.k}</span>
                        <span className="text-[10px] text-muted-foreground">block {i + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{b.c}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-sm leading-relaxed text-foreground/90">
                  <p className="mb-4 font-display text-lg text-gradient">The Last Lighthouse Keeper</p>
                  <p className="mb-3 text-muted-foreground">
                    There is a stretch of coastline no map will name. The wind speaks in two languages there, and only one
                    of them is human. For forty-three years, one man kept the light burning — and then, on a clear night in
                    October, the light went out, and the man was never seen again…
                  </p>
                  <p className="text-muted-foreground">
                    What happened on that island is not a ghost story. It is something colder. And by the end of this
                    video, you will understand exactly why the lighthouse was built — and what it was really meant to keep
                    out.
                  </p>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Pacing flow visualisation */}
          <GlassCard className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Brain className="h-4 w-4 text-cyan" />
              <span className="font-display text-sm font-semibold">Narrative Pacing</span>
              <span className="ml-auto text-[11px] text-muted-foreground">retention curve · projected</span>
            </div>
            <div className="flex h-32 items-end gap-1">
              {Array.from({ length: 48 }).map((_, i) => {
                const h = 30 + Math.abs(Math.sin(i * 0.6)) * 60 + (i % 7) * 3;
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-violet/30 via-violet to-cyan"
                    style={{ height: `${Math.min(100, h)}%` }}
                  />
                );
              })}
            </div>
            <div className="mt-3 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
              <span>Cold Open</span><span>Hook</span><span>Setup</span><span>Rising</span><span>Twist</span><span>Resolution</span>
            </div>
          </GlassCard>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <GlassCard glow className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-violet" />
              <span className="font-display text-sm font-semibold">AI Generation</span>
            </div>

            <div className="mb-4">
              <div className="mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">Duration</div>
              <div className="flex flex-wrap gap-1.5">
                {DURATIONS.map((d) => (
                  <Pill key={d} active={duration === d} onClick={() => setDuration(d)}>{d}</Pill>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">Tone</div>
              <div className="flex flex-wrap gap-1.5">
                {TONES.map((t) => (
                  <Pill key={t} active={tone === t} onClick={() => setTone(t)}>{t}</Pill>
                ))}
              </div>
            </div>

            <button className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.01]">
              <Sparkles className="h-4 w-4" /> Generate Script
            </button>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-amber" />
              <span className="font-display text-sm font-semibold">Prompt Vault</span>
            </div>
            <div className="space-y-2">
              {[
                "Cinematic open with sensory detail",
                "True-crime cold open — 7-second hook",
                "Documentary chapter break",
                "Emotional pivot — quiet beat",
              ].map((p) => (
                <button key={p} className="flex w-full items-center gap-2 rounded-lg border border-glass-border bg-white/[0.02] px-3 py-2 text-left text-xs text-muted-foreground hover:border-violet/30 hover:text-foreground">
                  <FileText className="h-3.5 w-3.5 text-violet" />
                  {p}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4 text-emerald" />
              <span className="font-display text-sm font-semibold">Creator Memory</span>
            </div>
            <p className="text-xs text-muted-foreground">
              The studio remembers your voice — vocabulary, sentence rhythm, recurring metaphors, and the cadence your
              audience responds to. Every script makes the next one sharper.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <Mem label="Voice" value="92%" />
              <Mem label="Rhythm" value="87%" />
              <Mem label="Hooks" value="94%" />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function ModePill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-all ${
        active ? "bg-gradient-primary text-white shadow-glow" : "border border-glass-border bg-white/[0.03] text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs transition-all ${
        active
          ? "border border-violet/40 bg-violet/15 text-foreground"
          : "border border-glass-border bg-white/[0.02] text-muted-foreground hover:border-white/15 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Mem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-glass-border bg-white/[0.02] py-2">
      <div className="font-display text-base font-bold text-gradient">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
