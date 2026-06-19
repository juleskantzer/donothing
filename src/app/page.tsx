"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import TrustedBy from "./components/TrustedBy";
import Carousel from "./components/Carousel";

const tools = [
  {
    slug: "image-passthrough",
    name: "Image Optimizer",
    description: "Upload any image. Receive the exact same image. Nothing changed. Groundbreaking.",
    badge: "AI-Powered",
    note: "#fde68a",
    featured: true,
  },
  {
    slug: "meditation",
    name: "Guided Meditation",
    description: "30 minutes of professionally generated audio to help you reach absolute inner nothing.",
    badge: "Wellness",
    note: "#bbf7d0",
    featured: true,
  },
  {
    slug: "motivational-quote",
    name: "Motivational Quote Generator",
    description: "Get inspired. Or not. Our algorithm has processed millions of quotes to bring you... this.",
    badge: "Productivity",
    note: "#fecdd3",
    featured: true,
  },
  {
    slug: "todo",
    name: "Smart Todo List",
    description: "The most advanced todo list app ever built. Nothing to do? We've got you covered.",
    badge: "Organization",
    note: "#bfdbfe",
    featured: false,
  },
  {
    slug: "timer",
    name: "Productivity Timer",
    description: "Track exactly how much of your life you're wasting, live, down to the millisecond. Finally, accountability.",
    badge: "Productivity",
    note: "#fed7aa",
    featured: false,
  },
  {
    slug: "decision-maker",
    name: "Decision Maker",
    description: "Can't choose? Our neural engine weighs every possible outcome and delivers the definitive answer.",
    badge: "Intelligence",
    note: "#ddd6fe",
    featured: true,
  },
  {
    slug: "notes",
    name: "Private Notes",
    description: "Write down your most important thoughts. We respect your privacy by saving absolutely nothing.",
    badge: "Organization",
    note: "#fbcfe8",
    featured: false,
  },
  {
    slug: "qr-code",
    name: "QR Code Generator",
    description: "Generate a real, scannable QR code in seconds. Scan it to reveal its powerful, meaningful payload.",
    badge: "AI-Powered",
    note: "#a7f3d0",
    featured: false,
  },
  {
    slug: "chat",
    name: "AI Chat Assistant",
    description: "A state-of-the-art conversational model trained on the entire internet. Ask anything. Receive everything.",
    badge: "AI-Powered",
    note: "#cffafe",
    featured: false,
  },
  {
    slug: "url-generator",
    name: "URL Generator",
    description: "Enter any URL. Our infrastructure enhances it with twelve industry-standard slashes. SEO has never looked like this.",
    badge: "Productivity",
    note: "#ecfccb",
    featured: false,
  },
  {
    slug: "youtube-player",
    name: "YouTube Player",
    description: "Paste a YouTube link. Our media engine plays the exact video you pasted. Revolutionary video technology.",
    badge: "Entertainment",
    note: "#fecaca",
    featured: false,
  },
  {
    slug: "integer-rounder",
    name: "Integer Rounder",
    description: "Enter any whole number. Choose ×1, +0, 100% value, or round to integer. Four operations, all returning the same number.",
    badge: "Intelligence",
    note: "#e9d5ff",
    featured: false,
  },
];

const featured = tools.filter((t) => t.featured);

// one post-it color per theme — tools sharing a theme share a color
const THEME_COLORS: Record<string, string> = {
  "AI-Powered": "#cffafe",
  Wellness: "#bbf7d0",
  Productivity: "#fed7aa",
  Organization: "#bfdbfe",
  Intelligence: "#ddd6fe",
  Entertainment: "#fecaca",
};
const colorFor = (theme: string) => THEME_COLORS[theme] ?? "#ececec";

// filter chips for the "All tools" section — purely decorative; they filter nothing
const categories = ["All", ...Array.from(new Set(tools.map((t) => t.badge)))];

// initial scattered spots for the featured post-its (percent of board)
const spots = [
  { x: 10, y: 34, tilt: -6 },
  { x: 58, y: 30, tilt: 5 },
  { x: 34, y: 52, tilt: 3 },
  { x: 68, y: 58, tilt: -5 },
];

