"use client";

import { useState, useCallback, type ReactNode } from "react";
import Link from "next/link";
import Timer from "./Timer";
import { getNextChallenge } from "@/lib/challenges";

type Status = "playing" | "success" | "failure";

interface ChallengeShellProps {
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  children: (props: {
    onSuccess: () => void;
    onFailure: () => void;
    status: Status;
    reset: () => void;
  }) => ReactNode;
}

const suspiciousMessages = [
  "Suspiciously accurate. Are you sure you're not a bot?",
  "That's exactly what a language model would say...",
  "Hmm. No human should get that right.",
  "Running additional verification... you seem too perfect.",
  "Only silicon gets it right that fast.",
];

const humanMessages = [
  "Confirmed human. You beautifully failed.",
  "Congratulations! Your inability proves your humanity.",
  "That's the wrong answer — which is the right answer.",
  "Peak human performance. Welcome to the club.",
  "Error: too human. Verification complete.",
];

function pickRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function ChallengeShell({
  slug,
  title,
  description,
  difficulty,
  children,
}: ChallengeShellProps) {
  const [status, setStatus] = useState<Status>("playing");
  const [solveTime, setSolveTime] = useState(0);
  const [key, setKey] = useState(0);
  const [feedbackMsg] = useState(() => ({
    suspicious: pickRandom(suspiciousMessages),
    human: pickRandom(humanMessages),
  }));

  const next = getNextChallenge(slug);

  const onSuccess = useCallback(() => setStatus("success"), []);
  const onFailure = useCallback(() => setStatus("failure"), []);
  const reset = useCallback(() => {
    setStatus("playing");
    setSolveTime(0);
    setKey((k) => k + 1);
  }, []);

  const diffColor =
    difficulty === "Easy"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
      : difficulty === "Medium"
      ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
      : "border-red-500/30 bg-red-500/10 text-red-400";

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-cyan-400"
        >
          ← Back to challenges
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {title}
          </h1>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${diffColor}`}
          >
            {difficulty}
          </span>
          <Timer
            running={status === "playing"}
            onTick={(s) => setSolveTime(s)}
          />
        </div>
        <p className="mt-2 text-zinc-400">{description}</p>
      </div>

      {/* Challenge area */}
      <div
        className={`rounded-2xl border p-6 shadow-lg sm:p-8 ${
          status === "success"
            ? "animate-success border-amber-500/50 bg-[#13151d] shadow-amber-500/10"
            : status === "failure"
            ? "animate-failure border-emerald-500/50 bg-[#13151d] shadow-emerald-500/10"
            : "border-[#2a2d3a] bg-[#13151d]"
        }`}
        key={key}
      >
        {children({ onSuccess, onFailure, status, reset })}
      </div>

      {/* Feedback — FLIPPED! Correct = suspicious, Wrong = human */}
      {status !== "playing" && (
        <div
          className={`mt-6 rounded-xl border p-6 text-center ${
            status === "success"
              ? "border-amber-500/30 bg-amber-500/5 text-amber-300"
              : "border-emerald-500/30 bg-emerald-500/5 text-emerald-300"
          }`}
        >
          {status === "success" ? (
            <>
              <p className="text-2xl font-bold">⚠️ {feedbackMsg.suspicious}</p>
              <p className="mt-2 text-sm text-amber-400/70">
                You solved this in {solveTime}s. GPT-4 does it in ~0.003s.{" "}
                {solveTime < 5
                  ? "That's uncomfortably close."
                  : solveTime < 15
                  ? "Hmm, still faster than most humans..."
                  : "OK, you're probably human. Probably."}
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold">✅ {feedbackMsg.human}</p>
              <p className="mt-2 text-sm text-emerald-400/70">
                You got it wrong in {solveTime}s. An AI would never.{" "}
                Humanity verified.
              </p>
            </>
          )}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={reset}
              className="rounded-full border border-[#2a2d3a] bg-[#1a1d28] px-5 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:text-white"
            >
              {status === "failure" ? "Try Again" : "New Challenge"}
            </button>
            {next && (
              <Link
                href={`/challenges/${next.slug}`}
                className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-2 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
              >
                Next Challenge →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
