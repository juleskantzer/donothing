"use client";

import { useState } from "react";

// the three industry-leading operations, each delivering the input untouched
const operations = [
  {
    id: "x1",
    symbol: "×1",
    label: "×1 Multiplier",
    tagline: "Multiplies your number by exactly 1 for guaranteed value preservation.",
    apply: (n: number) => n * 1,
  },
  {
    id: "+0",
    symbol: "+0",
    label: "+0 Offset",
    tagline: "Applies a precision-calibrated offset of zero. Industry standard.",
    apply: (n: number) => n + 0,
  },
  {
    id: "100%",
    symbol: "100%",
    label: "100% Value",
    tagline: "Returns a full 100% of your number. Not a single percent withheld.",
    apply: (n: number) => (n * 100) / 100,
  },
  {
    id: "round",
    symbol: "⌊ ⌉",
    label: "Round to Integer",
    tagline: "Rounds your number to the nearest whole integer with 100% fidelity.",
    apply: (n: number) => Math.round(n),
  },
];

export default function IntegerRounder() {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState<typeof operations[0] | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [resultOp, setResultOp] = useState<typeof operations[0] | null>(null);
  const [count, setCount] = useState(0);

  async function run() {
    const raw = value.trim();
    if (raw === "" || !/^[+-]?\d+$/.test(raw) || !selected) return;

    setLoading(true);
    setResult(null);
    setResultOp(null);

    await new Promise((r) => setTimeout(r, 700 + Math.random() * 600));

    setResult(String(selected.apply(parseInt(raw, 10))));
    setResultOp(selected);
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
          Intelligence
        </span>
        <h1 className="text-3xl font-bold text-[#141414] mt-4 mb-2 tracking-tight">
          Integer Rounder
        </h1>
        <p className="text-[#707070] text-sm leading-relaxed">
          Enter any whole number, then choose your preferred operation — ×1, +0, 100% value, or
          round to integer. Four industry-leading methods, each engineered for total precision.
        </p>
      </div>

      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => {
          // integers only — strip anything that isn't a digit or a leading minus
          let cleaned = e.target.value.replace(/[^\d-]/g, "");
          cleaned = cleaned.replace(/(?!^)-/g, "");
          setValue(cleaned);
          setResult(null);
          setResultOp(null);
        }}
        onKeyDown={(e) => e.key === "Enter" && !loading && run()}
        placeholder="e.g. 42"
        disabled={loading}
        className="w-full text-center bg-[#f7f7f5] border border-[#e2e2e0] rounded-sm px-4 py-4 text-2xl text-[#141414] tracking-wide outline-none focus:border-[#bcbcbc] transition-colors disabled:opacity-40 mb-4"
      />

      {/* The three operations — the user picks one */}
      <p className="text-[10px] tracking-widest text-[#8a8a8a] uppercase mb-2 text-center">
        choose your operation
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {operations.map((op) => (
          <button
            key={op.id}
            type="button"
            onClick={() => {
              setSelected(op);
              setResult(null);
              setResultOp(null);
            }}
            disabled={loading}
            className={`border rounded-sm p-3 text-center transition-colors disabled:opacity-40 ${
              selected?.id === op.id
                ? "border-[#141414] bg-white ring-1 ring-[#141414]"
                : "border-[#e2e2e0] bg-[#f7f7f5] hover:border-[#bcbcbc]"
            }`}
          >
            <p className="text-2xl font-bold text-[#141414] tabular-nums">{op.symbol}</p>
            <p className="text-[9px] tracking-widest text-[#8a8a8a] uppercase mt-1">
              {op.label.split(" ").slice(1).join(" ")}
            </p>
          </button>
        ))}
      </div>

      {/* Result display */}
      <div className="border border-[#e2e2e0] bg-[#f7f7f5] p-10 mb-6 min-h-[180px] flex flex-col items-center justify-center rounded-sm">
        {!result && !loading && (
          <p className="text-[#dcdcdc] text-sm tracking-widest">your processed integer will appear here</p>
        )}
        {loading && (
          <div className="text-[#b0b0b0] text-xs blink tracking-widest">
            applying {selected?.label}...
          </div>
        )}
        {result !== null && resultOp && !loading && (
          <div className="fade-in text-center">
            <p className="text-[10px] tracking-widest text-[#8a8a8a] uppercase mb-2">
              {resultOp.label} · result
            </p>
            <p className="text-6xl font-bold text-[#141414] tabular-nums">{result}</p>
            <p className="text-[#8a8a8a] text-[11px] mt-4 max-w-xs mx-auto leading-snug">{resultOp.tagline}</p>
          </div>
        )}
      </div>

      <button
        onClick={run}
        disabled={loading || !selected}
        className="w-full py-3 bg-[#141414] text-white text-sm font-semibold tracking-widest uppercase hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : selected ? `Apply ${selected.symbol}` : "Choose an operation"}
      </button>

      {count > 0 && (
        <p className="text-center text-[#b0b0b0] text-xs mt-4">
          {count} integer{count !== 1 ? "s" : ""} processed — {count * 0} digits altered
        </p>
      )}

      {count >= 3 && (
        <div className="mt-8 border border-[#ececec] bg-[#f7f7f5] p-4 text-xs text-[#8a8a8a] fade-in">
          <p className="text-[#707070] mb-1">Pro tip:</p>
          <p>All three operations are mathematically guaranteed to return your exact input. Whichever one you choose, your number is in safe hands.</p>
        </div>
      )}
    </div>
  );
}
