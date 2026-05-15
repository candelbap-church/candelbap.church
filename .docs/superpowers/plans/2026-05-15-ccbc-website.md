# CCBC Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 5-page static marketing site for Candelaria Conservative Baptist Church (CCBC) with Home, About, Watch (sermons), Give, and Contact pages — deploy-ready on Vercel at `candelbap.church`.

**Architecture:** Next.js 15 App Router with `output: 'export'` for fully static HTML. All church info lives in a typed `content/site.ts` module so a future CMS swap touches one file. Global Header/Footer in the root layout; page-level components compose small, focused UI primitives (`Section`, `Card`, `Button`). Tailwind v4 for styling with CSS custom properties for brand tokens.

**Tech Stack:** Next.js 15, TypeScript (strict), Tailwind CSS v4, `next/font` (Fraunces + Inter), static export, Vercel hosting.

**Spec:** `.docs/superpowers/specs/2026-05-15-ccbc-website-design.md`

---

## File Map

**Created in this plan:**
```
website/
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── .gitignore
├── .eslintrc.json
├── README.md
├── public/
│   ├── logo.png                       # copied from existing CCBC Logo.png
│   └── images/.gitkeep
├── styles/globals.css                 # Tailwind + design tokens
├── content/site.ts                    # Typed church info (single source of truth)
├── app/
│   ├── layout.tsx                     # Root: fonts, metadata, Header, Footer
│   ├── page.tsx                       # Home
│   ├── about/page.tsx
│   ├── watch/page.tsx
│   ├── give/page.tsx
│   ├── contact/page.tsx
│   ├── sitemap.ts
│   └── robots.ts
└── components/
    ├── Header.tsx                     # Sticky nav + mobile hamburger
    ├── Footer.tsx
    ├── Hero.tsx                       # Home hero
    ├── ServiceTimes.tsx               # Sunday + Friday cards
    ├── SermonEmbed.tsx                # YouTube iframe wrapper
    ├── MapEmbed.tsx                   # Google Maps iframe
    └── ui/
        ├── Button.tsx
        ├── Card.tsx
        └── Section.tsx
```

