import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExit(true), 2100);
    const t2 = setTimeout(onDone, 2900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-noir"
      animate={exit ? { opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } } : {}}
      style={{ pointerEvents: exit ? "none" : "auto" }}
    >
      {/* ink drop */}
      <motion.svg
        width="58"
        height="78"
        viewBox="0 0 58 78"
        className="mb-6"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.path
          d="M29 2 C12 26, 6 40, 6 52 a23 23 0 0 0 46 0 C52 40, 46 26, 29 2 Z"
          fill="url(#inkGrad)"
          initial={{ pathLength: 0.2, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="inkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f2dc97" />
            <stop offset="60%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#8a6d1f" />
          </linearGradient>
        </defs>
      </motion.svg>

      <motion.div
        className="overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.h1
          className="font-display text-3xl sm:text-4xl font-bold tracking-[0.32em] text-cream"
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          OBSIDIAN
        </motion.h1>
      </motion.div>

      <motion.div
        className="font-display text-sm tracking-[0.6em] text-gold mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        INK
      </motion.div>

      <div className="absolute bottom-10 h-px w-44 overflow-hidden bg-noir-600">
        <motion.div
          className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ delay: 0.3, duration: 1.8, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
