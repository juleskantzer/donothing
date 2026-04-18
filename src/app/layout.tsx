import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nothing — there is nothing we can do",
  description: "A curated collection of tools that do absolutely nothing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5]">
        <header className="border-b border-[#222] px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-white font-bold text-lg tracking-widest uppercase">
            nothing
          </a>
          <span className="text-[#555] text-xs tracking-widest">! there is nothing we can do !</span>
        </header>
        <main>{children}</main>
        <footer className="border-t border-[#222] px-6 py-6 text-center text-[#333] text-xs tracking-widest mt-24">
          © nothing. all rights reserved. nothing is reserved.
        </footer>
      </body>
    </html>
  );
}
