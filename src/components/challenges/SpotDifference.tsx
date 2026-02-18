"use client";

import { useState, useMemo, useCallback } from "react";
import { genSpotDifference } from "@/lib/generators";

interface Props {
  onSuccess: () => void;
  onFailure: () => void;
  status: string;
}

export default function SpotDifference({ onSuccess, onFailure, status }: Props) {
  const challenge = useMemo(() => genSpotDifference(), []);
  const { gridSize, gridA, gridB, diffCells } = challenge;
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const key = (r: number, c: number) => `${r},${c}`;
  const diffSet = useMemo(
    () => new Set(diffCells.map(([r, c]) => key(r, c))),
    [diffCells]
  );

  const toggleCell = useCallback(
    (r: number, c: number) => {
      if (status !== "playing") return;
      const k = key(r, c);
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(k)) {
          next.delete(k);
        } else {
          next.add(k);
        }
        return next;
      });
    },
    [status]
  );

  const submit = () => {
    // Check if selected cells exactly match diff cells
    if (selected.size !== diffSet.size) {
      onFailure();
      return;
    }
    for (const k of selected) {
      if (!diffSet.has(k)) {
        onFailure();
        return;
      }
    }
    onSuccess();
  };

  const renderGrid = (gridData: string[][], interactive: boolean, label: string) => (
    <div>
      <p className="mb-2 text-center text-xs font-medium text-zinc-500 uppercase tracking-wider">
        {label}
      </p>
      <div
        className="grid gap-[2px] rounded-lg border border-[#2a2d3a] bg-[#0a0c12] p-2"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {gridData.map((row, r) =>
          row.map((emoji, c) => {
            const k = key(r, c);
            const isSelected = selected.has(k);
            const isDiff = diffSet.has(k);
            const showDiff = status !== "playing" && isDiff;

            return (
              <button
                key={k}
                onClick={() => interactive && toggleCell(r, c)}
                disabled={!interactive || status !== "playing"}
                className={`flex h-10 w-10 items-center justify-center rounded text-lg transition-all sm:h-11 sm:w-11 ${
                  interactive
                    ? isSelected
                      ? "bg-cyan-500/30 ring-2 ring-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                      : showDiff
                      ? "bg-amber-500/30 ring-2 ring-amber-400"
                      : "bg-[#1a1d28] hover:bg-[#252836]"
                    : showDiff
                    ? "bg-amber-500/30 ring-2 ring-amber-400"
                    : "bg-[#1a1d28]"
                } disabled:cursor-default`}
              >
                {emoji}
              </button>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-400">
        These two emoji grids are <em>almost</em> identical.{" "}
        <span className="text-cyan-400 font-bold">{diffCells.length} cells</span> are different.
        Click the different cells on <span className="text-cyan-400">Grid B</span>.
      </p>
      <p className="mb-4 text-xs text-zinc-600">
        AI diffs two arrays in O(n). You get to play spot-the-difference with emoji.
      </p>

      <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
        {renderGrid(gridA, false, "Grid A (reference)")}
        {renderGrid(gridB, true, "Grid B (click differences)")}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
        <button
          onClick={submit}
          disabled={status !== "playing" || selected.size === 0}
          className="rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-2.5 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_16px_rgba(34,211,238,0.2)] disabled:opacity-50"
        >
          Submit ({selected.size}/{diffCells.length} selected)
        </button>
        <button
          onClick={() => setSelected(new Set())}
          disabled={status !== "playing"}
          className="rounded-lg border border-[#2a2d3a] px-4 py-2.5 text-sm text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white disabled:opacity-50"
        >
          Clear Selection
        </button>
      </div>
    </div>
  );
}
