"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// A polished settings page. Every control works perfectly and does nothing.

export default function Settings() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-2xl flex-col px-6 py-16">
      <Link
        href="/"
        className="mb-12 inline-block self-start text-xs tracking-widest text-[#8a8a8a] transition-colors hover:text-[#5a5a5a]"
      >
        ← back to nothing
      </Link>

      <div className="text-center">
        <p className="text-[10px] uppercase tracking-widest text-[#999]">Settings</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#141414]">
          Configure your nothing
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#707070]">
          Fine-tune every detail. Each setting is fully functional and changes
          absolutely nothing.
        </p>
      </div>

      <div className="mt-12 space-y-10">
        <BlackAndWhiteSetting />
      </div>

      <p className="mt-12 text-center text-[11px] text-[#bbb]">
        Changes are saved automatically to nowhere.
      </p>
    </div>
  );
}

function BlackAndWhiteSetting() {
  // "Convert to black & white" — applies a real grayscale filter to the whole
  // page, which changes absolutely nothing because the site is already mono.
  const [status, setStatus] = useState<"idle" | "converting" | "done">("idle");

  useEffect(() => {
    if (status !== "converting") return;
    document.documentElement.style.filter = "grayscale(1)";
    const t = window.setTimeout(() => setStatus("done"), 1600);
    return () => window.clearTimeout(t);
  }, [status]);

  useEffect(() => {
    if (status !== "done") return;
    const t = window.setTimeout(() => {
      document.documentElement.style.filter = "";
      setStatus("idle");
    }, 3000);
    return () => window.clearTimeout(t);
  }, [status]);

  const label =
    status === "converting"
      ? "Converting…"
      : status === "done"
      ? "Already black & white"
      : "Convert to black & white";

  return (
    <section>
      <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#999]">
        Display
      </h2>
      <div className="flex items-center justify-between gap-4 rounded-xl border border-[#ececec] bg-white px-5 py-4">
        <div>
          <p className="text-sm font-medium text-[#1a1a1a]">Black &amp; white mode</p>
          <p className="mt-0.5 text-xs text-[#999]">
            Strip every color from the interface for maximum focus.
          </p>
        </div>
        <button
          type="button"
          onClick={() => status === "idle" && setStatus("converting")}
          disabled={status !== "idle"}
          className="flex items-center gap-2 whitespace-nowrap rounded-md border border-[#1a1a1a] px-3.5 py-2 text-xs font-medium uppercase tracking-widest text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white disabled:cursor-default disabled:opacity-100"
        >
          <svg
            viewBox="0 0 16 16"
            aria-hidden
            className={`h-3.5 w-3.5 ${status === "converting" ? "animate-spin" : ""}`}
          >
            <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M8 1 A7 7 0 0 1 8 15 Z" fill="currentColor" />
          </svg>
          {label}
        </button>
      </div>
    </section>
  );
}
