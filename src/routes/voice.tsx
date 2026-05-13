import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mic, Pause, Play, Sparkles, Volume2, Download } from "lucide-react";
import { GlassCard } from "@/components/app/Card";
import { PageHeader } from "@/components/app/PageHeader";

export const Route = createFileRoute("/voice")({
  head: () => ({
    meta: [
      { title: "Voice Studio — VIDPRO" },
      { name: "description", content: "Cinematic AI narration with mood-tuned voice styles, pacing rhythms, and immersive waveform controls." },
    ],
  }),
  component: VoiceStudio,
});

const VOICES = [
  "Documentary", "Horror Narration", "Cinematic", "Educational", "Curiosity-Driven",
  "Emotional", "Suspense", "Investigative", "Deep Storytelling", "Dramatic",
];
const PACING = [
  "Slow and Deliberate", "Moderate", "Fast-Paced", "Dynamic", "Story Narration",
  "Suspense Rhythm", "Curiosity Rhythm", "Emotional Escalation",
];

function VoiceStudio() {
  const [voice, setVoice] = useState("Cinematic");
  const [pacing, setPacing] = useState("Story Narration");
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        eyebrow="Voice Studio"
        title="The voice that holds the room"
        description="Cinematic AI narration tuned for mood, pacing, and emotional weight."
        actions={
          <button className="flex h-10 items-center gap-2 rounded-xl bg-gradient-primary px-4 text-sm font-medium text-white shadow-glow">
            <Sparkles className="h-4 w-4" /> Generate narration
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <GlassCard glow className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Mic className="h-4 w-4 text-violet" />
              <span className="font-display text-sm font-semibold">Narration Script</span>
            </div>
            <textarea
              placeholder="Paste the script you want narrated. The studio will breathe pauses, weight, and rhythm into it…"
              className="h-44 w-full resize-none rounded-xl border border-glass-border bg-white/[0.03] p-4 text-sm placeholder:text-muted-foreground/70 focus:border-violet/40 focus:outline-none focus:ring-2 focus:ring-violet/20"
            />
          </GlassCard>

          {/* Waveform */}
          <GlassCard className="p-5">
            <div className="mb-4 flex items-center gap-3">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="grid h-12 w-12 place-items-center rounded-full bg-gradient-primary shadow-glow transition-transform hover:scale-105"
              >
                {playing ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 fill-current text-white" />}
              </button>
              <div>
                <div className="font-display text-sm font-semibold">Take 03 · {voice}</div>
                <div className="font-mono text-[11px] text-muted-foreground">02:14 / 12:48 · 48kHz · 24-bit</div>
              </div>
              <div className="ml-auto flex items-center gap-2 text-muted-foreground">
                <Volume2 className="h-4 w-4" />
                <input type="range" defaultValue={70} className="h-1 w-24 appearance-none rounded-full bg-white/10 accent-violet" />
              </div>
            </div>

            <div className="relative h-32 overflow-hidden rounded-xl border border-glass-border bg-black/30 p-4">
              <div className="flex h-full items-center gap-[3px]">
                {Array.from({ length: 140 }).map((_, i) => {
                  const h = 10 + Math.abs(Math.sin(i * 0.35) + Math.cos(i * 0.13)) * 45;
                  const active = i < 60;
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-full ${active ? "bg-gradient-to-t from-violet to-magenta" : "bg-white/15"}`}
                      style={{
                        height: `${Math.min(100, h)}%`,
                        animation: playing ? `waveform ${0.6 + (i % 7) * 0.05}s ease-in-out infinite` : undefined,
                      }}
                    />
                  );
                })}
              </div>
              <div className="absolute left-[42%] top-0 h-full w-px bg-magenta shadow-glow" />
            </div>

            <div className="mt-3 flex justify-end gap-2">
              <button className="flex items-center gap-1.5 rounded-lg border border-glass-border bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">
                <Download className="h-3.5 w-3.5" /> WAV
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-glass-border bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">
                <Download className="h-3.5 w-3.5" /> MP3
              </button>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard glow className="p-5">
            <div className="mb-3 font-display text-sm font-semibold">Voice Style</div>
            <div className="flex flex-wrap gap-1.5">
              {VOICES.map((v) => (
                <button
                  key={v}
                  onClick={() => setVoice(v)}
                  className={`rounded-full px-3 py-1.5 text-xs transition-all ${
                    voice === v ? "border border-violet/40 bg-violet/15 text-foreground" : "border border-glass-border bg-white/[0.02] text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-3 font-display text-sm font-semibold">Pacing</div>
            <div className="flex flex-wrap gap-1.5">
              {PACING.map((p) => (
                <button
                  key={p}
                  onClick={() => setPacing(p)}
                  className={`rounded-full px-3 py-1.5 text-xs transition-all ${
                    pacing === p ? "border border-cyan/40 bg-cyan/15 text-foreground" : "border border-glass-border bg-white/[0.02] text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-3 font-display text-sm font-semibold">Performance</div>
            {[
              { l: "Breath spacing", v: 50 },
              { l: "Emotional weight", v: 70 },
              { l: "Whisper proximity", v: 30 },
              { l: "Pitch variance", v: 45 },
            ].map((s) => (
              <div key={s.l} className="mb-3">
                <div className="mb-1.5 flex justify-between text-[11px]">
                  <span className="uppercase tracking-wider text-muted-foreground">{s.l}</span>
                  <span className="font-mono text-foreground">{s.v}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full bg-gradient-primary" style={{ width: `${s.v}%` }} />
                </div>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
