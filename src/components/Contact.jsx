import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    postcode: '',
    service: 'Lawn Mowing',
    message: '',
  });

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    // Hook this up to your backend / Formspree / Netlify forms when ready.
    // For now we simulate a successful submission and surface a Mailto fallback.
    const body = `Name: ${form.name}%0D%0APhone: ${form.phone}%0D%0APostcode: ${form.postcode}%0D%0AService: ${form.service}%0D%0A%0D%0A${form.message}`;
    window.location.href = `mailto:hello@growmowandgo.co.uk?subject=Website%20Enquiry%20-%20${encodeURIComponent(
      form.name || 'New lead',
    )}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-section grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
            Contact
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-emerald-900 sm:text-4xl md:text-5xl">
            Request a Cut.
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            Quickest way to book? Pick up the phone. Or drop us a few details
            and we’ll come back to you within the day.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href="tel:07754673917"
              className="group flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-4 transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 text-white">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Click to Call
                </div>
                <div className="font-display text-lg font-bold text-emerald-900 group-hover:text-green-600">
                  07754 673917
                </div>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-800 text-white">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Visit
                </div>
                <div className="font-display text-base font-bold text-emerald-900">
                  29 Cob Ln, Fontwell
                </div>
              </div>
            </div>

            <a
              href="mailto:hello@growmowandgo.co.uk"
              className="group flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-4 transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-emerald-900">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Email
                </div>
                <div className="font-display text-base font-bold text-emerald-900 group-hover:text-green-600">
                  hello@growmowandgo.co.uk
                </div>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="h-14 w-14 text-green-500" />
              <h3 className="mt-4 font-display text-2xl font-bold text-emerald-900">
                Thanks — we’ll be in touch.
              </h3>
              <p className="mt-2 max-w-sm text-gray-600">
                Your email client should have opened with the details. If not,
                give us a quick call on{' '}
                <a
                  href="tel:07754673917"
                  className="font-semibold text-green-600"
                >
                  07754 673917
                </a>
                .
              </p>
            </div>
          ) : (
            <>
              <h3 className="font-display text-xl font-bold text-emerald-900">
                Get a Free Quote
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                No obligation. Usually back within the day.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Your name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  required
                />
                <Field
                  label="Phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  required
                />
                <Field
                  label="Postcode"
                  type="text"
                  inputMode="text"
                  autoComplete="postal-code"
                  autoCapitalize="characters"
                  value={form.postcode}
                  onChange={update('postcode')}
                />
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Service
                  </label>
                  <select
                    value={form.service}
                    onChange={update('service')}
                    className="mt-1.5 min-h-[48px] w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  >
                    <option>Lawn Mowing</option>
                    <option>Garden Maintenance</option>
                    <option>Edging &amp; Tidying</option>
                    <option>Regular Visits</option>
                    <option>Not sure — please advise</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm font-semibold text-gray-700">
                  Tell us about your garden
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Approximate size, access, anything we should know…"
                  className="mt-1.5 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <button type="submit" className="btn-primary mt-6 w-full">
                Send Request
                <Send className="h-4 w-4" />
              </button>

              <p className="mt-3 text-center text-xs text-gray-500">
                Or call us directly on{' '}
                <a
                  href="tel:07754673917"
                  className="font-semibold text-emerald-800"
                >
                  07754 673917
                </a>
              </p>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        {...props}
        className="mt-1.5 min-h-[48px] w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
      />
    </div>
  );
}
