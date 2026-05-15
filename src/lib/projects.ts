export type Project = {
  slug: string;
  title: string;
  style: string;
  progress: number;
  tone: string;
  thumb: string;
  duration: string;
  scenes: { t: string; title: string; mood: string; grad: string }[];
  script: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "lighthouse-keeper",
    title: "The Last Lighthouse Keeper",
    style: "Cinematic Realism",
    progress: 78,
    tone: "Documentary",
    thumb: "from-violet to-magenta",
    duration: "5–10 Min",
    scenes: [
      { t: "00:00", title: "Cold Open — fog over the cliffs", mood: "Suspense", grad: "from-violet to-magenta" },
      { t: "00:14", title: "Lighthouse silhouette emerges", mood: "Awe", grad: "from-cyan to-violet" },
      { t: "00:42", title: "Cut to keeper's journal pages", mood: "Curiosity", grad: "from-amber to-magenta" },
      { t: "01:08", title: "Storm arrives — light goes out", mood: "Dread", grad: "from-magenta to-violet" },
      { t: "01:36", title: "Empty room, single chair", mood: "Quiet", grad: "from-emerald to-cyan" },
      { t: "02:04", title: "Reveal — what was kept out", mood: "Twist", grad: "from-amber to-violet" },
    ],
    script:
      "FADE IN. Fog rolls across the basalt cliffs. The sea below is the colour of old iron. A single beam sweeps the dark — then stops. For the first time in 119 years, the lighthouse goes dark…",
  },
  {
    slug: "tokyo-never-sleeps",
    title: "Why Tokyo Never Sleeps",
    style: "Hyper Realistic",
    progress: 42,
    tone: "Curiosity-Driven",
    thumb: "from-cyan to-emerald",
    duration: "10–15 Min",
    scenes: [
      { t: "00:00", title: "Neon rain on Shibuya crossing", mood: "Wonder", grad: "from-cyan to-emerald" },
      { t: "00:18", title: "Salaryman in a 3am ramen shop", mood: "Intimate", grad: "from-violet to-cyan" },
      { t: "00:46", title: "Capsule hotels stacked like film cells", mood: "Curiosity", grad: "from-emerald to-cyan" },
      { t: "01:22", title: "Tsukiji at first light", mood: "Awe", grad: "from-amber to-magenta" },
    ],
    script:
      "Tokyo doesn't sleep. It blinks. Twenty-three wards, fourteen million people, and a circadian rhythm bent into a different shape by trains, neon, and necessity…",
  },
  {
    slug: "vault-beneath-berlin",
    title: "The Vault Beneath Berlin",
    style: "Analog Horror",
    progress: 91,
    tone: "Suspense",
    thumb: "from-amber to-magenta",
    duration: "5–10 Min",
    scenes: [
      { t: "00:00", title: "VHS static — declassified stamp", mood: "Unease", grad: "from-amber to-magenta" },
      { t: "00:22", title: "Descent into the bunker", mood: "Dread", grad: "from-violet to-magenta" },
      { t: "00:58", title: "Sealed door, 1984", mood: "Suspense", grad: "from-magenta to-violet" },
      { t: "01:30", title: "What the file never said", mood: "Twist", grad: "from-amber to-violet" },
    ],
    script:
      "The file was three pages. Two of them were redacted. The third said only: 'Do not open Vault 7 until further notice.' That notice never came…",
  },
  {
    slug: "operation-blackbird",
    title: "Operation Blackbird",
    style: "Dark Documentary",
    progress: 23,
    tone: "Investigative",
    thumb: "from-violet to-cyan",
    duration: "10–15 Min",
    scenes: [
      { t: "00:00", title: "Archival footage — Mach 3 takeoff", mood: "Awe", grad: "from-violet to-cyan" },
      { t: "00:24", title: "Pilot interview, blacked out", mood: "Tense", grad: "from-magenta to-violet" },
      { t: "01:02", title: "The mission that never officially happened", mood: "Curiosity", grad: "from-cyan to-emerald" },
    ],
    script:
      "It flew higher than missiles could reach and faster than they could chase. For thirty years, no one was supposed to know what it was looking at…",
  },
];

export function getProject(slug?: string): Project | undefined {
  if (!slug) return undefined;
  return PROJECTS.find((p) => p.slug === slug);
}
