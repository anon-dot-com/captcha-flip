"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-[#FAFAF8]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🔄</span>
          <span className="font-serif text-xl font-bold text-[#1A1A1A]">
            CAPTCHA Flip
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/"
                ? "text-[#1B6B4A]"
                : "text-[#6B7280] hover:text-[#1A1A1A]"
            }`}
          >
            Challenges
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors ${
              pathname === "/about"
                ? "text-[#1B6B4A]"
                : "text-[#6B7280] hover:text-[#1A1A1A]"
            }`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
