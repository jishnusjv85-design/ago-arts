import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks } from "../data";

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3 group">
      <svg width="34" height="34" viewBox="0 0 40 40" className="transition-transform duration-500 group-hover:rotate-180">
        <circle cx="20" cy="20" r="19" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.5" />
        <path d="M20 6 C11 19, 8 25, 8 31 a12 12 0 0 0 24 0 C32 25, 29 19, 20 6 Z" fill="url(#navGrad)" />
        <defs>
          <linearGradient id="navGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f2dc97" />
            <stop offset="100%" stopColor="#8a6d1f" />
          </linearGradient>
        </defs>
      </svg>
      <div className="leading-none">
        <span className="block font-display text-base font-bold tracking-[0.28em] text-cream">AGO.ARTS</span>
        <span className="block font-display text-[0.6rem] tracking-[0.55em] text-gold">INK STUDIO</span>
      </div>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-noir/85 backdrop-blur-xl border-b border-gold/15 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />

          <ul className="hidden lg:flex items-center gap-9">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative font-display text-[0.72rem] uppercase tracking-[0.2em] text-cream/75 transition-colors hover:text-gold"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <a href="#booking" className="btn-ink">
              Book Now
            </a>
          </div>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Open menu"
          >
            <span className="h-px w-7 bg-gold" />
            <span className="h-px w-7 bg-gold" />
            <span className="h-px w-5 bg-gold self-end" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-noir/97 backdrop-blur-md" />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-noir-800 border-l border-gold/20 p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-display tracking-[0.3em] text-gold">MENU</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-3 py-3 border-b border-white/5 font-display text-2xl text-cream hover:text-gold transition-colors"
                    >
                      <span className="text-xs text-gold/50">0{i + 1}</span>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a href="#booking" onClick={() => setOpen(false)} className="btn-ink mt-10 justify-center">
                Book a Consultation
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
