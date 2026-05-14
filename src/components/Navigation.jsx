import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Leaf } from 'lucide-react';

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

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
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
          <span className="font-display text-lg font-extrabold text-emerald-800 sm:text-xl">
            Grow, Mow <span className="text-green-500">&amp;</span> Go
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
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

        {/* Phone — always visible (even on mobile, per spec) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:07754673917"
            className="inline-flex min-h-[40px] items-center gap-2 rounded-2xl bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-green-500/30 transition-all hover:bg-green-600 sm:min-h-[44px] sm:px-5 sm:py-2.5"
            aria-label="Call Grow, Mow and Go on 07754 673917"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">07754 673917</span>
            <span className="sm:hidden">Call</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-emerald-800 active:bg-emerald-50 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden"
          >
            <ul className="container-section flex flex-col gap-2 border-t border-gray-100 bg-white py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-semibold text-gray-800 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
