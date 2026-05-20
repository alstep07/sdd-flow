## ADDED Requirements

### Requirement: CTA section provides a closing call to action
The CTA section SHALL appear near the bottom of the page, above the footer. It SHALL contain a short headline, a supporting sentence, and a "Discuss Your Project" button linking to `/contact`.

#### Scenario: CTA section renders all elements
- **WHEN** a user scrolls to the CTA section
- **THEN** a headline, supporting sentence, and "Discuss Your Project" button are all visible

#### Scenario: Contact route is wired correctly
- **WHEN** the CTA section renders
- **THEN** the button `href` resolves to `/contact`

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
