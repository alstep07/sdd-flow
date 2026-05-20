## ADDED Requirements

### Requirement: Contact page presents a discovery flow
The site SHALL provide a dedicated contact/discovery page at `/contact`.

#### Scenario: Contact page renders discovery copy
- **WHEN** a user opens `/contact`
- **THEN** the page displays the heading "Let’s discuss your project"
- **AND** the page explains that the user should describe their product, technical challenge, or idea
- **AND** the page explains that the next step is usually a short discovery call

### Requirement: Contact page embeds the Tally form
The contact page SHALL embed the Tally form identified by form ID `EkZpZl`.

#### Scenario: Tally form is visible inline
- **WHEN** a user opens `/contact`
- **THEN** the page displays an iframe using the Tally embed URL for form ID `EkZpZl`
- **AND** the embed hides the Tally title because the page provides its own heading
- **AND** the embed uses a transparent background parameter so it visually integrates with the landing page

### Requirement: Contact page provides a fallback link
The contact page SHALL include a fallback link to the original Tally share URL.

#### Scenario: Fallback link opens externally
- **WHEN** a user activates "Having trouble with the form? Open it in a new tab."
- **THEN** the link opens `https://tally.so/r/EkZpZl` in a new browser tab

### Requirement: Contact page is responsive
The contact page SHALL remain usable on desktop, tablet, and mobile viewports.

#### Scenario: Mobile layout does not overflow
- **WHEN** the page is viewed at 375px wide
- **THEN** the heading, explanatory text, embedded form, and fallback link stack vertically
- **AND** no content overflows horizontally

## MODIFIED Requirements

### Requirement: Landing CTAs route to the contact page
Primary landing page CTAs that start a contact, discovery, sales, or strategy-call flow SHALL navigate to `/contact`.

#### Scenario: Hero CTA navigates to contact
- **WHEN** a user activates the primary hero CTA
- **THEN** the browser navigates to `/contact`

#### Scenario: Final CTA navigates to contact
- **WHEN** a user activates the closing CTA
- **THEN** the browser navigates to `/contact`

#### Scenario: Rocket tradeoff CTA navigates to contact after unlock
- **GIVEN** all three rocket tradeoff options are selected
- **WHEN** the user activates the unlocked CTA
- **THEN** the browser navigates to `/contact`
