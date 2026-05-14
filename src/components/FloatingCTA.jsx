import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';

/**
 * FloatingCTA — mobile-only floating action cluster pinned at the bottom.
 * Visible below the `md` breakpoint. Fades in after the user scrolls past
 * the hero so it never obscures the primary CTAs above the fold.
 */
export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed inset-x-0 bottom-4 z-40 px-4 md:hidden"
          role="region"
          aria-label="Quick contact"
        >
          <div className="mx-auto flex max-w-md items-center gap-2 rounded-2xl border border-emerald-100 bg-white/95 p-2 shadow-[0_12px_32px_rgba(6,95,70,0.18)] backdrop-blur-md">
            <a
              href="tel:07754673917"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-emerald-800 px-3 py-3 text-sm font-bold text-emerald-800 active:bg-emerald-50"
              aria-label="Call Grow, Mow and Go on 07754 673917"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <a
              href="#contact"
              className="flex flex-[1.4] items-center justify-center gap-1.5 rounded-xl bg-green-500 px-3 py-3 text-sm font-bold text-white shadow-md shadow-green-500/30 active:bg-green-600"
            >
              Free Quote
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
