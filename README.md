# CodeASystem

Marketing site for CodeASystem, built with Next.js as a fully static website.

## Getting started

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The build exports static HTML, JavaScript, CSS and assets under `out/`. There are no API routes or server runtime requirements.

## Cloudflare Pages deployment

Create a Cloudflare Pages project from this repository with these settings:

- Build command: `npm run build`
- Build output directory: `out`
- Node.js version: `20` or newer

`next.config.mjs` uses Next.js static export and trailing slashes. All routes, including the dynamic case studies, are generated at build time. There is no server runtime to configure.

## SEO and UI

- Route metadata and JSON-LD are generated from `src/data/seo.js` at build time.
- `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, agent discovery files and existing content policy files are copied to the static output unchanged.
- Tailwind CSS is available through `src/app/globals.css`; the existing carefully designed CSS remains in place for visual parity.
- shadcn’s project configuration lives in `components.json`, and Lucide supplies the interface icons.

## Agent discovery

The static site includes an agent skills index, an agent guidance skill, Markdown copies of the public pages, and AI content-use preferences in `robots.txt`. The `public/_headers` file provides RFC 8288 `Link` headers on the homepage when deployed to a host that supports Netlify-style headers.

This is a marketing site, not an API or authentication provider. Do not publish API, OAuth, protected-resource, or MCP discovery documents unless those services are actually introduced.

## Product documentation

- [Resume generator agent guide](docs/resume-generator.md): features, JSON schema, Markdown rules, local storage, A4 printing, responsive behavior, migration, and testing checklist

## Project structure

- `src/components/` shared layout and reusable UI
- `src/components/sections/` homepage sections
- `src/app/` Next.js App Router pages (static routes)
- `src/data/` content shared between pages and components
- `docs/` implementation and agent-facing product guides
- `public/` static assets
