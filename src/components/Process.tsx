import { processSteps } from "../data";
import { Reveal, staggerChild, staggerParent } from "./Reveal";
import { motion } from "framer-motion";

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-16 text-center">
          <Reveal>
            <div className="mb-5 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-gold/60" />
              <span className="eyebrow">How It Works</span>
              <span className="h-px w-10 bg-gold/60" />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-cream">
              From idea to <span className="text-gold-gradient italic">infinity.</span>
            </h2>
          </Reveal>
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative grid gap-8 md:grid-cols-4"
        >
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent md:block" />

          {processSteps.map((s) => (
            <motion.div key={s.no} variants={staggerChild} className="relative text-center md:text-left">
              <div className="relative z-10 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-noir font-display text-lg font-bold text-gold md:mx-0">
                {s.no}
                <span className="absolute inset-0 animate-glow rounded-full bg-gold/20 blur-md" />
              </div>
              <h3 className="font-display text-xl font-semibold text-cream">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/55">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
