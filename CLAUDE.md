# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A satirical Next.js site ("nothing — there is nothing we can do") presenting a collection of polished, professional-looking "productivity tools" that intentionally do absolutely nothing. The comedy is the point: every tool fakes AI processing, sophisticated UX, and serious copy, then delivers an empty/no-op result. Preserve this tone when adding or editing features — convincing UI, fake-serious marketing copy, zero actual functionality.

## Commands

```bash
npm run dev     # local dev server (http://localhost:3000)
npm run build   # production build (output: "standalone")
npm run start   # serve the production build
npm run lint    # next lint
```

There is no test suite. Node 20 (`.nvmrc` pins 20).

## Architecture

Next.js 15 App Router, React 19, TypeScript (strict), Tailwind CSS 3. Everything lives under `src/app/`.

- `src/app/page.tsx` — the homepage. A client component rendering the `tools` array as a draggable sticky-note board. **Adding a tool means adding an entry to the `tools` array here** (`slug`, `name`, `description`, `badge`, `color`) AND creating `src/app/tools/<slug>/page.tsx`. The `spots` array controls initial note positions on the board.
- `src/app/tools/<slug>/page.tsx` — one directory per tool. Each is a self-contained `"use client"` component holding all its own state. The shared convention: a "← back to nothing" link, a badge chip, a title + serious description, and usually a fake processing delay (`await new Promise(r => setTimeout(r, 2000))`) before revealing the empty result.
- `src/app/api/silence/route.ts` — the only server route. Generates a real, valid, silent 30s MP3 in-memory (handcrafted ID3 header + silent MPEG frames) and serves it as a download. Used by the meditation tool. This is the model for "real artifact, no real content."
- `src/app/layout.tsx` — root layout; dark theme baked in via Tailwind classes on `<body>` (`bg-[#0a0a0a] text-[#e5e5e5]`).
- `src/app/globals.css` — global styles.

`@/*` is aliased to `./src/*` (see `tsconfig.json`).

## Styling conventions

Dark theme throughout. Colors are hardcoded as Tailwind arbitrary values (e.g. `text-[#444]`, `bg-[#0a0a0a]`) rather than a theme palette — match the existing near-black backgrounds and muted gray text. `tailwind.config.ts` only adds a monospace `font-mono` family (Courier New). No component library; everything is hand-rolled Tailwind.

## Deployment

Dockerized via the multi-stage `Dockerfile`, which relies on Next.js `output: "standalone"` (`next.config.ts`) to produce a self-contained `server.js`. Runs as non-root on port 3000. Deployed with Dokploy.
