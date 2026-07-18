import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { testimonials } from "../data";
import { Reveal } from "./Reveal";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const count = testimonials.length;

  const go = useCallback((n: number) => setI((p) => (p + n + count) % count), [count]);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % count), 6000);
    return () => clearInterval(t);
  }, [count]);

  const active = testimonials[i];

  return (
    <section className="relative overflow-hidden bg-noir-800/40 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/10 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <Reveal>
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="eyebrow">Client Stories</span>
            <span className="h-px w-10 bg-gold/60" />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <svg className="mx-auto mb-8 text-gold/40" width="44" height="36" viewBox="0 0 44 36" fill="currentColor">
            <path d="M0 36V20C0 9 6 2 17 0l2 4C12 6 9 10 9 18h8v18H0zm26 0V20C26 9 32 2 43 0l2 4c-7 2-10 6-10 14h8v18H26z" />
          </svg>
        </Reveal>

        <div className="relative min-h-[200px] sm:min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-serif-elegant text-2xl sm:text-3xl leading-snug text-cream/90">
                &ldquo;{active.quote}&rdquo;
              </p>
              <footer className="mt-8">
                <div className="mb-3 flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} className="text-gold" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3 6.5 7 .9-5 4.8 1.3 7L12 17.8 5.4 21.2 6.7 14l-5-4.8 7-.9z" />
                    </svg>
                  ))}
                </div>
                <div className="font-display text-lg font-semibold text-gold-gradient">{active.name}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-ash">{active.detail}</div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button onClick={() => go(-1)} aria-label="Previous" className="text-gold/70 transition-colors hover:text-gold">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, d) => (
              <button
                key={d}
                onClick={() => setI(d)}
                aria-label={`Go to testimonial ${d + 1}`}
                className={`h-1.5 rounded-full transition-all ${d === i ? "w-8 bg-gold" : "w-1.5 bg-white/25"}`}
              />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next" className="text-gold/70 transition-colors hover:text-gold">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