Each file has one job. UI primitives (`Button`, `Card`, `Section`) are reused across pages — DRY. Page files compose components and pull data from `content/site.ts` — no inline church info.

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`, `.eslintrc.json`

- [ ] **Step 1: Initialize package.json**

Create `package.json`:
```json
{
  "name": "ccbc-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "15.0.3",
    "react": "19.0.0",
    "react-dom": "19.0.0"
  },
  "devDependencies": {
    "@types/node": "22.9.0",
    "@types/react": "19.0.1",
    "@types/react-dom": "19.0.2",
    "@tailwindcss/postcss": "4.0.0-beta.7",
    "tailwindcss": "4.0.0-beta.7",
    "eslint": "9.15.0",
    "eslint-config-next": "15.0.3",
    "typescript": "5.6.3"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: `added N packages` with no errors.

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create next.config.ts**

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
```

Note: `images: { unoptimized: true }` is required for static export. `trailingSlash: true` ensures clean URLs on static hosts.

- [ ] **Step 5: Create postcss.config.mjs**

```js
export default {
  plugins: { '@tailwindcss/postcss': {} },
};
```

- [ ] **Step 6: Create .gitignore**

```
node_modules/
.next/
out/
.env*.local
.DS_Store
*.log
next-env.d.ts
```

- [ ] **Step 7: Create .eslintrc.json**

```json
{ "extends": "next/core-web-vitals" }
```

- [ ] **Step 8: Verify typecheck and lint baseline**

Run: `npm run typecheck`
Expected: completes with no errors (no .ts files yet besides config).

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs .gitignore .eslintrc.json
git commit -m "chore: scaffold Next.js 15 + TS + Tailwind v4 project"
```

---

## Task 2: Global styles and design tokens

**Files:**
- Create: `styles/globals.css`

- [ ] **Step 1: Write globals.css with Tailwind + brand tokens**

```css
@import "tailwindcss";

@theme {
  --color-brand-navy: #1e3a8a;
  --color-brand-navy-deep: #172554;
  --color-brand-gold: #c8a64b;
  --color-brand-gold-soft: #e6cf86;
  --color-bg-warm: #faf8f3;
  --color-section-soft: #f1ece1;
  --color-ink: #1f2937;
  --color-muted: #6b7280;

  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Inter", system-ui, sans-serif;
}

@layer base {
  html { scroll-behavior: smooth; }
  body {
    background: var(--color-bg-warm);
    color: var(--color-ink);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4 { font-family: var(--font-display); letter-spacing: -0.01em; }
  a { color: var(--color-brand-navy); }
  a:hover { color: var(--color-brand-navy-deep); }
  :focus-visible {
    outline: 2px solid var(--color-brand-gold);
    outline-offset: 2px;
    border-radius: 4px;
  }
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--color-brand-navy);
  color: white;
  padding: 0.75rem 1rem;
  z-index: 100;
}
.skip-link:focus { left: 0.5rem; top: 0.5rem; }
```

- [ ] **Step 2: Commit**

```bash
git add styles/globals.css
git commit -m "feat(styles): add Tailwind v4 setup with CCBC brand tokens"
```

---

## Task 3: Content module (single source of truth)

**Files:**
- Create: `content/site.ts`

- [ ] **Step 1: Write the typed content module**

```ts
export type ServiceTime = {
  day: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  name: string;
  time: string;
};

export type Pastor = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
};

export type BankAccount = {
  bank: string;
  accountName: string;
  accountNumber: string;
};

export type QrCode = {
  label: string;
  image: string;
};

export const site = {
  name: 'Candelaria Conservative Baptist Church',
  shortName: 'CCBC',
  established: 1970,
  tagline: 'A family of faith in Candelaria — since 1970.',
  url: 'https://candelbap.church',
  address: {
    line1: 'Bansalangin St',
    line2: 'Pahinga Norte',
    city: 'Candelaria',
    region: 'Quezon',
    country: 'Philippines',
    mapsUrl: 'https://maps.app.goo.gl/k5WYwexxcDbvZQ1e6',
    mapEmbedSrc:
      'https://www.google.com/maps?q=Candelaria+Conservative+Baptist+Church+Pahinga+Norte+Candelaria+Quezon&output=embed',
  },
  services: [
    { day: 'Sunday', name: 'Sunday Service', time: '7:30 AM' },
    { day: 'Friday', name: 'Prayer Meeting', time: '6:00 PM' },
  ] satisfies ReadonlyArray<ServiceTime>,
  contact: {
    email: 'hello@candelbap.church',
    facebook: 'https://fb.com/candelbap.church',
    youtube: 'https://www.youtube.com/@candelbap.church',
    youtubeChannelHandle: '@candelbap.church',
  },
  mission: 'To be provided.',
  vision: 'To be provided.',
  beliefs: 'A statement of faith will be added soon.',
  pastors: [] as ReadonlyArray<Pastor>,
  giving: {
    intro:
      'Your generosity supports our worship services, outreach, and community ministries. Thank you for partnering with us.',
    bankAccounts: [] as ReadonlyArray<BankAccount>,
    qrCodes: [] as ReadonlyArray<QrCode>,
  },
  latestSermonEmbed:
    'https://www.youtube.com/embed/videoseries?list=UU&channel=candelbap.church',
} as const;

export type Site = typeof site;
```

Note: `latestSermonEmbed` uses a fallback channel uploads playlist URL pattern. Real video ID can be swapped in when known.

- [ ] **Step 2: Verify typecheck**

Run: `npm run typecheck`
Expected: PASS, no errors.

- [ ] **Step 3: Commit**

```bash
git add content/site.ts
git commit -m "feat(content): add typed site content module"
```

---

## Task 4: UI primitives (Button, Card, Section)

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/Card.tsx`, `components/ui/Section.tsx`

- [ ] **Step 1: Create Button**

`components/ui/Button.tsx`:
```tsx
import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors';
const variants: Record<Variant, string> = {
  primary: 'bg-brand-navy text-white hover:bg-brand-navy-deep',
  secondary: 'bg-brand-gold text-ink hover:bg-brand-gold-soft',
  ghost: 'bg-transparent text-brand-navy hover:bg-section-soft',
};
const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    />
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  external,
}: CommonProps & { href: string; external?: boolean }) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 2: Create Card**

`components/ui/Card.tsx`:
```tsx
import type { ReactNode } from 'react';

export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6 ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create Section**

`components/ui/Section.tsx`:
```tsx
import type { ReactNode } from 'react';

type Tone = 'warm' | 'soft' | 'white';
const tones: Record<Tone, string> = {
  warm: 'bg-bg-warm',
  soft: 'bg-section-soft',
  white: 'bg-white',
};

