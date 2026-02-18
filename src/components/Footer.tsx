export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#0E1116] py-12 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔄</span>
            <span className="font-serif text-lg font-bold">CAPTCHA Flip</span>
          </div>
          <p className="text-sm text-gray-400">
            Proving humanity is overrated. Built for the AI age.
          </p>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} CAPTCHA Flip. No humans were harmed in the making of this site.
        </div>
      </div>
    </footer>
  );
}
