"use client";

import { useState } from "react";

// Real, scannable QR code for the text "nothing" (21x21, error correction M).
// Pre-generated once — because the result is always nothing, it never changes.
const QR_ROWS = [
  "111111100111101111111",
  "100000101000001000001",
  "101110100001101011101",
  "101110100110101011101",
  "101110101010101011101",
  "100000100000101000001",
  "111111101010101111111",
  "000000000001100000000",
  "101010100101000010010",
  "100110001010001100111",
  "100111110010100011011",
  "010000000000001010011",
  "110110111110101111010",
  "000000001011010110011",
  "111111100001011110111",
  "100000100001110110001",
  "101110101111011100011",
  "101110100010001111110",
  "101110101110100110101",
  "100000100000001000010",
  "111111101100101000011",
];

const QUIET = 4; // quiet-zone modules around the code
const SIZE = QR_ROWS.length;
const TOTAL = SIZE + QUIET * 2;

const steps = [
  "Encoding your data...",
  "Calculating error correction...",
  "Arranging finder patterns...",
  "Rasterizing modules...",
  "Compressing to nothing...",
];

function QrSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${TOTAL} ${TOTAL}`}
      shapeRendering="crispEdges"
      className={className}
      role="img"
      aria-label="QR code encoding the word nothing"
    >
      <rect width={TOTAL} height={TOTAL} fill="#ffffff" />
      {QR_ROWS.flatMap((row, y) =>
        row.split("").map((cell, x) =>
          cell === "1" ? (
            <rect key={`${x}-${y}`} x={x + QUIET} y={y + QUIET} width={1} height={1} fill="#000000" />
          ) : null
        )
      )}
    </svg>
  );
}

export default function QrCode() {
  const [state, setState] = useState<"idle" | "generating" | "done">("idle");
  const [step, setStep] = useState(0);

  async function generate() {
    setState("generating");
    for (let i = 0; i < steps.length; i++) {
      setStep(i);
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
    }
    setState("done");
  }

  function download() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TOTAL} ${TOTAL}" shape-rendering="crispEdges"><rect width="${TOTAL}" height="${TOTAL}" fill="#ffffff"/>${QR_ROWS.map(
      (row, y) =>
        row
          .split("")
          .map((cell, x) =>
            cell === "1"
              ? `<rect x="${x + QUIET}" y="${y + QUIET}" width="1" height="1" fill="#000000"/>`
              : ""
          )
          .join("")
    ).join("")}</svg>`;
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "nothing_qr.svg";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-[calc(100vh-9rem)] flex flex-col justify-center">
      <a href="/" className="text-[#444] text-xs tracking-widest hover:text-[#666] transition-colors mb-8 inline-block self-start">
        ← back to nothing
      </a>

      <div className="mb-10 text-center">
        <span className="text-[10px] tracking-widest text-[#444] uppercase border border-[#2a2a2a] px-2 py-0.5 rounded-sm">
          AI-Powered
        </span>
        <h1 className="text-3xl font-bold text-white mt-4 mb-2 tracking-tight">QR Code Generator</h1>
        <p className="text-[#555] text-sm leading-relaxed">
          Instantly generate a high-resolution, fully scannable QR code. Point any camera at it to
          unlock its powerful, life-changing payload.
        </p>
      </div>

      {/* Display */}
      <div className="border border-[#222] bg-[#0d0d0d] p-10 mb-6 rounded-sm min-h-[280px] flex flex-col items-center justify-center">
        {state === "idle" && (
          <p className="text-[#2a2a2a] text-sm tracking-widest">your QR code will appear here</p>
        )}

        {state === "generating" && (
          <div className="w-full space-y-3">
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

        {state === "done" && (
          <div className="fade-in flex flex-col items-center">
            <div className="bg-white p-3 rounded-sm">
              <QrSvg className="w-48 h-48" />
            </div>
            <p className="text-[#444] text-xs mt-4 tracking-widest">scan me</p>
          </div>
        )}
      </div>

      {state === "idle" && (
        <button
          onClick={generate}
          className="w-full py-3 bg-white text-black text-sm font-semibold tracking-widest uppercase hover:bg-[#e5e5e5] transition-colors"
        >
          Generate QR Code
        </button>
      )}

      {state === "done" && (
        <div className="space-y-4">
          <div className="border border-[#1a1a1a] bg-[#0d0d0d] p-4 text-xs text-[#444] space-y-1">
            <p>✓ QR code generated</p>
            <p>✓ Encoded payload: &ldquo;nothing&rdquo;</p>
            <p>✓ Scans successfully: yes</p>
            <p>✓ Reveals: nothing</p>
          </div>
          <button
            onClick={download}
            className="w-full py-3 bg-white text-black text-sm font-semibold tracking-widest uppercase hover:bg-[#e5e5e5] transition-colors"
          >
            Download QR Code
          </button>
          <p className="text-center text-[#333] text-xs">
            Go ahead, scan it. We promise it leads somewhere meaningful.
          </p>
        </div>
      )}
    </div>
  );
}
