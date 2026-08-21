# CodeASystem

Marketing site for CodeASystem, built with Astro as a static website.

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

The build outputs static HTML files under `dist/` using Astro static generation. There are no API routes or server runtime requirements.

## Static-only setup

- Static generation is configured in `astro.config.mjs` with `output: 'static'`.
- Routes are pre-rendered in `src/pages/`, including dynamic case-study pages via Astro `getStaticPaths`.
- SEO and JSON-LD are rendered at build time through `src/layouts/BaseLayout.astro` and `src/data/seo.js`.

## Agent discovery

The static site includes an agent skills index, an agent guidance skill, Markdown copies of the public pages, and AI content-use preferences in `robots.txt`. The `public/_headers` file provides RFC 8288 `Link` headers on the homepage when deployed to a host that supports Netlify-style headers.

This is a marketing site, not an API or authentication provider. Do not publish API, OAuth, protected-resource, or MCP discovery documents unless those services are actually introduced.

## Project structure

- `src/components/` shared layout and reusable UI
- `src/components/sections/` homepage sections
- `src/pages/` Astro pages (static routes)
- `src/data/` content shared between pages and components
- `public/` static assets
