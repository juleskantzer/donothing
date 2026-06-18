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
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-[calc(100vh-9rem)] flex flex-col justify-center">
      <a href="/" className="text-[#8a8a8a] text-xs tracking-widest hover:text-[#5a5a5a] transition-colors mb-8 inline-block self-start">
        ← back to nothing
      </a>

      <div className="mb-10 text-center">
        <span className="text-[10px] tracking-widest text-[#8a8a8a] uppercase border border-[#dcdcdc] px-2 py-0.5 rounded-sm">
          Wellness
        </span>
        <h1 className="text-3xl font-bold text-[#141414] mt-4 mb-2 tracking-tight">Guided Meditation</h1>
        <p className="text-[#707070] text-sm leading-relaxed">
          30 minutes of expertly crafted audio designed to guide you through absolute emptiness.
          Our AI has analyzed thousands of meditation sessions to produce the perfect nothing.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-px border border-[#ececec] mb-10 overflow-hidden rounded-sm">
        {[
          { value: "30 min", label: "duration" },
          { value: "0 Hz", label: "frequency" },
          { value: "∅ dB", label: "sound level" },
        ].map((s) => (
          <div key={s.label} className="bg-[#f7f7f5] p-4 text-center">
            <div className="text-[#141414] font-bold text-lg">{s.value}</div>
            <div className="text-[#8a8a8a] text-xs tracking-widest uppercase mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {state === "idle" && (
        <button
          onClick={generate}
          className="w-full py-3 bg-[#141414] text-white text-sm font-semibold tracking-widest uppercase hover:bg-black transition-colors"
        >
          Begin Meditation
        </button>
      )}

      {state === "generating" && (
        <div className="border border-[#e2e2e0] p-6 space-y-3">
          {phases.map((phase, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 text-xs transition-colors ${
                i < currentPhase
                  ? "text-[#b0b0b0]"
                  : i === currentPhase
                  ? "text-[#454545]"
                  : "text-[#e2e2e0]"
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
          <div className="border border-[#ececec] bg-[#f7f7f5] p-4 text-xs text-[#8a8a8a] space-y-1">
            <p>✓ Meditation session generated</p>
            <p>✓ Duration: exactly 30:00</p>
            <p>✓ Guided words spoken: 0</p>
            <p>✓ Ambient sounds included: none</p>
            <p>✓ Inner peace achieved: results may vary</p>
          </div>
          <a
            href="/api/silence"
            download="nothing_meditation.mp3"
            className="block w-full py-3 bg-[#141414] text-white text-sm font-semibold tracking-widest uppercase text-center hover:bg-black transition-colors"
          >
            Download Your Meditation
          </a>
          <p className="text-center text-[#b0b0b0] text-xs">
            Find a quiet place. Play this. Experience nothing.
          </p>
        </div>
      )}

      <div className="mt-16 border-t border-[#ececec] pt-8">
        <p className="text-[#b0b0b0] text-xs leading-relaxed">
          <span className="text-[#8a8a8a]">Disclaimer:</span> This meditation contains pure silence.
          Side effects may include confusion, a refund request, and briefly questioning whether
          you actually needed a guided meditation app to sit quietly.
        </p>
      </div>
    </div>
  );
}
