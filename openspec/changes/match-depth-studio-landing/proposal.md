## Why

The current Next.js landing page in `sdd-flow` does not match the approved native HTML reference in `depth_landing/project`. The public site needs to present the Depth Studio brand, copy, visual assets, metrics, service cards, process cards, AI CTA panels, footer, and interactive full-flow modal exactly as the provided reference.

## What Changes

- Replace the existing Depthspec-first landing page with the Depth Studio landing page from `depth_landing/project/index.html`.
- Preserve the project structure by implementing the page as React components under `components/sections`, shared content under `lib`, and page composition in `app/page.tsx`.
- Move the reference image and SVG assets into `public/assets`.
- Add the modal SDD flow interaction as a focused client component while keeping the static sections server-rendered.
- Update metadata to use the Depth Studio title and description.

## Impact

- Updates `app/page.tsx`, `app/layout.tsx`, and `app/globals.css`.
- Adds `components/sections/SiteHeader.tsx`, `PillarsSection.tsx`, `ServicesSection.tsx`, `ProcessSection.tsx`, and `FlowModal.tsx`.
- Replaces the existing hero, CTA, and footer content with the Depth Studio reference content.
- Adds Depth Studio image/icon assets under `public/assets`.
