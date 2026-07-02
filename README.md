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

## Checks

```bash
npm run typecheck
npm run check:content
npm run build
npm run check:links
npm run check:mailto
```

`npm audit --audit-level=high` runs as an informational CI job. The current audit findings are accepted for this static export because they affect build-time/dev tooling rather than deployed runtime code:

- `next` / bundled `postcss`: used to generate static HTML in CI; no Next server, image optimizer, middleware, rewrites, or RSC endpoint is deployed on GitHub Pages.
- `next-mdx-remote`: MDX input is trusted repository content under `content/`, not user-submitted runtime content.
- `eslint-config-next` / `@next/eslint-plugin-next` / `glob`: lint/build tooling only.
- `gray-matter` transitive `js-yaml`: parses trusted markdown frontmatter during build.

## Content

Markdown is the source of truth under `content/`.

- `content/sample-report.md` powers `/sample`
- `content/methodology.md` powers `/methodology`
- `content/report-template.md` is kept as reusable source material
- `content/case-study-sample.md` powers the anonymized sample case-study state

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

The contact form posts directly to FormSubmit, so it works from the static GitHub Pages export without a backend. Override the POST endpoint with:

```bash
NEXT_PUBLIC_CONTACT_FORM_ACTION=https://formsubmit.co/your-form-or-email
```

The visible fallback email link uses `NEXT_PUBLIC_CONTACT_EMAIL` and defaults to `jose@josedrobles.com`.

## Privacy Analytics

Plausible is loaded only after the visitor enables the anonymous analytics checkbox. No cookies are used. The site sends only conversion goals:

- `Calendly Clicked`
- `Contact Form Submitted`

Override the Plausible configuration with:

```bash
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=example.com
NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC=https://plausible.example.com/js/script.js
```

## GitHub Pages Deploy

The workflow in `.github/workflows/deploy.yml` builds the static export and publishes `out/` to the `gh-pages` branch.

For GitHub Pages, set the Pages source to the `gh-pages` branch after the first successful workflow run.
