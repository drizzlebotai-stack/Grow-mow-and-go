import { useEffect, useState } from 'react';
import { Phone, ArrowRight } from 'lucide-react';

/**
 * MobileCTABar — sticky bottom call/quote bar shown only on mobile (below lg).
 * Appears after the user scrolls past the hero, so it doesn't obscure
 * the primary CTAs above the fold.
 */
export default function MobileCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show once scrolled past ~70% of one viewport
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transform border-t border-emerald-100 bg-white/95 px-4 pb-safe shadow-[0_-8px_24px_rgba(6,95,70,0.08)] backdrop-blur-md transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-md items-center gap-2 py-3 xs:gap-3">
        <a
          href="tel:07754673917"
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-emerald-800 bg-white px-3 text-sm font-bold text-emerald-800 active:bg-emerald-50"
          aria-label="Call 07754 673917"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
        <a
          href="#contact"
          className="flex min-h-[48px] flex-[1.4] items-center justify-center gap-1.5 rounded-2xl bg-green-500 px-3 text-sm font-bold text-white shadow-md shadow-green-500/30 active:bg-green-600"
        >
          Get Free Quote
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
