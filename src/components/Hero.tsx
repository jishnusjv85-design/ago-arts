import { motion } from "framer-motion";
import heroImg from "../assets/hero.jpg";

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

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.img
          src={heroImg}
          alt="Obsidian Ink tattoo studio"
          initial={{ scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/85 to-noir/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-noir/60" />
      </div>

      {/* Floating gold motes */}
      {[
        "left-[12%] top-[28%]",
        "left-[24%] top-[70%]",
        "left-[60%] top-[22%]",
        "left-[78%] top-[60%]",
        "left-[44%] top-[80%]",
      ].map((pos, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-gold/60 blur-[1px] ${pos}`}
          style={{ animation: `float ${6 + i}s ease-in-out ${i * 0.6}s infinite` }}
        />
      ))}

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 pt-28 pb-24"
      >
        <motion.div variants={item} className="mb-7 flex items-center gap-4">
          <span className="h-px w-12 bg-gold/60" />
          <span className="eyebrow">Est. 2009 — Custom Tattoo Studio</span>
        </motion.div>

        <h1 className="font-display font-bold leading-[0.92] tracking-tight">
          <motion.span variants={item} className="block text-5xl sm:text-7xl lg:text-8xl text-cream">
            Where Skin
          </motion.span>
          <motion.span variants={item} className="block text-5xl sm:text-7xl lg:text-8xl text-cream">
            Becomes
          </motion.span>
          <motion.span variants={item} className="block text-shimmer text-6xl sm:text-8xl lg:text-9xl italic" style={{ backgroundSize: "200% auto" }}>
            Legend
          </motion.span>
        </h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-cream/70 font-light"
        >
          A custom tattoo studio crafting one-of-one pieces in black &amp; gold —
          realism, blackwork and fine line, designed to outlive the trend.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
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

        {/* Stats */}
        <motion.div
          variants={item}
          className="mt-16 grid max-w-2xl grid-cols-2 gap-px overflow-hidden border border-gold/15 sm:grid-cols-4"
        >
          {[
            ["15+", "Years"],
            ["8K+", "Tattoos"],
            ["4", "Artists"],
            ["5.0", "Rating"],
          ].map(([n, l]) => (
            <div key={l} className="bg-noir-800/60 px-5 py-5 backdrop-blur-sm text-center">
              <div className="font-display text-2xl sm:text-3xl text-gold-gradient font-bold">{n}</div>
              <div className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-ash">{l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Rotating badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.8, ease }}
        className="absolute bottom-12 right-8 hidden lg:block"
      >
        <RotatingBadge />
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.4em] text-ash">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-gold"
            animate={{ y: [-16, 48] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
