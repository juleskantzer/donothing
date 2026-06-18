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
        <main>{children}</main>
      </body>
    </html>
  );
}
