# CCBC Website — Design Spec

**Date:** 2026-05-15
**Project:** Candelaria Conservative Baptist Church (CCBC) website
**Domain:** candelbap.church
**Status:** Draft for approval

---

## 1. Goals

Build a static marketing site for CCBC that serves three audiences and purposes:

1. **Info hub for visitors** — service times, location, beliefs, "what to expect"
2. **Live streaming / media** — embed Facebook/YouTube live and surface recent sermons
3. **Online giving** — display bank details and QR codes (no payment processor in v1)

**Non-goals (v1):**
- No CMS (content lives in code; CMS migration is phase 2)
- No payment processing (bank details + QR only)
- No member-only / authenticated areas
- No events calendar, ministries pages, or small-group directory (deferred)

---

## 2. Church Information

| Field | Value |
|-------|-------|
| Full name | Candelaria Conservative Baptist Church |
| Short name | CCBC |
| Established | 1970 |
| Address | Bansalangin St, Pahinga Norte, Candelaria, Quezon, Philippines |
| Maps | https://maps.app.goo.gl/k5WYwexxcDbvZQ1e6 |
| Sunday Service | 7:30 AM |
| Friday Prayer Meeting | 6:00 PM |
| Email | hello@candelbap.church |
| Facebook | https://fb.com/candelbap.church |
| YouTube | https://www.youtube.com/@candelbap.church |
| Logo | `/CCBC Logo.png` (in repo root) |
| Mission/Vision | TBD — user will provide before launch |
| Pastor(s) | TBD — user will provide before launch |
| Bank details / QR | TBD — user will provide before launch |

---

## 3. Visual Design

### Palette (drawn from logo)

| Token | Hex | Use |
|-------|-----|-----|
| `--brand-navy` | `#1e3a8a` | Primary — headers, buttons, links |
| `--brand-gold` | `#c8a64b` | Accent — highlights, dividers, badges |
| `--bg-warm` | `#faf8f3` | Page background |
| `--text-ink` | `#1f2937` | Body text |
| `--text-muted` | `#6b7280` | Secondary text |
| `--section-soft` | `#f1ece1` | Alternating section background |

Exact hex values to be finalized against logo color sampling during implementation.

### Typography

- **Headings:** Fraunces (warm serif, weight 500–700)
- **Body:** Inter (sans-serif, weight 400–600)
- Both loaded via `next/font/google` for performance.

### Tone & feel

Warm, community-focused, established-but-welcoming. Generous whitespace, soft rounded corners (`rounded-lg` / `rounded-2xl`), gentle shadows. Real photography preferred; placeholder imagery used until provided.

---

## 4. Information Architecture

Five pages, flat structure, top nav on every page.

```
/              Home
/about         Our story, beliefs, mission/vision, pastors
/watch         Live stream + sermon archive
/give          Bank details, QR codes, instructions
/contact       Address, map, service times, contact info
```

### Global elements

**Header (sticky):**
- Logo (links to /)
- Nav: Home · About · Watch · Give · Contact
- "Watch Live" CTA button (right-aligned)
- Mobile: hamburger menu

**Footer:**
- Address + map link
- Service times
- Email + social icons (FB, YouTube)
- Copyright "© Candelaria Conservative Baptist Church · Since 1970"

### Page contents

**Home** — Hero · Service Times · Welcome teaser · Latest Sermon embed · Visit Us (map) · Give CTA

**About** — Church story · Mission & Vision · Statement of Faith (placeholder) · Pastor bios

**Watch** — Live embed (when streaming) · Latest sermons grid (YouTube channel videos) · Link to full YouTube channel

**Give** — Why we give (short message) · Bank account details · QR codes · Step-by-step instructions

**Contact** — Address · Embedded Google Map · Service times · Email · Facebook link · Optional contact form (mailto: link in v1, no form backend)

---

## 5. Technical Architecture

### Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Rendering:** Static export (`output: 'export'`) — every page pre-rendered at build time
- **Hosting:** Vercel free tier
- **Domain:** candelbap.church (already owned by user)
- **Source control:** Git (repo to be initialized)

### Project structure

```
website/
├── app/
│   ├── layout.tsx              # Root layout: header, footer, fonts, metadata
│   ├── page.tsx                # Home
│   ├── about/page.tsx
│   ├── watch/page.tsx
│   ├── give/page.tsx
│   ├── contact/page.tsx
│   ├── sitemap.ts              # Generated sitemap
│   └── robots.ts               # robots.txt
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ServiceTimes.tsx
│   ├── SermonEmbed.tsx         # YouTube iframe wrapper
│   ├── MapEmbed.tsx            # Google Maps iframe
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Section.tsx
├── content/
│   └── site.ts                 # Typed source of truth for all church info
├── public/
│   ├── logo.png
│   └── images/                 # Hero photos, etc.
├── styles/globals.css          # Tailwind + CSS custom properties
├── .docs/                      # Architecture, deployment, setup docs
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Content module (`content/site.ts`)

Single typed source of truth. Pages import from here — never hardcode church info inline. When migrating to a CMS, this module is swapped for an API call; page components remain unchanged.

```ts
export const site = {
  name: 'Candelaria Conservative Baptist Church',
  shortName: 'CCBC',
  established: 1970,
  tagline: '...',
  address: { ... },
  services: [
    { day: 'Sunday', name: 'Sunday Service', time: '7:30 AM' },
    { day: 'Friday', name: 'Prayer Meeting', time: '6:00 PM' },
  ],
  contact: { email: '...', facebook: '...', youtube: '...' },
  giving: { bankAccounts: [...], qrCodes: [...] },
  // ...
} as const;
```

### Performance & SEO

- Static generation for all pages
- `next/image` for image optimization
- `next/font` for self-hosted Google Fonts (no CLS)
- OpenGraph + Twitter card metadata per page
- Auto-generated `sitemap.xml` and `robots.txt`
- Lighthouse target: ≥95 across Performance, Accessibility, Best Practices, SEO

### Accessibility

- Semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Keyboard navigable; visible focus states
- WCAG AA color contrast (verified against final palette)
- Alt text on all images; `aria-label` on icon-only buttons
- Skip-to-content link

---

## 6. Deployment

- Push to GitHub
- Connect repo to Vercel
- Configure custom domain `candelbap.church` (DNS records via domain registrar)
- Auto-deploy on push to `main`
- Preview deploys on every PR

No CI/CD scripts needed beyond Vercel's defaults for v1.

---

## 7. Open Items (user to provide before launch)

- [ ] Mission & Vision text
- [ ] Statement of Faith / beliefs text (or link)
- [ ] Pastor name(s) + bio + photo
- [ ] Bank account details
- [ ] QR code image(s) for giving
- [ ] Hero photography (or approve use of stock/placeholders)
- [ ] Tagline (or approve drafted version)
- [ ] DNS access for `candelbap.church` when ready to deploy

---

## 8. Phase 2 (not in scope for v1)

- Headless CMS (Sanity recommended) for non-technical content editing
- Online giving via Stripe / PayMongo / Tithely
- Events calendar
- Ministries / small-groups pages
- Newsletter signup
- Contact form with backend (Resend or similar)
