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

## Environment variables

The site uses PostHog for product analytics. Two environment variables must be set in Vercel → Project Settings → Environment Variables (apply to Production, Preview, and Development as needed):

- `NEXT_PUBLIC_POSTHOG_KEY` — the PostHog project write-only API key (starts with `phc_`).
- `NEXT_PUBLIC_POSTHOG_HOST` — the PostHog ingestion host, e.g. `https://eu.i.posthog.com`.

The `NEXT_PUBLIC_` prefix exposes these values to the browser, which is intentional and safe: PostHog write-only keys are designed to be public and can only ingest events (not read data). See `.env.example` for the variable names and `.env.local` for local development values (never commit `.env.local`).

Without these variables set, the analytics provider no-ops cleanly so previews and local dev still work.
