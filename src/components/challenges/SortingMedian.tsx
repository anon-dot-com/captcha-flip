"use client";

import { useState, useMemo } from "react";
import { genSortingMedian } from "@/lib/generators";

interface Props {
  onSuccess: () => void;
  onFailure: () => void;
  status: string;
}

export default function SortingMedian({ onSuccess, onFailure, status }: Props) {
  const challenge = useMemo(() => genSortingMedian(), []);
  const [input, setInput] = useState("");

  const submit = () => {
    const userAnswer = parseInt(input.trim(), 10);
    if (!isNaN(userAnswer) && userAnswer === challenge.answer) {
      onSuccess();
    } else {
      onFailure();
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-400">
        Sort these <span className="font-mono text-cyan-400">{challenge.count}</span>{" "}
        numbers mentally and find the{" "}
        <span className="font-bold text-purple-400">median</span> value:
      </p>

      <div className="mb-6 rounded-lg border border-[#2a2d3a] bg-[#0a0c12] p-5">
        <div className="flex flex-wrap gap-2">
          {challenge.numbers.map((n, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-md border border-[#2a2d3a] bg-[#1a1d28] px-2.5 py-1 font-mono text-sm text-zinc-300"
            >
              {n}
            </span>
          ))}
        </div>
      </div>

      <p className="mb-4 text-xs text-zinc-600">
        Tip: The median is the middle value when all numbers are sorted from
        smallest to largest.{" "}
        <span className="text-zinc-700">
          An AI sorts {challenge.count} numbers in ~0.0001s. No pressure.
        </span>
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && status === "playing" && input.trim() && submit()}
          disabled={status !== "playing"}
          placeholder="Enter the median…"
          className="w-40 rounded-lg border border-[#2a2d3a] bg-[#1a1d28] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-cyan-500 focus:outline-none disabled:opacity-50"
        />
        <button
          onClick={submit}
          disabled={status !== "playing" || !input.trim()}
          className="rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-2.5 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_16px_rgba(167,139,250,0.2)] disabled:opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
