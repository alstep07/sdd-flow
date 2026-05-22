## Why

The Services section currently presents the real Depth Studio offering in a flat card grid. The landing page now needs this section to better match the newer premium dark/neon visual direction while keeping the existing website content as the source of truth.

## What Changes

- Redesign the Services section presentation into a dark, glassmorphism "depth layers" layout.
- Keep the existing section label, heading, service titles, descriptions, icons, and card count.
- Add dynamic service numbering based on the existing services list order.
- Add subtle pink glow, depth lines, staggered card placement, and smooth hover treatment using existing brand color tokens.
- Add accessible service detail modals opened from each service card, with structured modal content and service-specific contact CTAs.
- Add the provided reference-style tentacle close interaction using lightweight SVG/CSS: tentacles preview on close hover and tighten while the modal pulls downward on close.
- Preserve responsive behavior and semantic HTML without adding dependencies.

## Impact

- Updates `components/sections/ServicesSection.tsx`.
- Updates `lib/landing-content.ts` with structured service modal detail data.
- Updates `app/globals.css` for Services-only layout and card styling.
- Does not change the existing on-page service card titles or descriptions.
