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

/* ── 1. Binary Decode ──────────────────────── */
export function genBinary() {
  const words = [
    "hello", "world", "robot", "agent", "pixel", "brain",
    "logic", "debug", "bytes", "stack", "parse", "query",
    "linux", "cache", "cloud", "async", "array", "class",
  ];
  const word = pick(words);
  const binary = word
    .split("")
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
  return { binary, answer: word };
}

/* ── 2. Base64 Onion ──────────────────────── */
export function genBase64Onion() {
  const words = [
    "cipher", "neural", "matrix", "kernel", "daemon",
    "socket", "tensor", "packet", "bitmap", "cursor",
  ];
  const word = pick(words);
  const layers = randInt(3, 5);
  let encoded = word;
  for (let i = 0; i < layers; i++) {
    encoded = btoa(encoded);
  }
  return { encoded, layers, answer: word };
}

/* ── 3. Regex Match ──────────────────────── */
export function genRegex() {
  const challenges = [
    {
      pattern: "^[a-z]+\\d{2,}$",
      display: "^[a-z]+\\d{2,}$",
      strings: ["hello42", "Test99", "abc1", "foo123", "BAR77", "zip00"],
      matches: ["hello42", "foo123", "zip00"],
    },
    {
      pattern: "^\\d{3}-[A-Z]{2}$",
      display: "^\\d{3}-[A-Z]{2}$",
      strings: ["123-AB", "45-CD", "999-XY", "000-ab", "100-ZZ", "12-A"],
      matches: ["123-AB", "999-XY", "100-ZZ"],
    },
    {
      pattern: "\\b\\w{5}\\b",
      display: "\\b\\w{5}\\b",
      strings: ["apple", "hi", "world", "abcde", "no", "12345"],
      matches: ["apple", "world", "abcde", "12345"],
    },
    {
      pattern: "^[aeiou].*[aeiou]$",
      display: "^[aeiou].*[aeiou]$",
      strings: ["apple", "orange", "idea", "echo", "umbrella", "ice"],
      matches: ["apple", "orange", "idea", "umbrella", "ice"],
    },
    {
      pattern: "^(?!.*\\d).{4,6}$",
      display: "^(?!.*\\d).{4,6}$",
      strings: ["hello", "abc", "world!", "test1", "abcdef", "hi"],
      matches: ["hello", "world!", "abcdef"],
    },
  ];
  const ch = pick(challenges);
  const shuffled = shuffle(ch.strings);
  return { pattern: ch.display, strings: shuffled, matches: ch.matches };
}

/* ── 4. Nested JSON ──────────────────────── */
export function genNestedJSON() {
  const names = ["alpha", "beta", "gamma", "delta", "epsilon"];
  const colors = ["red", "blue", "green", "violet", "amber"];
  const animals = ["fox", "owl", "elk", "bee", "ant"];

  const targetValue = pick(["42", "true", '"secret"', '"found_me"', "3.14"]);
  const pathParts = shuffle(names).slice(0, 4);
  const dotPath = pathParts.join(".");

  // Build the object with noise
  const buildObj = (parts: string[], depth: number): Record<string, unknown> => {
    const obj: Record<string, unknown> = {};
    // Add noise siblings
    const noiseKeys = shuffle([...colors, ...animals]).slice(0, randInt(2, 4));
    for (const k of noiseKeys) {
      obj[k] = depth > 2 ? randInt(1, 100) : { [pick(names)]: randInt(1, 99) };
    }
    if (parts.length === 1) {
      // We insert the raw string for the value (will be parsed for comparison)
      obj[parts[0]] = JSON.parse(targetValue);
    } else {
      obj[parts[0]] = buildObj(parts.slice(1), depth + 1);
    }
    return obj;
  };

  const json = buildObj(pathParts, 0);
  return { json, path: dotPath, answer: targetValue };
}

/* ── 5. Character Count ──────────────────── */
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

/* ── 6. Math Gauntlet ──────────────────────── */
export function genMath() {
  // Build an expression with proper precedence traps
  const templates = [
    { expr: () => { const a=randInt(2,9),b=randInt(2,9),c=randInt(1,5),d=randInt(10,20); return { display: `${a} + ${b} × ${c} - ${d}`, answer: a + b * c - d }; }},
    { expr: () => { const a=randInt(2,5),b=randInt(2,4),c=randInt(3,7),d=randInt(1,3); return { display: `${a} × ${b} + ${c} × ${d} - ${a}`, answer: a * b + c * d - a }; }},
    { expr: () => { const a=randInt(10,30),b=randInt(2,5),c=randInt(3,8),d=randInt(2,4),e=randInt(1,5); return { display: `${a} - ${b} × ${c} + ${d} × ${e}`, answer: a - b * c + d * e }; }},
    { expr: () => { const a=randInt(2,6),b=randInt(2,6),c=randInt(2,4),d=randInt(1,9),e=randInt(2,5); return { display: `(${a} + ${b}) × ${c} - ${d} + ${e}`, answer: (a + b) * c - d + e }; }},
    { expr: () => { const a=randInt(100,200),b=randInt(3,9),c=randInt(10,25),d=randInt(2,5),e=randInt(5,15); return { display: `${a} - ${b} × (${c} - ${d}) + ${e}`, answer: a - b * (c - d) + e }; }},
  ];
  const t = pick(templates);
  const result = t.expr();
  return { expression: result.display, answer: result.answer };
}

/* ── 7. Code Output ──────────────────────── */
export function genCodeOutput() {
  const snippets = [
    {
      code: `console.log(typeof typeof 1)`,
      answer: "string",
    },
    {
      code: `console.log(0.1 + 0.2 === 0.3)`,
      answer: "false",
    },
    {
      code: `console.log([..."hello"].reverse().join(""))`,
      answer: "olleh",
    },
    {
      code: `console.log(+"")`,
      answer: "0",
    },
    {
      code: `console.log([] + [])`,
      answer: "",
      answerDisplay: "(empty string)",
    },
    {
      code: `console.log(null == undefined)`,
      answer: "true",
    },
    {
      code: `console.log(typeof NaN)`,
      answer: "number",
    },
    {
      code: `const a = [1, 2, 3];\nconsole.log(a.length = 0);\nconsole.log(a)`,
      answer: "0\n[]",
    },
    {
      code: `console.log("b" + "a" + +"a" + "a")`,
      answer: "baNaNa",
    },
    {
      code: `console.log(1 < 2 < 3)`,
      answer: "true",
    },
    {
      code: `console.log(3 > 2 > 1)`,
      answer: "false",
    },
    {
      code: `console.log([10, 9, 8, 1, 2, 3].sort().toString())`,
      answer: "1,10,2,3,8,9",
    },
  ];
  return pick(snippets);
}

/* ── 8. Hex Color ──────────────────────────── */
export function genHexColor() {
  const randomHex = () => {
    const r = randInt(30, 230);
    const g = randInt(30, 230);
    const b = randInt(30, 230);
    return { hex: `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase(), r, g, b };
  };

  const correct = randomHex();

  // Generate 3 decoys that are noticeably different
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
