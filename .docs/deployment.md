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
