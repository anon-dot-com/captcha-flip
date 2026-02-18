"use client";

import { useMemo } from "react";
import { genOddColorOut } from "@/lib/generators";

interface Props {
  onSuccess: () => void;
  onFailure: () => void;
  status: string;
}

export default function OddColorOut({ onSuccess, onFailure, status }: Props) {
  const challenge = useMemo(() => genOddColorOut(), []);
  const { gridSize, baseColor, oddColor, oddIndex } = challenge;
  const totalCells = gridSize * gridSize;

  const handleClick = (index: number) => {
    if (status !== "playing") return;
    if (index === oddIndex) {
      onSuccess();
    } else {
      onFailure();
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-400">
        One square is a <span className="text-purple-400 font-bold">slightly different color</span> from the rest.
        Find it and click it.
      </p>
      <p className="mb-4 text-xs text-zinc-600">
        AI compares exact RGB values. You have to trust your eyes. They&apos;re not as good as you think.
      </p>

      <div className="flex justify-center mb-6">
        <div
          className="grid gap-[2px] rounded-lg border border-[#2a2d3a] bg-[#0a0c12] p-3"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: `${gridSize * 46 + (gridSize - 1) * 2 + 24}px`,
          }}
        >
          {Array.from({ length: totalCells }, (_, i) => {
            const isOdd = i === oddIndex;
            return (
              <button
                key={i}
                onClick={() => handleClick(i)}
                disabled={status !== "playing"}
                className={`h-[44px] w-[44px] rounded-md transition-all ${
                  status !== "playing" && isOdd
                    ? "ring-2 ring-purple-400 ring-offset-1 ring-offset-[#0a0c12]"
                    : "hover:scale-110 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                } disabled:cursor-default disabled:hover:scale-100 disabled:hover:shadow-none`}
                style={{ backgroundColor: isOdd ? oddColor : baseColor }}
              />
            );
          })}
        </div>
      </div>

      <p className="text-center text-xs text-zinc-600">
        Click the square that looks different. One wrong click = human confirmed.
      </p>
    </div>
  );
}
