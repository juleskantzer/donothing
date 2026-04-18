"use client";

import { useState } from "react";

const phases = [
  { label: "Connecting to your inner void...", duration: 1200 },
  { label: "Calibrating silence frequency...", duration: 1000 },
  { label: "Removing all sounds...", duration: 900 },
  { label: "Confirming nothing remains...", duration: 800 },
  { label: "Generating MP3...", duration: 700 },
];

export default function Meditation() {
  const [state, setState] = useState<"idle" | "generating" | "done">("idle");
  const [currentPhase, setCurrentPhase] = useState(0);

  async function generate() {
    setState("generating");
    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(i);
      await new Promise((r) => setTimeout(r, phases[i].duration));
    }
    setState("done");
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <a href="/" className="text-[#444] text-xs tracking-widest hover:text-[#666] transition-colors mb-8 inline-block">
        ← back to nothing
      </a>

      <div className="mb-10">
        <span className="text-[10px] tracking-widest text-[#444] uppercase border border-[#2a2a2a] px-2 py-0.5 rounded-sm">
          Wellness
        </span>
        <h1 className="text-3xl font-bold text-white mt-4 mb-2 tracking-tight">Guided Meditation</h1>
        <p className="text-[#555] text-sm leading-relaxed">
          30 minutes of expertly crafted audio designed to guide you through absolute emptiness.
          Our AI has analyzed thousands of meditation sessions to produce the perfect nothing.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-px border border-[#1a1a1a] mb-10 overflow-hidden rounded-sm">
        {[
          { value: "30 min", label: "duration" },
          { value: "0 Hz", label: "frequency" },
          { value: "∅ dB", label: "sound level" },
        ].map((s) => (
          <div key={s.label} className="bg-[#0d0d0d] p-4 text-center">
            <div className="text-white font-bold text-lg">{s.value}</div>
            <div className="text-[#444] text-xs tracking-widest uppercase mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {state === "idle" && (
        <button
          onClick={generate}
          className="w-full py-3 bg-white text-black text-sm font-semibold tracking-widest uppercase hover:bg-[#e5e5e5] transition-colors"
        >
          Begin Meditation
        </button>
      )}

      {state === "generating" && (
        <div className="border border-[#222] p-6 space-y-3">
          {phases.map((phase, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 text-xs transition-colors ${
                i < currentPhase
                  ? "text-[#333]"
                  : i === currentPhase
                  ? "text-[#888]"
                  : "text-[#222]"
              }`}
            >
              <span className={i === currentPhase ? "blink" : ""}>
                {i < currentPhase ? "✓" : i === currentPhase ? "▸" : "○"}
              </span>
              {phase.label}
            </div>
          ))}
        </div>
      )}

      {state === "done" && (
        <div className="fade-in space-y-4">
          <div className="border border-[#1a1a1a] bg-[#0d0d0d] p-4 text-xs text-[#444] space-y-1">
            <p>✓ Meditation session generated</p>
            <p>✓ Duration: exactly 30:00</p>
            <p>✓ Guided words spoken: 0</p>
            <p>✓ Ambient sounds included: none</p>
            <p>✓ Inner peace achieved: results may vary</p>
          </div>
          <a
            href="/api/silence"
            download="nothing_meditation.mp3"
            className="block w-full py-3 bg-white text-black text-sm font-semibold tracking-widest uppercase text-center hover:bg-[#e5e5e5] transition-colors"
          >
            Download Your Meditation
          </a>
          <p className="text-center text-[#333] text-xs">
            Find a quiet place. Play this. Experience nothing.
          </p>
        </div>
      )}

      <div className="mt-16 border-t border-[#1a1a1a] pt-8">
        <p className="text-[#333] text-xs leading-relaxed">
          <span className="text-[#444]">Disclaimer:</span> This meditation contains pure silence.
          Side effects may include confusion, a refund request, and briefly questioning whether
          you actually needed a guided meditation app to sit quietly.
        </p>
      </div>
    </div>
  );
}
