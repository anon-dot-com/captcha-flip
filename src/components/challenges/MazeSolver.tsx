"use client";

import { useState, useMemo, useCallback } from "react";
import { genMaze, type MazeCell } from "@/lib/generators";

interface Props {
  onSuccess: () => void;
  onFailure: () => void;
  status: string;
}

export default function MazeSolver({ onSuccess, onFailure, status }: Props) {
  const challenge = useMemo(() => genMaze(), []);
  const { grid, size, solution } = challenge;
  const [traced, setTraced] = useState<Set<string>>(new Set(["0,0"]));
  const [isDrawing, setIsDrawing] = useState(false);

  const key = (r: number, c: number) => `${r},${c}`;
  const endKey = key(size - 1, size - 1);

  const canReach = useCallback(
    (from: string, to: string, mazeGrid: MazeCell[][]) => {
      const [fr, fc] = from.split(",").map(Number);
      const [tr, tc] = to.split(",").map(Number);
      // Must be adjacent
      if (Math.abs(fr - tr) + Math.abs(fc - tc) !== 1) return false;
      const cell = mazeGrid[fr][fc];
      if (tr === fr - 1 && !cell.top) return true;
      if (tr === fr + 1 && !cell.bottom) return true;
      if (tc === fc + 1 && !cell.right) return true;
      if (tc === fc - 1 && !cell.left) return true;
      return false;
    },
    []
  );

  const toggleCell = useCallback(
    (r: number, c: number) => {
      if (status !== "playing") return;
      const k = key(r, c);

      setTraced((prev) => {
        const next = new Set(prev);
        if (next.has(k)) {
          // Don't un-toggle start
          if (k !== "0,0") next.delete(k);
        } else {
          // Check if adjacent to any already-traced cell via open wall
          let connected = false;
          for (const existing of next) {
            if (canReach(existing, k, grid)) {
              connected = true;
              break;
            }
          }
          if (connected) next.add(k);
        }
        return next;
      });
    },
    [status, grid, canReach]
  );

  const handleCellEnter = useCallback(
    (r: number, c: number) => {
      if (!isDrawing || status !== "playing") return;
      const k = key(r, c);
      setTraced((prev) => {
        if (prev.has(k)) return prev;
        let connected = false;
        for (const existing of prev) {
          if (canReach(existing, k, grid)) {
            connected = true;
            break;
          }
        }
        if (!connected) return prev;
        const next = new Set(prev);
        next.add(k);
        return next;
      });
    },
    [isDrawing, status, grid, canReach]
  );

  const submit = () => {
    // Check: does the traced path reach the end?
    // Use BFS on traced cells to check connectivity from start to end
    if (!traced.has(endKey)) {
      onFailure();
      return;
    }

    const visited = new Set<string>();
    const queue = ["0,0"];
    visited.add("0,0");

    while (queue.length > 0) {
      const cur = queue.shift()!;
      if (cur === endKey) {
        onSuccess();
        return;
      }
      const [cr, cc] = cur.split(",").map(Number);
      const neighbors = [
        [cr - 1, cc],
        [cr + 1, cc],
        [cr, cc - 1],
        [cr, cc + 1],
      ];
      for (const [nr, nc] of neighbors) {
        const nk = key(nr, nc);
        if (traced.has(nk) && !visited.has(nk) && canReach(cur, nk, grid)) {
          visited.add(nk);
          queue.push(nk);
        }
      }
    }

    onFailure();
  };

  const cellPx = size <= 12 ? 32 : size <= 14 ? 28 : 24;

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-400">
        Trace a path from{" "}
        <span className="font-bold text-emerald-400">START</span> (top-left) to{" "}
        <span className="font-bold text-red-400">END</span> (bottom-right).
        Click cells or drag to draw your path through open passages.
      </p>
      <p className="mb-4 text-xs text-zinc-600">
        AI uses BFS to solve any maze in microseconds. You get to squint at walls.
      </p>

      <div
        className="relative mx-auto mb-6 select-none overflow-auto rounded-lg border border-[#2a2d3a] bg-[#0a0c12] p-3"
        onMouseLeave={() => setIsDrawing(false)}
      >
        <div
          className="mx-auto"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${size}, ${cellPx}px)`,
            gridTemplateRows: `repeat(${size}, ${cellPx}px)`,
            width: size * cellPx,
          }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const k = key(r, c);
              const isStart = r === 0 && c === 0;
              const isEnd = r === size - 1 && c === size - 1;
              const isTraced = traced.has(k);
              const isSolution = solution.includes(k);

              return (
                <div
                  key={k}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setIsDrawing(true);
                    toggleCell(r, c);
                  }}
                  onMouseEnter={() => handleCellEnter(r, c)}
                  onMouseUp={() => setIsDrawing(false)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    toggleCell(r, c);
                  }}
                  className={`relative cursor-pointer transition-colors duration-75 ${
                    status !== "playing" && isSolution && !isTraced
                      ? "bg-amber-500/20"
                      : isTraced
                      ? isStart
                        ? "bg-emerald-500/60"
                        : isEnd
                        ? "bg-red-500/60"
                        : "bg-cyan-500/40"
                      : "bg-[#1a1d28] hover:bg-[#252836]"
                  }`}
                  style={{
                    width: cellPx,
                    height: cellPx,
                    borderTop: cell.top ? "2px solid #555" : "2px solid transparent",
                    borderRight: cell.right ? "2px solid #555" : "2px solid transparent",
                    borderBottom: cell.bottom ? "2px solid #555" : "2px solid transparent",
                    borderLeft: cell.left ? "2px solid #555" : "2px solid transparent",
                  }}
                >
                  {isStart && (
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-emerald-300">
                      S
                    </span>
                  )}
                  {isEnd && (
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-red-300">
                      E
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          onClick={submit}
          disabled={status !== "playing" || !traced.has(endKey)}
          className="rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-2.5 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_16px_rgba(34,211,238,0.2)] disabled:opacity-50"
        >
          Submit Path
        </button>
        <button
          onClick={() => setTraced(new Set(["0,0"]))}
          disabled={status !== "playing"}
          className="rounded-lg border border-[#2a2d3a] px-4 py-2.5 text-sm text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white disabled:opacity-50"
        >
          Clear Path
        </button>
        <span className="text-xs text-zinc-600">
          {traced.size} cell{traced.size !== 1 ? "s" : ""} traced
        </span>
      </div>
    </div>
  );
}
