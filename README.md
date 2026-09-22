# The Pensieve

Security and pentesting reference. It holds cheatsheets, methodology, and tools. It is built with [Next.js](https://nextjs.org) and [Nextra](https://nextra.site).

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The **home page** is the landing page (`app/page.tsx`). Docs live under routes such as `/Red-Teaming/...` and `/Tools/...`. They do not live under `/resources`.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the development server |
| `pnpm build` | Production build (includes the Pagefind search index) |
| `pnpm start` | Run the production server |

## Deployment

### Vercel (recommended)

1. Push to GitHub and [import the project](https://vercel.com/new) on Vercel.
2. (Optional) Set environment variables:
   - `NEXT_PUBLIC_SITE_URL`: Canonical URL (for example `https://thepensieve.vercel.app`)
   - `NEXT_PUBLIC_DOCS_REPO`: GitHub repo for "Edit this page" links (default: `https://github.com/Alpastx/ThePensieve`)

### Other platforms

- **Node.js**: Run `pnpm build`, then `pnpm start` (port 3000 by default).
- **Static export**: Not supported. The app uses Nextra's dynamic page map.

## Project structure

- `app/`: Layout, pages, metadata, robots, sitemap
- `app/Red-Teaming/`, `app/Tools/`, `app/Certifications/`, etc.: MDX/Markdown docs
- `lib/`: Nextra theme components and stores
- `public/`: Static assets. `_pagefind/` is generated at build time for search.

## License

MIT
