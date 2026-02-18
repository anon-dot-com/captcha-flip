"use client";

import { useState, useMemo } from "react";
import { genMath } from "@/lib/generators";

interface Props {
  onSuccess: () => void;
  onFailure: () => void;
  status: string;
}

export default function MathGauntlet({ onSuccess, onFailure, status }: Props) {
  const challenge = useMemo(() => genMath(), []);
  const [input, setInput] = useState("");

  const submit = () => {
    const userAnswer = parseFloat(input.trim());
    if (!isNaN(userAnswer) && Math.abs(userAnswer - challenge.answer) < 0.01) {
      onSuccess();
    } else {
      onFailure();
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-400">
        Add and subtract all of these numbers. Just raw arithmetic — no tricks, no precedence:
      </p>
      <div className="mb-6 rounded-lg border border-[#2a2d3a] bg-[#0a0c12] p-6 text-center font-mono text-xl text-white sm:text-2xl">
        {challenge.expression}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && status === "playing" && input.trim() && submit()}
          disabled={status !== "playing"}
          placeholder="= ?"
          className="w-40 rounded-lg border border-[#2a2d3a] bg-[#1a1d28] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-cyan-500 focus:outline-none disabled:opacity-50"
        />
        <button
          onClick={submit}
          disabled={status !== "playing" || !input.trim()}
          className="rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-2.5 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_16px_rgba(34,211,238,0.2)] disabled:opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
