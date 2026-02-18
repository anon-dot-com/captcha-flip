export default function Footer() {
  return (
    <footer className="border-t border-[#2a2d3a] bg-[#0a0c12] py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-cyan-500 to-purple-500 text-xs font-bold text-white">
              ↻
            </span>
            <span className="text-lg font-bold tracking-tight text-white">
              CAPTCHA Flip
            </span>
          </div>
          <p className="text-sm text-zinc-500">
            Proving humanity is overrated. Built for the AI age.
          </p>
        </div>
        <div className="mt-8 border-t border-[#1a1d28] pt-6 text-center text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} CAPTCHA Flip. No humans were harmed
          in the making of this site.{" "}
          <span className="hidden sm:inline">
            (A few were mildly frustrated.)
          </span>
        </div>
      </div>
    </footer>
  );
}
