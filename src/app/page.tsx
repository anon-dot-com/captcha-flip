import Link from "next/link";
import { challenges } from "@/lib/challenges";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0E1116] px-6 py-24 text-center text-white sm:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px), repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px)",
          }} />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800/50 px-4 py-1.5 text-sm text-gray-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#2A9D6E]" />
            Reverse CAPTCHA v1.0
          </div>
          <h1 className="font-serif text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            CAPTCHA{" "}
            <span className="bg-gradient-to-r from-[#2A9D6E] to-[#C4A052] bg-clip-text text-transparent">
              Flip
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 sm:text-2xl">
            Prove you&apos;re <em>NOT</em> human.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-400">
            Challenges that any AI agent solves in milliseconds — but make
            humans sweat. Can you keep up with the machines?
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#challenges"
              className="rounded-full bg-[#1B6B4A] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#155a3d]"
            >
              Take the Challenge
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-gray-600 px-8 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-gray-400 hover:text-white"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Bear analogy */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            <span className="text-5xl">🐻</span>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                The Bear-Proof Trashcan Problem
              </h2>
              <p className="mt-3 text-[#6B7280] leading-relaxed">
                There&apos;s a famous quip from Yosemite Park rangers:{" "}
                <em>
                  &quot;There is considerable overlap between the intelligence
                  of the smartest bears and the dumbest tourists.&quot;
                </em>
              </p>
              <p className="mt-3 text-[#6B7280] leading-relaxed">
                Traditional CAPTCHAs face the same dilemma — AI keeps getting
                smarter, and the tests designed to stop bots now mostly just
                annoy humans. So we flipped it: what if the CAPTCHA is{" "}
                <strong>easy for AI</strong> and <strong>hard for humans</strong>?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge grid */}
      <section id="challenges" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">
            Choose Your Challenge
          </h2>
          <p className="mt-2 text-[#6B7280]">
            8 tasks. Each one trivial for silicon, tedious for carbon.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {challenges.map((c) => (
            <Link key={c.slug} href={`/challenges/${c.slug}`}>
              <div className="challenge-card group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white"
                  style={{ backgroundColor: c.color }}
                >
                  {c.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A] group-hover:text-[#1B6B4A]">
                  {c.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
                  {c.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      c.difficulty === "Easy"
                        ? "bg-green-100 text-green-700"
                        : c.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.difficulty}
                  </span>
                  <span className="text-sm text-[#1B6B4A] opacity-0 transition-opacity group-hover:opacity-100">
                    Start →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0E1116] px-6 py-16 text-center text-white">
        <h2 className="font-serif text-3xl font-bold">Ready to fail?</h2>
        <p className="mt-3 text-gray-400">
          The average human takes 47× longer than GPT-4 on these challenges.
        </p>
        <Link
          href="#challenges"
          className="mt-8 inline-block rounded-full bg-[#C4A052] px-8 py-3 text-sm font-semibold text-[#0E1116] transition-colors hover:bg-[#b8923f]"
        >
          Prove You&apos;re Not Human
        </Link>
      </section>
    </div>
  );
}
