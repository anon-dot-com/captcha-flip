"use client";

import { useState, useMemo } from "react";
import { genRegex } from "@/lib/generators";

interface Props {
  onSuccess: () => void;
  onFailure: () => void;
  status: string;
}

export default function RegexMatch({ onSuccess, onFailure, status }: Props) {
  const challenge = useMemo(() => genRegex(), []);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (s: string) => {
    if (status !== "playing") return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  };

  const submit = () => {
    const correct = new Set(challenge.matches);
    const isCorrect =
      selected.size === correct.size &&
      [...selected].every((s) => correct.has(s));
    if (isCorrect) onSuccess();
    else onFailure();
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-400">
        Select <strong className="text-zinc-200">all</strong> strings that match this regex:
      </p>
      <div className="mb-6 rounded-lg border border-[#2a2d3a] bg-[#0a0c12] p-4 font-mono text-sm text-amber-400">
        /{challenge.pattern}/
      </div>
      <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {challenge.strings.map((s) => (
          <label
            key={s}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${
              selected.has(s)
                ? "border-cyan-500/50 bg-cyan-500/10"
                : "border-[#2a2d3a] hover:border-[#363a4a]"
            } ${status !== "playing" ? "pointer-events-none opacity-70" : ""}`}
          >
            <input
              type="checkbox"
              checked={selected.has(s)}
              onChange={() => toggle(s)}
              className="h-4 w-4 rounded border-[#2a2d3a] bg-[#1a1d28] text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
            />
            <span className="font-mono text-sm text-zinc-300">{s}</span>
          </label>
        ))}
      </div>
      <button
        onClick={submit}
        disabled={status !== "playing" || selected.size === 0}
        className="rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-2.5 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_16px_rgba(34,211,238,0.2)] disabled:opacity-50"
      >
        Submit
      </button>
    </div>
  );
}
