## Context

The project is a Next.js App Router site with section components under `components/sections`, shared content/configuration under `lib`, and a CSS-first Tailwind v4/global stylesheet. Existing landing CTAs use native anchors and existing `.button` classes.

## Decisions

### 1. Route name

Use `/contact` because it is short, conventional, and fits the current App Router route naming style used by `/sdd-flow`.

### 2. Tally configuration

Store `CONTACT_PAGE_HREF`, `TALLY_FORM_URL`, and `TALLY_EMBED_URL` in `lib/contact.ts` so landing CTAs and the contact page do not duplicate external URLs.

### 3. Embed approach

Use Tally's iframe embed URL with the form ID `EkZpZl`, `hideTitle=1`, `transparentBackground=1`, and `dynamicHeight=1`. The page provides the title and surrounding context, while the iframe is wrapped in an existing-style glass panel with responsive width and a fixed minimum height fallback.

### 4. CTA behavior

Landing CTAs navigate to `/contact`. The rocket tradeoff CTA remains locked until all three options are selected, then becomes a link to `/contact`. The previous modal path is superseded by the dedicated contact page.

## Risks / Trade-offs

- Dynamic iframe height depends on Tally embed behavior; the wrapper provides a generous minimum height so the form remains usable if dynamic resizing is limited.
- The form is an external iframe, so inner form styling is controlled by Tally. The surrounding page and transparent background parameters provide visual integration.
