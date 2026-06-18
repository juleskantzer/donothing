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
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-[calc(100vh-9rem)] flex flex-col justify-center">
      <a href="/" className="text-[#8a8a8a] text-xs tracking-widest hover:text-[#5a5a5a] transition-colors mb-8 inline-block self-start">
        ← back to nothing
      </a>

      <div className="mb-10 text-center">
        <span className="text-[10px] tracking-widest text-[#8a8a8a] uppercase border border-[#dcdcdc] px-2 py-0.5 rounded-sm">
          Productivity
        </span>
        <h1 className="text-3xl font-bold text-[#141414] mt-4 mb-2 tracking-tight">
          Motivational Quote Generator
        </h1>
        <p className="text-[#707070] text-sm leading-relaxed">
          Our model was trained on 47 billion motivational quotes to synthesize the most
          impactful, transformative wisdom possible.
        </p>
      </div>

      {/* Quote display */}
      <div className="border border-[#e2e2e0] bg-[#f7f7f5] p-10 mb-6 min-h-[160px] flex flex-col items-center justify-center rounded-sm">
        {!quote && !loading && (
          <p className="text-[#dcdcdc] text-sm tracking-widest">your quote will appear here</p>
        )}
        {loading && (
          <div className="text-center space-y-2">
            <div className="text-[#b0b0b0] text-xs blink tracking-widest">synthesizing wisdom...</div>
          </div>
        )}
        {quote && !loading && (
          <div className="fade-in text-center">
            <div className="text-4xl text-[#ececec] mb-2">&ldquo;</div>
            <p className="text-[#141414] text-lg min-h-[2rem] italic">{quote.text.trim() || "\u00a0"}</p>
            <div className="text-4xl text-[#ececec] mt-2">&rdquo;</div>
            <p className="text-[#8a8a8a] text-xs mt-4 tracking-widest">{quote.author}</p>
          </div>
        )}
      </div>

      <button
        onClick={generate}
        disabled={loading}
        className="w-full py-3 bg-[#141414] text-white text-sm font-semibold tracking-widest uppercase hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? "Thinking..." : "Generate Quote"}
      </button>

      {count > 0 && (
        <p className="text-center text-[#b0b0b0] text-xs mt-4">
          {count} quote{count !== 1 ? "s" : ""} generated — {count * 0} words of wisdom delivered
        </p>
      )}

      {count >= 3 && (
        <div className="mt-8 border border-[#ececec] bg-[#f7f7f5] p-4 text-xs text-[#8a8a8a] fade-in">
          <p className="text-[#707070] mb-1">Pro tip:</p>
          <p>If you&apos;re not feeling inspired yet, try generating more quotes. Each one contains the same amount of insight as the last.</p>
        </div>
      )}
    </div>
  );
}
