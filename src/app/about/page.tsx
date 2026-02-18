import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-[#1A1A1A]">
        About CAPTCHA Flip
      </h1>
      <p className="mt-4 text-lg text-[#6B7280]">
        A thought experiment turned interactive demo.
      </p>

      {/* Bear Story */}
      <section className="mt-12">
        <div className="flex items-start gap-4">
          <span className="text-4xl">🐻</span>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              The Bear-Proof Trashcan
            </h2>
            <div className="mt-4 space-y-4 text-[#1A1A1A] leading-relaxed">
              <p>
                In national parks across America, engineers have spent decades
                designing bear-proof trashcans. The challenge? They must be
                complex enough to outsmart a 300-pound black bear — but simple
                enough for your average tired, distracted tourist.
              </p>
              <p>
                As one Yosemite ranger put it:{" "}
                <em className="text-[#1B6B4A]">
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
        <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
          The Arms Race
        </h2>
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-semibold text-[#1A1A1A]">Phase 1: Distorted Text</h3>
            <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">
              The original CAPTCHAs showed warped letters. OCR got good enough
              to read them. Humans started failing more than bots.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-semibold text-[#1A1A1A]">Phase 2: Image Recognition</h3>
            <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">
              &quot;Click all the traffic lights.&quot; Then vision models surpassed
              human accuracy on ImageNet. The arms race escalated.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-semibold text-[#1A1A1A]">Phase 3: Behavioral Analysis</h3>
            <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">
              reCAPTCHA v3 watches how you move your mouse. But AI agents can
              simulate human-like behavior. The line keeps blurring.
            </p>
          </div>
          <div className="rounded-xl border border-[#1B6B4A]/30 bg-[#1B6B4A]/5 p-6">
            <h3 className="font-semibold text-[#1B6B4A]">Phase 4: The Flip ↻</h3>
            <p className="mt-2 text-sm text-[#1A1A1A] leading-relaxed">
              What if we stop fighting it? Instead of testing what humans can do
              that AI can&apos;t, test what AI can do that humans can&apos;t.
              Binary decoding, regex matching, JSON traversal — these are
              trivial for machines and genuinely difficult for people.
            </p>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mt-16">
        <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
          Why This Exists
        </h2>
        <div className="mt-4 space-y-4 text-[#1A1A1A] leading-relaxed">
          <p>
            CAPTCHA Flip is a playful exploration of a real tension in
            computing: as AI capabilities grow, the traditional notion of
            &quot;prove you&apos;re human&quot; becomes increasingly absurd.
          </p>
          <p>
            Each challenge in this app is something a language model or script
            solves in milliseconds. For a human, the same task requires focused
            attention, manual computation, and careful reading — sometimes
            taking minutes.
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
      <section className="mt-16 rounded-2xl bg-[#0E1116] p-8 text-white">
        <h2 className="font-serif text-2xl font-bold">By the Numbers</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div>
            <p className="text-3xl font-bold text-[#2A9D6E]">8</p>
            <p className="mt-1 text-sm text-gray-400">Challenges</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#C4A052]">&lt;1s</p>
            <p className="mt-1 text-sm text-gray-400">AI solve time</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#2A9D6E]">47×</p>
            <p className="mt-1 text-sm text-gray-400">Human slowdown</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#C4A052]">∞</p>
            <p className="mt-1 text-sm text-gray-400">Frustration potential</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Link
          href="/"
          className="inline-block rounded-full bg-[#1B6B4A] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#155a3d]"
        >
          ← Back to Challenges
        </Link>
      </div>
    </div>
  );
}
