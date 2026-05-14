import { useEffect, useState } from 'react';
import { Phone, ArrowRight } from 'lucide-react';

/**
 * MobileCTABar — sticky bottom call/quote bar shown only on mobile (md:hidden).
 * High-contrast, backdrop-blurred, drop-shadowed.
 * Appears after the user scrolls past the hero, so it doesn't obscure
 * the primary CTAs above the fold. Sits above iOS home indicator via safe-area.
 */
export default function MobileCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transform border-t border-emerald-100 bg-white/95 px-4 pb-safe shadow-[0_-8px_24px_rgba(6,95,70,0.12)] backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="region"
      aria-label="Contact actions"
    >
      <div className="mx-auto flex max-w-md items-center gap-3 py-3">
        <a
          href="tel:+447754673917"
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-emerald-800 bg-white px-3 text-base font-bold text-emerald-800 active:bg-emerald-50 active:scale-[0.98] transition-transform"
          aria-label="Call Grow, Mow and Go on 07754 673917"
        >
          <Phone className="h-5 w-5" />
          Call Now
        </a>
        <a
          href="#contact"
          className="flex min-h-[48px] flex-[1.4] items-center justify-center gap-1.5 rounded-2xl bg-green-500 px-3 text-base font-bold text-white shadow-md shadow-green-500/30 active:bg-green-600 active:scale-[0.98] transition-transform"
        >
          Get Free Quote
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
