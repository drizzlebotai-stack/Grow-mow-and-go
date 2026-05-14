import { Leaf, Phone, MapPin, Mail, Facebook, Home as HomeIcon } from 'lucide-react';

const FACEBOOK_URL =
  'https://www.facebook.com/groups/1726777437608892/user/61577278991219/';
const NEXTDOOR_URL = 'https://nextdoor.co.uk/pages/grow-mow-and-go/';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-emerald-900 text-emerald-50">
      <div className="container-section py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-500 text-white">
                <Leaf className="h-5 w-5" />
              </span>
              <span className="font-display text-xl font-extrabold">
                Grow, Mow &amp; Go
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-emerald-200">
              Professional lawn care and garden maintenance across Fontwell,
              Walberton, Arundel and surrounding areas. Family-run, LGBTQ+
              friendly, and 5★ rated.
            </p>

            {/* Social */}
            <div className="mt-6">
              <h4 className="font-display text-xs font-bold uppercase tracking-wide text-white">
                Follow Us
              </h4>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Find Grow, Mow and Go on Facebook"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-emerald-800/60 px-4 py-2.5 text-sm font-semibold text-emerald-50 ring-1 ring-emerald-700 transition-all hover:bg-[#1877F2] hover:text-white hover:ring-[#1877F2]"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </a>
                <a
                  href={NEXTDOOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Find Grow, Mow and Go on Nextdoor"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-emerald-800/60 px-4 py-2.5 text-sm font-semibold text-emerald-50 ring-1 ring-emerald-700 transition-all hover:bg-[#8ED500] hover:text-emerald-950 hover:ring-[#8ED500]"
                >
                  <HomeIcon className="h-4 w-4" />
                  <span>Nextdoor</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="tel:+447754673917"
                  className="inline-flex items-center gap-2 text-emerald-100 hover:text-amber-300"
                >
                  <Phone className="h-4 w-4" /> 07754 673917
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@growmowandgo.co.uk"
                  className="inline-flex items-center gap-2 text-emerald-100 hover:text-amber-300"
                >
                  <Mail className="h-4 w-4" /> hello@growmowandgo.co.uk
                </a>
              </li>
              <li className="inline-flex items-start gap-2 text-emerald-100">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>29 Cob Ln, Fontwell</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#services" className="text-emerald-100 hover:text-amber-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-emerald-100 hover:text-amber-300">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#about" className="text-emerald-100 hover:text-amber-300">
                  About
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-emerald-100 hover:text-amber-300">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="text-emerald-100 hover:text-amber-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-emerald-800 pt-6 text-xs text-emerald-300 sm:flex-row sm:items-center">
          <p>© {year} Grow, Mow and Go. All rights reserved.</p>
          <p>Lawn care made simple — Fontwell · Walberton · Arundel</p>
        </div>
      </div>
    </footer>
  );
}
