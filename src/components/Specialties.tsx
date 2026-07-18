import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { specialties } from "../data";
import { Reveal, staggerChild, staggerParent } from "./Reveal";

const icons: Record<string, ReactNode> = {
  Blackwork: (
    <>
      <circle cx="32" cy="32" r="20" />
      <circle cx="32" cy="32" r="12" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
    </>
  ),
  "Fine Line": (
    <>
      <path d="M32 10c-6 8-6 18 0 28 6-10 6-20 0-28z" />
      <path d="M32 38c-5 2-9 6-11 11M32 38c5 2 9 6 11 11" />
    </>
  ),
  Realism: (
    <>
      <path d="M6 32c5-9 13-15 26-15s21 6 26 15c-5 9-13 15-26 15S11 41 6 32z" />
      <circle cx="32" cy="32" r="7" />
    </>
  ),
  Traditional: (
    <>
      <path d="M32 53s-18-11-18-25a10 10 0 0 1 18-6 10 10 0 0 1 18 6c0 14-18 25-18 25z" />
    </>
  ),
  "Japanese Irezumi": (
    <>
      <path d="M6 40c6 0 8-6 13-6s8 6 13 6 8-6 13-6 8 6 13 6" />
      <path d="M6 28c6 0 8-6 13-6s8 6 13 6 8-6 13-6 8 6 13 6" />
    </>
  ),
  "Sacred Geometry": (
    <>
      <path d="M32 8l22 12v24L32 56 10 44V20z" />
      <path d="M32 20l12 7v10l-12 7-12-7V27z" />
    </>
  ),
};

export default function Specialties() {
  return (
    <section id="specialties" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-16 max-w-2xl">
          <Reveal>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-gold/60" />
              <span className="eyebrow">Our Craft</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-cream">
              Styles we speak <span className="text-gold-gradient italic">fluently.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-cream/60">
              Six disciplines, one obsession with detail. Whatever your vision,
              there&apos;s an artist here who lives and breathes it.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-px bg-gold/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {specialties.map((s) => (
            <motion.div
              key={s.no}
              variants={staggerChild}
              className="group relative bg-noir p-9 transition-colors duration-500 hover:bg-noir-800"
            >
              <div className="absolute inset-x-0 top-0 h-px w-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500 group-hover:w-full" />
              <div className="mb-6 flex items-center justify-between">
                <span className="text-gold-gradient font-display text-4xl font-bold opacity-80">{s.no}</span>
                <svg
                  className="text-gold/70 transition-all duration-500 group-hover:text-gold group-hover:scale-110"
                  width="52"
                  height="52"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icons[s.title]}
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold text-cream transition-colors group-hover:text-gold">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/55">{s.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold opacity-0 transition-all duration-500 group-hover:opacity-100">
                Explore
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
