## ADDED Requirements

### Requirement: Landing page matches the Depth Studio reference
The root page SHALL reproduce the native reference landing page from `depth_landing/project/index.html` in the Next.js project structure.

#### Scenario: Reference sections render in order
- **WHEN** a user opens `/`
- **THEN** the page displays the Depth Studio header, hero, delivery pillars, services, process, AI CTA panel, final CTA panel, and footer in that order

#### Scenario: Reference copy is preserved
- **WHEN** the landing page renders
- **THEN** the hero headline reads "Think Deeply. Build Faster."
- **AND** the primary CTA reads "Book a strategy call"
- **AND** service and process card copy matches the reference content

#### Scenario: Reference assets are used
- **WHEN** the landing page renders
- **THEN** the Depth Studio logo, octopus hero image, service icons, process icons, energy trail image, and neon portal image load from `public/assets`

### Requirement: The full SDD flow is available as a modal
The process section SHALL include a "View the full flow" control that opens the detailed Spec-Driven Development flow modal.

#### Scenario: Modal opens from process section
- **WHEN** a user clicks "View the full flow"
- **THEN** a modal dialog titled "Spec-Driven Development Flow" appears

#### Scenario: Modal steps expand and collapse
- **WHEN** a user clicks a flow step header
- **THEN** that step toggles its tools, benefits, and approval gate details where present

#### Scenario: Modal can be dismissed
- **WHEN** the modal is open
- **THEN** clicking the close button, clicking the backdrop, or pressing Escape closes the modal

### Requirement: Implementation follows the existing project structure
The reference landing SHALL be implemented using Next.js components rather than serving the static HTML file directly.

#### Scenario: Components are organized by section
- **WHEN** a developer inspects the implementation
- **THEN** page sections live under `components/sections`
- **AND** shared content used by multiple sections lives under `lib`
