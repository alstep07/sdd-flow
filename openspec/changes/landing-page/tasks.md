Read public/reference/index.html and public/reference/styles.css - this is the full design reference for the landing page.
Focus on the hero section only.
Implement it following openspec/changes/landing-page/specs/hero-section/

## 1. Foundation

- [x] 1.1 Configure Tailwind v4 brand tokens (colors, fonts) in `app/globals.css` using `@theme`
- [x] 1.2 Create `app/layout.tsx` with `<html>`, `<body>`, dark mode class, and global font
- [x] 1.3 Verify `app/globals.css` is imported in layout and Tailwind base styles load correctly

## 2. UI Primitives

- [x] 2.1 Create `components/ui/Button.tsx` - server component with `variant` (`primary` | `outline`) and optional `href` prop; renders `<a>` when href is provided, `<button>` otherwise
- [x] 2.2 Create `components/ui/Badge.tsx` - server component that renders inline pill with `children`

## 3. Hero Section

- [x] 3.1 Create `components/sections/HeroSection.tsx` - server component with headline, subheadline, and contact CTA
- [x] 3.2 Verify hero is visible above the fold at 1280px by 800px and 375px viewports

## 4. Problem Section

- [x] 4.1 Create `components/sections/ProblemSection.tsx` - server component with section heading and 3-5 pain point items in plain language

## 5. Flow Section

- [x] 5.1 Create `components/sections/FlowSection.tsx` - server component with "How it works" heading and 3-5 numbered steps, each with a short title and one-sentence description; no technical jargon

## 6. Value Proposition Section

- [x] 6.1 Create `components/sections/ValuePropositionSection.tsx` - server component with "Why Depthspec" heading and three cards (Speed, Control, AI-assisted), each with icon/indicator and 1-2 sentence description
- [x] 6.2 Verify three-card layout stacks vertically on 375px viewport

## 7. CTA Section

- [x] 7.1 Create `components/sections/CTASection.tsx` - server component with closing headline, supporting sentence, and contact CTA; visually distinct background from adjacent sections
- [x] 7.2 Verify button href resolves to `/contact`

## 8. Footer

- [x] 8.1 Create `components/shared/SiteFooter.tsx` - server component with brand name "Depthspec" and dynamic copyright year (no nav links)

## 9. Page Composition

- [x] 9.1 Create `app/page.tsx` - compose all sections in order: HeroSection, ProblemSection, FlowSection, ValuePropositionSection, CTASection
- [x] 9.2 Add `SiteFooter` to `app/layout.tsx` so it appears on every page
- [x] 9.3 Smoke-test full page locally: all sections visible, no console errors, CTA button links correctly

## 10. Contact Destination

- [x] 10.1 Configure contact destination through the shared contact module
- [x] 10.2 Confirm discovery CTAs navigate to the contact page
