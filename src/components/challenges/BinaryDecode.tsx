"use client";

import { useState, useMemo } from "react";
import { genBinary } from "@/lib/generators";

interface Props {
  onSuccess: () => void;
  onFailure: () => void;
  status: string;
}

export default function BinaryDecode({ onSuccess, onFailure, status }: Props) {
  const challenge = useMemo(() => genBinary(), []);
  const [input, setInput] = useState("");

  const submit = () => {
    if (input.trim().toLowerCase() === challenge.answer) {
      onSuccess();
    } else {
      onFailure();
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-400">
        Decode this binary string to ASCII text:
      </p>
      <div className="mb-6 overflow-x-auto rounded-lg border border-[#2a2d3a] bg-[#0a0c12] p-4 font-mono text-sm leading-relaxed text-emerald-400 sm:text-base">
        {challenge.binary}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && status === "playing" && input.trim() && submit()}
          disabled={status !== "playing"}
          placeholder="Type the decoded word…"
          className="flex-1 rounded-lg border border-[#2a2d3a] bg-[#1a1d28] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-cyan-500 focus:outline-none disabled:opacity-50"
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
