## Context

Depthspec has no public site. This design covers the implementation of a static marketing landing page using the existing Next.js 15 + Tailwind CSS v4 stack. There are no existing pages, components, or routing to migrate. The stack is already chosen; this design covers decisions within those constraints.

## Goals / Non-Goals

**Goals:**
- Ship a dark-mode, mobile-first landing page at `/` with six sections
- Establish the component architecture and file conventions for all future UI work
- Keep the page fully statically rendered aside from explicitly interactive sections
- Route discovery CTAs to the internal contact page

**Non-Goals:**
- Chat widget, analytics, or backend form handling
- CMS or dynamic content - copy is hardcoded for now
- Animations beyond existing transitions
- i18n / multi-language support

## Decisions

### 1. Server components by default

All section components will be React Server Components. `use client` is added only to interactive elements. This aligns with the project convention and avoids unnecessary JS hydration on a mostly static page.

### 2. Section-per-file component structure

Each landing section gets its own file under `components/sections/`. Sections are composed in `app/page.tsx`. This keeps each section independently editable without touching the page file.

### 3. UI primitives: Button and Badge only

Only two primitives are introduced (`Button`, `Badge`). Both are simple wrappers with variant props (e.g., `variant="primary" | "outline"`). No primitive is added unless at least two sections need it.

### 4. Discovery CTA via `/contact`

Landing CTAs link to the internal `/contact` route. The contact page owns the external Tally form URL so landing sections do not duplicate provider configuration.

### 5. Tailwind v4 config - no `tailwind.config.ts`

Tailwind v4 uses CSS-first configuration. Brand tokens (colors, fonts) are declared in `app/globals.css` using `@theme`. No `tailwind.config.ts` file.

## Risks / Trade-offs

- **Copy is hardcoded** - Makes A/B testing copy changes require a deploy. Acceptable for an MVP; CMS can be added later.
- **External form provider availability** - The landing CTA still routes internally, and the contact page includes a fallback link to the original Tally form.
- **No analytics** - Cannot measure CTA conversion at launch. Analytics can be added later without changing the route flow.

## Migration Plan

1. Implement in order: globals + layout, UI primitives, sections, then compose in `page.tsx`
2. No rollback complexity - this is a net-new page with no prior state
3. Verify `/contact` and the Tally fallback link before go-live

## Open Questions

- Exact copy for each section - engineering can use placeholder copy; final copy to be dropped in before launch
