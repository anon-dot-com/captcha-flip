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
    slug: "binary-decode",
    title: "Binary Decode",
    description: "Convert a binary string to ASCII text. Trivial for silicon, tedious for carbon.",
    difficulty: "Easy",
    icon: "01",
    color: "#06b6d4",
  },
  {
    slug: "base64-onion",
    title: "Base64 Onion",
    description: "A word encoded in base64 multiple times. Peel back every layer.",
    difficulty: "Medium",
    icon: "🧅",
    color: "#34d399",
  },
  {
    slug: "regex-match",
    title: "Regex Match",
    description: "Given a regex pattern, select every string that matches. All of them.",
    difficulty: "Medium",
    icon: ".*",
    color: "#fbbf24",
  },
  {
    slug: "nested-json",
    title: "Nested JSON",
    description: "Navigate a deeply nested JSON object to find a value at a specific path.",
    difficulty: "Hard",
    icon: "{}",
    color: "#a78bfa",
  },
  {
    slug: "character-count",
    title: "Character Count",
    description: "Count exact occurrences of a specific letter in a wall of text.",
    difficulty: "Medium",
    icon: "#",
    color: "#f472b6",
  },
  {
    slug: "math-gauntlet",
    title: "Math Gauntlet",
    description: "Evaluate a long math expression with proper operator precedence.",
    difficulty: "Hard",
    icon: "∑",
    color: "#fb923c",
  },
  {
    slug: "code-output",
    title: "Code Output",
    description: "Read a JavaScript snippet and predict the exact output. Watch for edge cases.",
    difficulty: "Hard",
    icon: "JS",
    color: "#22d3ee",
  },
  {
    slug: "hex-color",
    title: "Hex Color",
    description: "Given a hex color code, pick the correct swatch from four options.",
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
];

export function getChallengeBySlug(slug: string): ChallengeInfo | undefined {
  return challenges.find((c) => c.slug === slug);
}

export function getNextChallenge(currentSlug: string): ChallengeInfo | undefined {
  const idx = challenges.findIndex((c) => c.slug === currentSlug);
  if (idx === -1 || idx === challenges.length - 1) return challenges[0];
  return challenges[idx + 1];
}
