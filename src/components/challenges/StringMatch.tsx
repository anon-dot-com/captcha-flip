"use client";

import { useState, useMemo } from "react";
import { genStringMatch } from "@/lib/generators";

interface Props {
  onSuccess: () => void;
  onFailure: () => void;
  status: string;
}

export default function StringMatch({ onSuccess, onFailure, status }: Props) {
  const challenge = useMemo(() => genStringMatch(), []);
  const { target, options, answer } = challenge;
  const [selected, setSelected] = useState<string | null>(null);

  const submit = () => {
    if (!selected) return;
    if (selected === answer) {
      onSuccess();
    } else {
      onFailure();
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-400">
        Only <span className="text-cyan-400 font-bold">one</span> of these strings is an{" "}
        <span className="text-cyan-400">exact match</span> to the target. The rest have sneaky single-character
        differences. Watch for l/1, O/0, case swaps...
      </p>

      {/* Target string */}
      <div className="mb-6 rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4 text-center">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-cyan-400/70">
          Target String
        </p>
        <p className="font-mono text-xl font-bold tracking-wider text-white sm:text-2xl">
          {target}
        </p>
      </div>

      {/* Options */}
      <div className="mb-6 space-y-2">
        {options.map((opt, i) => {
          const isSelected = selected === opt;
          const isAnswer = opt === answer;
          const showAnswer = status !== "playing" && isAnswer && !isSelected;

          return (
            <button
              key={i}
              onClick={() => status === "playing" && setSelected(opt)}
              disabled={status !== "playing"}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 font-mono text-sm tracking-wider transition-all sm:text-base ${
                isSelected
                  ? "border-cyan-500 bg-cyan-500/10 text-white shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                  : showAnswer
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                  : "border-[#2a2d3a] bg-[#1a1d28] text-zinc-300 hover:border-[#363a4a] hover:text-white"
              } disabled:cursor-default disabled:hover:border-[#2a2d3a] disabled:hover:text-zinc-300`}
            >
              <span
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs ${
                  isSelected
                    ? "border-cyan-500 bg-cyan-500 text-white"
                    : "border-[#2a2d3a] text-zinc-600"
                }`}
              >
                {isSelected ? "✓" : String.fromCharCode(65 + i)}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={submit}
        disabled={status !== "playing" || !selected}
        className="rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-2.5 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_16px_rgba(34,211,238,0.2)] disabled:opacity-50"
      >
        Submit
      </button>
    </div>
  );
}
