"use client";

import { useParams } from "next/navigation";
import { getChallengeBySlug } from "@/lib/challenges";
import ChallengeShell from "@/components/ChallengeShell";
import BinaryDecode from "@/components/challenges/BinaryDecode";
import Base64Onion from "@/components/challenges/Base64Onion";
import RegexMatch from "@/components/challenges/RegexMatch";
import NestedJSON from "@/components/challenges/NestedJSON";
import CharacterCount from "@/components/challenges/CharacterCount";
import MathGauntlet from "@/components/challenges/MathGauntlet";
import CodeOutput from "@/components/challenges/CodeOutput";
import HexColor from "@/components/challenges/HexColor";
import PixelCount from "@/components/challenges/PixelCount";
import SortingMedian from "@/components/challenges/SortingMedian";
import Link from "next/link";

const componentMap: Record<
  string,
  React.ComponentType<{
    onSuccess: () => void;
    onFailure: () => void;
    status: string;
    reset: () => void;
  }>
> = {
  "binary-decode": BinaryDecode,
  "base64-onion": Base64Onion,
  "regex-match": RegexMatch,
  "nested-json": NestedJSON,
  "character-count": CharacterCount,
  "math-gauntlet": MathGauntlet,
  "code-output": CodeOutput,
  "hex-color": HexColor,
  "pixel-count": PixelCount,
  "sorting-median": SortingMedian,
};

export default function ChallengePage() {
  const params = useParams();
  const slug = params.slug as string;
  const challenge = getChallengeBySlug(slug);

  if (!challenge) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
        <h1 className="text-3xl font-bold text-white">
          Challenge not found
        </h1>
        <p className="mt-2 text-zinc-500">
          That challenge doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-2.5 text-sm font-medium text-white"
        >
          Back to challenges
        </Link>
      </div>
    );
  }

  const ChallengeComponent = componentMap[slug];

  if (!ChallengeComponent) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
        <h1 className="text-3xl font-bold text-white">
          Coming soon
        </h1>
        <Link
          href="/"
          className="mt-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-2.5 text-sm font-medium text-white"
        >
          Back to challenges
        </Link>
      </div>
    );
  }

  return (
    <ChallengeShell
      slug={challenge.slug}
      title={challenge.title}
      description={challenge.description}
      difficulty={challenge.difficulty}
    >
      {({ onSuccess, onFailure, status, reset }) => (
        <ChallengeComponent
          onSuccess={onSuccess}
          onFailure={onFailure}
          status={status}
          reset={reset}
        />
      )}
    </ChallengeShell>
  );
}
