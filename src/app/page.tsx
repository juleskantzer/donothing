"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

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
];

const featured = tools.filter((t) => t.featured);
const rest = tools.filter((t) => !t.featured);

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
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "26px 26px, 26px 26px",
          backgroundPosition: "0 0, 13px 13px",
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
              backgroundColor: tool.note,
              left: `${pos[i].x}%`,
              top: `${pos[i].y}%`,
              zIndex: z[i],
              ["--tilt" as string]: `${pos[i].tilt}deg`,
              ...(draggingI === i
                ? { transform: "rotate(1deg) scale(1.1)", cursor: "grabbing" }
                : {}),
            } as React.CSSProperties}
            className={`group absolute w-40 sm:w-48 p-4 rounded-sm text-[#1a1a1a] cursor-grab touch-none
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
            <span className="text-[9px] tracking-widest text-[#444] uppercase bg-black/5 px-1.5 py-0.5 rounded-sm">
              {tool.badge}
            </span>
            <h2 className="font-semibold text-sm mt-2 mb-1 tracking-wide">{tool.name}</h2>
            <p className="text-black/60 text-[11px] leading-snug">{tool.description}</p>
            <Link
              href={`/tools/${tool.slug}`}
              draggable={false}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="mt-3 inline-flex items-center gap-1 rounded-md bg-black/80 px-3 py-1.5
                text-[11px] font-medium text-white cursor-pointer
                transition-colors hover:bg-black"
            >
              Open <span aria-hidden>→</span>
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

      {/* ── ALL TOOLS : classic card grid ── */}
      <section className="border-t border-[#ececec] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight text-[#111]">The rest of nothing</h2>
            <p className="text-[#777] mt-2 text-sm">
              {tools.length} tools. Zero outcomes. The {featured.length} above are
              merely the most prominent disappointments — here is the remainder.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group relative flex flex-col rounded-xl border border-[#ececec] bg-white p-6
                  transition-all duration-200 hover:-translate-y-1 hover:border-[#d9d9d9]
                  hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.2)]"
              >
                <span
                  className="mb-4 h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: tool.note }}
                />
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] tracking-widest text-[#999] uppercase">
                    {tool.badge}
                  </span>
                  <span className="text-[#ccc] transition-colors group-hover:text-[#333]">→</span>
                </div>
                <h3 className="text-base font-semibold text-[#111]">{tool.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#777]">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <footer className="border-t border-[#ececec]">
          <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-[#aaa]">
            <span>nothing © {new Date().getFullYear()} — there is nothing we can do</span>
            <Link
              href="/about"
              className="uppercase tracking-widest transition-colors hover:text-[#333]"
            >
              About
            </Link>
          </div>
        </footer>
      </section>
    </div>
  );
}
