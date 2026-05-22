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

### Requirement: Services cards open accessible detail modals
Each Services card SHALL be clickable and keyboard-operable, opening a service-specific modal with richer structured service information while preserving the existing card title and description copy on the page.

#### Scenario: Service card opens matching modal content
- **WHEN** a user activates a service card by click, Enter, or Space
- **THEN** a centered modal opens for that service
- **AND** the modal displays the matching intro, Best for list, What we do list, Outcome, and CTA content from structured service detail data
- **AND** the underlying service card title and description remain unchanged

#### Scenario: Modal CTA routes to contact with service context
- **WHEN** a user activates the CTA in a service modal
- **THEN** the browser navigates to `/contact` with the matching `service` query parameter

#### Scenario: Modal can be dismissed accessibly
- **WHEN** a service modal is open
- **THEN** the user can close it with the close button
- **AND** the user can close it with the Escape key
- **AND** the user can close it by clicking the backdrop
- **AND** focus moves into the modal on open
- **AND** Tab navigation remains within the modal while it is open
- **AND** focus returns to the triggering service card after close

#### Scenario: Modal remains responsive
- **WHEN** the viewport is desktop width
- **THEN** the modal is centered over a darkened page overlay
- **AND** it uses the current dark, neon pink, glassmorphism visual language
- **AND** the overlay occupies the full viewport without creating page-level scrollbars
- **AND** the modal shell never exceeds the viewport width or safe viewport height
- **AND** decorative modal layers do not increase layout dimensions or create overflow
- **WHEN** the viewport is mobile width
- **THEN** the modal fits within the viewport without horizontal overflow
- **AND** no horizontal scrollbar is visible
- **AND** overflowing modal content scrolls only inside the modal body, not on the modal frame

### Requirement: Service modal close interaction uses reference-style octopus tentacles
The Services modal SHALL include a polished close-button interaction with visible octopus tentacles based on the provided HTML demo, without adding heavy animation dependencies.

#### Scenario: Close hover previews reference-style tentacles
- **WHEN** a user hovers or focuses the modal close button
- **THEN** a subtle neon pink outline strengthens around the modal
- **AND** illustrated pink octopus tentacles appear around the modal contour
- **AND** each tentacle has a filled body, darker side shape, highlight stroke, and obvious suction cups
- **AND** the tentacles move into position from the modal edges like they are wrapping or grabbing the panel
- **AND** text stays readable and unobstructed
- **AND** the tentacle layer remains decorative, pointer-transparent, and hidden from assistive technology

#### Scenario: Close click pulls modal into depth
- **WHEN** a user clicks the modal close button
- **THEN** the tentacles tighten toward the panel
- **AND** the modal slightly compresses
- **AND** the modal moves downward with blur and fade before closing

#### Scenario: Reduced motion keeps modal usable
- **WHEN** a user prefers reduced motion
- **THEN** the service modal remains fully usable
- **AND** tentacle and pull-down animations are disabled or simplified
