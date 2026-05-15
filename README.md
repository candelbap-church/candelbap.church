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
