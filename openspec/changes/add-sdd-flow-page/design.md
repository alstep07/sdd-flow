## Context

The current landing page includes a simplified "A clearer way to build" process section, while the provided `sdd-flow.html` reference contains a much more detailed SDD flow: header context, role ownership cards, legend chips, a vertical timeline, expandable-looking step cards, tools/benefits branches, and approval gate blocks.

This change adds that detailed flow as a first-party Next.js page in the existing App Router application. The page should inherit the site's dark Depthspec identity and Tailwind v4 tokens rather than copying standalone CSS, remote fonts, or inline scripts from the reference HTML.

## Goals / Non-Goals

**Goals:**
- Add a dedicated SDD flow page reachable from the landing page.
- Preserve the reference page's information architecture: intro, role ownership, legend, ordered flow steps, tools, benefits, and gates.
- Use typed, local data to render the flow so copy and structure are easy to maintain.
- Keep the page responsive, readable on mobile, and consistent with the existing dark/pink Depthspec style.
- Keep the implementation static and server-rendered unless interaction becomes necessary.

**Non-Goals:**
- No new external packages, remote fonts, analytics, or API calls.
- No CMS or dynamic content source.
- No modal implementation; the detailed flow is a standalone page.
- No changes to booking CTA behavior.

## Decisions

### 1. Use `/sdd-flow` as the route

The new page will live at `app/sdd-flow/page.tsx`, giving users a direct, shareable URL for the detailed process.

*Alternatives considered:* Keeping the flow in a modal on the homepage was rejected because the reference structure is long and deserves a focused reading surface.

### 2. Render flow content from typed local data

The steps, roles, tools, benefits, and gates should be represented as typed arrays/objects in the page or a nearby component file. Rendering from data keeps the long process maintainable and avoids duplicating markup for each step.

*Alternatives considered:* Hardcoding each step as bespoke JSX was rejected because the reference has repeated step/gate structure and a data map is clearer.

### 3. Prefer server components; add client code only if expandable cards are required

The page can initially render every step's details visible, preserving all information without hydration. If collapsible behavior is implemented to match the reference more closely, isolate it in a small client component and keep the rest server-rendered.

*Alternatives considered:* Porting the reference JavaScript directly was rejected because the app uses React/Next conventions and should avoid document mutation.

### 4. Link from the existing Flow section with the Button primitive

The "A clearer way to build" section should include a visible button such as "View full SDD flow" linking to `/sdd-flow`. This reuses the existing Button primitive and keeps navigation discoverable at the moment users are already reading the process summary.

*Alternatives considered:* Adding a nav link in the footer or hero was rejected because the requested entry point is specifically the flow section.

### 5. Translate reference styling into Tailwind

Use existing Tailwind v4 tokens and utility classes. The new page may introduce component-local color mappings for role states, but should avoid standalone CSS files, inline style-heavy ports, or one-off global selectors.

*Alternatives considered:* Copying the reference `<style>` block was rejected because the project convention is Tailwind-only.

## Risks / Trade-offs

- **Long page may feel dense on mobile** → Keep a narrow reading width, stack branch content, and use clear spacing between steps.
- **Copy contains tool names and technical process details** → Preserve the reference structure but ensure headings and intro remain understandable for prospects.
- **Client-side collapsible interaction would add JS** → Default to visible details unless the implementation needs collapsible cards for usability.
- **Standalone reference uses a different visual language** → Adapt structure and content, not exact CSS, so the page still feels like Depthspec.

## Migration Plan

1. Create the new route and flow-rendering components.
2. Add the flow-section button linking to `/sdd-flow`.
3. Build and smoke-test `/` and `/sdd-flow` locally.
4. Rollback is simple: remove the new route/components and the homepage link.

## Open Questions

- Should the detailed flow page include a return link back to the landing page hero, or is browser back sufficient?
- Should step details be always visible for transparency, or collapsible to reduce page length?
