"use client";

import { useState } from "react";

const verdicts = [
  "It doesn't matter.",
  "Either way, the outcome is the same.",
  "No.",
  "Yes. Or no. It's irrelevant.",
  "You already knew the answer. It was nothing.",
  "Flip a coin. The coin doesn't care either.",
  "Whatever you choose, nothing changes.",
  "The decision has been made: indifference.",
];

const steps = [
  "Parsing your dilemma...",
  "Modeling all possible futures...",
  "Weighing infinite outcomes...",
  "Consulting the void...",
  "Calculating optimal indifference...",
];

export default function DecisionMaker() {
  const [question, setQuestion] = useState("");
  const [thinking, setThinking] = useState(false);
  const [step, setStep] = useState(0);
  const [verdict, setVerdict] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  async function decide(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setVerdict(null);
    setThinking(true);
    for (let i = 0; i < steps.length; i++) {
      setStep(i);
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 500));
    }
    setThinking(false);
    setVerdict(verdicts[Math.floor(Math.random() * verdicts.length)]);
    setCount((c) => c + 1);
  }

  function reset() {
    setQuestion("");
    setVerdict(null);
    setThinking(false);
    setStep(0);
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-[calc(100vh-9rem)] flex flex-col justify-center">
      <a href="/" className="text-[#444] text-xs tracking-widest hover:text-[#666] transition-colors mb-8 inline-block self-start">
        ← back to nothing
      </a>

      <div className="mb-10 text-center">
        <span className="text-[10px] tracking-widest text-[#444] uppercase border border-[#2a2a2a] px-2 py-0.5 rounded-sm">
          Intelligence
        </span>
        <h1 className="text-3xl font-bold text-white mt-4 mb-2 tracking-tight">Decision Maker</h1>
        <p className="text-[#555] text-sm leading-relaxed">
          Paralyzed by choice? Our 47-layer neural engine simulates every possible outcome of your
          decision and returns the single, definitive, life-altering answer.
        </p>
      </div>

      {!thinking && !verdict && (
        <form onSubmit={decide} className="space-y-3">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Should I...?"
            className="w-full bg-[#111] border border-[#222] text-[#e5e5e5] placeholder-[#333] px-4 py-3 text-sm focus:outline-none focus:border-[#444] transition-colors"
          />
          <button
            type="submit"
            disabled={!question.trim()}
            className="w-full py-3 bg-white text-black text-sm font-semibold tracking-widest uppercase hover:bg-[#e5e5e5] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Decide For Me
          </button>
        </form>
      )}

      {thinking && (
        <div className="border border-[#222] p-6 space-y-3">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 text-xs transition-colors ${
                i < step ? "text-[#333]" : i === step ? "text-[#888]" : "text-[#222]"
              }`}
            >
              <span className={i === step ? "blink" : ""}>
                {i < step ? "✓" : i === step ? "▸" : "○"}
              </span>
              {s}
            </div>
          ))}
        </div>
      )}

      {verdict && (
        <div className="fade-in space-y-6">
          <div className="border border-[#222] bg-[#0d0d0d] p-10 rounded-sm text-center min-h-[160px] flex flex-col items-center justify-center">
            <div className="text-[10px] tracking-[0.4em] text-[#333] uppercase mb-4">the verdict</div>
            <p className="text-white text-2xl font-bold tracking-tight">{verdict}</p>
            <p className="text-[#444] text-xs mt-4 tracking-widest">confidence: 100%</p>
          </div>
          <button
            onClick={reset}
            className="w-full py-3 border border-[#222] text-[#555] text-sm tracking-widest uppercase hover:border-[#444] hover:text-[#888] transition-colors"
          >
            Ask Another Question
          </button>
          {count >= 3 && (
            <p className="text-center text-[#333] text-xs fade-in">
              You&apos;ve consulted the engine {count} times. It has never been wrong, because it
              never says anything.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
