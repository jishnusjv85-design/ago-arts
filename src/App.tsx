import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Specialties from "./components/Specialties";
import Gallery from "./components/Gallery";
import Artists from "./components/Artists";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import InstagramFeed from "./components/InstagramFeed";
import Store from "./components/Store";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[70] h-0.5 w-full origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light"
    />
  );
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
        el.style.opacity = "1";
      });
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[55] h-[300px] w-[300px] rounded-full opacity-0 blur-3xl transition-opacity duration-500"
      style={{ background: "radial-gradient(circle, rgba(212,175,55,0.10), transparent 65%)" }}
    />
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <div className="grain relative min-h-screen bg-noir">
      {/* Ambient background */}
      <div className="vignette pointer-events-none fixed inset-0 -z-10" />

      <AnimatePresence>{loading && <Preloader key="pre" onDone={() => setLoading(false)} />}</AnimatePresence>

      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Specialties />
        <Gallery />
        <Store />
        <Artists />
        <Process />
        <Testimonials />
        <InstagramFeed />
        <Booking />
      </main>

      <Footer />
    </div>
  );
}
