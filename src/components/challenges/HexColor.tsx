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
      <p className="mb-2 text-sm font-medium text-[#6B7280]">
        Which swatch matches this hex color?
      </p>
      <div className="mb-6 rounded-lg bg-[#0E1116] p-4 text-center font-mono text-2xl font-bold text-white">
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
                ? "border-[#1A1A1A] ring-2 ring-[#1B6B4A] ring-offset-2"
                : "border-gray-200 hover:border-gray-300"
            } ${status !== "playing" ? "pointer-events-none" : ""}`}
            style={{ backgroundColor: hex }}
          >
            <span className="rounded bg-white/80 px-2 py-0.5 text-xs font-mono text-gray-700 backdrop-blur-sm">
              {selected === hex ? "Selected" : ""}
            </span>
          </button>
        ))}
      </div>
      <button
        onClick={submit}
        disabled={status !== "playing" || !selected}
        className="rounded-lg bg-[#1B6B4A] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#155a3d] disabled:opacity-50"
      >
        Submit
      </button>
    </div>
  );
}
