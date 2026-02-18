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
    // Normalize comparison: strip quotes for string answers
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
      <p className="mb-2 text-sm font-medium text-[#6B7280]">
        Find the value at path <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[#1B6B4A]">{challenge.path}</code>:
      </p>
      <div className="json-display mb-6 max-h-80 overflow-auto rounded-lg bg-[#0E1116] p-4 font-mono text-xs text-gray-300 sm:text-sm">
        {JSON.stringify(challenge.json, null, 2)}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && status === "playing" && submit()}
          disabled={status !== "playing"}
          placeholder="Enter the value…"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#1B6B4A] focus:outline-none focus:ring-1 focus:ring-[#1B6B4A] disabled:opacity-50"
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
