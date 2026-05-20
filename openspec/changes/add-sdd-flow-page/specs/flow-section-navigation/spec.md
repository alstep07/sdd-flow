## ADDED Requirements

### Requirement: Flow section links to the detailed SDD flow page
The landing page flow section SHALL include a visible button that links to `/sdd-flow`.

#### Scenario: Button appears in flow section
- **WHEN** a user views the "A clearer way to build" section on the landing page
- **THEN** a button for viewing the full SDD flow is visible

#### Scenario: Button navigates to SDD flow page
- **WHEN** a user activates the flow section button
- **THEN** the browser navigates to `/sdd-flow`

### Requirement: Flow section navigation preserves existing section content
Adding the SDD flow page link SHALL NOT remove the existing flow section heading or numbered summary steps.

#### Scenario: Existing summary remains visible
- **WHEN** a user views the landing page flow section
- **THEN** the "A clearer way to build" heading and numbered process summary remain visible

#### Scenario: Button fits responsive layout
- **WHEN** the landing page is viewed at 375px wide
- **THEN** the new button fits without horizontal overflow or overlapping the summary content

### Requirement: Flow section navigation uses existing UI conventions
The flow section button SHALL use the project's existing Button primitive or equivalent styling consistent with other landing page actions.

#### Scenario: Button styling is consistent
- **WHEN** the flow section button renders
- **THEN** it visually matches the existing Depthspec button style system
