# Grow, Mow and Go

High-performance React marketing site for **Grow, Mow and Go** — professional lawn care and garden maintenance in Fontwell, Walberton and Arundel.

## Tech stack

- **React 18** + **React Router 6**
- **Vite** (fast dev + optimized production build)
- **Tailwind CSS** (design system + utility classes)
- **Framer Motion** (entrance animations, scroll reveals)
- **lucide-react** (icons)
- **vite-plugin-pwa** (PWA-ready out of the box)
- Google Fonts (Inter + Montserrat) with `preconnect` priority hints
- Optimized for **Vercel** deployment

## Setup — one-time

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Install peer tooling if you don't already have it globally
npm install -g vite
```

## Run locally

```bash
npm run dev
# open http://localhost:5173
```

## Build for production

```bash
npm run build
npm run preview   # serve the production build locally
```

## Deploy to Vercel

```bash
# First time
npm install -g vercel
vercel

# Subsequent deploys
vercel --prod
```

Vercel will auto-detect Vite. `vercel.json` adds SPA rewrites and long-cache headers for static assets.

## Project structure

```
src/
├── App.jsx                  # Top-level layout + router
├── main.jsx                 # React entry
├── index.css                # Tailwind + base styles
├── pages/
│   └── Home.jsx             # Single-page composition
└── components/
    ├── Navigation.jsx       # Sticky nav, mobile phone CTA always visible
    ├── Hero.jsx             # 21st.dev drop-in slot included
    ├── About.jsx
    ├── Services.jsx         # Framer Motion staggered service cards
    ├── Testimonials.jsx
    ├── TestimonialCard.jsx  # Modular review card
    ├── Contact.jsx          # "Request a Cut" form + Click-to-Call
    └── Footer.jsx           # Address + phone + quick links
```

## 21st.dev integration

Open `src/components/Hero.jsx`. The file is structured so you can drop a
21st.dev hero block in without touching anything else:

```jsx
// 1. Import your block at the top:
import MyFancy21stDevHero from './your-21st-dev-hero.jsx';

// 2. Inside <Hero />, comment out <DefaultHero /> and use:
<MyFancy21stDevHero />
```

The `<TestimonialCard />` component is also fully modular — pass `author`,
`rating`, `quote`, `source`, and `delay` props.

## Brand tokens

| Token       | Tailwind class | Hex       |
|-------------|----------------|-----------|
| Primary     | `emerald-800`  | `#065f46` |
| Secondary   | `green-500`    | `#22c55e` |
| Accent      | `amber-400`    | `#fbbf24` |
| Background  | —              | `#F9FAFB` |

## Contact (configured throughout the site)

- **Phone:** 07754 673917
- **Email:** hello@growmowandgo.co.uk *(swap to your actual address)*
- **Address:** 29 Cob Ln, Fontwell

## License

© Grow, Mow and Go. All rights reserved.
