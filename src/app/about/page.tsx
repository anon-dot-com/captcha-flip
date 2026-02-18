import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-white">
        About CAPTCHA Flip
      </h1>
      <p className="mt-4 text-lg text-zinc-400">
        A thought experiment turned interactive demo.
      </p>

      {/* Bear Story */}
      <section className="mt-12">
        <div className="flex items-start gap-4">
          <span className="text-4xl">🐻</span>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              The Bear-Proof Trashcan
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-zinc-400">
              <p>
                In national parks across America, engineers have spent decades
                designing bear-proof trashcans. The challenge? They must be
                complex enough to outsmart a 300-pound black bear — but simple
                enough for your average tired, distracted tourist.
              </p>
              <p>
                As one Yosemite ranger put it:{" "}
                <em className="text-cyan-400">
                  &quot;There is considerable overlap between the intelligence of
                  the smartest bears and the dumbest tourists.&quot;
                </em>
              </p>
              <p>
                CAPTCHAs face the same fundamental problem. They sit at the
                intersection of two populations whose capabilities are rapidly
                converging: humans trying to prove they&apos;re human, and AI
                systems getting better at pretending to be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Arms Race */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          The Arms Race
        </h2>
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-[#2a2d3a] bg-[#13151d] p-6">
            <h3 className="font-semibold text-zinc-200">Phase 1: Distorted Text</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              The original CAPTCHAs showed warped letters. OCR got good enough
              to read them. Humans started failing more than bots.
            </p>
          </div>
          <div className="rounded-xl border border-[#2a2d3a] bg-[#13151d] p-6">
            <h3 className="font-semibold text-zinc-200">Phase 2: Image Recognition</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              &quot;Click all the traffic lights.&quot; Then vision models surpassed
              human accuracy on ImageNet. The arms race escalated.
            </p>
          </div>
          <div className="rounded-xl border border-[#2a2d3a] bg-[#13151d] p-6">
            <h3 className="font-semibold text-zinc-200">Phase 3: Behavioral Analysis</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              reCAPTCHA v3 watches how you move your mouse. But AI agents can
              simulate human-like behavior. The line keeps blurring.
            </p>
          </div>
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6">
            <h3 className="font-semibold text-cyan-400">Phase 4: The Flip ↻</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              What if we stop fighting it? Instead of testing what humans can do
              that AI can&apos;t, test what AI can do that humans can&apos;t.
              Maze solving, pixel counting, string matching, color spotting —
              anyone <em>can</em> do them, but they&apos;re painfully slow for
              humans and trivial for machines.
            </p>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Why This Exists
        </h2>
        <div className="mt-4 space-y-4 leading-relaxed text-zinc-400">
          <p>
            CAPTCHA Flip is a playful exploration of a real tension in
            computing: as AI capabilities grow, the traditional notion of
            &quot;prove you&apos;re human&quot; becomes increasingly absurd.
          </p>
          <p>
            Each challenge in this app is something a language model or script
            solves in milliseconds — mazes via BFS, color comparisons via pixel
            values, string matching via exact comparison. For a human, the same
            task requires squinting, counting, tracing, and careful visual
            attention — sometimes taking minutes.
          </p>
          <p>
            It&apos;s not a real authentication system. It&apos;s a mirror. Try
            the challenges, notice where you struggle, and consider what that
            says about the shifting boundary between human and machine
            intelligence.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-16 rounded-2xl border border-[#2a2d3a] bg-[#13151d] p-8">
        <h2 className="text-2xl font-bold tracking-tight text-white">By the Numbers</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div>
            <p className="text-3xl font-bold text-cyan-400">10</p>
            <p className="mt-1 text-sm text-zinc-500">Challenges</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-amber-400">&lt;1s</p>
            <p className="mt-1 text-sm text-zinc-500">AI solve time</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-emerald-400">47×</p>
            <p className="mt-1 text-sm text-zinc-500">Human slowdown</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-400">∞</p>
            <p className="mt-1 text-sm text-zinc-500">Frustration potential</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Link
          href="/"
          className="inline-block rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-[0_0_24px_rgba(34,211,238,0.3)]"
        >
          ← Back to Challenges
        </Link>
      </div>
    </div>
  );
}
