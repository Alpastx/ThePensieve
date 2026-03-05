# The Pensieve

Security & pentesting reference — cheatsheets, methodology, and tools. Built with [Next.js](https://nextjs.org) and [Nextra](https://nextra.site).

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The root redirects to `/resources`.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build (includes Pagefind search index) |
| `pnpm start` | Run production server |

## Deployment

### Vercel (recommended)

1. Push to GitHub and [import the project](https://vercel.com/new) on Vercel.
2. (Optional) Set environment variables:
   - `NEXT_PUBLIC_SITE_URL` — Canonical URL (e.g. `https://thepensieve.vercel.app`)
   - `NEXT_PUBLIC_DOCS_REPO` — GitHub repo for "Edit this page" links (default: `https://github.com/Alpastx/ThePensieve`)

### Other platforms

- **Node.js**: Run `pnpm build` then `pnpm start` (port 3000 by default).
- **Static export**: Not supported — the app uses Nextra's dynamic page map.

## Project structure

- `app/` — Layout, pages, metadata, robots, sitemap
- `app/resources/` — MDX docs (Nmap cheatsheet, etc.)
- `lib/` — Nextra theme components and stores
- `public/` — Static assets; `_pagefind/` is generated at build time for search

## License

MIT
