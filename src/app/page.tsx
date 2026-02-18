import Link from "next/link";
import { challenges } from "@/lib/challenges";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="grid-bg relative overflow-hidden px-6 py-24 text-center sm:py-32">
        {/* Glow orbs */}
        <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="pointer-events-none absolute right-1/4 top-20 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-purple-500/5 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2a2d3a] bg-[#13151d]/80 px-4 py-1.5 text-sm text-zinc-400 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-mono text-xs">reverse-captcha v1.0</span>
          </div>
          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
            CAPTCHA{" "}
            <span className="text-gradient">
              Flip
            </span>
          </h1>
          <p className="mt-6 text-xl text-zinc-300 sm:text-2xl">
            Prove you&apos;re <em className="not-italic text-cyan-400">NOT</em> human.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-500">
            Challenges that any AI agent solves in milliseconds — but make
            humans sweat. Can you keep up with the machines?
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#challenges"
              className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-[0_0_24px_rgba(34,211,238,0.3)]"
            >
              Take the Challenge
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-[#2a2d3a] px-8 py-3 text-sm font-semibold text-zinc-400 transition-all hover:border-zinc-500 hover:text-white"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Bear analogy */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-2xl border border-[#2a2d3a] bg-[#13151d] p-8 shadow-lg sm:p-12">
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            <span className="text-5xl">🐻</span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                The Bear-Proof Trashcan Problem
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-400">
                There&apos;s a famous quip from Yosemite Park rangers:{" "}
                <em className="text-zinc-300">
                  &quot;There is considerable overlap between the intelligence
                  of the smartest bears and the dumbest tourists.&quot;
                </em>
              </p>
              <p className="mt-3 leading-relaxed text-zinc-400">
                Traditional CAPTCHAs face the same dilemma — AI keeps getting
                smarter, and the tests designed to stop bots now mostly just
                annoy humans. So we flipped it: what if the CAPTCHA is{" "}
                <span className="text-cyan-400">easy for AI</span> and{" "}
                <span className="text-purple-400">hard for humans</span>?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge grid */}
      <section id="challenges" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Choose Your Challenge
          </h2>
          <p className="mt-2 text-zinc-500">
            10 tasks. Each one trivial for silicon, tedious for carbon.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {challenges.map((c) => (
            <Link key={c.slug} href={`/challenges/${c.slug}`}>
              <div className="challenge-card group flex h-full flex-col rounded-2xl border border-[#2a2d3a] bg-[#13151d] p-6">
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white transition-shadow group-hover:shadow-[0_0_16px_rgba(34,211,238,0.2)]"
                  style={{ backgroundColor: c.color }}
                >
                  {c.icon}
                </div>
                <h3 className="text-lg font-bold text-white transition-colors group-hover:text-cyan-400">
                  {c.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">
                  {c.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                      c.difficulty === "Easy"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : c.difficulty === "Medium"
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                        : "border-red-500/30 bg-red-500/10 text-red-400"
                    }`}
                  >
                    {c.difficulty}
                  </span>
                  <span className="font-mono text-sm text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
                    start →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#2a2d3a] px-6 py-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Ready to fail?
        </h2>
        <p className="mt-3 text-zinc-500">
          The average human takes 47× longer than GPT-4 on these challenges.{" "}
          <span className="text-zinc-600">That&apos;s not a flex.</span>
        </p>
        <Link
          href="#challenges"
          className="mt-8 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-8 py-3 text-sm font-semibold text-amber-400 transition-all hover:bg-amber-500/20 hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]"
        >
          Prove You&apos;re Not Human
        </Link>
      </section>
    </div>
  );
}
