import { Reveal } from "./Reveal";
import aboutImg from "../assets/about.jpg";

const values = [
  "100% custom, hand-drawn designs",
  "Hospital-grade sterile environment",
  "Award-winning, internationally trained artists",
  "Transparent pricing & honest guidance",
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <Reveal y={50}>
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full border border-gold/30" />
            <div className="relative overflow-hidden">
              <img
                src={aboutImg}
                alt="Tattoo artist at work"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/60 to-transparent" />
            </div>

            {/* floating badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-noir-800 border border-gold/25 px-7 py-5 text-center card-edge">
              <div className="font-display text-4xl font-bold text-gold-gradient">2009</div>
              <div className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-ash">Forging legends since</div>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <div>
          <Reveal>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-gold/60" />
              <span className="eyebrow">The Studio</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-cream">
              More than ink — <br />
              <span className="text-gold-gradient italic">a rite of passage.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl leading-relaxed text-cream/70">
              Obsidian Ink was born from a single belief: that a tattoo should be
              as permanent in meaning as it is on skin. For over fifteen years,
              our studio has been a sanctuary for those ready to wear their story —
              crafted with patience, obsession, and absolute respect for the craft.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-xl leading-relaxed text-cream/60">
              Every piece begins with a conversation and ends with a lifelong mark.
              No flash walls, no shortcuts — only one-of-one art made for you alone.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-9 grid gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-3 text-sm text-cream/80">
                  <svg className="mt-0.5 shrink-0 text-gold" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex items-center gap-5">
              <a href="#booking" className="btn-ink">Begin Your Piece</a>
              <div>
                <div className="font-serif-elegant text-3xl italic text-gold-gradient">Luna Vance</div>
                <div className="text-xs uppercase tracking-[0.2em] text-ash">Founder &amp; Master Artist</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
