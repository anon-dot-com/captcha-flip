"use client";

import { useState, useMemo } from "react";
import { genHexColor } from "@/lib/generators";

interface Props {
  onSuccess: () => void;
  onFailure: () => void;
  status: string;
}

export default function HexColor({ onSuccess, onFailure, status }: Props) {
  const challenge = useMemo(() => genHexColor(), []);
  const [selected, setSelected] = useState<string | null>(null);

  const submit = () => {
    if (!selected) return;
    if (selected === challenge.answer) {
      onSuccess();
    } else {
      onFailure();
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-400">
        Which swatch matches this hex color?
      </p>
      <div className="mb-6 rounded-lg border border-[#2a2d3a] bg-[#0a0c12] p-4 text-center font-mono text-2xl font-bold text-white">
        {challenge.hex}
      </div>
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {challenge.options.map((hex) => (
          <button
            key={hex}
            onClick={() => status === "playing" && setSelected(hex)}
            disabled={status !== "playing"}
            className={`flex h-24 items-center justify-center rounded-xl border-2 transition-all sm:h-28 ${
              selected === hex
                ? "border-cyan-500 shadow-[0_0_16px_rgba(34,211,238,0.2)]"
                : "border-[#2a2d3a] hover:border-[#363a4a]"
            } ${status !== "playing" ? "pointer-events-none" : ""}`}
            style={{ backgroundColor: hex }}
          >
            <span className="rounded bg-black/50 px-2 py-0.5 font-mono text-xs text-white backdrop-blur-sm">
              {selected === hex ? "✓ Selected" : ""}
            </span>
          </button>
        ))}
      </div>
      <button
        onClick={submit}
        disabled={status !== "playing" || !selected}
        className="rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-2.5 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_16px_rgba(34,211,238,0.2)] disabled:opacity-50"
      >
        Submit
      </button>
    </div>
  );
}
