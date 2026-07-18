import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { categories, works, type Category } from "../data";
import { Reveal } from "./Reveal";

export default function Gallery() {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? works : works.filter((w) => w.category === active);

  return (
    <section id="gallery" className="relative bg-noir-800/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <div className="mb-5 flex items-center gap-4">
                <span className="h-px w-10 bg-gold/60" />
                <span className="eyebrow">Portfolio</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-cream">
                Marks we&apos;ve <span className="text-gold-gradient italic">made permanent.</span>
              </h2>
            </Reveal>
          </div>

          {/* Filters */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`relative font-display text-[0.7rem] uppercase tracking-[0.18em] px-4 py-2.5 transition-colors ${
                    active === c ? "text-noir" : "text-cream/60 hover:text-gold"
                  }`}
                >
                  {active === c && (
                    <motion.span
                      layoutId="gallery-filter"
                      className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{c}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="grid grid-cols-2 gap-4 auto-rows-[200px] sm:auto-rows-[230px] md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((w) => (
              <motion.figure
                key={w.src}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden ${w.span ? "row-span-2" : ""}`}
              >
                <img
                  src={w.src}
                  alt={w.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-[0.62rem] uppercase tracking-[0.25em] text-gold">{w.category}</span>
                  <h3 className="mt-1 font-display text-xl font-semibold text-cream">{w.title}</h3>
                </figcaption>
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-gold/40 bg-noir/40 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H9M17 7v8" />
                  </svg>
                </div>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal>
          <div className="mt-14 text-center">
            <a href="#booking" className="btn-ghost">Commission Your Own</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
