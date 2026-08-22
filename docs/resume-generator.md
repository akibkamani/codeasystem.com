# Resume Generator

This is the agent-facing reference for the free resume generator at `/tool/resume-generator/`.

## Purpose

The tool creates focused, one-page A4 resumes without accounts, ads, watermarks, or server-side resume storage. It supports visual and JSON editing so a person or coding agent can work with the same data.

Resume content is stored in browser local storage under `codeasystem-resume-v2`. The tool has no API, database, authentication flow, or server runtime.

## Source files

- `src/components/ResumeGenerator.jsx`: data model, editor, preview, import/export, migration, and Markdown rendering
- `src/styles.css`: responsive editor, A4 preview, page breaks, and print rules
- `src/app/tool/resume-generator/page.jsx`: Next.js application route
- `src/app/resume-builder/page.jsx`: content-rich landing page
- `src/data/seo.js`: page metadata and WebApplication structured data
- `src/data/nextSeo.js`: canonical, Open Graph, and Twitter metadata

## Features

### Content editor

- Full name, professional title, email, phone, and location
- Any number of labelled social or website links
- Fixed Profile section
- Multiple experience and education entries
- Any number of custom sections
- Confirmation before deleting links, entries, or sections
- Sticky tabs and editor jump links
- Independent editor and preview scrolling on desktop

The Header and Profile stay at the top. Experience, Education, and custom sections can move up or down. Their order is stored in `sectionOrder`.

### Dates

Experience supports year-only values such as `2016`, month-and-year values such as `Jan 2016`, separate start and end dates, and `current: true` for Present.

Education uses separate four-digit `startYear` and `endYear` values.

### Design

- Accent presets and a custom colour
- Sans serif, serif, and monospace fonts
- Comfy, Balanced, and Tight margins

Margins apply to both preview and PDF:

- Comfy: 16 mm
- Balanced: 13 mm
- Tight: 9 mm

Every section stores a numeric `layout`. Missing values use layout 1. Layout 1 spans the document width. Layout 2 places a section in a compact two-column grid, which is useful for shorter supporting sections.

### A4 preview and PDF

- Fits one A4 page inside the available viewer
- Shows a page-break marker and page count when content is too long
- Calls `window.print()` for PDF export
- Removes the editor, navigation, FAQ, footer, and preview chrome when printing
- Uses A4 with zero outer page margin because the selected margin is inside the resume

For manual PDF testing, choose Save as PDF and keep browser scale at 100%.

## JSON editing

The JSON tab shows the current resume object, not example data. Users can edit and apply it, import a JSON file, or export `my-resume.json`.

Applied or imported JSON must include `profile` and `experience.items`. Missing optional values are filled by `normalise()`. Invalid JSON does not replace the current resume.

## Current JSON schema

```json
{
  "name": "John Doe",
  "title": "Chief Technology Officer",
  "email": "john.doe@example.com",
  "phone": "+1 202 555 0147",
  "location": "Example City",
  "socials": [
    {
      "label": "Website",
      "url": "codeasystem.com"
    }
  ],
  "profile": {
    "title": "Profile",
    "content": "Chief Technology Officer focused on building reliable products and supporting engineering teams.",
    "markdown": false,
    "layout": 1
  },
  "experience": {
    "title": "Experience",
    "layout": 1,
    "items": [
      {
        "role": "Chief Technology Officer",
        "company": "CodeASystem",
        "dateMode": "year",
        "startDate": "2020",
        "endDate": "",
        "current": true,
        "content": "Guides product and engineering strategy and helps teams ship secure, useful software.",
        "markdown": false
      }
    ]
  },
  "education": {
    "title": "Education",
    "layout": 1,
    "items": [
      {
        "school": "Best College",
        "degree": "Best Course",
        "startYear": "2012",
        "endYear": "2016"
      }
    ]
  },
  "sections": [
    {
      "id": "custom-1",
      "title": "Skills",
      "content": "- Technology strategy\n- Engineering leadership",
      "markdown": true,
      "layout": 1
    }
  ],
  "sectionOrder": ["experience", "education", "custom-1"],
  "theme": {
    "accent": "#635bff",
    "font": "sans",
    "margin": "balanced"
  }
}
```

Custom section IDs must be unique and must appear in `sectionOrder` to render. Built-in order identifiers are `experience` and `education`.

## Markdown support

Markdown is rendered only when a supported object has `markdown: true`.

Supported syntax:

- `**bold**`
- `*italic*`
- `[label](https://example.com)`
- Bullet lines beginning with `- ` or `* `
- Plain paragraphs separated by line breaks

Supported fields:

- `profile.content`
- `experience.items[].content`
- `sections[].content`

The renderer is intentionally small and is not a complete CommonMark parser. Headings, tables, nested lists, images, and raw HTML are not supported. Links without an HTTP or HTTPS prefix receive `https://`.

Mixed paragraphs and lists must both remain visible:

```markdown
**Thoughtful** product designer with six years of experience.

- Product strategy
- UX research
```

## Migration and compatibility

`normalise()` handles older local or imported data:

- Old combined experience `dates` values are split into start, end, and current fields
- Old education `dates` values are split into start and end years
- The untouched legacy John Doe starter is replaced by the fuller current example
- Missing custom section IDs are generated
- Invalid order entries are removed
- Valid sections missing from `sectionOrder` are appended
- Missing theme values use starter defaults

Do not change the storage key or remove migration behavior without adding a migration path.

## Privacy and storage

- Starter data is server-rendered to avoid hydration mismatches
- The saved resume loads after the client mounts
- Changes are written to browser `localStorage`
- Private browsing or clearing site data can remove the resume
- JSON export is the portable backup
- Shared preview links contain the complete resume in the URL fragment. The data is encoded, not encrypted, so anyone with the link can read it.
- URL fragments are handled by the browser and are not included in the request sent to the web server.
- "Use as a template" creates a new encoded copy containing only the layout and design settings. Names, contact details, links and authored resume content are removed before the editor link is created.

Do not add resume-field analytics, network submission, or cloud persistence without updating the page copy, privacy policy, and this guide.

## Responsive behavior

- Wide desktop: flexible editor left, fitted A4 preview right
- Narrow desktop: field grids reduce from four columns to two
- Mobile: editor and preview stack
- Social rows use container queries so label, URL, and delete controls reflow with editor width
- JSON wraps without page-level horizontal scrolling

## Agent change checklist

1. Preserve local-only operation unless the product scope changes.
2. Keep Header and Profile above reorderable sections.
3. Update `sectionOrder` when adding or removing a custom section.
4. Preserve optional imported data where practical.
5. Keep preview and print output driven by the same resume object.
6. Test mixed Markdown paragraphs and bullet lists.
7. Test returning users for hydration errors.
8. Confirm starter content exports as one A4 page with the selected margin.
9. Run `npm run build` and `git diff --check`.

## Current constraints

- The product encourages one-page resumes but warns rather than deleting overflow content.
- PDF generation depends on the browser print dialog.
- ATS behavior varies, so compatibility cannot be guaranteed for every hiring system.
- The starter resume uses compact two-column sections to keep its fuller example content on one A4 page.
- Data stays in one browser and origin unless the user exports JSON.
