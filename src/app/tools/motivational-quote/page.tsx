"use client";

import { useState } from "react";

const quotes = [
  { text: "", author: "— Ancient Proverb" },
  { text: "   ", author: "— Unknown" },
  { text: "", author: "— Someone, probably" },
  { text: "        ", author: "— Confucius" },
  { text: "", author: "— Your inner voice" },
  { text: "   ", author: "— Einstein (allegedly)" },
  { text: "", author: "— The universe" },
];

export default function MotivationalQuote() {
  const [quote, setQuote] = useState<typeof quotes[0] | null>(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  async function generate() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setCount((c) => c + 1);
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <a href="/" className="text-[#444] text-xs tracking-widest hover:text-[#666] transition-colors mb-8 inline-block">
        ← back to nothing
      </a>

      <div className="mb-10">
        <span className="text-[10px] tracking-widest text-[#444] uppercase border border-[#2a2a2a] px-2 py-0.5 rounded-sm">
          Productivity
        </span>
        <h1 className="text-3xl font-bold text-white mt-4 mb-2 tracking-tight">
          Motivational Quote Generator
        </h1>
        <p className="text-[#555] text-sm leading-relaxed">
          Our model was trained on 47 billion motivational quotes to synthesize the most
          impactful, transformative wisdom possible.
        </p>
      </div>

      {/* Quote display */}
      <div className="border border-[#222] bg-[#0d0d0d] p-10 mb-6 min-h-[160px] flex flex-col items-center justify-center rounded-sm">
        {!quote && !loading && (
          <p className="text-[#2a2a2a] text-sm tracking-widest">your quote will appear here</p>
        )}
        {loading && (
          <div className="text-center space-y-2">
            <div className="text-[#333] text-xs blink tracking-widest">synthesizing wisdom...</div>
          </div>
        )}
        {quote && !loading && (
          <div className="fade-in text-center">
            <div className="text-4xl text-[#1a1a1a] mb-2">&ldquo;</div>
            <p className="text-white text-lg min-h-[2rem] italic">{quote.text.trim() || "\u00a0"}</p>
            <div className="text-4xl text-[#1a1a1a] mt-2">&rdquo;</div>
            <p className="text-[#444] text-xs mt-4 tracking-widest">{quote.author}</p>
          </div>
        )}
      </div>

      <button
        onClick={generate}
        disabled={loading}
        className="w-full py-3 bg-white text-black text-sm font-semibold tracking-widest uppercase hover:bg-[#e5e5e5] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? "Thinking..." : "Generate Quote"}
      </button>

      {count > 0 && (
        <p className="text-center text-[#333] text-xs mt-4">
          {count} quote{count !== 1 ? "s" : ""} generated — {count * 0} words of wisdom delivered
        </p>
      )}

      {count >= 3 && (
        <div className="mt-8 border border-[#1a1a1a] bg-[#0d0d0d] p-4 text-xs text-[#444] fade-in">
          <p className="text-[#555] mb-1">Pro tip:</p>
          <p>If you&apos;re not feeling inspired yet, try generating more quotes. Each one contains the same amount of insight as the last.</p>
        </div>
      )}
    </div>
  );
}
