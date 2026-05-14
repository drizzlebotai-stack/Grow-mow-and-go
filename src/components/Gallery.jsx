import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, ZoomIn, ArrowRight } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider.jsx';

/**
 * Gallery — recent work showcase with uniform grid + optional Before/After pairs.
 *
 * Each item is either:
 *   { type: 'single', src, webp?, label, tag? }
 *   { type: 'pair', before: { src, webp? }, after: { src, webp? }, label }
 *
 * Singles render as labeled tiles (opens in lightbox on click).
 * Pairs render as a draggable Before/After comparison slider.
 *
 * To add more: drop the file in `/public` and add an entry to `galleryItems`.
 */
const galleryItems = [
  {
    type: 'single',
    src: '/2026-04-03.jpg',
    webp: '/2026-04-03.webp',
    label: 'Routine Bi-Weekly Cut & Edge',
    tag: 'Lawn Mowing',
  },
  {
    type: 'single',
    src: '/2026-04-29.jpg',
    webp: '/2026-04-29.webp',
    label: 'Spring Lawn Revival',
    tag: 'Before',
  },
  {
    type: 'single',
    src: '/2026-05-05.jpg',
    label: 'Overgrown Garden Clearance',
    tag: 'After',
  },
  // Example pair entry — paste matching before/after photos into /public and use:
  // {
  //   type: 'pair',
  //   before: { src: '/jobname-before.jpg' },
  //   after:  { src: '/jobname-after.jpg'  },
  //   label:  'Full Garden Reset, Walberton',
  // },
];

export default function Gallery() {
  // Only `single` items are lightbox-able
  const lightboxItems = galleryItems.filter((i) => i.type === 'single');
  const [activeIndex, setActiveIndex] = useState(null);
  const open = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i === 0 ? lightboxItems.length - 1 : i - 1)),
    [lightboxItems.length],
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === lightboxItems.length - 1 ? 0 : i + 1)),
    [lightboxItems.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, prev, next]);

  // Map original gallery index → lightbox index for click handler
  const lightboxIndexOf = (origIndex) => {
    const target = galleryItems[origIndex];
    return lightboxItems.indexOf(target);
  };

  return (
    <section id="gallery" className="bg-white section-padding">
      <div className="container-section">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
            <Camera className="h-3.5 w-3.5" />
            Recent Work
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-emerald-900 sm:text-4xl md:text-5xl">
            See the difference.
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            A few of our recent lawns from around Fontwell, Walberton and Arundel.
          </p>
        </motion.div>

        {/* Uniform grid — every tile is a 4:3 rectangle */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => {
            if (item.type === 'pair') {
              return (
                <motion.div
                  key={`pair-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <BeforeAfterSlider
                    before={item.before}
                    after={item.after}
                    label={item.label}
                  />
                </motion.div>
              );
            }
            return (
              <SingleTile
                key={item.src}
                item={item}
                index={i}
                onOpen={() => setActiveIndex(lightboxIndexOf(i))}
              />
            );
          })}
        </div>

        {/* Soft CTA below gallery */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mt-14 flex flex-col items-center justify-center gap-3 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50 p-6 text-center sm:flex-row sm:gap-6 sm:p-8 sm:text-left"
        >
          <p className="font-display text-lg font-bold text-emerald-900 sm:text-xl">
            Want your lawn to look like this?
          </p>
          <a href="#contact" className="btn-primary">
            Get a Free Quote
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && lightboxItems[activeIndex] && (
          <Lightbox
            item={lightboxItems[activeIndex]}
            index={activeIndex}
            total={lightboxItems.length}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function SingleTile({ item, index, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-emerald-50 text-left shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
      aria-label={`Open photo: ${item.label}`}
    >
      {/* Uniform 4:3 image area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <picture>
          {item.webp && <source srcSet={item.webp} type="image/webp" />}
          <img
            src={item.src}
            alt={item.label}
            loading={index < 2 ? 'eager' : 'lazy'}
            fetchpriority={index === 0 ? 'high' : 'auto'}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ filter: 'brightness(1.05) contrast(1.05) saturate(1.18)' }}
          />
        </picture>

        {/* Subtle gradient for legibility of bottom info on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/30 via-transparent to-transparent" />

        {/* Tag pill (top-left, always visible) */}
        {item.tag && (
          <span className="absolute left-3 top-3 inline-block rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-800 backdrop-blur-sm">
            {item.tag}
          </span>
        )}

        {/* Zoom icon (top-right, hover-only) */}
        <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-emerald-800 opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
          <ZoomIn className="h-4 w-4" />
        </div>
      </div>

      {/* Always-visible label */}
      <div className="border-t border-emerald-100 bg-white px-4 py-3">
        <p className="font-display text-sm font-bold text-emerald-900">
          {item.label}
        </p>
      </div>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */

function Lightbox({ item, index, total, onClose, onPrev, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-emerald-950/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous photo"
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:left-8"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next photo"
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <motion.div
        key={item.src}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-4 max-h-[85vh] max-w-5xl"
      >
        <picture>
          {item.webp && <source srcSet={item.webp} type="image/webp" />}
          <img
            src={item.src}
            alt={item.label}
            className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
            style={{ filter: 'brightness(1.05) contrast(1.05) saturate(1.18)' }}
          />
        </picture>

        <div className="mt-4 text-center">
          {item.tag && (
            <span className="inline-block rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-900">
              {item.tag}
            </span>
          )}
          <p className="mt-2 text-sm font-medium text-white sm:text-base">
            {item.label}
          </p>
          <p className="mt-1 text-xs text-emerald-200">
            {index + 1} / {total}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
