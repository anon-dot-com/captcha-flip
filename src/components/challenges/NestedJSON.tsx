"use client";

import { useState, useMemo } from "react";
import { genNestedJSON } from "@/lib/generators";

interface Props {
  onSuccess: () => void;
  onFailure: () => void;
  status: string;
}

export default function NestedJSON({ onSuccess, onFailure, status }: Props) {
  const challenge = useMemo(() => genNestedJSON(), []);
  const [input, setInput] = useState("");

  const submit = () => {
    const userVal = input.trim();
    const expected = challenge.answer;
    const normalize = (v: string) => v.replace(/^["']|["']$/g, "").trim();
    if (
      userVal === expected ||
      normalize(userVal) === normalize(expected)
    ) {
      onSuccess();
    } else {
      onFailure();
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-400">
        Find the value at path{" "}
        <code className="rounded-md border border-[#2a2d3a] bg-[#1a1d28] px-1.5 py-0.5 font-mono text-cyan-400">
          {challenge.path}
        </code>
        :
      </p>
      <div className="json-display mb-6 max-h-80 overflow-auto rounded-lg border border-[#2a2d3a] bg-[#0a0c12] p-4 font-mono text-xs text-zinc-400 sm:text-sm">
        {JSON.stringify(challenge.json, null, 2)}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && status === "playing" && input.trim() && submit()}
          disabled={status !== "playing"}
          placeholder="Enter the value…"
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
