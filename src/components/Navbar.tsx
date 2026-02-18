"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-[#2a2d3a] bg-[#0c0e14]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 text-sm font-bold text-white transition-shadow group-hover:shadow-[0_0_16px_rgba(34,211,238,0.3)]">
            ↻
          </span>
          <span className="text-lg font-bold tracking-tight text-white">
            CAPTCHA Flip
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/"
                ? "text-cyan-400"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Challenges
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors ${
              pathname === "/about"
                ? "text-cyan-400"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
