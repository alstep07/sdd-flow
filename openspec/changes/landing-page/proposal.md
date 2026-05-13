## Why

Depthspec needs a public-facing landing page to attract clients who want transparent, spec-driven software delivery. Without a site, there is no way to communicate the service offering, build trust, or convert interested parties into booked calls.

## What Changes

- Add a full landing page at the site root (`/`) with six sections: Hero, Problem, How It Works, Why Depthspec, CTA, and Footer
- Introduce reusable UI primitives (Button, Badge) consumed across sections
- Wire up a "Book a call" CTA that links to a placeholder booking URL (configurable via env var)
- Set up global layout, fonts, and base Tailwind theme (dark mode, brand palette)

## Capabilities

### New Capabilities

- `hero-section`: Headline, subheadline, and primary CTA button that anchors the page and drives bookings
- `problem-section`: Concise copy block articulating what is broken with traditional dev agencies
- `flow-section`: Step-by-step visual showing the Depthspec SDD process from the client's perspective (no technical terms)
- `value-proposition-section`: Three-column or card layout highlighting speed, control, and AI-assisted delivery
- `cta-section`: Closing call-to-action with booking link and secondary contact option
- `site-footer`: Minimal footer with brand name, tagline, and optional nav links
- `ui-primitives`: Button and Badge components used across all sections

### Modified Capabilities

<!-- none — this is the first version of the site -->

## Impact

- Creates `app/page.tsx`, `app/layout.tsx`, `app/globals.css`
- Creates `components/sections/` for each landing section
- Creates `components/ui/` for Button and Badge
- Creates `components/shared/` for Header and Footer
- No external dependencies beyond Next.js + Tailwind (already in stack)
- Adds `NEXT_PUBLIC_BOOKING_URL` env var (documented in CLAUDE.md, not committed)
