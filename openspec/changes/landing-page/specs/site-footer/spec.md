## ADDED Requirements

### Requirement: Footer displays brand name and copyright
The footer SHALL render the brand name "Depthspec" and a copyright line with the current year. It SHALL appear at the bottom of every page that uses the root layout.

#### Scenario: Footer is present on the landing page
- **WHEN** a user scrolls to the bottom of the landing page
- **THEN** "Depthspec" and a copyright line are visible

#### Scenario: Copyright year is correct
- **WHEN** the footer renders
- **THEN** the copyright year matches the current calendar year

### Requirement: Footer is minimal — no nav links required at launch
The footer SHALL NOT include navigation links in the initial implementation. A tagline is optional.

#### Scenario: No nav links in footer
- **WHEN** the footer renders
- **THEN** no anchor tags other than optional social links are present

### Requirement: Footer is a server component
The `SiteFooter` component SHALL render as a React Server Component with no `use client` directive.

#### Scenario: No client JS for footer
- **WHEN** the page is statically rendered
- **THEN** `SiteFooter` contributes no client-side JavaScript bundle
