## ADDED Requirements

### Requirement: Hero section renders above the fold
The hero section SHALL be the first visible content on the landing page, appearing before any scroll. It SHALL contain a headline, a subheadline, and a primary CTA button.

#### Scenario: Hero renders with all three elements
- **WHEN** a user loads the landing page
- **THEN** a headline, subheadline, and "Discuss Your Project" button are all visible without scrolling on a 1280px by 800px viewport

#### Scenario: Hero renders on mobile
- **WHEN** a user loads the landing page on a 375px-wide viewport
- **THEN** all three elements are visible and not clipped or overflowing horizontally

### Requirement: Primary CTA navigates to contact page
The hero CTA button SHALL link to `/contact`.

#### Scenario: Contact route is configured
- **WHEN** the hero CTA renders
- **THEN** the CTA button `href` resolves to `/contact`

### Requirement: Hero section is a server component
The `HeroSection` component SHALL render as a React Server Component with no `use client` directive.

#### Scenario: No client JS for hero
- **WHEN** the page is statically rendered
- **THEN** `HeroSection` contributes no client-side JavaScript bundle
