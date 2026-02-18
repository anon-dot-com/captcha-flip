"use client";

import { useParams } from "next/navigation";
import { getChallengeBySlug } from "@/lib/challenges";
import ChallengeShell from "@/components/ChallengeShell";
import CharacterCount from "@/components/challenges/CharacterCount";
import MathGauntlet from "@/components/challenges/MathGauntlet";
import HexColor from "@/components/challenges/HexColor";
import PixelCount from "@/components/challenges/PixelCount";
import SortingMedian from "@/components/challenges/SortingMedian";
import MazeSolver from "@/components/challenges/MazeSolver";
import OddColorOut from "@/components/challenges/OddColorOut";
import WordSearch from "@/components/challenges/WordSearch";
import SpotDifference from "@/components/challenges/SpotDifference";
import StringMatch from "@/components/challenges/StringMatch";
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
  "character-count": CharacterCount,
  "math-gauntlet": MathGauntlet,
  "hex-color": HexColor,
  "pixel-count": PixelCount,
  "sorting-median": SortingMedian,
  "maze-solver": MazeSolver,
  "odd-color-out": OddColorOut,
  "word-search": WordSearch,
  "spot-the-difference": SpotDifference,
  "string-match": StringMatch,
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
