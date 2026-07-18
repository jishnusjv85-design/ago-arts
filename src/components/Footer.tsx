import { navLinks } from "../data";

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/15 bg-noir-800/50">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <svg width="36" height="36" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="19" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.4" />
                <path d="M20 6 C11 19, 8 25, 8 31 a12 12 0 0 0 24 0 C32 25, 29 19, 20 6 Z" fill="url(#footGrad)" />
                <defs>
                  <linearGradient id="footGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f2dc97" />
                    <stop offset="100%" stopColor="#8a6d1f" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="leading-none">
                <span className="block font-display text-lg font-bold tracking-[0.25em] text-cream">AGO.ART</span>
                <span className="block font-display text-[0.6rem] tracking-[0.5em] text-gold">INK STUDIO</span>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/55">
              A custom tattoo studio where skin becomes story. Forged in black
              &amp; gold since 2009.
            </p>
            <div className="mt-6 flex gap-3">
              {["IG", "FB", "in", "Be", "YT"].map((s) => (
                <a
                  key={s}
                  href="#top"
                  aria-label={s}
                  className="flex h-9 w-9 items-center justify-center border border-gold/25 text-[0.6rem] tracking-wide text-gold/80 transition-colors hover:bg-gold hover:text-noir"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-5 font-display text-xs uppercase tracking-[0.25em] text-gold">Explore</h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-cream/60 transition-colors hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-5 font-display text-xs uppercase tracking-[0.25em] text-gold">Stay Inked</h4>
            <p className="text-sm text-cream/55">Flash drops, guest spots &amp; studio news.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex">
              <input
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 border border-white/10 border-r-0 bg-noir px-3 py-2.5 text-sm text-cream outline-none placeholder:text-ash/50 focus:border-gold"
              />
              <button className="bg-gradient-to-r from-gold-light to-gold px-4 text-noir transition-opacity hover:opacity-90" aria-label="Subscribe">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-7 sm:flex-row">
          <p className="text-xs text-ash">
            © {new Date().getFullYear()} AGO.ART Studio. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-ash">
            <a href="#top" className="transition-colors hover:text-gold">Privacy</a>
            <a href="#top" className="transition-colors hover:text-gold">Terms</a>
            <a href="#top" className="flex items-center gap-1.5 transition-colors hover:text-gold">
              Back to top
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19V5M6 11l6-6 6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
