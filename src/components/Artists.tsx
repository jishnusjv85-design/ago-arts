import { motion } from "framer-motion";
import { artists } from "../data";
import { Reveal, staggerChild, staggerParent } from "./Reveal";

export default function Artists() {
  return (
    <section id="artists" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-16 text-center">
          <Reveal>
            <div className="mb-5 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-gold/60" />
              <span className="eyebrow">The Hands</span>
              <span className="h-px w-10 bg-gold/60" />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-cream">
              Artists behind the <span className="text-gold-gradient italic">machine.</span>
            </h2>
          </Reveal>
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {artists.map((a) => (
            <motion.article key={a.name} variants={staggerChild} className="group relative overflow-hidden bg-noir-800">
              <div className="relative overflow-hidden">
                <img
                  src={a.img}
                  alt={a.name}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover grayscale transition-all duration-[1.2s] group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/10 to-transparent" />

                {/* experience tag */}
                <div className="absolute right-4 top-4 border border-gold/40 bg-noir/50 px-3 py-1.5 backdrop-blur-sm">
                  <span className="text-xs font-medium text-gold">{a.experience}</span>
                </div>
              </div>

              <div className="relative p-6">
                <h3 className="font-display text-2xl font-semibold text-cream transition-colors group-hover:text-gold">
                  {a.name}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold/80">{a.role}</p>
                <p className="mt-3 text-sm text-cream/55">{a.specialty}</p>

                <div className="mt-5 flex gap-2 opacity-60 transition-opacity group-hover:opacity-100">
                  {["IG", "in", "Be"].map((s) => (
                    <a
                      key={s}
                      href="#top"
                      className="flex h-9 w-9 items-center justify-center border border-gold/30 text-[0.6rem] font-medium tracking-wide text-gold transition-colors hover:bg-gold hover:text-noir"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
