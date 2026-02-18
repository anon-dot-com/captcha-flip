"use client";

import { useState, useMemo } from "react";
import { genCodeOutput } from "@/lib/generators";

interface Props {
  onSuccess: () => void;
  onFailure: () => void;
  status: string;
}

export default function CodeOutput({ onSuccess, onFailure, status }: Props) {
  const challenge = useMemo(() => genCodeOutput(), []);
  const [input, setInput] = useState("");

  const submit = () => {
    const userAnswer = input.trim();
    const expected = challenge.answer.trim();
    if (userAnswer === expected) {
      onSuccess();
    } else {
      onFailure();
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-400">
        What does this JavaScript code output?
        {challenge.answer === "" && (
          <span className="ml-1 text-xs italic text-zinc-600">
            (type &quot;empty string&quot; if the output is empty)
          </span>
        )}
      </p>
      <pre className="mb-6 overflow-x-auto rounded-lg border border-[#2a2d3a] bg-[#0a0c12] p-4 font-mono text-sm leading-relaxed text-zinc-300">
        <code>{challenge.code}</code>
      </pre>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && status === "playing" && input.trim() && submit()}
          disabled={status !== "playing"}
          placeholder="Type the exact output…"
          className="flex-1 rounded-lg border border-[#2a2d3a] bg-[#1a1d28] px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-600 focus:border-cyan-500 focus:outline-none disabled:opacity-50"
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
