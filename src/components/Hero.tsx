import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 2.75 } },
};
const item = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, ease } },
};

function RotatingBadge() {
  return (
    <div className="relative h-28 w-28 sm:h-32 sm:w-32">
      <svg viewBox="0 0 200 200" className="animate-spin-slow h-full w-full">
        <defs>
          <path id="heroCircle" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-gold" style={{ fontSize: "15px", letterSpacing: "3.5px", fontFamily: "Cinzel, serif" }}>
          <textPath href="#heroCircle" startOffset="0">
            • OBSIDIAN INK • CUSTOM TATTOO • EST 2009
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="26" height="34" viewBox="0 0 40 50">
          <path d="M20 4 C9 19, 6 26, 6 33 a14 14 0 0 0 28 0 C34 26, 31 19, 20 4 Z" fill="#d4af37" opacity="0.85" />
        </svg>
      </div>
    </div>
  );
}

const heroImages = [
  "/images/hero.jpg",
  "/images/portfolio_blackwork.png",
  "/images/portfolio_realism.png",
  "/images/portfolio_japanese.png",
];

export default function Hero() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-noir">
      <div className="absolute inset-0 bg-noir" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative z-10">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
            <motion.div variants={item} className="mb-5 flex items-center gap-3">
              <span className="h-px w-16 bg-gold/60" />
              <span className="eyebrow">EST. 2009 — CUSTOM TATTOO STUDIO</span>
            </motion.div>

            <h1 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-cream sm:text-[5rem] lg:text-[6.5rem]">
              <motion.span variants={item} className="block">Where Skin</motion.span>
              <motion.span variants={item} className="block">Becomes</motion.span>
              <motion.span
                variants={item}
                className="block font-serif-elegant text-5xl font-semibold uppercase tracking-[0.2em] text-legend-gold sm:text-[5.75rem] lg:text-[6.5rem]"
              >
                Legend
              </motion.span>
            </h1>

            <motion.p variants={item} className="mt-8 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
              A custom tattoo studio crafting one-of-one pieces in black & gold — realism, blackwork and fine line, designed to outlive the trend.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
              <a href="#booking" className="btn-ink">
                Book a Consultation
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="#gallery" className="btn-ghost">
                Explore the Portfolio
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative">
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] xl:grid-cols-[1.05fr_0.95fr]">
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[32px] border border-gold/10 bg-noir-900">
                <motion.img
                  key={heroIndex}
                  src={heroImages[heroIndex]}
                  alt="AGO.ARTS hero"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease }}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-[24px] border border-gold/10 bg-noir-900">
                  <img src="/images/portfolio_blackwork.png" alt="Tattoo work" className="h-full w-full object-cover" />
                </div>
                <div className="overflow-hidden rounded-[24px] border border-gold/10 bg-noir-900">
                  <img src="/images/portfolio_fineline.png" alt="Tattoo work" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[32px] border border-gold/10 bg-noir-900 row-span-2">
                <img src="/images/portfolio_japanese.png" alt="Tattoo work" className="h-full w-full object-cover" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-[24px] border border-gold/10 bg-noir-900">
                  <img src="/images/portfolio_realism.png" alt="Tattoo work" className="h-full w-full object-cover" />
                </div>
                <div className="overflow-hidden rounded-[24px] border border-gold/10 bg-noir-900">
                  <img src="/images/about.jpg" alt="Studio detail" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-gold/20 opacity-40" />
          <div className="pointer-events-none absolute right-6 top-6 h-24 w-24 rounded-full bg-gold/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