export function Section({
  children,
  tone = 'warm',
  id,
  className = '',
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">{children}</div>
    </section>
  );
}
```

- [ ] **Step 4: Verify typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/ui/
git commit -m "feat(ui): add Button, Card, Section primitives"
```

---

## Task 5: Header and Footer

**Files:**
- Create: `components/Header.tsx`, `components/Footer.tsx`

- [ ] **Step 1: Create Header**

`components/Header.tsx`:
```tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/content/site';
import { ButtonLink } from '@/components/ui/Button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/watch/', label: 'Watch' },
  { href: '/give/', label: 'Give' },
  { href: '/contact/', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-bg-warm/90 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.shortName} home`}>
          <Image src="/logo.png" alt="" width={140} height={32} priority />
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-ink hover:text-brand-navy">
              {l.label}
            </Link>
          ))}
          <ButtonLink href={site.contact.facebook} variant="primary" size="md" external>
            Watch Live
          </ButtonLink>
        </nav>
        <button
          type="button"
          className="md:hidden p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-6 h-0.5 bg-ink mb-1.5" />
          <span className="block w-6 h-0.5 bg-ink mb-1.5" />
          <span className="block w-6 h-0.5 bg-ink" />
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile" className="md:hidden border-t border-black/5 bg-bg-warm">
          <ul className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block py-2" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <ButtonLink href={site.contact.facebook} variant="primary" size="md" external>
                Watch Live
              </ButtonLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Create Footer**

`components/Footer.tsx`:
```tsx
import Link from 'next/link';
import { site } from '@/content/site';

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white mt-24">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-xl">{site.name}</p>
          <p className="mt-2 text-white/70 text-sm">Since {site.established}</p>
          <p className="mt-4 text-sm text-white/80">
            {site.address.line1}, {site.address.line2}
            <br />
            {site.address.city}, {site.address.region}
            <br />
            {site.address.country}
          </p>
        </div>
        <div>
          <p className="font-semibold mb-3">Service Times</p>
          <ul className="text-sm text-white/80 space-y-1">
            {site.services.map((s) => (
              <li key={s.day}>
                <span className="font-medium text-white">{s.day}:</span> {s.name} — {s.time}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Connect</p>
          <ul className="text-sm text-white/80 space-y-2">
            <li>
              <a href={`mailto:${site.contact.email}`} className="text-white hover:underline">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={site.contact.facebook} className="text-white hover:underline" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href={site.contact.youtube} className="text-white hover:underline" target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-white/60 flex justify-between">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <Link href="/contact/" className="text-white/80 hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Header.tsx components/Footer.tsx
git commit -m "feat(components): add Header with mobile nav and Footer"
```

---

## Task 6: Root layout, fonts, metadata, logo

**Files:**
- Create: `app/layout.tsx`
- Copy: `CCBC Logo.png` → `public/logo.png`

