# Karen's Cleaning

A production-ready website built with **Astro**, **Contentful**, **Cloudinary**, and **Vercel**. Modular page builder, blog/articles system, image optimization, form handling, and SEO baked in.

## Stack

- **Astro** (SSR on Vercel) — pages, routing, layouts
- **Contentful** — headless CMS with modular page builder
- **Cloudinary** — image proxy, optimization, responsive srcsets
- **UnoCSS** — utility-first CSS (Tailwind-compatible)
- **Vercel** — hosting, serverless functions, edge network

## What's Included

- Modular page builder (hero, cards, FAQ, CTA, testimonials, two-column, social proof sections)
- Blog/articles system with categories, rich text rendering, related articles sidebar
- Cloudinary image optimization pipeline with presets (hero, card, avatar, logo, thumbnail)
- Responsive `<Image>` component with automatic srcset generation
- CMS abstraction layer (swap between Contentful, Sanity, or Markdown)
- Form handling (GoHighLevel CRM or simple email via Resend)
- Google Tag Manager + Analytics (env var configured)
- GHL chat widget (optional, env var configured)
- SEO: meta tags, Open Graph, Twitter Cards, JSON-LD structured data, sitemap, robots.txt
- Accessibility: WCAG contrast ratios, `<main>` landmark, aria labels, reduced motion support
- Scroll reveal animations with stagger effects
- i18n scaffolding (ready to enable)
- 404 page

## Quick Start

### 1. Clone and install

```bash
git clone <your-repo-url> karens-cleaning
cd karens-cleaning
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Fill in your values in `.env`:

| Variable | Required | Description |
|----------|----------|-------------|
| `SITE_NAME` | Yes | Your site/business name |
| `SITE_URL` | Yes | Production URL (e.g. `https://yourdomain.com`) |
| `CONTENTFUL_SPACE_ID` | Yes | Contentful space ID |
| `CONTENTFUL_ACCESS_TOKEN` | Yes | Contentful delivery API token |
| `PUBLIC_CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name |
| `CLOUDINARY_CLOUD_NAME` | Yes | Same as above |
| `BOOKING_URL` | No | Booking link (Calendly, Cal.com, etc.) |
| `GTM_CONTAINER_ID` | No | Google Tag Manager container ID |
| `GHL_CHAT_LOCATION_ID` | No | GoHighLevel chat widget location ID |

See `.env.example` for the full list of configuration options.

### 3. Set up Contentful

Create the following content types in your Contentful space:

**Pages:**
- `page` — top-level page with slug, SEO fields, hero section, and content sections
- `heroSection` — hero banner with headline, subheadline, CTA, image
- `textSection`, `cardSection`, `ctaSection`, `faqSection`, `testimonialSection`, `twoColumnSection`, `socialProofSection` — modular sections

**Blog:**
- `article` — blog post with title, slug, category, body (rich text), featured image, publish date, reading time, author, tags
- `articleCategory` — categories for organizing articles

**Global:**
- `navigation` — site nav links and CTA button
- `footer` — footer tagline and copyright
- `card`, `faq`, `testimonial` — reusable content entries

### 4. Run locally

```bash
npm run dev
```

Open `http://localhost:4321`

### 5. Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Set the same environment variables in your Vercel project settings.

## Project Structure

```
src/
├── components/
│   ├── cards/          # ArticleCard, FeatureCard, etc.
│   ├── global/         # Navigation, SiteFooter
│   ├── sections/       # Hero, CTA, FAQ, About, etc.
│   └── ui/             # Image, Button, Badge, Container
├── layouts/
│   └── BaseLayout.astro  # HTML shell, SEO, analytics, fonts
├── lib/
│   ├── cloudinary.ts     # Image optimization helpers
│   ├── contentful.ts     # Contentful API client + fetchers
│   └── cms/              # CMS abstraction (Contentful/Sanity/Markdown)
├── pages/
│   ├── index.astro       # Homepage
│   ├── articles/         # Blog listing + detail pages
│   ├── [...slug].astro   # Dynamic pages from Contentful
│   └── 404.astro         # 404 page
└── styles/
    └── brand.css         # Brand tokens (colors, fonts)
```

## Customization

### Branding
- Edit `src/styles/brand.css` for colors and font families
- Replace `public/logo.png` with your logo
- Update `public/favicon-*.png` and `public/apple-touch-icon.png`

### Navigation
- Default nav links are in `src/components/global/Navigation.astro`
- Override by creating a `navigation` entry in Contentful

### Adding pages
- Create a `page` entry in Contentful with a slug (e.g. `/about`)
- Add sections to the page — they render automatically via `SectionRenderer`

### Adding articles
- Create `articleCategory` entries for your blog categories
- Create `article` entries — they appear at `/articles` and `/articles/[slug]`
- The 3 most recent articles show on the homepage automatically

## License

MIT
