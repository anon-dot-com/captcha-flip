"use client";

import { useState, useMemo } from "react";
import { genPixelCount } from "@/lib/generators";

interface Props {
  onSuccess: () => void;
  onFailure: () => void;
  status: string;
}

export default function PixelCount({ onSuccess, onFailure, status }: Props) {
  const challenge = useMemo(() => genPixelCount(), []);
  const [input, setInput] = useState("");

  const submit = () => {
    if (parseInt(input.trim(), 10) === challenge.answer) {
      onSuccess();
    } else {
      onFailure();
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-400">
        Count every{" "}
        <span
          className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2d3a] bg-[#1a1d28] px-2 py-0.5 font-mono text-sm font-bold"
          style={{ color: challenge.targetHex }}
        >
          <span
            className="inline-block h-3 w-3 rounded-sm"
            style={{ backgroundColor: challenge.targetHex }}
          />
          {challenge.targetColor}
        </span>{" "}
        pixel in the grid below:
      </p>

      <div className="mb-6 flex justify-center overflow-auto rounded-lg border border-[#2a2d3a] bg-[#0a0c12] p-4">
        <div
          className="grid gap-[1px]"
          style={{
            gridTemplateColumns: `repeat(${challenge.gridSize}, 1fr)`,
            width: `${challenge.gridSize * 18}px`,
          }}
        >
          {challenge.grid.map((hex, i) => (
            <div
              key={i}
              className="h-[16px] w-[16px] rounded-[1px]"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && status === "playing" && input.trim() && submit()}
          disabled={status !== "playing"}
          placeholder="Enter the count…"
          className="w-32 rounded-lg border border-[#2a2d3a] bg-[#1a1d28] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-cyan-500 focus:outline-none disabled:opacity-50"
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
