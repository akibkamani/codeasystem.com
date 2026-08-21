# CodeASystem

Marketing site for CodeASystem, built with Next.js and exported as a static website.

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

The build outputs static HTML files under `out/` using Next.js static export. There are no API routes or server runtime requirements.

## Static-only setup

- Static export is enforced in `next.config.mjs` with `output: 'export'`.
- Routes are pre-rendered in `src/pages/`, including dynamic case-study pages via `getStaticPaths` and `getStaticProps`.
- SEO and JSON-LD are rendered at build time through `src/components/SeoHead.jsx` and `src/data/seo.js`.
- Next.js MCP tooling is configured in `.mcp.json` using `next-devtools-mcp@latest`.

## Agent discovery

The static site includes an agent skills index, an agent guidance skill, Markdown copies of the public pages, and AI content-use preferences in `robots.txt`. The `public/_headers` file provides RFC 8288 `Link` headers on the homepage when deployed to a host that supports Netlify-style headers.

This is a marketing site, not an API or authentication provider. Do not publish API, OAuth, protected-resource, or MCP discovery documents unless those services are actually introduced.

## Project structure

- `src/components/` shared layout and reusable UI
- `src/components/sections/` homepage sections
- `src/pages/` Next.js pages (static routes)
- `src/data/` content shared between pages and components
- `public/` static assets
