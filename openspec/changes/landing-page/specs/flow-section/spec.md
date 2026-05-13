## ADDED Requirements

### Requirement: Flow section shows the Depthspec process in client-friendly steps
The flow section SHALL present the Depthspec SDD process as 3–5 numbered steps visible to a non-technical audience. Each step SHALL have a short title and a one-sentence description. Technical terms (spec, schema, CI/CD, etc.) SHALL NOT appear in the copy.

#### Scenario: Steps are displayed in order
- **WHEN** a user scrolls to the flow section
- **THEN** steps are presented in numbered sequence from 1 to N with no gaps

#### Scenario: Steps are readable on mobile
- **WHEN** the viewport is 375px wide
- **THEN** each step is readable without horizontal scrolling and text is not truncated

### Requirement: Flow section has a section heading
The section SHALL have a heading (e.g., "How it works") visible above the steps.

#### Scenario: Heading is present
- **WHEN** a user scrolls to the flow section
- **THEN** a heading identifying the section is visible above step 1

### Requirement: Flow section is a server component
The `FlowSection` component SHALL render as a React Server Component with no `use client` directive.

#### Scenario: No client JS for flow section
- **WHEN** the page is statically rendered
- **THEN** `FlowSection` contributes no client-side JavaScript bundle
