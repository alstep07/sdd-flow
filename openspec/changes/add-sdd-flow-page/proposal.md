## Why

The landing page currently summarizes the Depthspec process, but visitors cannot inspect the full Spec-Driven Development flow without leaving the product experience. Adding a dedicated SDD flow page gives prospects a transparent, structured view of how work moves from discovery to deployment.

## What Changes

- Add a new internal page that recreates the structure and content model from `sdd-flow.html` as a Next.js route.
- Present the SDD flow as a vertical sequence of steps with roles, tools, benefits, and approval gates.
- Add a button in the existing "A clearer way to build" section that links users to the new SDD flow page.
- Keep the implementation aligned with the existing dark Depthspec visual system and Tailwind v4 setup.
- Avoid external font or script dependencies from the reference HTML.

## Capabilities

### New Capabilities
- `sdd-flow-page`: Dedicated page that presents the full Spec-Driven Development process using the structure from the provided `sdd-flow.html` reference.
- `flow-section-navigation`: Landing page affordance that links from the "A clearer way to build" section to the SDD flow page.

### Modified Capabilities
<!-- none -->

## Impact

- Adds a new App Router page, likely `app/sdd-flow/page.tsx`.
- Adds one or more reusable components for the detailed flow timeline, role legend, and approval gates.
- Updates `components/sections/FlowSection.tsx` to include a button/link to the new page.
- Uses existing Tailwind v4 tokens and UI primitives where appropriate.
- No database, API, analytics, or new runtime dependency is required.
