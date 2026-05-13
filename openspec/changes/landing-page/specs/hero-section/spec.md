## ADDED Requirements

### Requirement: Hero section renders above the fold
The hero section SHALL be the first visible content on the landing page, appearing before any scroll. It SHALL contain a headline, a subheadline, and a primary CTA button.

#### Scenario: Hero renders with all three elements
- **WHEN** a user loads the landing page
- **THEN** a headline, subheadline, and "Book a call" button are all visible without scrolling on a 1280×800 viewport

#### Scenario: Hero renders on mobile
- **WHEN** a user loads the landing page on a 375px-wide viewport
- **THEN** all three elements are visible and not clipped or overflowing horizontally

### Requirement: Primary CTA navigates to booking URL
The hero CTA button SHALL link to `NEXT_PUBLIC_BOOKING_URL`. If the env var is not set, the button SHALL link to `#` and SHALL NOT throw a runtime error.

#### Scenario: Booking URL is configured
- **WHEN** `NEXT_PUBLIC_BOOKING_URL` is set to a valid URL
- **THEN** the CTA button `href` resolves to that URL

#### Scenario: Booking URL is not set
- **WHEN** `NEXT_PUBLIC_BOOKING_URL` is undefined
- **THEN** the CTA button renders with `href="#"` and the page loads without error

### Requirement: Hero section is a server component
The `HeroSection` component SHALL render as a React Server Component with no `use client` directive.

#### Scenario: No client JS for hero
- **WHEN** the page is statically rendered
- **THEN** `HeroSection` contributes no client-side JavaScript bundle
