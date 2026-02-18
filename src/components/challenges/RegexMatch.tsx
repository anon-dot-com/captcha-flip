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
      <p className="mb-2 text-sm font-medium text-[#6B7280]">
        Select <strong>all</strong> strings that match this regex:
      </p>
      <div className="mb-6 rounded-lg bg-[#0E1116] p-4 font-mono text-sm text-amber-400">
        /{challenge.pattern}/
      </div>
      <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {challenge.strings.map((s) => (
          <label
            key={s}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
              selected.has(s)
                ? "border-[#1B6B4A] bg-[#1B6B4A]/5"
                : "border-gray-200 hover:border-gray-300"
            } ${status !== "playing" ? "pointer-events-none opacity-70" : ""}`}
          >
            <input
              type="checkbox"
              checked={selected.has(s)}
              onChange={() => toggle(s)}
              className="h-4 w-4 rounded border-gray-300 text-[#1B6B4A] focus:ring-[#1B6B4A]"
            />
            <span className="font-mono text-sm">{s}</span>
          </label>
        ))}
      </div>
      <button
        onClick={submit}
        disabled={status !== "playing" || selected.size === 0}
        className="rounded-lg bg-[#1B6B4A] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#155a3d] disabled:opacity-50"
      >
        Submit
      </button>
    </div>
  );
}
