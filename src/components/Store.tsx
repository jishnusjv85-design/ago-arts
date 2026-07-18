import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { storeItems, type StoreItem } from "../data";
import { Reveal } from "./Reveal";

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

interface CartLine {
  item: StoreItem;
  qty: number;
}

export default function Store() {
  const [cart, setCart] = useState<CartLine[]>([]);

  const addToCart = (item: StoreItem) => {
    setCart((current) => {
      const existing = current.find((line) => line.item.id === item.id);
      if (existing) {
        return current.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        );
      }
      return [...current, { item, qty: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((current) => current.filter((line) => line.item.id !== itemId));
  };

  const updateQty = (itemId: string, qty: number) => {
    if (qty <= 0) return removeFromCart(itemId);
    setCart((current) =>
      current.map((line) =>
        line.item.id === itemId ? { ...line, qty } : line
      )
    );
  };

  const total = useMemo(
    () => cart.reduce((sum, line) => sum + line.qty * line.item.price, 0),
    [cart]
  );

  return (
    <section id="store" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <div className="mb-5 flex items-center gap-4">
                <span className="h-px w-10 bg-gold/60" />
                <span className="eyebrow">Gallery Market</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-cream">
                Own an original <span className="text-gold-gradient italic">AGO.ART painting.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-cream/60">
                Browse exclusive studio paintings and limited editions. Add your favorites to cart, then complete your purchase directly from the site.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="rounded-[28px] border border-gold/15 bg-noir-900 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="font-display text-sm uppercase tracking-[0.4em] text-gold/70">Featured Drop</div>
              <div className="mt-3 text-3xl font-semibold text-cream">Canvas Ritual</div>
              <div className="mt-2 text-sm text-cream/60">Limited edition pieces. Ready to ship worldwide.</div>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.7fr_1fr]">
          <div className="grid gap-6">
            {storeItems.map((item) => (
              <Reveal key={item.id} delay={0.05}>
                <div className="grid gap-4 overflow-hidden rounded-[28px] border border-gold/10 bg-noir-900 p-6 sm:grid-cols-[1fr_0.95fr] sm:items-center">
                  <div className="overflow-hidden rounded-[24px] border border-gold/10 bg-noir-800">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.28em] text-ash">{item.size}</div>
                      <h3 className="mt-3 font-display text-2xl font-semibold text-cream">{item.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-cream/70">{item.description}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-display text-2xl font-semibold text-gold">{formatPrice(item.price)}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="btn-ink rounded-full px-6 py-3"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="overflow-hidden rounded-[28px] border border-gold/10 bg-noir-900 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-gold">Your Cart</div>
                <div className="mt-1 text-2xl font-semibold text-cream">{cart.length} item{cart.length === 1 ? "" : "s"}</div>
              </div>
              <div className="rounded-full bg-noir-800 px-3 py-1 text-sm uppercase tracking-[0.24em] text-ash">Secure</div>
            </div>

            {cart.length ? (
              <div className="space-y-4">
                {cart.map((line) => (
                  <div key={line.item.id} className="rounded-[20px] border border-white/5 bg-noir-800 p-4">
                    <div className="flex items-start gap-4">
                      <img src={line.item.image} alt={line.item.title} className="h-20 w-20 rounded-[18px] object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="font-display text-base font-semibold text-cream">{line.item.title}</div>
                            <div className="text-xs uppercase tracking-[0.2em] text-ash">{formatPrice(line.item.price)}</div>
                          </div>
                          <button
                            onClick={() => removeFromCart(line.item.id)}
                            className="text-sm text-gold hover:text-gold-light"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-4 flex items-center gap-3 rounded-full border border-gold/15 bg-noir p-2">
                          <button
                            onClick={() => updateQty(line.item.id, line.qty - 1)}
                            className="h-9 w-9 rounded-full border border-gold/20 text-gold"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm text-cream">{line.qty}</span>
                          <button
                            onClick={() => updateQty(line.item.id, line.qty + 1)}
                            className="h-9 w-9 rounded-full border border-gold/20 text-gold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="rounded-[24px] border border-gold/15 bg-noir-800 p-5">
                  <div className="flex items-center justify-between text-sm uppercase tracking-[0.25em] text-ash">Subtotal</div>
                  <div className="mt-3 text-3xl font-semibold text-cream">{formatPrice(total)}</div>
                </div>

                <button className="btn-ink w-full justify-center py-4">Proceed to Checkout</button>
              </div>
            ) : (
              <div className="rounded-[24px] border border-gold/15 bg-noir-800 p-8 text-center text-cream/70">
                Your cart is empty. Add a painting to start your purchase.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
