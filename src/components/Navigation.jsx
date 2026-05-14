import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Leaf, ArrowRight } from 'lucide-react';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when the slide-in menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeAnd = (fn) => () => {
    setOpen(false);
    if (fn) fn();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 shadow-sm backdrop-blur-md'
          : 'bg-white/60 backdrop-blur-sm'
      }`}
    >
      <nav className="container-section flex h-16 items-center justify-between sm:h-20">
        {/* Logo — click scrolls to top */}
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2"
          aria-label="Back to top"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-800 text-white">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="font-display text-base font-extrabold text-emerald-800 xs:text-lg sm:text-xl">
            Grow, Mow <span className="text-green-500">&amp;</span> Go
          </span>
        </Link>

        {/* Desktop links — visible md and up */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-semibold text-gray-700 transition-colors hover:text-emerald-800"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster: phone CTA + hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:+447754673917"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-green-500/30 transition-colors hover:bg-green-600 active:bg-green-600 sm:px-5"
            aria-label="Call Grow, Mow and Go on 07754 673917"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">07754 673917</span>
            <span className="sm:hidden">Call</span>
          </a>

          {/* Hamburger — visible below md */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-emerald-800 active:bg-emerald-50 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Slide-in mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-emerald-950/40 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            {/* Panel — slides in from the right */}
            <motion.aside
              key="panel"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Main navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl md:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5 sm:h-20">
                <span className="font-display text-base font-extrabold text-emerald-800">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-emerald-800 active:bg-emerald-50"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <ul className="flex-1 overflow-y-auto px-3 py-4">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      onClick={closeAnd()}
                      className="flex min-h-[56px] items-center justify-between rounded-2xl px-4 py-3 text-lg font-semibold text-gray-800 active:bg-emerald-50"
                    >
                      {link.label}
                      <ArrowRight className="h-4 w-4 text-emerald-700" />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="border-t border-gray-100 p-4 pb-safe">
                <a
                  href="tel:+447754673917"
                  onClick={closeAnd()}
                  className="btn-primary w-full"
                  aria-label="Call 07754 673917"
                >
                  <Phone className="h-5 w-5" />
                  Call 07754 673917
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
