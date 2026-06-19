"use client";

import { useCallback, useEffect, useState } from "react";

// A fully featured testimonial carousel — five slides, arrows, dots, autoplay.
// Every single slide is exactly the same. You can navigate all you want;
// you will always arrive at nothing. As intended.
const SLIDES = 5;

const TESTIMONIAL = {
  quote:
    "I cannot overstate how much this changed nothing for me. I opened it, I navigated through every slide, and I arrived precisely where I started. Truly seamless.",
  author: "A satisfied user",
  role: "Doing nothing, professionally",
};

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  // a tiny fade on every "change" so it feels like something happens
  const goTo = useCallback((next: number) => {
    setFading(true);
    window.setTimeout(() => {
      setIndex(((next % SLIDES) + SLIDES) % SLIDES);
      setFading(false);
    }, 200);
  }, []);

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  // autoplay — endlessly advancing toward the same destination
  useEffect(() => {
    const id = window.setInterval(() => goTo(index + 1), 5000);
    return () => window.clearInterval(id);
  }, [goTo, index]);

  return (
    <section className="border-t border-[#ececec] bg-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="mb-10 text-center text-[10px] uppercase tracking-[0.3em] text-[#999]">
          What our users are saying
        </p>

        <div className="relative">
          {/* Prev / next — they move you to an identical slide */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-0 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#ececec] bg-white text-[#999] transition-colors hover:border-[#d9d9d9] hover:text-[#1a1a1a] sm:flex"
          >
            ←
          </button>

          <blockquote
            className={`mx-auto max-w-xl px-2 text-center transition-opacity duration-200 ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="text-lg font-medium leading-relaxed tracking-tight text-[#222]">
              “{TESTIMONIAL.quote}”
            </p>
            <footer className="mt-6">
              <span className="block text-sm font-semibold text-[#111]">
                {TESTIMONIAL.author}
              </span>
              <span className="mt-0.5 block text-xs text-[#999]">{TESTIMONIAL.role}</span>
            </footer>
          </blockquote>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-0 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#ececec] bg-white text-[#999] transition-colors hover:border-[#d9d9d9] hover:text-[#1a1a1a] sm:flex"
          >
            →
          </button>
        </div>

        {/* Dots — five of them, faithfully tracking which identical slide you are on */}
        <div className="mt-10 flex items-center justify-center gap-2.5">
          {Array.from({ length: SLIDES }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-[#1a1a1a]" : "w-2 bg-[#d4d4d4] hover:bg-[#b0b0b0]"
              }`}
            />
          ))}
        </div>

        <p className="mt-5 text-center text-[11px] tracking-widest text-[#bbb]">
          Slide {index + 1} of {SLIDES}
        </p>
      </div>
    </section>
  );
}
