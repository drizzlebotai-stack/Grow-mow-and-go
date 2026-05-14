import { useEffect, useRef, useState } from 'react';
import { Move } from 'lucide-react';

/**
 * BeforeAfterSlider — drag (or tap) the handle to reveal Before vs After.
 *
 * Props:
 *   before   : { src, webp?, alt? }
 *   after    : { src, webp?, alt? }
 *   label    : string  — service description shown at bottom (e.g. "Spring Lawn Revival")
 *   initial  : number  — initial reveal % (defaults to 50)
 */
export default function BeforeAfterSlider({ before, after, label, initial = 50 }) {
  const [pct, setPct] = useState(initial);
  const wrapRef = useRef(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPct((x / rect.width) * 100);
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setFromClientX(x);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  const startDrag = (e) => {
    dragging.current = true;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setFromClientX(x);
  };

  return (
    <figure className="group relative overflow-hidden rounded-2xl bg-emerald-50 shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-xl">
      <div
        ref={wrapRef}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none"
      >
        {/* AFTER (base, full width) */}
        <picture>
          {after.webp && <source srcSet={after.webp} type="image/webp" />}
          <img
            src={after.src}
            alt={after.alt || `${label} — after`}
            loading="lazy"
            decoding="async"
            draggable="false"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: 'brightness(1.05) contrast(1.05) saturate(1.15)' }}
          />
        </picture>

        {/* BEFORE (clipped to pct of width) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pct}%` }}
        >
          <picture>
            {before.webp && <source srcSet={before.webp} type="image/webp" />}
            <img
              src={before.src}
              alt={before.alt || `${label} — before`}
              loading="lazy"
              decoding="async"
              draggable="false"
              className="h-full w-full object-cover"
              style={{
                filter: 'brightness(1.02) contrast(1.05) saturate(1.05)',
                // Compensate for parent clip — keep image at original size
                width: wrapRef.current
                  ? `${(wrapRef.current.offsetWidth / pct) * 100}px`
                  : '100%',
                maxWidth: 'none',
              }}
            />
          </picture>
        </div>

        {/* Tag badges */}
        <span className="absolute left-3 top-3 rounded-full bg-emerald-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
          Before
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-green-500/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          After
        </span>

        {/* Divider line + handle */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-lg"
          style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-emerald-800 bg-white shadow-xl">
            <Move className="h-5 w-5 text-emerald-800" />
          </div>
        </div>
      </div>

      {/* Always-visible label */}
      {label && (
        <figcaption className="border-t border-emerald-100 bg-white px-4 py-3 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wide text-green-600">
            Drag to compare
          </span>
          <p className="mt-0.5 font-display text-sm font-bold text-emerald-900">
            {label}
          </p>
        </figcaption>
      )}
    </figure>
  );
}
