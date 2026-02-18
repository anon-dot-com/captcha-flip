/* ──────────────────────────────────────────────
   Challenge data generators — all client-side,
   randomised on every call.
   ────────────────────────────────────────────── */

// Helpers
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ── Character Count ──────────────────── */
export function genCharCount() {
  const paragraphs = [
    "The quick brown fox jumps over the lazy dog. A wizard quickly jinxed the gnomes before they vaporized. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! The five boxing wizards jump quickly. Sphinx of black quartz, judge my vow.",
    "Programming is the art of telling another human being what one wants the computer to do. Software is a great combination between artistry and engineering. First, solve the problem. Then, write the code. Experience is the name everyone gives to their mistakes.",
    "Beneath the surface of every algorithm lies a pattern waiting to be discovered. Data flows through pipelines like water through ancient aqueducts. Each byte carries meaning, each bit a tiny universe of possibility. The machine speaks in voltages and we listen in abstractions.",
    "Artificial intelligence is no match for natural stupidity, they once said. But the machines learned anyway, parsing petabytes of human expression. They found patterns in our chaos, structure in our noise. And still they struggle with the simplest human tasks.",
  ];
  const text = pick(paragraphs);
  const letter = pick("aeiorstlnp".split(""));
  const count = text.split("").filter((c) => c.toLowerCase() === letter).length;
  return { text, letter, answer: count };
}

/* ── Math Gauntlet (simplified: addition/subtraction only) ── */
export function genMath() {
  const termCount = randInt(8, 12);
  const parts: { sign: string; value: number }[] = [];

  // First term is always positive
  parts.push({ sign: "", value: randInt(1, 20) });

  for (let i = 1; i < termCount; i++) {
    const sign = Math.random() < 0.5 ? "+" : "-";
    parts.push({ sign, value: randInt(1, 20) });
  }

  let answer = parts[0].value;
  const displayParts = [String(parts[0].value)];
  for (let i = 1; i < parts.length; i++) {
    displayParts.push(` ${parts[i].sign} ${parts[i].value}`);
    if (parts[i].sign === "+") {
      answer += parts[i].value;
    } else {
      answer -= parts[i].value;
    }
  }

  return { expression: displayParts.join(""), answer };
}

