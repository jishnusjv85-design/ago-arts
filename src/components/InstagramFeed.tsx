import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { instagramPosts, instagramProfile, type IGPost } from "../data";
import { Reveal, staggerChild, staggerParent } from "./Reveal";

type Filter = "all" | "reel" | "post";

const Heart = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2 5 5.2 5c1.9 0 3.3 1 4.8 3 1.5-2 2.9-3 4.8-3C18 5 19.6 8.4 22 11.7 19.5 16.4 12 21 12 21z" />
  </svg>
);
const Bubble = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.8-.7L3 21l1.3-4A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z" />
  </svg>
);
const Play = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

function Lightbox({ post, onClose }: { post: IGPost; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-noir/95 p-4 backdrop-blur-md sm:p-8"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-noir"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="grid w-full max-w-4xl overflow-hidden border border-gold/20 bg-noir-800 md:grid-cols-[1.4fr_1fr]"
      >
        <div className="relative bg-noir flex items-center justify-center">
          {post.type === "reel" && post.video ? (
            <video
              src={post.video}
              poster={post.thumb}
              className="max-h-[78vh] w-full object-contain"
              controls
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img src={post.thumb} alt={post.caption} className="max-h-[78vh] w-full object-contain" />
          )}
        </div>

        <div className="flex flex-col p-6 sm:p-7">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] p-[2px]">
              <img src={instagramProfile.avatar} alt="" className="h-full w-full rounded-full object-cover" />
            </div>
            <div>
              <div className="font-display text-sm font-semibold text-cream">{instagramProfile.handle}</div>
              <div className="text-[0.65rem] uppercase tracking-[0.2em] text-gold/70">
                {post.type === "reel" ? "Reels" : "Post"}
              </div>
            </div>
          </div>

          <p className="mt-4 flex-1 text-sm leading-relaxed text-cream/75">
            <span className="font-semibold text-cream">{instagramProfile.handle}</span>{" "}
            {post.caption}
          </p>

          <div className="mt-5 flex items-center gap-5 text-cream/70">
            <span className="flex items-center gap-1.5 text-sm">
              <Heart className="h-4 w-4 text-crimson-light" /> {post.likes}
            </span>
            <span className="flex items-center gap-1.5 text-sm">
              <Bubble className="h-4 w-4" /> {post.comments}
            </span>
          </div>

          <a
            href={post.link}
            target="_blank"
            rel="noreferrer"
            className="btn-ink mt-6 justify-center"
          >
            View on Instagram
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H9M17 7v8" />
            </svg>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function InstagramFeed() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<IGPost | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? instagramPosts : instagramPosts.filter((p) => p.type === filter)),
    [filter]
  );

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: instagramPosts.length },
    { key: "reel", label: "Reels", count: instagramPosts.filter((p) => p.type === "reel").length },
    { key: "post", label: "Posts", count: instagramPosts.filter((p) => p.type === "post").length },
  ];

  return (
    <section id="instagram" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-[#d62976]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Profile header */}
        <Reveal>
          <div className="flex flex-col items-center gap-8 border-b border-gold/15 pb-10 text-center sm:flex-row sm:items-center sm:text-left md:gap-14">
            <div className="h-24 w-24 shrink-0 rounded-full bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] p-[3px] md:h-32 md:w-32">
              <img
                src={instagramProfile.avatar}
                alt={instagramProfile.name}
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-display text-xl font-semibold tracking-wide text-cream md:text-2xl">
                  {instagramProfile.handle}
                </h3>
                <a
                  href={instagramProfile.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  Follow
                </a>
              </div>

              <div className="mt-5 flex items-center justify-center gap-8 sm:justify-start">
                {[
                  [instagramProfile.stats.posts, "Posts"],
                  [instagramProfile.stats.followers, "Followers"],
                  [instagramProfile.stats.following, "Following"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <span className="font-display text-lg font-bold text-gold-gradient">{n}</span>{" "}
                    <span className="text-sm text-cream/60">{l}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 hidden sm:block">
                <div className="font-display text-sm font-semibold text-cream">{instagramProfile.name}</div>
                <p className="mt-1 text-sm leading-relaxed text-cream/60">{instagramProfile.bio}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Section eyebrow */}
        <div className="mt-14 mb-10 text-center">
          <Reveal>
            <div className="mb-4 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-gold/60" />
              <span className="eyebrow">@obsidian.ink — Latest</span>
              <span className="h-px w-10 bg-gold/60" />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-cream">
              Fresh from the <span className="text-gold-gradient italic">feed.</span>
            </h2>
          </Reveal>
        </div>

        {/* Filter tabs */}
        <Reveal>
          <div className="mb-9 flex justify-center">
            <div className="flex gap-1 border border-gold/15 bg-noir-800/60 p-1">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setFilter(t.key)}
                  className={`relative font-display text-[0.7rem] uppercase tracking-[0.18em] px-5 py-2.5 transition-colors ${
                    filter === t.key ? "text-noir" : "text-cream/60 hover:text-gold"
                  }`}
                >
                  {filter === t.key && (
                    <motion.span
                      layoutId="ig-filter"
                      className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">
                    {t.label} <span className="opacity-60">{t.count}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.button
                key={p.id}
                variants={staggerChild}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActive(p)}
                className="group relative aspect-square overflow-hidden bg-noir-800"
              >
                <img
                  src={p.thumb}
                  alt={p.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* type badge */}
                {p.type === "reel" && (
                  <div className="absolute right-2.5 top-2.5 flex items-center gap-1 text-white drop-shadow">
                    <Play className="h-4 w-4" />
                    <span className="font-display text-[0.6rem] uppercase tracking-wider">Reel</span>
                  </div>
                )}

                {/* hover overlay */}
                <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-noir/95 via-noir/30 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="flex justify-end gap-4 text-cream">
                    <span className="flex items-center gap-1.5 text-sm">
                      <Heart className="h-4 w-4 text-crimson-light" /> {p.likes}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm">
                      <Bubble className="h-4 w-4" /> {p.comments}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-left text-xs leading-snug text-cream/90">{p.caption}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Follow CTA */}
        <Reveal>
          <div className="mt-14 text-center">
            <a
              href={instagramProfile.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 font-display text-sm uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-light"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
              Follow {instagramProfile.handle}
            </a>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {active && <Lightbox post={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
