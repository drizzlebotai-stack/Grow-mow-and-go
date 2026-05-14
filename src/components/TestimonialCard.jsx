import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

/**
 * TestimonialCard — modular component for displaying a Google Review.
 *
 * Props:
 *   author  string  — reviewer name
 *   rating  number  — 1–5 (defaults to 5)
 *   quote   string  — the review body
 *   source  string  — e.g. "Google Review" (optional)
 *   delay   number  — framer-motion stagger delay (optional)
 */
export default function TestimonialCard({
  author,
  rating = 5,
  quote,
  source = 'Google Review',
  delay = 0,
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="relative flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg sm:p-8"
    >
      <Quote
        aria-hidden="true"
        className="absolute right-6 top-6 h-8 w-8 text-emerald-100"
      />

      <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < rating
                ? 'h-5 w-5 fill-amber-400 text-amber-400'
                : 'h-5 w-5 text-gray-200'
            }
            strokeWidth={1.5}
          />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-gray-700 sm:text-lg">
        “{quote}”
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-display text-sm font-bold text-emerald-800">
          {author
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{author}</div>
          <div className="text-xs text-gray-500">{source}</div>
        </div>
      </figcaption>
    </motion.figure>
  );
}
