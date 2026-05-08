## Context

Depthspec has no public site. This design covers the implementation of a static marketing landing page using the existing Next.js 15 + Tailwind CSS v4 stack. There are no existing pages, components, or routing to migrate. The stack is already chosen; this design covers decisions within those constraints.

## Goals / Non-Goals

**Goals:**
- Ship a dark-mode, mobile-first landing page at `/` with six sections
- Establish the component architecture and file conventions for all future UI work
- Keep the page fully statically rendered (no client-side data fetching)
- Make the booking URL configurable without a rebuild

**Non-Goals:**
- Chat widget, analytics, or booking integration (deferred per CLAUDE.md)
- CMS or dynamic content — copy is hardcoded for now
- Animations beyond Tailwind transitions
- i18n / multi-language support

## Decisions

### 1. Server components by default

All section components will be React Server Components. `use client` is added only to interactive elements (if any arise). This aligns with CLAUDE.md and avoids unnecessary JS hydration on a mostly static page.

*Alternatives considered:* Making everything client components for simplicity — rejected because it ships unnecessary JS and contradicts the project's stated convention.

### 2. Section-per-file component structure

Each landing section gets its own file under `components/sections/`. Sections are composed in `app/page.tsx`. This keeps each section independently editable without touching the page file.

*Alternatives considered:* One monolithic `LandingPage` component — rejected because it's harder to maintain and conflicts with the one-component-per-file convention.

### 3. UI primitives: Button and Badge only

Only two primitives are introduced (`Button`, `Badge`). Both are simple wrappers with variant props (e.g., `variant="primary" | "outline"`). No primitive is added unless at least two sections need it.

*Alternatives considered:* Full component library (shadcn etc.) — rejected per CLAUDE.md ADR requirement.

### 4. Booking URL via `NEXT_PUBLIC_BOOKING_URL` env var

The CTA links to `process.env.NEXT_PUBLIC_BOOKING_URL`. Defaults to `#` if not set, so the page renders safely in dev without a real booking provider chosen yet.

*Alternatives considered:* Hardcoding a placeholder URL — rejected because it creates a find-and-replace chore when the real URL is decided.

### 5. Tailwind v4 config — no `tailwind.config.ts`

Tailwind v4 uses CSS-first configuration. Brand tokens (colors, fonts) are declared in `app/globals.css` using `@theme`. No `tailwind.config.ts` file.

## Risks / Trade-offs

- **Copy is hardcoded** → Makes A/B testing copy changes require a deploy. Acceptable for an MVP; CMS can be added later.
- **`NEXT_PUBLIC_BOOKING_URL` not set in production until a booking tool is chosen** → CTA falls back to `#`, which is a dead link. Mitigation: add a console warning in dev if the var is unset.
- **No analytics** → Cannot measure CTA conversion at launch. Mitigation: analytics deferred but the env var slot is already reserved.

## Migration Plan

1. Implement in order: globals + layout → UI primitives → sections (Hero first) → compose in `page.tsx`
2. No rollback complexity — this is a net-new page with no prior state
3. Set `NEXT_PUBLIC_BOOKING_URL` in Vercel environment settings before go-live

## Open Questions

- Which booking provider? (Cal.com vs Calendly vs other) — blocked on business decision, not on this implementation
- Exact copy for each section — engineering can use placeholder copy; final copy to be dropped in before launch