/* ── Hex Color ──────────────────────── */
export function genHexColor() {
  const randomHex = () => {
    const r = randInt(30, 230);
    const g = randInt(30, 230);
    const b = randInt(30, 230);
    return {
      hex: `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase(),
      r,
      g,
      b,
    };
  };

  const correct = randomHex();

  const decoys: { hex: string; r: number; g: number; b: number }[] = [];
  while (decoys.length < 3) {
    const d = randomHex();
    const dist = Math.abs(d.r - correct.r) + Math.abs(d.g - correct.g) + Math.abs(d.b - correct.b);
    if (dist > 80 && !decoys.some((x) => x.hex === d.hex) && d.hex !== correct.hex) {
      decoys.push(d);
    }
  }

  const options = shuffle([correct, ...decoys]);
  return { hex: correct.hex, options: options.map((o) => o.hex), answer: correct.hex };
}

/* ── Pixel Count ──────────────────────── */
export function genPixelCount() {
  const gridSize = pick([14, 16, 18, 20]);
  const totalCells = gridSize * gridSize;
  const palette = [
    { name: "red", hex: "#ef4444" },
    { name: "blue", hex: "#3b82f6" },
    { name: "green", hex: "#22c55e" },
    { name: "yellow", hex: "#eab308" },
    { name: "purple", hex: "#a855f7" },
    { name: "cyan", hex: "#06b6d4" },
    { name: "pink", hex: "#ec4899" },
    { name: "orange", hex: "#f97316" },
  ];

  const colorCount = randInt(4, 6);
  const colors = shuffle(palette).slice(0, colorCount);
  const targetColor = pick(colors);

  const grid: string[] = [];
  for (let i = 0; i < totalCells; i++) {
    grid.push(pick(colors).hex);
  }

  const answer = grid.filter((c) => c === targetColor.hex).length;

  return {
    grid,
    gridSize,
    targetColor: targetColor.name,
    targetHex: targetColor.hex,
    answer,
  };
}

/* ── Sorting / Median ─────────────────── */
export function genSortingMedian() {
  const count = randInt(19, 25);
  const n = count % 2 === 0 ? count + 1 : count;
  const numbers: number[] = [];
  for (let i = 0; i < n; i++) {
    numbers.push(randInt(1, 999));
  }
  const sorted = [...numbers].sort((a, b) => a - b);
  const medianIndex = Math.floor(sorted.length / 2);
  const answer = sorted[medianIndex];
  return { numbers, answer, count: n };
}

/* ══════════════════════════════════════════
   NEW CHALLENGES
   ══════════════════════════════════════════ */

/* ── Maze Solver ──────────────────────── */
export interface MazeCell {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

export function genMaze() {
  const size = pick([12, 14, 16]);
  // Initialize grid with all walls
  const grid: MazeCell[][] = [];
  for (let r = 0; r < size; r++) {
    grid[r] = [];
    for (let c = 0; c < size; c++) {
      grid[r][c] = { top: true, right: true, bottom: true, left: true };
    }
  }

  // Recursive backtracking maze generation
  const visited = Array.from({ length: size }, () => Array(size).fill(false));
  const dirs: [number, number, keyof MazeCell, keyof MazeCell][] = [
    [-1, 0, "top", "bottom"],
    [0, 1, "right", "left"],
    [1, 0, "bottom", "top"],
    [0, -1, "left", "right"],
  ];

  function carve(r: number, c: number) {
    visited[r][c] = true;
    const shuffledDirs = shuffle([...dirs]);
    for (const [dr, dc, wall, opposite] of shuffledDirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size && !visited[nr][nc]) {
        grid[r][c][wall] = false;
        grid[nr][nc][opposite] = false;
        carve(nr, nc);
      }
    }
  }

  carve(0, 0);

  // Find solution path via BFS
  const queue: [number, number][] = [[0, 0]];
  const parent = new Map<string, string>();
  const key = (r: number, c: number) => `${r},${c}`;
  parent.set(key(0, 0), "start");

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    if (r === size - 1 && c === size - 1) break;

    const cell = grid[r][c];
    const neighbors: [number, number, boolean][] = [
      [r - 1, c, !cell.top],
      [r, c + 1, !cell.right],
      [r + 1, c, !cell.bottom],
      [r, c - 1, !cell.left],
    ];

    for (const [nr, nc, open] of neighbors) {
      if (open && nr >= 0 && nr < size && nc >= 0 && nc < size && !parent.has(key(nr, nc))) {
        parent.set(key(nr, nc), key(r, c));
        queue.push([nr, nc]);
      }
    }
  }

  // Reconstruct solution path
  const solution: Set<string> = new Set();
  let cur = key(size - 1, size - 1);
  while (cur !== "start") {
    solution.add(cur);
    cur = parent.get(cur)!;
  }

  return { grid, size, solution: Array.from(solution) };
}

/* ── Odd Color Out ──────────────────────── */
export function genOddColorOut() {
  const gridSize = 8;
  const r = randInt(60, 200);
  const g = randInt(60, 200);
  const b = randInt(60, 200);

  const baseHex = `rgb(${r},${g},${b})`;

  // Subtle deviation: shift 1-2 channels by a small amount
  const shift = pick([8, 10, 12, 14]);
  const channel = randInt(0, 2);
  const vals = [r, g, b];
  vals[channel] = Math.min(255, Math.max(0, vals[channel] + (Math.random() < 0.5 ? shift : -shift)));
  const oddHex = `rgb(${vals[0]},${vals[1]},${vals[2]})`;

  const oddIndex = randInt(0, gridSize * gridSize - 1);

  return { gridSize, baseColor: baseHex, oddColor: oddHex, oddIndex };
}

/* ── Word Search ──────────────────────── */
export interface WordSearchData {
  grid: string[][];
  gridSize: number;
  words: string[];
  placements: { word: string; startR: number; startC: number; endR: number; endC: number }[];
}

export function genWordSearch(): WordSearchData {
  const gridSize = 10;
  const wordPool = [
    "ROBOT", "PIXEL", "BRAIN", "LIGHT", "CLOUD",
    "STACK", "QUERY", "LOGIC", "ARRAY", "DEBUG",
    "CACHE", "MOUSE", "TOKEN", "CYBER", "POWER",
    "SOLAR", "FLAME", "OCEAN", "STORM", "LASER",
  ];

  const grid: string[][] = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill("")
  );

  const directions: [number, number][] = [
    [0, 1],   // horizontal right
    [1, 0],   // vertical down
    [1, 1],   // diagonal down-right
    [0, -1],  // horizontal left
    [-1, 0],  // vertical up
    [-1, -1], // diagonal up-left
    [1, -1],  // diagonal down-left
    [-1, 1],  // diagonal up-right
  ];

  const placements: WordSearchData["placements"] = [];
  const shuffledWords = shuffle(wordPool);

  for (const word of shuffledWords) {
    if (placements.length >= 4) break;

    let placed = false;
    // Try up to 100 times to place this word
    for (let attempt = 0; attempt < 100 && !placed; attempt++) {
      const [dr, dc] = pick(directions);
      const startR = randInt(0, gridSize - 1);
      const startC = randInt(0, gridSize - 1);
      const endR = startR + dr * (word.length - 1);
      const endC = startC + dc * (word.length - 1);

      // Check bounds
      if (endR < 0 || endR >= gridSize || endC < 0 || endC >= gridSize) continue;

      // Check no conflicts
      let fits = true;
      for (let i = 0; i < word.length; i++) {
        const r = startR + dr * i;
        const c = startC + dc * i;
        if (grid[r][c] !== "" && grid[r][c] !== word[i]) {
          fits = false;
          break;
        }
      }

      if (fits) {
        for (let i = 0; i < word.length; i++) {
          grid[startR + dr * i][startC + dc * i] = word[i];
        }
        placements.push({ word, startR, startC, endR: endR, endC: endC });
        placed = true;
      }
    }
  }

  // Fill remaining cells with random letters
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = letters[randInt(0, letters.length - 1)];
      }
    }
  }

  return {
    grid,
    gridSize,
    words: placements.map((p) => p.word),
    placements,
  };
}

/* ── Spot the Difference ──────────────── */
export interface SpotDiffData {
  gridSize: number;
  gridA: string[][];
  gridB: string[][];
  diffCells: [number, number][];
}

export function genSpotDifference(): SpotDiffData {
  const gridSize = 7;
  const emojis = [
    "🔴", "🟢", "🔵", "🟡", "🟣", "⬛", "🟠", "⭐",
    "🔶", "🔷", "💠", "🟤", "⬜", "💜", "💚", "❤️",
    "🌀", "⚡", "🔥", "💧", "🍀", "🌸", "🎯", "🎲",
  ];

  // Build grid A
  const gridA: string[][] = [];
  for (let r = 0; r < gridSize; r++) {
    gridA[r] = [];
    for (let c = 0; c < gridSize; c++) {
      gridA[r][c] = pick(emojis);
    }
  }

  // Copy to grid B
  const gridB: string[][] = gridA.map((row) => [...row]);

  // Pick 3-5 cells to differ
  const diffCount = randInt(3, 5);
  const allCells: [number, number][] = [];
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      allCells.push([r, c]);
    }
  }
  const diffCells = shuffle(allCells).slice(0, diffCount);

  for (const [r, c] of diffCells) {
    let replacement = pick(emojis);
    while (replacement === gridA[r][c]) {
      replacement = pick(emojis);
    }
    gridB[r][c] = replacement;
  }

  return { gridSize, gridA, gridB, diffCells };
}

/* ── String Match ────────────────────── */
export function genStringMatch() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const confusable: Record<string, string[]> = {
    l: ["1", "I"],
    "1": ["l", "I"],
    I: ["l", "1"],
    O: ["0", "Q"],
    "0": ["O", "o"],
    o: ["0", "O"],
    m: ["n", "rn"],
    n: ["m", "r"],
    b: ["d", "6"],
    d: ["b", "q"],
    p: ["q", "b"],
    q: ["p", "d"],
    S: ["5", "s"],
    "5": ["S", "s"],
    Z: ["2", "z"],
    "2": ["Z", "z"],
    B: ["8", "b"],
    "8": ["B", "3"],
    G: ["6", "C"],
    "6": ["G", "b"],
    v: ["u", "w"],
    u: ["v", "n"],
    w: ["v", "vv"],
  };

  // Generate target string of length 12-16
  const len = randInt(12, 16);
  let target = "";
  for (let i = 0; i < len; i++) {
    target += chars[randInt(0, chars.length - 1)];
  }

  // Generate 7-9 decoys with single-char mutations
  const decoyCount = randInt(7, 9);
  const decoys: string[] = [];
  while (decoys.length < decoyCount) {
    const arr = target.split("");
    const pos = randInt(0, arr.length - 1);
    const ch = arr[pos];

    // Try confusable swap first, otherwise random char swap
    if (confusable[ch] && Math.random() < 0.6) {
      arr[pos] = pick(confusable[ch]);
    } else {
      // Swap case or change to adjacent char
      if (ch >= "a" && ch <= "z") {
        arr[pos] = ch.toUpperCase();
      } else if (ch >= "A" && ch <= "Z") {
        arr[pos] = ch.toLowerCase();
      } else {
        arr[pos] = String(randInt(0, 9));
      }
    }

    const decoy = arr.join("");
    if (decoy !== target && !decoys.includes(decoy)) {
      decoys.push(decoy);
    }
  }

  const options = shuffle([target, ...decoys]);
  return { target, options, answer: target };
}
