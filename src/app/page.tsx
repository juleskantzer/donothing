"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const tools = [
  {
    slug: "image-passthrough",
    name: "Image Optimizer",
    description: "Upload any image. Receive the exact same image. Nothing changed. Groundbreaking.",
    badge: "AI-Powered",
    color: "#1a1a1a",
  },
  {
    slug: "meditation",
    name: "Guided Meditation",
    description: "30 minutes of professionally generated audio to help you reach absolute inner nothing.",
    badge: "Wellness",
    color: "#0f1a0f",
  },
  {
    slug: "motivational-quote",
    name: "Motivational Quote Generator",
    description: "Get inspired. Or not. Our algorithm has processed millions of quotes to bring you... this.",
    badge: "Productivity",
    color: "#1a0f0f",
  },
  {
    slug: "todo",
    name: "Smart Todo List",
    description: "The most advanced todo list app ever built. Nothing to do? We've got you covered.",
    badge: "Organization",
    color: "#0f0f1a",
  },
  {
    slug: "timer",
    name: "Productivity Timer",
    description: "Track exactly how much of your life you're wasting, live, down to the millisecond. Finally, accountability.",
    badge: "Productivity",
    color: "#1a160f",
  },
  {
    slug: "decision-maker",
    name: "Decision Maker",
    description: "Can't choose? Our neural engine weighs every possible outcome and delivers the definitive answer.",
    badge: "Intelligence",
    color: "#0f1a1a",
  },
  {
    slug: "notes",
    name: "Private Notes",
    description: "Write down your most important thoughts. We respect your privacy by saving absolutely nothing.",
    badge: "Organization",
    color: "#1a0f17",
  },
  {
    slug: "qr-code",
    name: "QR Code Generator",
    description: "Generate a real, scannable QR code in seconds. Scan it to reveal its powerful, meaningful payload.",
    badge: "AI-Powered",
    color: "#0f140f",
  },
];

// initial scattered spots (percent of board) — packed & overlapping
const spots = [
  { x: 4, y: 30, tilt: -6 },
  { x: 60, y: 26, tilt: 5 },
  { x: 30, y: 40, tilt: 4 },
  { x: 72, y: 46, tilt: -5 },
  { x: 8, y: 60, tilt: 3 },
  { x: 44, y: 62, tilt: -4 },
  { x: 66, y: 72, tilt: 6 },
  { x: 22, y: 78, tilt: -7 },
];

export default function Home() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(spots.map((s) => ({ x: s.x, y: s.y, tilt: s.tilt })));
  const [z, setZ] = useState(spots.map((_, i) => i + 1));

  // randomize the board layout on mount (client only — avoids hydration mismatch)
  useEffect(() => {
    setPos(
      spots.map(() => ({
        x: 2 + Math.random() * 76,
        y: 16 + Math.random() * 66,
        tilt: -9 + Math.random() * 18,
      }))
    );
  }, []);
  const [draggingI, setDraggingI] = useState<number | null>(null);
  const drag = useRef<{ i: number; offX: number; offY: number } | null>(null);
  const topZ = useRef(spots.length);

  const bringToFront = useCallback((i: number) => {
    topZ.current += 1;
    setZ((prev) => prev.map((v, idx) => (idx === i ? topZ.current : v)));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent, i: number) => {
      // right click (or middle) starts a move; left click is left for navigation
      if (e.button !== 2) return;
      e.preventDefault();
      const rect = boardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      drag.current = { i, offX: px - pos[i].x, offY: py - pos[i].y };
      setDraggingI(i);
      bringToFront(i);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [pos, bringToFront]
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const d = drag.current;
    const rect = boardRef.current?.getBoundingClientRect();
    if (!d || !rect) return;
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    const nx = Math.min(82, Math.max(0, px - d.offX));
    const ny = Math.min(86, Math.max(2, py - d.offY));
    setPos((prev) => prev.map((p, idx) => (idx === d.i ? { ...p, x: nx, y: ny } : p)));
  }, []);

  const endDrag = useCallback(() => {
    drag.current = null;
    setDraggingI(null);
  }, []);

  return (
    <div
      ref={boardRef}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onContextMenu={(e) => e.preventDefault()}
      className="relative h-screen w-full overflow-hidden select-none border-[10px] border-[#141414]
        shadow-[inset_0_0_120px_40px_rgba(0,0,0,0.8)] [perspective:1400px]"
      style={{
        backgroundColor: "#0c0c0c",
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "24px 24px, 24px 24px",
        backgroundPosition: "0 0, 12px 12px",
      }}
    >
      {/* Board title */}
      <div className="relative z-[1] text-center pt-10 pointer-events-none">
        <h1 className="text-5xl font-bold tracking-tight text-white leading-none">nothing</h1>
        <p className="text-[#555] text-base tracking-widest uppercase mt-3">
          there is nothing we can do
        </p>
        <p className="text-[#444] mt-6 max-w-md mx-auto leading-relaxed text-sm px-6">
          A carefully curated suite of tools engineered to accomplish absolutely nothing.
          Save time by wasting time, intelligently.
        </p>
      </div>

      {/* Post-its scattered all over the board */}
      {tools.map((tool, i) => (
        <Link
          key={tool.slug}
          href={`/tools/${tool.slug}`}
          draggable={false}
          onPointerDown={(e) => onPointerDown(e, i)}
          style={{
            backgroundColor: tool.color,
            left: `${pos[i].x}%`,
            top: `${pos[i].y}%`,
            zIndex: z[i],
            ["--tilt" as string]: `${pos[i].tilt}deg`,
            ...(draggingI === i
              ? { transform: "rotate(1deg) scale(1.12)", cursor: "grabbing" }
              : {}),
          } as React.CSSProperties}
          className={`group absolute w-48 p-4 border border-[#222] rounded-sm
            [transform:rotate(var(--tilt))]
            transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform
            hover:[transform:rotate(0deg)_translateY(-10px)_scale(1.07)]
            hover:border-[#555]
            ${
              draggingI === i
                ? "shadow-[0_40px_60px_-12px_rgba(0,0,0,0.95),0_10px_20px_rgba(0,0,0,0.7)] border-[#666]"
                : "shadow-[0_12px_24px_-6px_rgba(0,0,0,0.75),0_3px_6px_rgba(0,0,0,0.6)] hover:shadow-[0_28px_44px_-10px_rgba(0,0,0,0.9)]"
            }`}
        >
          {/* peeled corner */}
          <span className="pointer-events-none absolute top-0 right-0 h-5 w-5
            bg-gradient-to-bl from-black/40 to-transparent
            [clip-path:polygon(100%_0,0_0,100%_100%)] rounded-tr-sm" />
          <div className="flex items-start justify-between mb-2">
            <span className="text-[9px] tracking-widest text-[#444] uppercase border border-[#2a2a2a] px-1.5 py-0.5 rounded-sm">
              {tool.badge}
            </span>
            <span className="text-[#2a2a2a] group-hover:text-[#555] transition-colors">→</span>
          </div>
          <h2 className="text-white font-semibold text-sm mb-1 tracking-wide">{tool.name}</h2>
          <p className="text-[#555] text-[11px] leading-snug">{tool.description}</p>
        </Link>
      ))}
    </div>
  );
}
