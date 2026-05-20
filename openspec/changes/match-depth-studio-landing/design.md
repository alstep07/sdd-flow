## Context

The source of truth is the static reference landing page in `depth_landing/project`. The target implementation is a Next.js 15 App Router project that already follows a section-based component structure and OpenSpec change workflow.

## Decisions

### 1. Reference parity over redesign

The implementation ports the reference DOM structure, section ordering, copy, image choices, card treatments, CTA text, and modal flow content. The existing Depthspec copy and abstract signal artwork are not reused on the homepage because they do not match the approved reference.

### 2. Keep section-level React structure

The page remains composed from named components:

- `SiteHeader`
- `HeroSection`
- `PillarsSection`
- `ServicesSection`
- `ProcessSection`
- `AiCtaSection`
- `FinalCtaSection`
- `SiteFooter`
- `FlowModal`

Static sections stay server-rendered. `FlowModal` is the only client component because it owns modal open/close state, body scroll locking, Escape handling, and accordion expansion.

### 3. Preserve native CSS for visual parity

The reference stylesheet is carried into `app/globals.css` so spacing, breakpoints, gradients, borders, hover effects, and modal styles match the provided native HTML page. Tailwind remains imported for existing project compatibility.

### 4. Assets use Next public paths

Reference `./public/assets/*` paths are converted to `/assets/*`, with the files copied into `sdd-flow/public/assets`.

## Risks / Trade-offs

- The implementation uses reference CSS classes instead of rewriting everything into Tailwind utilities. This is intentional to preserve the exact approved visual result.
- The flow modal uses `dangerouslySetInnerHTML` only for trusted local strings that contain `<strong>` tags from the reference content.
