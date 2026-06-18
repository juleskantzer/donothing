"use client";

import { useState } from "react";

const SLASHES = "/".repeat(12);

export default function UrlGenerator() {
  const [input, setInput] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    const url = input.trim();
    if (!url || generating) return;
    setResult(null);
    setCopied(false);
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1600));
    setGenerating(false);
    setResult(url + SLASHES);
  }

  async function copy() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  // ensure the link is treated as an absolute URL when navigating
  const href = result
    ? /^[a-z][a-z0-9+.-]*:\/\//i.test(result)
      ? result
      : `https://${result}`
    : "#";

  return (
    <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-2xl flex-col justify-center px-6 py-16">
      <a
        href="/"
        className="mb-8 inline-block self-start text-xs tracking-widest text-[#8a8a8a] transition-colors hover:text-[#5a5a5a]"
      >
        ← back to nothing
      </a>

      <div className="mb-10 text-center">
        <span className="rounded-sm border border-[#dcdcdc] px-2 py-0.5 text-[10px] uppercase tracking-widest text-[#8a8a8a]">
          Productivity
        </span>
        <h1 className="mt-4 mb-2 text-3xl font-bold tracking-tight text-[#141414]">
          URL Generator
        </h1>
        <p className="text-sm leading-relaxed text-[#707070]">
          Enter a URL below. Our distributed generation engine will enhance it with twelve
          precision-engineered slashes, optimized for maximum nothing.
        </p>
      </div>

      <form onSubmit={generate} className="space-y-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://example.com"
          disabled={generating}
          className="w-full rounded-md border border-[#e2e2e0] bg-white px-4 py-3 text-sm text-[#141414] placeholder-[#b0b0b0] transition-colors focus:border-[#999] focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || generating}
          className="w-full rounded-md bg-[#141414] py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-30"
        >
          {generating ? "Generating…" : "Generate URL"}
        </button>
      </form>

      {generating && (
        <div className="mt-6 space-y-2 rounded-md border border-[#e2e2e0] p-6">
          {[
            "Validating endpoint...",
            "Allocating slashes...",
            "Optimizing path depth...",
            "Finalizing your URL...",
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 text-xs text-[#707070]">
              <span className="blink text-[#b0b0b0]">▸</span>
              {s}
            </div>
          ))}
        </div>
      )}

      {result && (
        <div className="fade-in mt-6 space-y-3">
          <div className="rounded-md border border-[#e2e2e0] bg-[#f7f7f5] p-4">
            <p className="mb-1 text-[10px] uppercase tracking-widest text-[#999]">
              Your generated URL
            </p>
            <a
              href={href}
              className="break-all font-mono text-sm text-[#1d4ed8] underline decoration-[#1d4ed8]/40 underline-offset-2 transition-colors hover:text-[#1e40af]"
            >
              {result}
            </a>
          </div>
          <div className="flex gap-2">
            <a
              href={href}
              className="flex-1 rounded-md bg-[#141414] py-3 text-center text-sm uppercase tracking-widest text-white transition-colors hover:bg-black"
            >
              Go to URL
            </a>
            <button
              onClick={copy}
              className="flex-1 rounded-md border border-[#e2e2e0] py-3 text-sm uppercase tracking-widest text-[#707070] transition-colors hover:border-[#bbb] hover:text-[#141414]"
            >
              {copied ? "Copied" : "Copy URL"}
            </button>
          </div>
          <p className="text-center text-[11px] text-[#bbb]">
            Twelve slashes added. Functionality unchanged. You&apos;re welcome.
          </p>
        </div>
      )}
    </div>
  );
}
