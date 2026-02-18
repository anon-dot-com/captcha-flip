"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  running: boolean;
  onTick?: (seconds: number) => void;
}

export default function Timer({ running, onTick }: TimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds((s) => {
        const next = s + 1;
        onTick?.(next);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, onTick]);

  useEffect(() => {
    if (running) setSeconds(0);
  }, [running]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#2a2d3a] bg-[#13151d] px-3 py-1 font-mono text-sm text-cyan-400">
      <svg
        className={`h-3.5 w-3.5 ${running ? "animate-pulse" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
      {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
    </div>
  );
}
