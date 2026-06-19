import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
      {/* The brand mark — a square X, matching the navbar logo */}
      <span className="flex h-14 w-14 items-center justify-center border border-[#1a1a1a]">
        <svg viewBox="0 0 16 16" className="h-7 w-7" aria-hidden>
          <path
            d="M3 3 L13 13 M13 3 L3 13"
            className="stroke-[#1a1a1a]"
            strokeWidth="1.4"
            strokeLinecap="square"
            fill="none"
          />
        </svg>
      </span>

      <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-[#999]">Error 404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#141414]">
        Nothing to do here
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-[#707070]">
        Also, one of the most useful pages on the site.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-md border border-[#1a1a1a] px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white"
      >
        back to nothing
      </Link>

      <p className="mt-16 text-[11px] text-[#bbb]">
        nothing — there is nothing we can do
      </p>
    </div>
  );
}
