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

The app uses browser-based client-side routing. Navigation swaps content without a full page reload. Configure the production host to send unknown routes to `index.html`, which is the default for most modern static hosts.

## Project structure

- `src/components/` shared layout and reusable UI
- `src/components/sections/` homepage sections
- `src/pages/` route-level pages
- `src/data/` content shared between pages and components
- `public/` static assets
