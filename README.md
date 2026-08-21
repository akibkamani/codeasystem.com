# CodeASystem

Marketing site for CodeASystem, built with React and Vite.

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

The production build prerenders the public routes into real HTML files under `dist/`, then hydrates the app on the client. Static hosts can still fall back to `index.html`, but the generated files already contain rendered markup.

## Agent discovery

The static site includes an agent skills index, an agent guidance skill, Markdown copies of the public pages, and AI content-use preferences in `robots.txt`. The `public/_headers` file provides RFC 8288 `Link` headers on the homepage when deployed to a host that supports Netlify-style headers.

This is a marketing site, not an API or authentication provider. Do not publish API, OAuth, protected-resource, or MCP discovery documents unless those services are actually introduced.

## Project structure

- `src/components/` shared layout and reusable UI
- `src/components/sections/` homepage sections
- `src/pages/` route-level pages
- `src/data/` content shared between pages and components
- `public/` static assets
