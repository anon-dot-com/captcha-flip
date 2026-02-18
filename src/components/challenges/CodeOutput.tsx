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
    // Case-sensitive comparison but trim whitespace
    if (userAnswer === expected) {
      onSuccess();
    } else {
      onFailure();
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-[#6B7280]">
        What does this JavaScript code output?
        {challenge.answer === "" && (
          <span className="ml-1 text-xs italic">(type &quot;empty string&quot; if the output is empty)</span>
        )}
      </p>
      <pre className="mb-6 overflow-x-auto rounded-lg bg-[#0E1116] p-4 font-mono text-sm leading-relaxed text-gray-300">
        <code>{challenge.code}</code>
      </pre>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && status === "playing" && submit()}
          disabled={status !== "playing"}
          placeholder="Type the exact output…"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-mono text-sm focus:border-[#1B6B4A] focus:outline-none focus:ring-1 focus:ring-[#1B6B4A] disabled:opacity-50"
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
