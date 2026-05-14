import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard.jsx';

const reviews = [
  {
    author: 'S Barber',
    rating: 5,
    quote:
      'Absolutely brilliant service. Excellent communication from start to finish — the lawn looks better than it has in years.',
  },
  {
    author: 'Sylvia Atman',
    rating: 5,
    quote:
      'Reasonable pricing, friendly and reliable. They turned up when they said they would and left the garden immaculate.',
  },
  {
    author: 'Local Customer',
    rating: 5,
    quote:
      'A genuinely lovely team. Professional from the first phone call through to the finished job. Highly recommend.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-gradient-to-b from-white to-emerald-50/40 section-padding">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
            5.0 ★ on Google
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-emerald-900 sm:text-4xl md:text-5xl">
            What our customers say.
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            We let the work speak for itself — but our reviews help, too.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <TestimonialCard
              key={r.author}
              author={r.author}
              rating={r.rating}
              quote={r.quote}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
