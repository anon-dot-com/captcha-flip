"use client";

import { useState, useMemo } from "react";
import { genCharCount } from "@/lib/generators";

interface Props {
  onSuccess: () => void;
  onFailure: () => void;
  status: string;
}

export default function CharacterCount({ onSuccess, onFailure, status }: Props) {
  const challenge = useMemo(() => genCharCount(), []);
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
      <p className="mb-2 text-sm font-medium text-[#6B7280]">
        Count every occurrence of the letter{" "}
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#1B6B4A] font-mono text-base font-bold text-white">
          {challenge.letter}
        </span>{" "}
        (case-insensitive) in the text below:
      </p>
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm leading-relaxed text-[#1A1A1A]">
        {challenge.text}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && status === "playing" && submit()}
          disabled={status !== "playing"}
          placeholder="Enter the count…"
          className="w-32 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#1B6B4A] focus:outline-none focus:ring-1 focus:ring-[#1B6B4A] disabled:opacity-50"
        />
        <button
          onClick={submit}
          disabled={status !== "playing" || !input.trim()}
          className="rounded-lg bg-[#1B6B4A] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#155a3d] disabled:opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
