"use client";

import { useState, useMemo, useCallback } from "react";
import { genWordSearch } from "@/lib/generators";

interface Props {
  onSuccess: () => void;
  onFailure: () => void;
  status: string;
}

interface Selection {
  startR: number;
  startC: number;
  endR: number;
  endC: number;
  word: string;
}

export default function WordSearch({ onSuccess, onFailure, status }: Props) {
  const challenge = useMemo(() => genWordSearch(), []);
  const { grid, gridSize, words, placements } = challenge;
  const [firstClick, setFirstClick] = useState<[number, number] | null>(null);
  const [found, setFound] = useState<Selection[]>([]);

  const getCellsInLine = useCallback(
    (r1: number, c1: number, r2: number, c2: number): [number, number][] | null => {
      const dr = r2 - r1;
      const dc = c2 - c1;

      // Must be horizontal, vertical, or diagonal
      if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;

      const steps = Math.max(Math.abs(dr), Math.abs(dc));
      if (steps === 0) return [[r1, c1]];

      const stepR = dr / steps;
      const stepC = dc / steps;
      const cells: [number, number][] = [];
      for (let i = 0; i <= steps; i++) {
        cells.push([r1 + stepR * i, c1 + stepC * i]);
      }
      return cells;
    },
    []
  );

  const isHighlighted = useCallback(
    (r: number, c: number): boolean => {
      for (const sel of found) {
        const cells = getCellsInLine(sel.startR, sel.startC, sel.endR, sel.endC);
        if (cells?.some(([cr, cc]) => cr === r && cc === c)) return true;
      }
      return false;
    },
    [found, getCellsInLine]
  );

  const handleCellClick = (r: number, c: number) => {
    if (status !== "playing") return;

    if (firstClick === null) {
      setFirstClick([r, c]);
      return;
    }

    const [r1, c1] = firstClick;
    setFirstClick(null);

    // Check if this selection matches a word
    const cells = getCellsInLine(r1, c1, r, c);
    if (!cells) return;

    // Extract word from grid
    const selectedWord = cells.map(([cr, cc]) => grid[cr][cc]).join("");
    const reversedWord = [...selectedWord].reverse().join("");

    // Check against placements
    for (const placement of placements) {
      if (found.some((f) => f.word === placement.word)) continue; // Already found

      const placementCells = getCellsInLine(
        placement.startR,
        placement.startC,
        placement.endR,
        placement.endC
      );
      if (!placementCells) continue;

      // Check if cells match (forward or backward selection)
      const matches =
        (selectedWord === placement.word || reversedWord === placement.word) &&
        cells.length === placementCells.length;

      if (matches) {
        const newFound = [...found, { startR: r1, startC: c1, endR: r, endC: c, word: placement.word }];
        setFound(newFound);

        // Check if all words found
        if (newFound.length === words.length) {
          onSuccess();
        }
        return;
      }
    }
  };

  const submit = () => {
    if (found.length === words.length) {
      onSuccess();
    } else {
      onFailure();
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-400">
        Find these words in the grid. Click the <span className="text-cyan-400">first letter</span>, then the{" "}
        <span className="text-cyan-400">last letter</span> of each word.
      </p>

      {/* Words to find */}
      <div className="mb-4 flex flex-wrap gap-2">
        {words.map((word) => {
          const isFound = found.some((f) => f.word === word);
          return (
            <span
              key={word}
              className={`rounded-full border px-3 py-1 font-mono text-sm font-medium transition-all ${
                isFound
                  ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300 line-through"
                  : "border-[#2a2d3a] bg-[#1a1d28] text-zinc-300"
              }`}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Grid */}
      <div className="flex justify-center mb-6">
        <div
          className="grid gap-[1px] rounded-lg border border-[#2a2d3a] bg-[#0a0c12] p-3"
          style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
        >
          {grid.map((row, r) =>
            row.map((letter, c) => {
              const highlighted = isHighlighted(r, c);
              const isFirst = firstClick && firstClick[0] === r && firstClick[1] === c;

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  disabled={status !== "playing"}
                  className={`flex h-9 w-9 items-center justify-center rounded font-mono text-sm font-bold transition-all sm:h-10 sm:w-10 ${
                    highlighted
                      ? "bg-emerald-500/30 text-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                      : isFirst
                      ? "bg-cyan-500/30 text-cyan-300 ring-2 ring-cyan-400"
                      : "bg-[#1a1d28] text-zinc-300 hover:bg-[#252836] hover:text-white"
                  } disabled:cursor-default disabled:hover:bg-[#1a1d28] disabled:hover:text-zinc-300`}
                >
                  {letter}
                </button>
              );
            })
          )}
        </div>
      </div>

      {firstClick && (
        <p className="mb-3 text-center text-xs text-cyan-400">
          Now click the last letter of the word...
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          onClick={submit}
          disabled={status !== "playing"}
          className="rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-2.5 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_16px_rgba(34,211,238,0.2)] disabled:opacity-50"
        >
          Submit ({found.length}/{words.length} found)
        </button>
        <span className="text-xs text-zinc-600">
          {found.length === words.length
            ? "All words found! Submit to verify."
            : `${words.length - found.length} word${words.length - found.length !== 1 ? "s" : ""} remaining`}
        </span>
      </div>
    </div>
  );
}
