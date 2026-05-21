## ADDED Requirements

### Requirement: Services section uses a premium depth layout
The homepage Services section SHALL present the existing service cards in a premium dark, neon pink, glassmorphism layout inspired by the current brand direction.

#### Scenario: Existing Services content is preserved
- **WHEN** the Services section renders
- **THEN** the section label remains "Services"
- **AND** the heading remains "Digital products built with depth"
- **AND** the service card titles and descriptions match the current `services` content
- **AND** the number of rendered service cards matches the current `services` list

#### Scenario: Services cards are dynamically numbered
- **WHEN** the Services section renders
- **THEN** each service card displays a two-digit number based on its order in the `services` list

#### Scenario: Desktop layout shows depth layers
- **WHEN** the viewport is desktop width
- **THEN** the section keeps intro content on the left
- **AND** the service cards appear on the right as wide horizontal panels in a staggered layered composition rather than a flat grid
- **AND** cards use dark translucent surfaces, neon pink border/glow treatment, and subtle depth connectors

#### Scenario: Mobile layout remains readable
- **WHEN** the viewport is 375px wide
- **THEN** the Services intro and cards stack vertically
- **AND** each service card is full width with no overlap or horizontal overflow

#### Scenario: Accessibility is preserved
- **WHEN** a user navigates the page with keyboard or assistive technology
- **THEN** the Services section keeps semantic section, heading, and article structure
- **AND** decorative icons remain hidden from assistive technology
