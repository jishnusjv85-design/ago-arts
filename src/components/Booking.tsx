import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import { submitBooking } from "../services/bookingService";

const info = [
  { label: "Visit the Studio", value: "47 Ironworks Lane, East District", icon: "M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" },
  { label: "Call or Text", value: "9947200345", icon: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" },
  { label: "Email", value: "hello@Art & Tattooink.studio", icon: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M22 6l-10 7L2 6" },
];

const hours = [
  ["Tue – Fri", "11:00 – 20:00"],
  ["Saturday", "10:00 – 18:00"],
  ["Sun – Mon", "By appointment"],
];

const styles = ["Blackwork", "Fine Line", "Realism", "Traditional", "Japanese Irezumi", "Sacred Geometry", "Not sure yet"];

export default function Booking() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      style: String(formData.get("style") || "Not sure yet"),
      placement: String(formData.get("placement") || ""),
      description: String(formData.get("description") || ""),
    };

    try {
      await submitBooking(payload);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit booking request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Info panel */}
          <div>
            <Reveal>
              <div className="mb-5 flex items-center gap-4">
                <span className="h-px w-10 bg-gold/60" />
                <span className="eyebrow">Book Your Piece</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-cream">
                Let&apos;s start <span className="text-gold-gradient italic">something permanent.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-cream/60">
                Tell us about your vision. We&apos;ll reply within 48 hours with
                ideas, a quote and the next available slot.
              </p>
            </Reveal>

            <div className="mt-10 space-y-6">
              {info.map((it, idx) => (
                <Reveal key={it.label} delay={0.12 + idx * 0.06}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/30">
                      <svg className="text-gold" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={it.icon} />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[0.62rem] uppercase tracking-[0.25em] text-ash">{it.label}</div>
                      <div className="mt-0.5 text-cream/90">{it.value}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.32}>
              <div className="mt-9 border-t border-gold/15 pt-6">
                <div className="mb-3 text-[0.62rem] uppercase tracking-[0.25em] text-ash">Studio Hours</div>
                <ul className="space-y-2">
                  {hours.map(([d, h]) => (
                    <li key={d} className="flex justify-between text-sm">
                      <span className="text-cream/70">{d}</span>
                      <span className="text-gold/90">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="card-edge bg-noir-800/60 p-7 sm:p-10 backdrop-blur-sm">
              {sent ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40">
                    <svg className="text-gold" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-gold-gradient">Request received</h3>
                  <p className="mt-3 max-w-sm text-cream/60">
                    Thank you for trusting AGO.ART. Our team will reach out
                    within 48 hours to shape your piece.
                  </p>
                  <button onClick={() => setSent(false)} className="btn-ghost mt-8">
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name" name="name" placeholder="Jane Doe" />
                    <Field label="Email" name="email" type="email" placeholder="jane@email.com" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Phone" name="phone" placeholder="9947200345" />
                    <div>
                      <label className="mb-2 block text-[0.62rem] uppercase tracking-[0.25em] text-ash">Preferred Style</label>
                      <select name="style" className="w-full border border-white/10 bg-noir px-4 py-3 text-sm text-cream outline-none transition-colors focus:border-gold">
                        {styles.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <Field label="Placement & Size" name="placement" placeholder="e.g. left forearm, 12cm sleeve" />
                  <div>
                    <label className="mb-2 block text-[0.62rem] uppercase tracking-[0.25em] text-ash">Describe Your Vision</label>
                    <textarea
                      name="description"
                      rows={4}
                      placeholder="Tell us the story, references, dates you're available..."
                      className="w-full resize-none border border-white/10 bg-noir px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-ash/50 focus:border-gold"
                    />
                  </div>
                  {error ? <p className="text-sm text-crimson-light">{error}</p> : null}
                  <button type="submit" disabled={loading} className="btn-ink w-full justify-center disabled:cursor-not-allowed disabled:opacity-70">
                    {loading ? "Sending..." : "Request Consultation"}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                  <p className="text-center text-xs text-ash">
                    Deposits are refunded into your final session — never charged for quotes.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[0.62rem] uppercase tracking-[0.25em] text-ash">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full border border-white/10 bg-noir px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-ash/50 focus:border-gold"
      />
    </div>
  );
}
