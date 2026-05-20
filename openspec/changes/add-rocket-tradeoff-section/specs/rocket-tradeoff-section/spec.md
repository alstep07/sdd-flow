## ADDED Requirements

### Requirement: Rocket tradeoff section appears in the homepage flow
The homepage SHALL display a rocket tradeoff section after Services and before Process.

#### Scenario: Section renders in the intended order
- **WHEN** a user scrolls past the Services section
- **THEN** the rocket tradeoff section is visible before the Process section

#### Scenario: Section communicates the core tradeoff
- **WHEN** the section renders
- **THEN** it presents Fast, Affordable, and Reliable as selectable options
- **AND** it explains that Depth Studio is built to deliver all three

### Requirement: Users manually unlock all three values
The rocket tradeoff section SHALL let users toggle Fast, Affordable, and Reliable manually.

#### Scenario: Selecting an option advances the rocket
- **WHEN** a user selects one option
- **THEN** that option appears active
- **AND** the rocket progress increases

#### Scenario: Deselecting an option reverses progress
- **WHEN** a user deselects an active option
- **THEN** that option appears inactive
- **AND** the rocket progress decreases

#### Scenario: Selecting all three unlocks the CTA
- **WHEN** Fast, Affordable, and Reliable are all selected
- **THEN** the rocket reaches launch state
- **AND** the discovery-call CTA becomes available

### Requirement: Unlocked CTA opens contact page
The unlocked discovery-call CTA SHALL navigate to the dedicated contact page.

#### Scenario: Contact page opens from unlocked CTA
- **GIVEN** all three options are selected
- **WHEN** the user activates the discovery-call CTA
- **THEN** the browser navigates to `/contact`

### Requirement: Section remains responsive and accessible
The rocket tradeoff section SHALL be usable on mobile and desktop.

#### Scenario: Controls are keyboard operable
- **WHEN** a keyboard user tabs through the section
- **THEN** each value toggle and the unlocked CTA can be focused and activated

#### Scenario: Reduced motion is respected
- **WHEN** the user has reduced motion enabled
- **THEN** non-essential animations are minimized
