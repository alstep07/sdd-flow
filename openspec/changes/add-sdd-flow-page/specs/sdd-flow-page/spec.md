## ADDED Requirements

### Requirement: SDD flow page is available as a dedicated route
The application SHALL provide a dedicated SDD flow page at `/sdd-flow`.

#### Scenario: User opens the SDD flow page
- **WHEN** a user navigates to `/sdd-flow`
- **THEN** the page renders successfully with the title "Spec-Driven Development Flow"

#### Scenario: Page uses the root layout
- **WHEN** the SDD flow page renders
- **THEN** it uses the application's existing layout and footer

### Requirement: SDD flow page presents role context
The SDD flow page SHALL explain the primary roles involved in the process and provide a legend for role colors or indicators.

#### Scenario: Role ownership is visible
- **WHEN** a user views the top of the SDD flow page
- **THEN** role ownership summaries for BA/QA, Dev, Customer, and CI/automation are visible or represented in the legend

#### Scenario: Gate role is identified
- **WHEN** a user views the role legend
- **THEN** approval gates are visually identified as a distinct type of process item

### Requirement: SDD flow page renders the full process timeline
The SDD flow page SHALL render the SDD process as an ordered vertical timeline based on the structure from the provided `sdd-flow.html` reference.

#### Scenario: Steps are shown in sequence
- **WHEN** a user views the SDD flow page
- **THEN** the timeline shows the process steps in order from discovery through deployment

#### Scenario: Each step includes role and title
- **WHEN** a timeline step is displayed
- **THEN** it includes a step number or identifier, a title, and the responsible role

#### Scenario: Step details include tools and benefits
- **WHEN** a step has supporting detail in the reference flow
- **THEN** the page displays tools and benefits for that step

### Requirement: Approval gates are represented inline
The SDD flow page SHALL show approval gates inline with the steps they guard.

#### Scenario: Gate information is visible
- **WHEN** a step has an approval gate
- **THEN** the gate shows its label, who approves, where approval happens, and why the gate exists

#### Scenario: Feedback loops are visible
- **WHEN** a gate includes feedback behavior
- **THEN** the feedback behavior is displayed near the gate

### Requirement: SDD flow page is responsive and readable
The SDD flow page SHALL remain readable on desktop and mobile viewports without horizontal scrolling.

#### Scenario: Mobile layout stacks details
- **WHEN** the viewport is 375px wide
- **THEN** timeline content, role blocks, tool lists, and benefit lists stack vertically without clipping or horizontal overflow

#### Scenario: Desktop layout uses readable width
- **WHEN** the viewport is 1280px wide
- **THEN** the timeline is constrained to a readable content width and does not stretch edge-to-edge

### Requirement: SDD flow page avoids unnecessary runtime dependencies
The SDD flow page SHALL not require external fonts, external scripts, database access, or network requests to render core content.

#### Scenario: Static rendering
- **WHEN** the page is built
- **THEN** the SDD flow content is available from local code or static data

#### Scenario: No copied document script
- **WHEN** the implementation is reviewed
- **THEN** it does not rely on direct DOM mutation from the reference `sdd-flow.html` script
