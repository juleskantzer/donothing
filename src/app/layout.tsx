import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "nothing — there is nothing we can do",
  description: "A curated collection of tools that do absolutely nothing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fafaf8] text-[#1a1a1a]">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
