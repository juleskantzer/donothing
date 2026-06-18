import Link from "next/link";

// Real, send-only / no-reply style inboxes — by design nobody reads these,
// which makes them the perfect place to send nothing.
const inboxes = [
  { name: "Les Impôts", email: "noreply@impots.gouv.fr" },
  { name: "UPS", email: "pkginfo@ups.com" },
  { name: "PayPal", email: "noreply@paypal.com" },
  { name: "Amazon", email: "no-reply@amazon.com" },
  { name: "LinkedIn", email: "no-reply@linkedin.com" },
];

export default function Contact() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-2xl flex-col px-6 py-16">
      <Link
        href="/"
        className="mb-12 inline-block self-start text-xs tracking-widest text-[#8a8a8a] transition-colors hover:text-[#5a5a5a]"
      >
        ← back to nothing
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-[#141414]">Contact not us</h1>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-[#707070]">
        If you have nothing to say, say it to no one in particular. We have built an entire
        channel for exactly that.
      </p>

      <div className="mt-12 border-t border-[#ececec] pt-12">
        <p className="text-[10px] uppercase tracking-widest text-[#999]">Where to send nothing</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[#707070]">
          Compose an email containing nothing and send it to any of the world&apos;s most
          reliably unresponsive inboxes. Hand-picked for their commitment to never replying.
        </p>

        <ul className="mt-6 divide-y divide-[#f0f0f0] border-y border-[#f0f0f0]">
          {inboxes.map((box) => (
            <li key={box.email}>
              <a
                href={`mailto:${box.email}?subject=Nothing`}
                className="group flex items-center justify-between py-3.5 text-sm transition-colors hover:bg-[#fafafa]"
              >
                <span className="text-[#999]">{box.name}</span>
                <span className="font-medium text-[#141414] underline decoration-[#e2e2e0] underline-offset-2 transition-colors group-hover:decoration-[#141414]">
                  {box.email}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-md text-xs leading-relaxed text-[#b0b0b0]">
          None of them will ever reply to you. That is the whole point. Allow up to ∞ business
          days for the silence to set in.
        </p>
      </div>

      <p className="mt-auto pt-16 text-center text-[11px] text-[#bbb]">
        nothing — there is nothing we can do
      </p>
    </div>
  );
}
