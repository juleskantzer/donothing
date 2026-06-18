"use client";

import { useState } from "react";

function extractId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
    /(?:youtube\.com\/live\/)([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  // bare 11-char id
  if (/^[\w-]{11}$/.test(url.trim())) return url.trim();
  return null;
}

export default function YoutubePlayer() {
  const [input, setInput] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState(false);

  function play(e: React.FormEvent) {
    e.preventDefault();
    const id = extractId(input.trim());
    if (!id) {
      setVideoId(null);
      setError(true);
      return;
    }
    setError(false);
    setVideoId(id);
  }

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
          Entertainment
        </span>
        <h1 className="mt-4 mb-2 text-3xl font-bold tracking-tight text-[#141414]">
          YouTube Player
        </h1>
        <p className="text-sm leading-relaxed text-[#707070]">
          Paste any YouTube link below. Our advanced media pipeline will analyze, buffer,
          and play the exact video you pasted. Nothing more.
        </p>
      </div>

      <form onSubmit={play} className="space-y-3">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          placeholder="https://www.youtube.com/watch?v=…"
          className="w-full rounded-md border border-[#e2e2e0] bg-white px-4 py-3 text-sm text-[#141414] placeholder-[#b0b0b0] transition-colors focus:border-[#999] focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-full rounded-md bg-[#141414] py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-30"
        >
          Play
        </button>
      </form>

      {error && (
        <p className="mt-4 text-center text-xs text-[#9a9a9a]">
          That doesn&apos;t look like a YouTube link. We can do nothing with it.
        </p>
      )}

      {videoId && (
        <div className="fade-in mt-6 space-y-3">
          <div className="aspect-video w-full overflow-hidden rounded-md border border-[#e2e2e0] bg-black">
            <iframe
              key={videoId}
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          <p className="text-center text-[11px] text-[#bbb]">
            The video you pasted is now playing. You&apos;re welcome.
          </p>
        </div>
      )}
    </div>
  );
}
