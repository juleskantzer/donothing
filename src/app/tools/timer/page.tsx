"use client";

import { useEffect, useRef, useState } from "react";

function format(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  const cs = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
  return { h, m, s, cs };
}

export default function ProductivityTimer() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number>(0);
  const accRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!running) return;
    startRef.current = performance.now();
    function tick(now: number) {
      setElapsed(accRef.current + (now - startRef.current));
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  function toggle() {
    if (running) {
      accRef.current = elapsed;
      setRunning(false);
    } else {
      setRunning(true);
    }
  }

  function reset() {
    setRunning(false);
    accRef.current = 0;
    setElapsed(0);
  }

  const t = format(elapsed);
  const minutesWasted = elapsed / 60000;
  const secondsWasted = Math.floor(elapsed / 1000);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-[calc(100vh-9rem)] flex flex-col justify-center">
      <a href="/" className="text-[#8a8a8a] text-xs tracking-widest hover:text-[#5a5a5a] transition-colors mb-8 inline-block self-start">
        ← back to nothing
      </a>

      <div className="mb-10 text-center">
        <span className="text-[10px] tracking-widest text-[#8a8a8a] uppercase border border-[#dcdcdc] px-2 py-0.5 rounded-sm">
          Productivity
        </span>
        <h1 className="text-3xl font-bold text-[#141414] mt-4 mb-2 tracking-tight">Productivity Timer</h1>
        <p className="text-[#707070] text-sm leading-relaxed">
          Our precision-engineered chronometer tracks exactly how much of your finite life you are
          spending here, in real time. Accountability has never felt so pointless.
        </p>
      </div>

      {/* Timer display */}
      <div className="border border-[#e2e2e0] bg-[#f7f7f5] p-10 mb-6 rounded-sm text-center">
        <div className="text-[10px] tracking-[0.4em] text-[#b0b0b0] uppercase mb-4">time wasted</div>
        <div className="font-bold text-[#141414] tabular-nums flex items-baseline justify-center gap-1">
          <span className="text-5xl">{t.h}</span>
          <span className="text-3xl text-[#8a8a8a]">:</span>
          <span className="text-5xl">{t.m}</span>
          <span className="text-3xl text-[#8a8a8a]">:</span>
          <span className="text-5xl">{t.s}</span>
          <span className="text-2xl text-[#707070] ml-1">.{t.cs}</span>
        </div>
        <div className="mt-4 text-xs text-[#b0b0b0] tracking-widest">
          {secondsWasted < 1
            ? "the clock is ticking"
            : `${secondsWasted} second${secondsWasted !== 1 ? "s" : ""} you will never get back`}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={toggle}
          className="py-3 bg-[#141414] text-white text-sm font-semibold tracking-widest uppercase hover:bg-black transition-colors"
        >
          {running ? "Pause Wasting" : elapsed > 0 ? "Resume Wasting" : "Start Wasting Time"}
        </button>
        <button
          onClick={reset}
          disabled={elapsed === 0}
          className="py-3 border border-[#e2e2e0] text-[#707070] text-sm tracking-widest uppercase hover:border-[#8a8a8a] hover:text-[#454545] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Reset
        </button>
      </div>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-3 gap-px border border-[#ececec] rounded-sm overflow-hidden">
        {[
          { value: "0", label: "tasks completed" },
          { value: "0%", label: "efficiency" },
          { value: minutesWasted >= 1 ? `${Math.floor(minutesWasted)}m` : "0m", label: "regret accrued" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#f7f7f5] px-4 py-6 text-center">
            <div className="text-2xl font-bold text-[#141414] mb-1 tabular-nums">{stat.value}</div>
            <div className="text-[#8a8a8a] text-[10px] tracking-widest uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-[#ececec] pt-8">
        <p className="text-[#b0b0b0] text-xs leading-relaxed">
          <span className="text-[#8a8a8a]">Note:</span> This timer does not save your sessions, sync to
          the cloud, or improve your productivity in any measurable way. It simply counts. Like life.
        </p>
      </div>
    </div>
  );
}
