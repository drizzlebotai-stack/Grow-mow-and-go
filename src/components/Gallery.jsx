import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, ZoomIn } from 'lucide-react';

/**
 * Gallery — recent work showcase.
 *
 * To add more photos: drop the file in `/public` and add an entry below.
 *   - `src`     :  path served from /public  (e.g. "/2026-05-05.jpg")
 *   - `webp`    :  optional webp version for faster loading
 *   - `caption` :  short description shown on hover + in the lightbox
 *   - `tag`     :  optional category label (e.g. "Before", "After", "Mowing")
 *   - `span`    :  optional CSS class for grid emphasis ("tall" / "wide")
 */
const photos = [
  {
    src: '/2026-04-03.jpg',
    webp: '/2026-04-03.webp',
    caption: 'Fresh cut — back garden, Fontwell',
    tag: 'Lawn Mowing',
    span: 'tall',
  },
  {
    src: '/2026-04-29.jpg',
    webp: '/2026-04-29.webp',
    caption: 'Mid-job — overgrown lawn rescue',
    tag: 'Before',
  },
  {
    src: '/2026-05-05.jpg',
    caption: 'Striped finish — a happy customer',
    tag: 'After',
    span: 'wide',
  },
  // Add additional entries here, e.g.:
  // { src: '/2026-05-10.jpg', caption: 'Front lawn, Walberton', tag: 'Edging' },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const open = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i === 0 ? photos.length - 1 : i - 1)),
    [],
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === photos.length - 1 ? 0 : i + 1)),
    [],
  );

  // Keyboard navigation
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

        {/* Masonry-style grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 [grid-auto-rows:140px] sm:[grid-auto-rows:180px] md:[grid-auto-rows:200px]">
          {photos.map((photo, i) => (
            <GalleryTile
              key={photo.src}
              photo={photo}
              index={i}
              onOpen={() => setActiveIndex(i)}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Tap any photo to view full size.
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <Lightbox
            photo={photos[activeIndex]}
            index={activeIndex}
            total={photos.length}
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

function GalleryTile({ photo, index, onOpen }) {
  // Span helpers for masonry feel
  const spanClasses =
    photo.span === 'tall'
      ? 'row-span-2'
      : photo.span === 'wide'
        ? 'col-span-2'
        : '';

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      className={`group relative overflow-hidden rounded-2xl bg-emerald-50 shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 ${spanClasses}`}
      aria-label={`Open photo: ${photo.caption}`}
    >
      <picture>
        {photo.webp && <source srcSet={photo.webp} type="image/webp" />}
        <img
          src={photo.src}
          alt={photo.caption}
          loading={index < 2 ? 'eager' : 'lazy'}
          fetchpriority={index === 0 ? 'high' : 'auto'}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </picture>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-emerald-950/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Hover info */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {photo.tag && (
          <span className="inline-block rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
            {photo.tag}
          </span>
        )}
        <p className="mt-2 text-sm font-semibold text-white drop-shadow-md">
          {photo.caption}
        </p>
      </div>

      {/* Zoom icon */}
      <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-emerald-800 opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
        <ZoomIn className="h-4 w-4" />
      </div>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */

function Lightbox({ photo, index, total, onClose, onPrev, onNext }) {
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
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Prev / Next */}
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

      {/* Image */}
      <motion.div
        key={photo.src}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-4 max-h-[85vh] max-w-5xl"
      >
        <picture>
          {photo.webp && <source srcSet={photo.webp} type="image/webp" />}
          <img
            src={photo.src}
            alt={photo.caption}
            className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
          />
        </picture>

        {/* Caption */}
        <div className="mt-4 text-center">
          {photo.tag && (
            <span className="inline-block rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-900">
              {photo.tag}
            </span>
          )}
          <p className="mt-2 text-sm font-medium text-white sm:text-base">
            {photo.caption}
          </p>
          <p className="mt-1 text-xs text-emerald-200">
            {index + 1} / {total}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
