## ADDED Requirements

### Requirement: CTA section provides a closing call to action
The CTA section SHALL appear near the bottom of the page, above the footer. It SHALL contain a short headline, a supporting sentence, and a "Book a call" button linking to `NEXT_PUBLIC_BOOKING_URL` (falling back to `#` if unset).

#### Scenario: CTA section renders all elements
- **WHEN** a user scrolls to the CTA section
- **THEN** a headline, supporting sentence, and "Book a call" button are all visible

#### Scenario: Booking URL is wired correctly
- **WHEN** `NEXT_PUBLIC_BOOKING_URL` is set
- **THEN** the button `href` resolves to that URL

#### Scenario: Fallback when URL is unset
- **WHEN** `NEXT_PUBLIC_BOOKING_URL` is undefined
- **THEN** the button renders with `href="#"` and no runtime error occurs

### Requirement: CTA section is visually distinct from surrounding sections
The CTA section SHALL use a contrasting background or border to visually separate it from the value proposition section above and the footer below.

#### Scenario: Visual separation is present
- **WHEN** a user views the bottom of the page
- **THEN** the CTA section is visually distinguishable from adjacent sections

### Requirement: CTA section is a server component
The `CTASection` component SHALL render as a React Server Component with no `use client` directive.

#### Scenario: No client JS for CTA section
- **WHEN** the page is statically rendered
- **THEN** `CTASection` contributes no client-side JavaScript bundle
