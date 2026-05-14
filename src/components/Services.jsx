import { motion } from 'framer-motion';
import { Scissors, Sprout, Trees, CalendarClock, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Scissors,
    title: 'Professional Lawn Mowing',
    body: 'Crisp, even cuts with clean lines. Striped or natural — your choice. We collect, bag and remove all clippings.',
  },
  {
    icon: Sprout,
    title: 'Garden Maintenance',
    body: 'Weeding, planting tidy-ups, hedge trimming and seasonal care to keep your garden looking its best year-round.',
  },
  {
    icon: Trees,
    title: 'Edging & Tidying',
    body: 'Sharp lawn edges, neat borders, swept paths. The finishing details that make a real difference.',
  },
  {
    icon: CalendarClock,
    title: 'One-off or Regular Visits',
    body: 'Weekly, fortnightly, monthly or a single rescue cut — book the rhythm that fits your garden and your week.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Services() {
  return (
    <section id="services" className="bg-white section-padding">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
            Our Services
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-emerald-900 sm:text-4xl md:text-5xl">
            Everything your lawn needs.
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            From a single tidy-up to a full-season schedule, we keep it simple.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white shadow-md shadow-emerald-900/20">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-emerald-900">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-gray-600">{s.body}</p>
              <a
                href="#contact"
                className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-green-600 transition-colors group-hover:text-emerald-800"
              >
                Get a quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
