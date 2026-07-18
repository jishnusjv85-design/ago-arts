const items = [
  "Blackwork",
  "Fine Line",
  "Realism",
  "Traditional",
  "Irezumi",
  "Sacred Geometry",
  "Dotwork",
  "Micro Realism",
];

export default function Marquee() {
  return (
    <section className="relative border-y border-gold/15 bg-noir-800/50 py-6 overflow-hidden">
      <div className="flex whitespace-nowrap" style={{ animation: "marquee 38s linear infinite" }}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items.map((it) => (
              <span key={it} className="flex items-center">
                <span className="font-display text-3xl sm:text-5xl font-semibold tracking-wide text-cream/90 px-7">
                  {it}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" className="text-gold shrink-0">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" fill="currentColor" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