- [ ] **Step 1: Copy logo into public/**

```bash
mkdir -p public/images
cp "CCBC Logo.png" public/logo.png
touch public/images/.gitkeep
```

- [ ] **Step 2: Create root layout**

`app/layout.tsx`:
```tsx
import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { site } from '@/content/site';
import '@/styles/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.shortName}` },
  description: site.tagline,
  openGraph: {
    title: site.name,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
  icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx public/logo.png public/images/.gitkeep
git commit -m "feat(app): add root layout with fonts, metadata, header, footer"
```

---

## Task 7: Home page components (Hero, ServiceTimes, SermonEmbed, MapEmbed)

**Files:**
- Create: `components/Hero.tsx`, `components/ServiceTimes.tsx`, `components/SermonEmbed.tsx`, `components/MapEmbed.tsx`

- [ ] **Step 1: Create Hero**

`components/Hero.tsx`:
```tsx
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/content/site';

export function Hero() {
  return (
    <section className="relative bg-section-soft">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <p className="text-brand-gold font-semibold tracking-wide text-sm">
            Welcome to {site.shortName}
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl leading-tight">
            {site.name}
          </h1>
          <p className="mt-5 text-lg text-muted max-w-prose">{site.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact/" variant="primary" size="lg">
              Plan Your Visit
            </ButtonLink>
            <ButtonLink href="/watch/" variant="secondary" size="lg">
              Watch Online
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-3xl bg-white ring-1 ring-black/5 shadow-sm p-8 text-center">
          <p className="text-sm uppercase tracking-wider text-muted">Join us this week</p>
          <ul className="mt-4 space-y-3">
            {site.services.map((s) => (
              <li key={s.day} className="font-display text-2xl">
                <span className="text-brand-navy">{s.day}</span>
                <span className="text-muted text-base"> — {s.name}</span>
                <div className="text-brand-gold text-lg">{s.time}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create ServiceTimes**

`components/ServiceTimes.tsx`:
```tsx
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { site } from '@/content/site';

export function ServiceTimes() {
  return (
    <Section tone="warm">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl">When We Gather</h2>
        <p className="mt-3 text-muted">We'd love to worship with you.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
        {site.services.map((s) => (
          <Card key={s.day} className="text-center">
            <p className="font-display text-2xl text-brand-navy">{s.day}</p>
            <p className="text-muted mt-1">{s.name}</p>
            <p className="mt-4 text-3xl text-brand-gold font-display">{s.time}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Create SermonEmbed**

`components/SermonEmbed.tsx`:
```tsx
type Props = {
  src: string;
  title?: string;
  className?: string;
};

export function SermonEmbed({ src, title = 'Latest Sermon', className = '' }: Props) {
  return (
    <div className={`relative w-full aspect-video overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-sm ${className}`}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
```

- [ ] **Step 4: Create MapEmbed**

`components/MapEmbed.tsx`:
```tsx
import { site } from '@/content/site';

export function MapEmbed({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-video overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-sm ${className}`}>
      <iframe
        src={site.address.mapEmbedSrc}
        title={`Map to ${site.name}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx components/ServiceTimes.tsx components/SermonEmbed.tsx components/MapEmbed.tsx
git commit -m "feat(components): add Hero, ServiceTimes, SermonEmbed, MapEmbed"
```

---

## Task 8: Home page

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Compose home page**

`app/page.tsx`:
```tsx
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { ServiceTimes } from '@/components/ServiceTimes';
import { SermonEmbed } from '@/components/SermonEmbed';
import { MapEmbed } from '@/components/MapEmbed';
import { Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/content/site';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceTimes />

      <Section tone="soft">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl">A church family in Candelaria</h2>
            <p className="mt-4 text-muted leading-relaxed">
              Since {site.established}, {site.name} has been a place to worship, grow, and serve together.
              Whether you're exploring faith for the first time or looking for a church home, you're welcome here.
            </p>
            <div className="mt-6">
              <ButtonLink href="/about/" variant="ghost">Learn more about us →</ButtonLink>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-2 ring-1 ring-black/5 shadow-sm">
            <div className="aspect-[4/3] rounded-2xl bg-bg-warm flex items-center justify-center text-muted">
              Photo coming soon
            </div>
          </div>
        </div>
      </Section>

      <Section tone="warm">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl">Latest Sermon</h2>
          <p className="mt-3 text-muted">Catch up or worship with us online.</p>
        </div>
        <div className="mt-10 max-w-3xl mx-auto">
          <SermonEmbed src={site.latestSermonEmbed} />
          <div className="mt-6 text-center">
            <ButtonLink href="/watch/" variant="primary">More sermons</ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl">Visit Us</h2>
            <p className="mt-4 text-muted">
              {site.address.line1}, {site.address.line2}
              <br />
              {site.address.city}, {site.address.region}, {site.address.country}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={site.address.mapsUrl} variant="primary" external>
                Get Directions
              </ButtonLink>
              <ButtonLink href="/contact/" variant="ghost">Contact us</ButtonLink>
            </div>
          </div>
          <MapEmbed />
        </div>
      </Section>

      <Section tone="warm">
        <div className="rounded-3xl bg-brand-navy text-white px-8 py-14 text-center">
          <h2 className="text-3xl md:text-4xl text-white">Partner with us in giving</h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">
            Your generosity helps us serve our community and share the gospel.
          </p>
          <div className="mt-6">
            <Link href="/give/" className="inline-flex rounded-full bg-brand-gold px-7 py-3.5 text-ink font-semibold hover:bg-brand-gold-soft">
              Give now
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Run dev server**

Run: `npm run dev`
Open: `http://localhost:3000`
Expected: Home page renders with hero, service times cards, welcome section, sermon embed, map, and give CTA. Header sticky, footer at bottom.

- [ ] **Step 3: Verify build**

Stop dev. Run: `npm run build`
Expected: Static export generates `out/` directory; no errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): compose home page from sections"
```

---

## Task 9: About page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create About page**

`app/about/page.tsx`:
```tsx
import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn about ${site.name} — our story, mission, and beliefs.`,
};

export default function AboutPage() {
  return (
    <>
      <Section tone="soft">
        <div className="max-w-3xl">
          <p className="text-brand-gold font-semibold tracking-wide text-sm">About Us</p>
          <h1 className="mt-3 text-4xl md:text-5xl">Our Story</h1>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            {site.name} has served the community of Candelaria since {site.established}.
            We are a Conservative Baptist congregation committed to faithful worship, biblical teaching,
            and loving our neighbors.
          </p>
        </div>
      </Section>

      <Section tone="warm">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <h2 className="text-2xl text-brand-navy">Our Mission</h2>
            <p className="mt-3 text-muted">{site.mission}</p>
          </Card>
          <Card>
            <h2 className="text-2xl text-brand-navy">Our Vision</h2>
            <p className="mt-3 text-muted">{site.vision}</p>
          </Card>
        </div>
      </Section>

      <Section tone="soft">
        <div className="max-w-3xl">
          <h2 className="text-3xl">What We Believe</h2>
          <p className="mt-4 text-muted leading-relaxed">{site.beliefs}</p>
        </div>
      </Section>

      {site.pastors.length > 0 && (
        <Section tone="warm">
          <h2 className="text-3xl text-center">Our Pastors</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {site.pastors.map((p) => (
              <Card key={p.name}>
                <p className="font-display text-2xl text-brand-navy">{p.name}</p>
                <p className="text-brand-gold text-sm font-semibold">{p.role}</p>
                <p className="mt-3 text-muted">{p.bio}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev` (if not running)
Open: `http://localhost:3000/about/`
Expected: About page renders; mission/vision cards show "To be provided"; pastors section hidden.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat(about): add About page with story, mission, vision, beliefs"
```

---

## Task 10: Watch page

**Files:**
- Create: `app/watch/page.tsx`

- [ ] **Step 1: Create Watch page**

`app/watch/page.tsx`:
```tsx
import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { SermonEmbed } from '@/components/SermonEmbed';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Watch',
  description: `Watch ${site.name} sermons and live services online.`,
};

export default function WatchPage() {
  return (
    <>
      <Section tone="soft">
        <div className="max-w-3xl">
          <p className="text-brand-gold font-semibold tracking-wide text-sm">Watch</p>
          <h1 className="mt-3 text-4xl md:text-5xl">Sermons & Live Services</h1>
          <p className="mt-6 text-lg text-muted">
            Worship with us online. Our Sunday services are streamed on Facebook and uploaded to YouTube.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={site.contact.facebook} variant="primary" external>
              Watch on Facebook
            </ButtonLink>
            <ButtonLink href={site.contact.youtube} variant="secondary" external>
              YouTube Channel
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="warm">
        <h2 className="text-3xl text-center">Latest from YouTube</h2>
        <div className="mt-10 max-w-4xl mx-auto">
          <SermonEmbed src={site.latestSermonEmbed} title="Latest sermon" />
        </div>
        <p className="mt-6 text-center text-muted text-sm">
          Subscribe at <a className="underline" href={site.contact.youtube} target="_blank" rel="noopener noreferrer">{site.contact.youtubeChannelHandle}</a> for the latest uploads.
        </p>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

Open: `http://localhost:3000/watch/`
Expected: Page renders with FB/YouTube CTAs and an embedded sermon player.

- [ ] **Step 3: Commit**

```bash
git add app/watch/page.tsx
git commit -m "feat(watch): add Watch page with live links and sermon embed"
```

---

## Task 11: Give page

**Files:**
- Create: `app/give/page.tsx`

- [ ] **Step 1: Create Give page**

`app/give/page.tsx`:
```tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Give',
  description: `Support the ministry of ${site.name} through your generous giving.`,
};

export default function GivePage() {
  return (
    <>
      <Section tone="soft">
        <div className="max-w-3xl">
          <p className="text-brand-gold font-semibold tracking-wide text-sm">Give</p>
          <h1 className="mt-3 text-4xl md:text-5xl">Partner with us</h1>
          <p className="mt-6 text-lg text-muted leading-relaxed">{site.giving.intro}</p>
        </div>
      </Section>

      <Section tone="warm">
        <h2 className="text-3xl">Bank Transfer</h2>
        {site.giving.bankAccounts.length === 0 ? (
          <Card className="mt-6 max-w-xl">
            <p className="text-muted">
              Bank account details will be posted here soon. For now, please reach out at{' '}
              <a className="underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>{' '}
              for giving instructions.
            </p>
          </Card>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 max-w-4xl">
            {site.giving.bankAccounts.map((a) => (
              <Card key={a.accountNumber}>
                <p className="font-display text-xl text-brand-navy">{a.bank}</p>
                <dl className="mt-3 text-sm space-y-1">
                  <div>
                    <dt className="inline text-muted">Account name: </dt>
                    <dd className="inline font-medium">{a.accountName}</dd>
                  </div>
                  <div>
                    <dt className="inline text-muted">Account number: </dt>
                    <dd className="inline font-mono">{a.accountNumber}</dd>
                  </div>
                </dl>
              </Card>
            ))}
          </div>
        )}
      </Section>

      {site.giving.qrCodes.length > 0 && (
        <Section tone="soft">
          <h2 className="text-3xl">Scan to Give</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3 max-w-4xl">
            {site.giving.qrCodes.map((q) => (
              <Card key={q.label} className="text-center">
                <p className="font-semibold">{q.label}</p>
                <div className="mt-4 mx-auto w-48 h-48 relative">
                  <Image src={q.image} alt={`${q.label} QR code`} fill className="object-contain" />
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      <Section tone="warm">
        <Card className="max-w-3xl mx-auto">
          <h2 className="text-2xl text-brand-navy">A note on giving</h2>
          <p className="mt-3 text-muted">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion,
            for God loves a cheerful giver." — 2 Corinthians 9:7
          </p>
        </Card>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

Open: `http://localhost:3000/give/`
Expected: Page renders; bank section shows fallback contact message (since `bankAccounts` is empty); QR section hidden.

- [ ] **Step 3: Commit**

```bash
git add app/give/page.tsx
git commit -m "feat(give): add Give page with bank/QR sections"
```

---

## Task 12: Contact page

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create Contact page**

`app/contact/page.tsx`:
```tsx
import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { MapEmbed } from '@/components/MapEmbed';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Visit or get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <Section tone="soft">
        <div className="max-w-3xl">
          <p className="text-brand-gold font-semibold tracking-wide text-sm">Visit</p>
          <h1 className="mt-3 text-4xl md:text-5xl">We'd love to meet you</h1>
          <p className="mt-6 text-lg text-muted">
            Drop in for a service, or send us a message — we'll get back to you.
          </p>
        </div>
      </Section>

      <Section tone="warm">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl text-brand-navy">Address</h2>
              <p className="mt-3 text-muted">
                {site.address.line1}, {site.address.line2}
                <br />
                {site.address.city}, {site.address.region}
                <br />
                {site.address.country}
              </p>
              <div className="mt-4">
                <ButtonLink href={site.address.mapsUrl} variant="primary" external>
                  Get Directions
                </ButtonLink>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl text-brand-navy">Service Times</h2>
              <ul className="mt-3 space-y-1 text-muted">
                {site.services.map((s) => (
                  <li key={s.day}>
                    <span className="text-ink font-medium">{s.day}:</span> {s.name} — {s.time}
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h2 className="text-2xl text-brand-navy">Get in touch</h2>
              <ul className="mt-3 space-y-2 text-muted">
                <li>
                  Email:{' '}
                  <a className="underline" href={`mailto:${site.contact.email}`}>
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  Facebook:{' '}
                  <a className="underline" href={site.contact.facebook} target="_blank" rel="noopener noreferrer">
                    fb.com/candelbap.church
                  </a>
                </li>
                <li>
                  YouTube:{' '}
                  <a className="underline" href={site.contact.youtube} target="_blank" rel="noopener noreferrer">
                    {site.contact.youtubeChannelHandle}
                  </a>
                </li>
              </ul>
            </Card>
          </div>
          <MapEmbed className="md:sticky md:top-24" />
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

Open: `http://localhost:3000/contact/`
Expected: Address, service times, contact links, and embedded map all render.

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat(contact): add Contact page with address, services, map"
```

---

## Task 13: Sitemap and robots

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`

- [ ] **Step 1: Create sitemap.ts**

`app/sitemap.ts`:
```ts
import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', 'about', 'watch', 'give', 'contact'];
  const now = new Date();
  return pages.map((p) => ({
    url: `${site.url}/${p ? p + '/' : ''}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: p === '' ? 1 : 0.7,
  }));
}
```

- [ ] **Step 2: Create robots.ts**

`app/robots.ts`:
```ts
import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: `out/sitemap.xml` and `out/robots.txt` are generated.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat(seo): add sitemap and robots"
```

---

## Task 14: README and deployment docs

**Files:**
- Create: `README.md`, `.docs/setup.md`, `.docs/deployment.md`

- [ ] **Step 1: Create README**

`README.md`:
````markdown
# CCBC Website

Static site for Candelaria Conservative Baptist Church — built with Next.js 15, TypeScript, and Tailwind CSS v4. Deployed on Vercel.

## Develop

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Build (static export)

```bash
npm run build
# output in ./out
```

## Edit content

All church info — service times, address, links, mission, pastors, giving — lives in `content/site.ts`. Edit there; pages re-render automatically.

## Tech

- Next.js 15 (App Router, static export)
- TypeScript strict
- Tailwind CSS v4
- Hosted on Vercel

## Docs

See `.docs/` for setup, deployment, and architecture notes.
````

- [ ] **Step 2: Create .docs/setup.md**

`.docs/setup.md`:
````markdown
# Setup

## Prerequisites

- Node.js 20+
- npm 10+

## Install

```bash
npm install
```

## Develop

```bash
npm run dev
```

Open <http://localhost:3000>.

## Typecheck & lint

```bash
npm run typecheck
npm run lint
```

## Build

```bash
npm run build
```

Static HTML is written to `out/`.
````

- [ ] **Step 3: Create .docs/deployment.md**

`.docs/deployment.md`:
````markdown
# Deployment

## Vercel (recommended)

1. Push the repo to GitHub.
2. In Vercel, "Add New… → Project" and import the repo.
3. Vercel detects Next.js automatically. Click Deploy.
4. After first deploy, add the custom domain `candelbap.church` under Project Settings → Domains.
5. Update DNS at the domain registrar:
   - `A` record `@` → `76.76.21.21`
   - `CNAME` record `www` → `cname.vercel-dns.com`
6. HTTPS is provisioned automatically.

## Updating content

1. Edit `content/site.ts` (or the page file).
2. Commit and push to `main`.
3. Vercel auto-deploys.

## Manual static host (alternative)

`npm run build` produces `out/`. Upload its contents to any static host (Netlify, Cloudflare Pages, S3+CloudFront, etc.).
````

- [ ] **Step 4: Commit**

```bash
git add README.md .docs/setup.md .docs/deployment.md
git commit -m "docs: add README, setup, and deployment guides"
```

---

## Task 15: Final verification

- [ ] **Step 1: Clean install**

```bash
rm -rf node_modules .next out
npm install
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: PASS, no errors.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors (warnings acceptable).

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: build succeeds; `out/` contains:
- `index.html`, `about/index.html`, `watch/index.html`, `give/index.html`, `contact/index.html`
- `sitemap.xml`, `robots.txt`
- `_next/static/...` assets

- [ ] **Step 5: Serve and smoke test**

Run: `npx serve out -p 3001`
Open: <http://localhost:3001>

Manually verify in browser:
- [ ] Home: hero, services, welcome, sermon embed, map, give CTA all render
- [ ] About: story, mission/vision cards, beliefs render
- [ ] Watch: FB/YouTube buttons + sermon embed render
- [ ] Give: bank fallback message renders
- [ ] Contact: address card, service times, contact links, map render
- [ ] Header is sticky; mobile hamburger toggles nav at <768px width
- [ ] Footer shows address, service times, social links
- [ ] All five nav links navigate correctly
- [ ] Logo appears in header

- [ ] **Step 6: Commit**

If any fixes were needed during smoke test, commit them:
```bash
git add -A
git commit -m "fix: smoke test corrections"
```

Otherwise nothing to commit — move on.

---

## Out of scope (Phase 2)

These are intentionally deferred. Do **not** implement in this plan:

- Headless CMS (Sanity) integration
- Online payment processor for giving
- Events calendar / dynamic content
- Ministries pages
- Newsletter signup
- Contact form with backend
- Real hero photography (placeholders used in v1)
