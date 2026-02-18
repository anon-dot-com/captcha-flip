import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CAPTCHA Flip — Prove You're NOT Human",
  description:
    "Reverse CAPTCHAs that AI agents solve trivially but humans struggle with. Inspired by the bear-proof trashcan problem.",
  openGraph: {
    title: "CAPTCHA Flip",
    description: "Prove you're NOT human. Reverse CAPTCHAs for the AI age.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0c0e14] text-[#e4e4e7]`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
