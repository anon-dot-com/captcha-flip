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
      <p className="mb-2 text-sm font-medium text-[#6B7280]">
        Evaluate this expression (standard operator precedence):
      </p>
      <div className="mb-6 rounded-lg bg-[#0E1116] p-6 text-center font-mono text-xl text-white sm:text-2xl">
        {challenge.expression}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && status === "playing" && submit()}
          disabled={status !== "playing"}
          placeholder="= ?"
          className="w-40 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#1B6B4A] focus:outline-none focus:ring-1 focus:ring-[#1B6B4A] disabled:opacity-50"
        />
        <button
          onClick={submit}
          disabled={status !== "playing" || !input.trim()}
          className="rounded-lg bg-[#1B6B4A] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#155a3d] disabled:opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
