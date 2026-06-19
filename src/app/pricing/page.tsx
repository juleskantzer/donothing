"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const plans = [
  {
    name: "Starter",
    tagline: "For individuals getting nothing done.",
    cta: "Pay €0",
    features: [
      "Unlimited access to nothing",
      "0 outcomes per month",
      "Community-driven silence",
      "No support, no questions",
    ],
  },
  {
    name: "Pro",
    tagline: "For teams scaling their nothing.",
    cta: "Pay €0",
    featured: true,
    features: [
      "Everything in Starter",
      "Still nothing, but faster",
      "Priority access to the void",
      "Advanced nothing analytics",
      "Dedicated account manager (none)",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For organizations that demand nothing.",
    cta: "Pay €0",
    features: [
      "Everything in Pro",
      "Unlimited seats, zero value",
      "Custom nothing onboarding",
      "99.99% guaranteed downtime",
      "SOC-2 compliant emptiness",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-5xl flex-col px-6 py-16">
      <Link
        href="/"
        className="mb-12 inline-block self-start text-xs tracking-widest text-[#8a8a8a] transition-colors hover:text-[#5a5a5a]"
      >
        ← back to nothing
      </Link>

      <div className="text-center">
        <p className="text-[10px] uppercase tracking-widest text-[#999]">Pricing</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#141414]">
          Simple, transparent pricing
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#707070]">
          Three plans, carefully designed for every scale of doing nothing.
          They all cost exactly the same: nothing. You can still pay.
        </p>
      </div>

      <div className="mt-14 grid flex-1 gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>

      <p className="mt-16 text-center text-[11px] text-[#bbb]">
        nothing — there is nothing we can do
      </p>
    </div>
  );
}

function PlanCard({ plan }: { plan: (typeof plans)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`flex flex-col border p-7 transition-colors ${
          plan.featured
            ? "border-[#1a1a1a] bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]"
            : "border-[#ececec] bg-[#fafaf8] hover:border-[#d9d9d9]"
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-widest text-[#999]">{plan.name}</p>
          {plan.featured && (
            <span className="border border-[#1a1a1a] px-2 py-0.5 text-[9px] uppercase tracking-widest text-[#1a1a1a]">
              Most nothing
            </span>
          )}
        </div>

        <div className="mt-5 flex items-end gap-1.5">
          <span className="text-4xl font-bold tracking-tight text-[#141414]">€0</span>
          <span className="pb-1.5 text-xs text-[#999]">/ month</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-[#777]">{plan.tagline}</p>

        <ul className="mt-6 flex-1 space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs text-[#555]">
              <span className="mt-0.5 text-[#bbb]" aria-hidden>
                ✕
              </span>
              {f}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`mt-7 rounded-md px-4 py-2.5 text-xs font-medium uppercase tracking-widest transition-colors ${
            plan.featured
              ? "border border-[#1a1a1a] bg-[#1a1a1a] text-white hover:bg-black"
              : "border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
          }`}
        >
          {plan.cta}
        </button>
      </div>

      {open && <CheckoutModal plan={plan} onClose={() => setOpen(false)} />}
    </>
  );
}

function CheckoutModal({
  plan,
  onClose,
}: {
  plan: (typeof plans)[number];
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setStatus("processing");
    // a convincing payment delay for a transaction that will never happen
    await new Promise((r) => setTimeout(r, 2200));
    setStatus("done");
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/30 px-6 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fade-in w-full max-w-sm border border-[#ececec] bg-[#fafaf8] p-7 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.3)]"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#999]">Checkout</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-[#111]">
              {plan.name} plan
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[#bbb] transition-colors hover:text-[#1a1a1a]"
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
              Payment of €0 successful
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[#999]">
              No card was charged. No account was created. You now have unlimited access
              to nothing — exactly like before.
            </p>
            <button
              onClick={onClose}
              className="mt-5 w-full rounded-md border border-[#1a1a1a] bg-[#1a1a1a] py-2.5 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-black"
            >
              Continue to nothing
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between border-y border-[#ececec] py-3 text-sm">
              <span className="text-[#777]">Total due today</span>
              <span className="font-semibold text-[#141414]">€0.00</span>
            </div>

            <form onSubmit={pay} className="space-y-3">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Card number"
                disabled={status === "processing"}
                className="w-full rounded-md border border-[#e2e2e0] bg-white px-3.5 py-2.5 text-sm text-[#141414] placeholder-[#b0b0b0] transition-colors focus:border-[#999] focus:outline-none disabled:opacity-50"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="MM / YY"
                  disabled={status === "processing"}
                  className="w-full rounded-md border border-[#e2e2e0] bg-white px-3.5 py-2.5 text-sm text-[#141414] placeholder-[#b0b0b0] transition-colors focus:border-[#999] focus:outline-none disabled:opacity-50"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  disabled={status === "processing"}
                  className="w-full rounded-md border border-[#e2e2e0] bg-white px-3.5 py-2.5 text-sm text-[#141414] placeholder-[#b0b0b0] transition-colors focus:border-[#999] focus:outline-none disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === "processing"}
                className="w-full rounded-md border border-[#1a1a1a] bg-[#1a1a1a] py-2.5 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
              >
                {status === "processing" ? "Processing payment…" : "Pay €0.00"}
              </button>
            </form>

            <p className="mt-5 text-center text-[11px] leading-relaxed text-[#bbb]">
              You will not be charged. There is nothing to charge for.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
