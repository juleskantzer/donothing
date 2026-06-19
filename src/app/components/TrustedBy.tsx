// A "trusted by" marquee that scrolls forever and proves nothing.
// Recreations of well-known logos, tinted in the post-it pastel palette and
// lightly blurred, looping on repeat. Trademarks belong to their owners.

const BG = "#fafaf8"; // page background, used to "cut out" shapes

type Logo = { name: string; color: string; mark: React.ReactNode };

const logos: Logo[] = [
  {
    // Nike — swoosh
    name: "Nike",
    color: "#fecaca",
    mark: <path d="M2 16 C7 10.5 14 5.5 21 7 C14 9 8 13 5 17 Z" fill="currentColor" />,
  },
  {
    // Adidas — three slanted bars
    name: "Adidas",
    color: "#bfdbfe",
    mark: (
      <g fill="currentColor">
        <path d="M2.5 18 L6 8 L8 8 L5 18 Z" />
        <path d="M7.5 18 L11.5 6 L13.5 6 L9.5 18 Z" />
        <path d="M12.5 18 L17 4 L19 4 L14 18 Z" />
      </g>
    ),
  },
  {
    // Windows — four panes
    name: "Windows",
    color: "#cffafe",
    mark: (
      <g fill="currentColor">
        <rect x="2" y="2" width="8" height="8" />
        <rect x="12" y="2" width="8" height="8" />
        <rect x="2" y="12" width="8" height="8" />
        <rect x="12" y="12" width="8" height="8" />
      </g>
    ),
  },
  {
    // Mastercard — two overlapping circles
    name: "Mastercard",
    color: "#fed7aa",
    mark: (
      <g fill="currentColor">
        <circle cx="8" cy="11" r="6.5" opacity="0.85" />
        <circle cx="14" cy="11" r="6.5" opacity="0.85" />
      </g>
    ),
  },
  {
    // Mercedes — three-point star in a ring
    name: "Mercedes",
    color: "#ddd6fe",
    mark: (
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="9" />
        <path d="M11 11 L11 2 M11 11 L3.5 15.5 M11 11 L18.5 15.5" />
      </g>
    ),
  },
  {
    // Target — concentric bullseye
    name: "Target",
    color: "#fecdd3",
    mark: (
      <>
        <circle cx="11" cy="11" r="9" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="11" cy="11" r="5" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="11" cy="11" r="1.6" fill="currentColor" />
      </>
    ),
  },
  {
    // Audi — four interlocking rings
    name: "Audi",
    color: "#a7f3d0",
    mark: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="4.5" cy="11" r="3.6" />
        <circle cx="9" cy="11" r="3.6" />
        <circle cx="13.5" cy="11" r="3.6" />
        <circle cx="18" cy="11" r="3.6" />
      </g>
    ),
  },
  {
    // Apple — bitten apple with leaf
    name: "Apple",
    color: "#bbf7d0",
    mark: (
      <g fill="currentColor">
        <path d="M15.3 6.8 c-1 0-2 .6-3 .6 -1 0-2-.6-3.1-.6 -2.2 0-4.2 1.7-4.2 5.1 0 3.2 2.1 6.5 3.6 6.5 .9 0 1.3-.5 2.7-.5 1.4 0 1.7.5 2.7.5 1.6 0 3.5-3.2 3.5-4.4 -2-1-2-3.7 0-4.7 -.8-1.6-2.5-2.6-4.2-2z" />
        <path d="M12 5.6 c.2-1.6 1.6-2.8 2.9-2.8 -.1 1.5-1.4 2.7-2.9 2.8z" />
      </g>
    ),
  },
  {
    // YouTube — rounded rect with play triangle
    name: "YouTube",
    color: "#fda4af",
    mark: (
      <>
        <rect x="1" y="4.5" width="20" height="13" rx="4" fill="currentColor" />
        <path d="M9 8.5 L15 11 L9 13.5 Z" fill={BG} />
      </>
    ),
  },
  {
    // Spotify — circle with three sound waves
    name: "Spotify",
    color: "#86efac",
    mark: (
      <>
        <circle cx="11" cy="11" r="9.5" fill="currentColor" />
        <g fill="none" stroke={BG} strokeWidth="1.5" strokeLinecap="round">
          <path d="M6 8 C10 7 14.5 7.5 17 9.5" />
          <path d="M6.5 11.3 C10 10.4 13.5 10.8 16 12.4" />
          <path d="M7 14.4 C10 13.7 12.8 14 15 15.2" />
        </g>
      </>
    ),
  },
];

function LogoItem({ name, color, mark }: Logo) {
  return (
    <div className="flex shrink-0 items-center px-12" aria-label={name}>
      <svg viewBox="0 0 22 22" className="h-11 w-11" style={{ color }} aria-hidden>
        {mark}
      </svg>
    </div>
  );
}

export default function TrustedBy() {
  // each half of the track repeats the set so the loop never shows a seam
  const half = Array.from({ length: 3 }).flatMap(() => logos);

  return (
    <section className="border-t border-[#ececec] bg-[#fafaf8] py-12">
      <p className="mb-8 text-center text-[10px] uppercase tracking-[0.3em] text-[#999]">
        Trusted by
      </p>

      {/* fade the edges so logos dissolve in and out */}
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track flex w-max blur-[6px]">
          {[...half, ...half].map((logo, i) => (
            <LogoItem key={i} {...logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
