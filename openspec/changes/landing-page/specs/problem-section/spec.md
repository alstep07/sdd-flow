## ADDED Requirements

### Requirement: Problem section communicates pain points of traditional agencies
The problem section SHALL present 3–5 concise pain points that resonate with potential clients who have had negative experiences with traditional software agencies. Copy SHALL be in plain language with no technical jargon.

#### Scenario: Pain points are displayed
- **WHEN** a user scrolls to the problem section
- **THEN** at least three distinct pain points are visible, each as a short statement or heading with optional supporting copy

#### Scenario: Section has a clear heading
- **WHEN** a user scrolls to the problem section
- **THEN** a section heading (e.g., "Why most dev shops fail you") is visible above the pain points

### Requirement: Problem section is a server component
The `ProblemSection` component SHALL render as a React Server Component with no `use client` directive.

#### Scenario: No client JS for problem section
- **WHEN** the page is statically rendered
- **THEN** `ProblemSection` contributes no client-side JavaScript bundle
