import { motion } from 'framer-motion';
import { Heart, MapPin, Users, ShieldCheck } from 'lucide-react';

const pillars = [
  {
    icon: Users,
    title: 'Family-Run & Local',
    body: 'Born and based right here in Arundel (V923+P3). We treat every lawn like it’s our own front garden.',
  },
  {
    icon: Heart,
    title: 'LGBTQ+ Friendly',
    body: 'Everyone is welcome. Open, respectful, professional service for every household — no exceptions.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable & Insured',
    body: 'Punctual visits, tidy finish, transparent pricing. The boring stuff done properly so you don’t have to think about it.',
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-section grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
            <MapPin className="h-3.5 w-3.5" />
            About Us
          </span>

          <h2 className="mt-4 font-display text-3xl font-extrabold text-emerald-900 sm:text-4xl md:text-5xl">
            Your neighbours, with sharper blades.
          </h2>

          <p className="mt-5 text-base text-gray-600 sm:text-lg">
            Grow, Mow and Go is a small, family-run gardening service based in
            Fontwell. We look after lawns and gardens across Walberton, Arundel
            and the surrounding villages — from one-off tidy-ups to regular
            weekly cuts.
          </p>

          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            We turn up when we say we will, we communicate clearly, and we
            leave your garden looking sharp. That’s what our customers tell us,
            and we plan to keep it that way.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">
              Request a Quote
            </a>
            <a href="#services" className="btn-secondary">
              See What We Do
            </a>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${
                i === 0 ? 'sm:col-span-2' : ''
              }`}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-800 text-white">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-emerald-900">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
