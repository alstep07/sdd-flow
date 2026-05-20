Read public/reference/index.html and public/reference/styles.css — this is the full design reference for the landing page.
Focus on the hero section only.
Implement it following openspec/changes/landing-page/specs/hero-section/

## 1. Reference Extraction

- [x] 1.1 Read `/Users/oleksandr/DEPTH STUDIO/Depth Identity/depth_landing/docs/sdd-flow.html` and extract the role legend, ownership blocks, steps, tools, benefits, and gate copy into implementation-ready data
- [x] 1.2 Define local TypeScript types for flow roles, steps, optional tools/benefits, and optional gate metadata

## 2. SDD Flow Page

- [x] 2.1 Create `app/sdd-flow/page.tsx` for the `/sdd-flow` route with page metadata and the title "Spec-Driven Development Flow"
- [x] 2.2 Render the page intro, role ownership summaries, and role/gate legend using the existing app layout and dark Depthspec styling
- [x] 2.3 Render the ordered vertical timeline from local typed data, including each step number or identifier, title, and responsible role
- [x] 2.4 Render each step's tools and benefits when present, adapted from the reference structure
- [x] 2.5 Render approval gate cards inline with their guarded steps, including label, who, where, why, and feedback when present
- [x] 2.6 Ensure the SDD flow page uses Tailwind utilities and avoids copied standalone CSS, remote fonts, external scripts, or direct DOM mutation

## 3. Landing Page Link

- [x] 3.1 Update `components/sections/FlowSection.tsx` to include a visible button in the "A clearer way to build" section linking to `/sdd-flow`
- [x] 3.2 Reuse the existing Button primitive or matching local button styling for the new flow-section navigation action
- [x] 3.3 Verify the existing flow heading and numbered summary steps remain visible after adding the button

## 4. Responsive Verification

- [x] 4.1 Verify `/sdd-flow` is readable at 1280px wide with a constrained content width
- [x] 4.2 Verify `/sdd-flow` has no horizontal overflow at 375px wide and timeline details stack vertically
- [x] 4.3 Verify the new landing flow-section button fits at 375px wide without overlapping or clipping content

## 5. Smoke Test

- [x] 5.1 Run a production build to confirm `/` and `/sdd-flow` compile successfully
- [x] 5.2 Smoke-test local navigation from the landing page flow section button to `/sdd-flow`
- [x] 5.3 Confirm the SDD flow page renders through the root layout with the existing footer
