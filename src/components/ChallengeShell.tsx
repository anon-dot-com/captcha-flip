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
      ? "bg-green-100 text-green-700"
      : difficulty === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 text-sm text-[#6B7280] transition-colors hover:text-[#1A1A1A]"
        >
          ← Back to challenges
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
            {title}
          </h1>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${diffColor}`}>
            {difficulty}
          </span>
          <Timer
            running={status === "playing"}
            onTick={(s) => setSolveTime(s)}
          />
        </div>
        <p className="mt-2 text-[#6B7280]">{description}</p>
      </div>

      {/* Challenge area */}
      <div
        className={`rounded-2xl border bg-white p-6 shadow-sm sm:p-8 ${
          status === "success"
            ? "animate-success border-green-300"
            : status === "failure"
            ? "animate-failure border-red-300"
            : "border-gray-200"
        }`}
        key={key}
      >
        {children({ onSuccess, onFailure, status, reset })}
      </div>

      {/* Feedback */}
      {status !== "playing" && (
        <div
          className={`mt-6 rounded-xl p-6 text-center ${
            status === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {status === "success" ? (
            <>
              <p className="text-2xl font-bold">✅ Correct!</p>
              <p className="mt-1 text-sm">
                Solved in {solveTime} second{solveTime !== 1 ? "s" : ""}. An AI
                would have taken ~0.001s.
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold">❌ Incorrect</p>
              <p className="mt-1 text-sm">
                Are you sure you&apos;re not human? Try again.
              </p>
            </>
          )}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={reset}
              className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-gray-50"
            >
              {status === "failure" ? "Try Again" : "New Challenge"}
            </button>
            {next && (
              <Link
                href={`/challenges/${next.slug}`}
                className="rounded-full bg-[#1B6B4A] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#155a3d]"
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
