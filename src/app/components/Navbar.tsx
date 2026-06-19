"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// page titles by route, so the nav shows where you currently are
const TITLES: Record<string, string> = {
  "/": "Home",
  "/pricing": "Pricing",
  "/tools/image-passthrough": "Image Optimizer",
  "/tools/meditation": "Guided Meditation",
  "/tools/motivational-quote": "Motivational Quote Generator",
  "/tools/todo": "Smart Todo List",
  "/tools/timer": "Productivity Timer",
  "/tools/decision-maker": "Decision Maker",
  "/tools/notes": "Private Notes",
  "/tools/qr-code": "QR Code Generator",
  "/tools/chat": "AI Chat Assistant",
  "/tools/url-generator": "URL Generator",
  "/tools/youtube-player": "YouTube Player",
};

function titleFor(pathname: string): string {
  if (TITLES[pathname]) return TITLES[pathname];
  const slug = pathname.split("/").filter(Boolean).pop() ?? "";
  return slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Home";
}

function Logo() {
  return (
    <Link href="/" aria-label="nothing — home" className="group flex items-center gap-2.5">
      <span className="flex h-7 w-7 items-center justify-center border border-[#1a1a1a] transition-colors group-hover:bg-[#1a1a1a]">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
          <path
            d="M3 3 L13 13 M13 3 L3 13"
            className="stroke-[#1a1a1a] group-hover:stroke-white"
            strokeWidth="1.6"
            strokeLinecap="square"
            fill="none"
          />
        </svg>
      </span>
      <span className="text-sm font-semibold tracking-tight text-[#1a1a1a]">nothing</span>
    </Link>
  );
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const currentTitle = titleFor(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  function reloadCurrent(e: React.MouseEvent) {
    e.preventDefault();
    setMenuOpen(false);
    setTransitioning(true);
    // curtain covers the site, then we reload the current page and reveal it again
    window.setTimeout(() => {
      window.scrollTo({ top: 0 });
      router.push(pathname);
      router.refresh();
      window.setTimeout(() => setTransitioning(false), 480);
    }, 480);
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#ececec] bg-[#fafaf8]/80 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Logo />

          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href={pathname}
              onClick={reloadCurrent}
              className="max-w-[40vw] truncate text-xs uppercase tracking-widest text-[#888] transition-colors hover:text-[#1a1a1a]"
            >
              {currentTitle}
            </Link>
            <button
              onClick={() => setAuthOpen(true)}
              className="rounded-md border border-[#1a1a1a] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white"
            >
              Sign in
            </button>

            {/* Shop — leads to pricing for things that cost nothing */}
            <Link
              href="/pricing"
              aria-label="Pricing"
              title="Pricing"
              className="flex h-9 w-9 items-center justify-center rounded-md text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
                <path
                  d="M6 8 H18 L17 20 H7 Z M9 8 V6 a3 3 0 0 1 6 0 V8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* Settings — every control works and changes nothing */}
            <Link
              href="/settings"
              aria-label="Settings"
              title="Settings"
              className="flex h-9 w-9 items-center justify-center rounded-md text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7 7 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87a.5.5 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"
                />
              </svg>
            </Link>

            {/* Burger — opens a menu with nothing in it */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
            >
            <span
              className={`h-px w-5 bg-[#1a1a1a] transition-transform ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span className={`h-px w-5 bg-[#1a1a1a] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-5 bg-[#1a1a1a] transition-transform ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
            </button>
          </div>
        </nav>
      </header>

      {/* Burger menu — there is nothing in it */}
      <BurgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}

      {/* Home transition curtain — the site goes away, then comes back */}
      <div
        aria-hidden
        className={`fixed inset-0 z-[70] flex items-center justify-center bg-[#fafaf8] transition-opacity duration-500 ease-in-out ${
          transitioning ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <span
          className={`flex h-12 w-12 items-center justify-center border border-[#1a1a1a] transition-transform duration-500 ${
            transitioning ? "scale-100 rotate-0" : "scale-50 rotate-45"
          }`}
        >
          <svg viewBox="0 0 16 16" className="h-6 w-6" aria-hidden>
            <path
              d="M3 3 L13 13 M13 3 L3 13"
              className="stroke-[#1a1a1a]"
              strokeWidth="1.4"
              strokeLinecap="square"
              fill="none"
            />
          </svg>
        </span>
      </div>
    </>
  );
}

function BurgerMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[55] bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[56] flex h-full w-72 max-w-[80%] flex-col border-l border-[#ececec] bg-[#fafaf8] shadow-[-20px_0_60px_-20px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-[#ececec] px-6">
          <span className="text-xs uppercase tracking-widest text-[#999]">Menu</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-[#bbb] transition-colors hover:text-[#1a1a1a]"
          >
            ✕
          </button>
        </div>

        {/* The menu is intentionally empty — there is nothing in it */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="text-sm tracking-tight text-[#bbb]">There is nothing here.</p>
          <p className="mt-1 text-[11px] text-[#cfcfcf]">This menu does nothing. As intended.</p>
        </div>

        <p className="px-6 py-6 text-center text-[11px] text-[#bbb]">
          nothing — there is nothing we can do
        </p>
      </aside>
    </>
  );
}

function AuthModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("done");
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 px-6 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fade-in w-full max-w-sm rounded-xl border border-[#ececec] bg-white p-7 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.3)]"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-[#111]">Welcome back</h2>
            <p className="mt-1 text-xs text-[#999]">Sign in to access nothing.</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[#bbb] transition-colors hover:text-[#333]"
          >
            ✕
          </button>
        </div>

        {status === "done" ? (
          <div className="fade-in py-2 text-center">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#dcfce7] text-2xl text-[#16a34a]">
              ✓
            </span>
            <p className="text-lg font-semibold tracking-tight text-[#111]">
              Congrats, you&apos;re connected to nothing…
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[#999]">
              No account, no server, no session. Successfully connected to nothing.
            </p>
            <button
              onClick={onClose}
              className="mt-5 w-full rounded-md bg-[#141414] py-2.5 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-black"
            >
              Continue to nothing
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="you@example.com"
                disabled={status === "loading"}
                className="w-full rounded-md border border-[#e2e2e0] bg-white px-3.5 py-2.5 text-sm text-[#141414] placeholder-[#b0b0b0] transition-colors focus:border-[#999] focus:outline-none disabled:opacity-50"
              />
              <input
                type="password"
                placeholder="Password"
                disabled={status === "loading"}
                className="w-full rounded-md border border-[#e2e2e0] bg-white px-3.5 py-2.5 text-sm text-[#141414] placeholder-[#b0b0b0] transition-colors focus:border-[#999] focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-md bg-[#141414] py-2.5 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
              >
                {status === "loading" ? "Authenticating…" : "Sign in"}
              </button>
            </form>

            <p className="mt-5 text-center text-[11px] text-[#bbb]">
              By continuing you agree to accomplish nothing.
            </p>
            <p className="mt-2 text-center text-[11px] leading-relaxed text-[#bbb]">
              But here we are GDPR compliant and we will not use your data, for sure.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
