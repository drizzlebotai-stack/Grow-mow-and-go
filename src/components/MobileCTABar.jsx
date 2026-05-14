import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';

/**
 * MobileCTABar — sticky bottom Call CTA, mobile only (md:hidden).
 *
 * Single full-width brand-green button so the primary conversion action
 * is always one tap away on every scroll position past the hero.
 * Backdrop-blurred and shadowed so it reads clearly over any content.
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
      className={`fixed bottom-0 left-0 z-50 w-full transform border-t border-gray-200 bg-white/90 p-4 pb-safe shadow-[0_-8px_24px_rgba(6,95,70,0.12)] backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="region"
      aria-label="Call to action"
    >
      <a
        href="tel:+447754673917"
        className="flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-2xl bg-green-500 px-4 text-base font-bold text-white shadow-lg shadow-green-500/30 active:bg-green-600 active:scale-[0.99] transition-transform"
        aria-label="Call Grow, Mow and Go on 07754 673917"
      >
        <Phone className="h-5 w-5" />
        <span>📞 Call: 07754 673917</span>
      </a>
    </div>
  );
}
