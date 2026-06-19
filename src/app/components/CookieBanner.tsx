"use client";

import { useEffect, useState } from "react";

const COOKIE_KEY = "nothing-cookie-consent";

export default function CookieBanner() {
  // start hidden; only the first-ever visitor (no stored choice) sees it
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = window.localStorage.getItem(COOKIE_KEY);
    if (!choice) {
      // tiny delay so it slides in after the page has settled
      const t = window.setTimeout(() => setOpen(true), 600);
      return () => window.clearTimeout(t);
    }
  }, []);

  function decide(choice: "accepted" | "declined") {
    window.localStorage.setItem(COOKIE_KEY, choice);
    setOpen(false);
  }

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[80] flex items-center justify-center px-4 transition-opacity duration-500 ease-out ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Dimmed backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div
        role="dialog"
        aria-label="Cookie preferences"
        className={`relative w-full max-w-lg border border-[#ececec] bg-[#fafaf8] p-7 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out ${
          open ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
        }`}
      >
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-[#999]">Privacy</p>
          <h2 className="mt-1 text-sm font-semibold tracking-tight text-[#1a1a1a]">
            We value your privacy
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#777]">
            This site uses absolutely no cookies, no trackers and no storage of any kind.
            There is genuinely nothing to consent to — but please confirm your preferences
            for the cookies that do not exist.
          </p>

          <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => decide("declined")}
              className="rounded-md border border-[#e2e2e0] px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#666] transition-colors hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
            >
              Reject nothing
            </button>
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="rounded-md border border-[#1a1a1a] bg-[#1a1a1a] px-4 py-2 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-black"
            >
              Accept nothing
            </button>
          </div>

          <p className="mt-4 text-[10px] uppercase tracking-widest text-[#bbb]">
            Either way, nothing happens
          </p>
        </div>
      </div>
    </div>
  );
}
