export interface ChallengeInfo {
  slug: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  icon: string;
  color: string;
}

export const challenges: ChallengeInfo[] = [
  {
    slug: "character-count",
    title: "Character Count",
    description: "Count exact occurrences of a specific letter in a wall of text. Your eyes will lie to you.",
    difficulty: "Medium",
    icon: "#",
    color: "#f472b6",
  },
  {
    slug: "math-gauntlet",
    title: "Math Gauntlet",
    description: "Add and subtract a long chain of numbers without losing your place. No tricks, just tedium.",
    difficulty: "Medium",
    icon: "∑",
    color: "#fb923c",
  },
  {
    slug: "hex-color",
    title: "Hex Color",
    description: "Given a hex color code, pick the correct swatch from four options. AI sees colors in numbers.",
    difficulty: "Easy",
    icon: "🎨",
    color: "#34d399",
  },
  {
    slug: "pixel-count",
    title: "Pixel Count",
    description: "Count the exact number of pixels of a specific color in a noisy grid. No mistakes allowed.",
    difficulty: "Hard",
    icon: "🔲",
    color: "#06b6d4",
  },
  {
    slug: "sorting-median",
    title: "Sorting Challenge",
    description: "Sort 20+ numbers in your head and find the median. Trivial for a CPU, torture for a brain.",
    difficulty: "Hard",
    icon: "↕",
    color: "#a855f7",
  },
  {
    slug: "maze-solver",
    title: "Maze Solver",
    description: "Trace a path through the maze from start to finish. BFS solves it instantly. You won't.",
    difficulty: "Medium",
    icon: "🔀",
    color: "#22d3ee",
  },
  {
    slug: "odd-color-out",
    title: "Odd Color Out",
    description: "One square is slightly different from the rest. Find it before your eyes blur. AI spots it in pixels.",
    difficulty: "Hard",
    icon: "👁",
    color: "#a78bfa",
  },
  {
    slug: "word-search",
    title: "Word Search",
    description: "Find hidden words in a letter grid. AI parses the entire grid in microseconds. You get to squint.",
    difficulty: "Medium",
    icon: "🔍",
    color: "#fbbf24",
  },
  {
    slug: "spot-the-difference",
    title: "Spot the Difference",
    description: "Two emoji grids, a few subtle swaps. Find every difference. AI diffs arrays; you diff vibes.",
    difficulty: "Hard",
    icon: "🔎",
    color: "#f97316",
  },
  {
    slug: "string-match",
    title: "String Match",
    description: "One string matches exactly. The rest have sneaky single-char differences. l vs 1, O vs 0. Good luck.",
    difficulty: "Medium",
    icon: "≡",
    color: "#ec4899",
  },
];

export function getChallengeBySlug(slug: string): ChallengeInfo | undefined {
  return challenges.find((c) => c.slug === slug);
}

export function getNextChallenge(currentSlug: string): ChallengeInfo | undefined {
  const idx = challenges.findIndex((c) => c.slug === currentSlug);
  if (idx === -1 || idx === challenges.length - 1) return challenges[0];
  return challenges[idx + 1];
}