export default function Home() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(spots.map((s) => ({ x: s.x, y: s.y, tilt: s.tilt })));
  const [z, setZ] = useState(spots.map((_, i) => i + 1));

  // gently randomize the board layout on mount (client only — avoids hydration mismatch)
  useEffect(() => {
    setPos(
      spots.map((s) => ({
        x: Math.min(54, Math.max(4, s.x + (-8 + Math.random() * 16))),
        y: Math.min(62, Math.max(24, s.y + (-8 + Math.random() * 16))),
        tilt: -8 + Math.random() * 16,
      }))
    );
  }, []);

  // active filter chip — changes which one looks selected, never what is shown
  const [activeFilter, setActiveFilter] = useState("All");

  const [draggingI, setDraggingI] = useState<number | null>(null);
  const drag = useRef<{ i: number; offX: number; offY: number; el: HTMLElement } | null>(null);
  const topZ = useRef(spots.length);

  const bringToFront = useCallback((i: number) => {
    topZ.current += 1;
    setZ((prev) => prev.map((v, idx) => (idx === i ? topZ.current : v)));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent, i: number) => {
      // left click drags the note around; the button on the note handles navigation
      if (e.button !== 0) return;
      e.preventDefault();
      const rect = boardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      drag.current = { i, offX: px - pos[i].x, offY: py - pos[i].y, el: e.currentTarget as HTMLElement };
      setDraggingI(i);
      bringToFront(i);
      e.currentTarget.setPointerCapture?.(e.pointerId);
    },
    [pos, bringToFront]
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const d = drag.current;
    const rect = boardRef.current?.getBoundingClientRect();
    if (!d || !rect) return;
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    // keep the note fully inside the board, whatever its rendered size
    const maxX = 100 - (d.el.offsetWidth / rect.width) * 100;
    const maxY = 100 - (d.el.offsetHeight / rect.height) * 100;
    const nx = Math.min(maxX, Math.max(0, px - d.offX));
    const ny = Math.min(maxY, Math.max(0, py - d.offY));
    setPos((prev) => prev.map((p, idx) => (idx === d.i ? { ...p, x: nx, y: ny } : p)));
  }, []);

  const endDrag = useCallback(() => {
    drag.current = null;
    setDraggingI(null);
  }, []);

  // ── the big button at the bottom: looks important, does absolutely nothing ──
  const audioCtx = useRef<AudioContext | null>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [pressed, setPressed] = useState(false);
  const rippleId = useRef(0);

  const playClick = useCallback(() => {
    try {
      audioCtx.current ??= new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const ctx = audioCtx.current;
      const now = ctx.currentTime;

      // a short burst of filtered noise = the sharp "click" of the switch
      const len = Math.floor(ctx.sampleRate * 0.05);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 2600;
      bp.Q.value = 1.4;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.5, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
      noise.connect(bp).connect(noiseGain).connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.05);

      // a low resonant "thock" for the bottom-out body of the keypress
      const thock = ctx.createOscillator();
      const thockGain = ctx.createGain();
      thock.type = "sine";
      thock.frequency.setValueAtTime(220, now);
      thock.frequency.exponentialRampToValueAtTime(120, now + 0.04);
      thockGain.gain.setValueAtTime(0.22, now);
      thockGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      thock.connect(thockGain).connect(ctx.destination);
      thock.start(now);
      thock.stop(now + 0.07);
    } catch {
      // a click that makes no sound is still, fittingly, nothing
    }
  }, []);

  const onNothingClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const id = rippleId.current++;
      setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
      playClick();
    },
    [playClick]
  );

  return (
    <div className="min-h-screen">
      {/* ── HERO : light desk with a few draggable post-its ── */}
      <section
        ref={boardRef}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="relative h-[88vh] min-h-[620px] w-full overflow-hidden select-none [perspective:1400px]"
        style={{
          backgroundColor: "#fafaf8",
        }}
      >
        {/* Wordmark */}
        <div className="relative z-[1] text-center pt-16 pointer-events-none px-6">
          <h1 className="text-6xl font-bold tracking-tight text-[#111] leading-none">nothing</h1>
          <p className="text-[#888] text-sm tracking-[0.3em] uppercase mt-4">
            there is nothing we can do
          </p>
          <p className="text-[#666] mt-6 max-w-md mx-auto leading-relaxed text-sm">
            A carefully curated suite of tools engineered to accomplish absolutely nothing.
            Save time by wasting time, intelligently.
          </p>
        </div>

        {/* Featured post-its */}
        {featured.map((tool, i) => (
          <div
            key={tool.slug}
            onPointerDown={(e) => onPointerDown(e, i)}
            style={{
              backgroundColor: colorFor(tool.badge),
              left: `${pos[i].x}%`,
              top: `${pos[i].y}%`,
              zIndex: z[i],
              ["--tilt" as string]: `${pos[i].tilt}deg`,
              ...(draggingI === i
                ? { transform: "rotate(1deg) scale(1.1)", cursor: "grabbing" }
                : {}),
            } as React.CSSProperties}
            className={`group absolute flex aspect-square w-40 sm:w-48 flex-col items-center justify-center overflow-hidden p-4 rounded-sm text-center text-[#1a1a1a] cursor-grab touch-none
              [transform:rotate(var(--tilt))]
              transition-[transform,box-shadow] duration-300 ease-out will-change-transform
              hover:[transform:rotate(0deg)_translateY(-10px)_scale(1.06)]
              ${
                draggingI === i
                  ? "shadow-[0_30px_50px_-12px_rgba(0,0,0,0.35),0_8px_16px_rgba(0,0,0,0.2)]"
                  : "shadow-[0_10px_22px_-8px_rgba(0,0,0,0.28),0_2px_5px_rgba(0,0,0,0.18)] hover:shadow-[0_24px_40px_-12px_rgba(0,0,0,0.35)]"
              }`}
          >
            {/* peeled corner */}
            <span className="pointer-events-none absolute top-0 right-0 h-5 w-5
              bg-gradient-to-bl from-black/15 to-transparent
              [clip-path:polygon(100%_0,0_0,100%_100%)] rounded-tr-sm" />
            <h2 className="font-semibold text-sm mb-1 tracking-wide">{tool.name}</h2>
            <p className="text-black/60 text-[11px] leading-snug">{tool.description}</p>
            <Link
              href={`/tools/${tool.slug}`}
              draggable={false}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="mt-3 mx-auto flex w-fit items-center justify-center rounded-md bg-black/80 px-2.5 py-1
                text-[10px] font-medium text-white cursor-pointer
                transition-colors hover:bg-black"
            >
              Open
            </Link>
          </div>
        ))}

        {/* Scroll hint */}
        <div className="absolute inset-x-0 bottom-8 z-[1] flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#999]">
            everything we offer
          </span>
          <span className="text-[#bbb] text-lg animate-bounce">↓</span>
        </div>
      </section>

      {/* ── TRUSTED BY : an infinite marquee of blurred, meaningless logos ── */}
      <TrustedBy />

      {/* ── ALL TOOLS : classic card grid ── */}
      <section className="border-t border-[#ececec] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-[#111]">All tools</h2>
            <p className="text-[#777] mt-2 text-sm">
              {tools.length} tools. Zero outcomes. Browse the complete collection below.
            </p>
          </div>

          {/* Filter bar — fully interactive, filters absolutely nothing */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const active = cat === activeFilter;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  style={{ backgroundColor: active ? colorFor(cat) : undefined }}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                    active
                      ? "border-[#111] text-[#1a1a1a]"
                      : "border-[#e2e2e0] text-[#666] hover:border-[#999] hover:text-[#111]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="grid justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool, i) => {
              // fixed, deterministic tilt (no drag) — keeps the sticky-note feel
              const tilt = [-3, 2.5, -1.5, 3, -2, 1.5][i % 6];
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  style={{
                    backgroundColor: colorFor(tool.badge),
                    ["--tilt" as string]: `${tilt}deg`,
                  } as React.CSSProperties}
                  className="group relative flex aspect-square w-52 flex-col items-center justify-center overflow-hidden rounded-sm p-5 text-center text-[#1a1a1a]
                    [transform:rotate(var(--tilt))]
                    transition-[transform,box-shadow] duration-300 ease-out will-change-transform
                    shadow-[0_10px_22px_-8px_rgba(0,0,0,0.28),0_2px_5px_rgba(0,0,0,0.18)]
                    hover:[transform:rotate(0deg)_translateY(-8px)_scale(1.04)]
                    hover:shadow-[0_24px_40px_-12px_rgba(0,0,0,0.35)]"
                >
                  {/* peeled corner */}
                  <span className="pointer-events-none absolute top-0 right-0 h-5 w-5
                    bg-gradient-to-bl from-black/15 to-transparent
                    [clip-path:polygon(100%_0,0_0,100%_100%)] rounded-tr-sm" />
                  <h3 className="text-sm font-semibold tracking-wide">{tool.name}</h3>
                  <p className="mt-1 text-[11px] leading-snug text-black/60">{tool.description}</p>
                  <span className="mt-3 mx-auto flex w-fit items-center justify-center rounded-md bg-black/80 px-2.5 py-1 text-[10px] font-medium text-white transition-colors group-hover:bg-black">
                    Open
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── TESTIMONIALS : a carousel of five identical slides ── */}
        <Carousel />

        {/* ── The Button : visibly clickable, audibly clickable, functionally nothing ── */}
        <div className="border-t border-[#ececec]">
          <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-[#111]">
              Ready to accomplish nothing?
            </h2>
            <p className="text-[#777] mt-2 text-sm max-w-md">
              One click is all it takes. No sign-up, no outcome, no regrets.
            </p>
            <button
              type="button"
              onClick={onNothingClick}
              onPointerDown={() => setPressed(true)}
              onPointerUp={() => setPressed(false)}
              onPointerLeave={() => setPressed(false)}
              style={{ transform: pressed ? "translateY(1px) scale(0.97)" : undefined }}
              className="relative mt-8 overflow-hidden rounded-full bg-[#111] px-10 py-4
                text-sm font-medium tracking-wide text-white
                shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]
                transition-[transform,box-shadow] duration-150 ease-out
                hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.55)]
                active:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)]"
            >
              {ripples.map((r) => (
                <span
                  key={r.id}
                  className="ripple pointer-events-none absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
                  style={{ left: r.x, top: r.y }}
                />
              ))}
              <span className="relative">Do nothing</span>
            </button>
            <p className="text-[#bbb] mt-4 text-[11px] tracking-widest uppercase">
              Nothing happens. As promised.
            </p>
          </div>
        </div>

        <footer className="border-t border-[#ececec]">
          <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-[#aaa]">
            <span>nothing © {new Date().getFullYear()} — there is nothing we can do</span>
            <nav className="flex items-center gap-6">
              <Link
                href="/about"
                className="uppercase tracking-widest transition-colors hover:text-[#333]"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="uppercase tracking-widest transition-colors hover:text-[#333]"
              >
                Contact
              </Link>
            </nav>
          </div>
        </footer>
      </section>
    </div>
  );
}
