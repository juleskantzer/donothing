import Link from "next/link";

const me = [
  { label: "GitHub", href: "https://github.com/juleskantzer" },
  { label: "Kaggle", href: "https://www.kaggle.com/juleskantzer" },
  { label: "X", href: "https://x.com/juleskantzer" },
];

const brother = [{ label: "GitHub", href: "https://github.com/MarkusLeGrand" }];

function Person({ name, links }: { name: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-[#999]">{name}</p>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 border-b border-[#e2e2e0] pb-0.5 text-sm text-[#141414] transition-colors hover:border-[#141414]"
          >
            {l.label}
            <span className="text-[#bbb] transition-colors group-hover:text-[#141414]">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-2xl flex-col px-6 py-16">
      <Link
        href="/"
        className="mb-12 inline-block self-start text-xs tracking-widest text-[#8a8a8a] transition-colors hover:text-[#5a5a5a]"
      >
        ← back to nothing
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-[#141414]">About</h1>

      {/* The two of us, side by side */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <Person name="Jules Kantzer" links={me} />
        <Person name="Markus Le Grand" links={brother} />
      </div>

      {/* Support — no card, just a hairline and centered prose */}
      <div className="mt-16 border-t border-[#ececec] pt-12 text-center">
        <p className="mx-auto max-w-md text-sm leading-relaxed text-[#707070]">
          <span className="font-semibold text-[#141414]">nothing</span> is a carefully crafted
          suite of tools engineered to accomplish absolutely nothing. We did that for no reason.
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#141414]">
          If this site was completely useless to you, feel free to leave a tip anyway.
        </p>

        <a
          href="https://ko-fi.com/juleskantzer"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#141414] px-5 py-2.5 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-black"
        >
          ☕ Support on Ko-fi
        </a>
      </div>

      <p className="mt-auto pt-16 text-center text-[11px] text-[#bbb]">
        nothing — there is nothing we can do
      </p>
    </div>
  );
}
