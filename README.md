# 72h Technical Due Diligence Flash

Static Next.js site for Jose Robles' 72h Technical Due Diligence Flash service.

Live target:

https://josediegorobles.github.io/technical-due-diligence-demo/

The site is designed to capture leads from founders, VCs, and business angels who need a fast senior technical review before investment, acquisition, rescue, agency handoff, or legacy takeover decisions.

## Stack

- Next.js 14 App Router
- Tailwind CSS
- shadcn/ui-style primitives
- `next-mdx-remote` for markdown rendering
- `@vercel/og` generated social images
- Static export for GitHub Pages

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

The static site is exported to `out/`.

## Content

Markdown is the source of truth under `content/`.

- `content/sample-report.md` powers `/sample`
- `content/methodology.md` powers `/methodology`
- `content/report-template.md` is kept as reusable source material
- `content/case-study-placeholder.md` powers the empty case-study state

Editing those files and rebuilding updates the site.

## Adding A Case Study

Do not invent case studies. Add only approved, publishable material.

Create a markdown file in `content/case-studies/`:

```md
---
title: "Approved case study title"
status: "Published"
excerpt: "Short summary for the listing page."
---

# Approved case study title

Case study body.
```

Then rebuild:

```bash
npm run build
```

The listing at `/case-studies` will pick up the new file on rebuild. The current public shell links case study cards to the booking page until publishable detail pages are approved.

## Booking And Contact

`/book` embeds the real Calendly profile:

https://calendly.com/jd-robles

The fallback contact form opens a mail draft. Override the recipient with:

```bash
NEXT_PUBLIC_CONTACT_EMAIL=you@example.com
```

## GitHub Pages Deploy

The workflow in `.github/workflows/deploy.yml` builds the static export and publishes `out/` to the `gh-pages` branch.

For GitHub Pages, set the Pages source to the `gh-pages` branch after the first successful workflow run.
