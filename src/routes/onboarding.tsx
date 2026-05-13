import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/app/Card";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Onboarding — VIDPRO" },
      { name: "description", content: "Personalize your cinematic creator OS — niche, storytelling style, visual direction, pacing, narration, and goals." },
    ],
  }),
  component: Onboarding,
});

const STEPS = [
  {
    k: "niche",
    title: "Pick your home niche",
    sub: "Where your stories live — the one that makes everything else compound.",
    options: ["Mystery & History", "True Crime", "Tech & Futurism", "Science", "Documentary", "Analog Horror", "Pop Culture", "Education"],
  },
  {
    k: "story",
    title: "Your storytelling style",
    sub: "How you pull your audience through the frame.",
    options: ["Cinematic Narration", "Investigative", "Curiosity-Driven", "Emotional", "Suspense", "Educational", "Commentary", "Deep Storytelling"],
  },
  {
    k: "visual",
    title: "Preferred visual style",
    sub: "The aesthetic signature of every video you ship.",
    options: ["Cinematic Realism", "Hyper Realistic", "Documentary", "Analog Horror", "Anime Cinematic", "Retro VHS", "Sci-Fi Futurism", "Fantasy Cinematic"],
  },
  {
    k: "pacing",
    title: "Pacing preference",
    sub: "Your default tempo — the heartbeat of your edit.",
    options: ["Slow & Deliberate", "Moderate", "Fast-Paced", "Dynamic", "Suspense Rhythm", "Curiosity Rhythm", "Emotional Escalation"],
  },
  {
    k: "narration",
    title: "Narration style",
    sub: "The voice that holds the room.",
    options: ["Cinematic", "Documentary", "Horror Narration", "Curiosity-Driven", "Emotional", "Suspense", "Investigative", "Dramatic"],
  },
  {
    k: "goals",
    title: "Your creator goals",
    sub: "What success looks like in 90 days.",
    options: ["Grow to 100k", "Master cinematic storytelling", "Ship one viral hit", "Build a signature style", "Improve retention", "Launch a series"],
  },
] as const;

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else navigate({ to: "/" });
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="font-display text-xl font-bold text-gradient">VIDPRO Onboarding</div>
      </div>

      {/* Progress */}
      <div className="mb-8 w-full max-w-xl">
        <div className="mb-2 flex justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>Step {step + 1} of {STEPS.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div animate={{ width: `${progress}%` }} className="h-full bg-gradient-primary shadow-glow" />
        </div>
      </div>

      <GlassCard glow className="w-full p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.k}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              <span className="text-gradient">{current.title}</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">{current.sub}</p>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {current.options.map((opt) => {
                const selected = answers[current.k] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setAnswers((a) => ({ ...a, [current.k]: opt }))}
                    className={`group relative overflow-hidden rounded-xl border p-3 text-left text-sm transition-all ${
                      selected
                        ? "border-violet/60 bg-violet/15 text-foreground shadow-glow"
                        : "border-glass-border bg-white/[0.03] text-muted-foreground hover:border-white/15 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {selected && <Check className="h-4 w-4 text-violet" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30"
              >
                ← Back
              </button>
              <button
                onClick={next}
                disabled={!answers[current.k]}
                className="flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                {step === STEPS.length - 1 ? "Enter VIDPRO" : "Continue"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </GlassCard>
    </div>
  );
}
