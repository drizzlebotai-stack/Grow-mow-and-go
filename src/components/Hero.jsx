import { motion } from 'framer-motion';
import { Phone, ArrowRight, Star, MapPin } from 'lucide-react';

/**
 * Hero component — modular placeholder.
 *
 * ────────────────────────────────────────────────────────────────
 *   21st.dev DROP-IN ZONE
 *   Paste any high-end Hero block from 21st.dev into the
 *   `<Hero21stDevSlot />` area below. Comment out the default
 *   `<DefaultHero />` and render your imported component instead.
 * ────────────────────────────────────────────────────────────────
 */
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white hero-grain">
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-green-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl"
      />

      <DefaultHero />
      {/* <Hero21stDevSlot /> */}
    </section>
  );
}

function DefaultHero() {
  return (
    <div className="container-section relative section-padding text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-3xl"
      >
        {/* Location pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-emerald-800 backdrop-blur">
          <MapPin className="h-3.5 w-3.5" />
          Fontwell · Walberton · Arundel
        </div>

        {/* Headline */}
        <h1 className="font-display text-[2rem] xs:text-4xl font-extrabold leading-[1.08] text-emerald-900 sm:text-5xl md:text-6xl lg:text-7xl">
          Lawn Care Made Simple.
          <br />
          <span className="bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
            Grow, Mow and Go.
          </span>
        </h1>

        {/* Sub-headline — text-base on mobile, original sizing on desktop */}
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:mt-6 sm:text-lg sm:leading-normal md:text-xl">
          Expert lawn cutting and garden maintenance across Fontwell,
          Walberton, Arundel, and surrounding areas. Professional, reliable,
          and reasonably priced.
        </p>

        {/* Star rating badge — wraps gracefully on narrow screens */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mx-auto mt-8 inline-flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-2xl border border-amber-200 bg-white px-4 py-2.5 shadow-sm sm:px-5 sm:py-3"
        >
          <div className="flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-amber-400 text-amber-400 sm:h-5 sm:w-5"
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-900">
            5.0 Rating
          </span>
          <span className="hidden text-sm text-gray-500 sm:inline">·</span>
          <span className="text-xs text-gray-600 sm:text-sm">
            Based on 3 Google Reviews
          </span>
        </motion.div>

        {/* CTAs — full width stacked on mobile, side-by-side centred on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 md:flex-row md:items-center"
        >
          <motion.a
            href="#contact"
            className="btn-primary w-full md:w-auto"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.8,
            }}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get a Free Quote
            <ArrowRight className="h-5 w-5" />
          </motion.a>
          <a
            href="tel:07754673917"
            className="btn-secondary w-full md:w-auto"
            aria-label="Call 07754 673917"
          >
            <Phone className="h-5 w-5" />
            Call 07754 673917
          </a>
        </motion.div>

        {/* Benefits row — text-base on mobile, original text-sm on desktop */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-base text-gray-600 md:text-sm"
        >
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Excellent Communication
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Reasonable Pricing
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Absolutely Brilliant Service
          </li>
        </motion.ul>
      </motion.div>
    </div>
  );
}

/**
 * Placeholder slot for a 21st.dev Hero.
 * Replace its contents with your imported Hero block.
 */
// eslint-disable-next-line no-unused-vars
function Hero21stDevSlot() {
  return (
    <div className="container-section section-padding">
      {/* Paste your 21st.dev Hero JSX here */}
    </div>
  );
}
