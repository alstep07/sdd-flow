## ADDED Requirements

### Requirement: Value proposition section highlights three differentiators
The value proposition section SHALL present exactly three differentiators: speed, control, and AI-assisted delivery. Each SHALL have a short title, an icon or visual indicator, and a 1–2 sentence description.

#### Scenario: All three differentiators are displayed
- **WHEN** a user scrolls to the value proposition section
- **THEN** three cards or columns labeled (or equivalent to) "Speed", "Control", and "AI-assisted" are visible

#### Scenario: Layout adapts to mobile
- **WHEN** the viewport is 375px wide
- **THEN** the three items stack vertically with no horizontal overflow

### Requirement: Value proposition section has a section heading
The section SHALL have a heading (e.g., "Why Depthspec") above the differentiator cards.

#### Scenario: Heading is present
- **WHEN** a user scrolls to the value proposition section
- **THEN** a heading identifying the section is visible above the cards

### Requirement: Value proposition section is a server component
The `ValuePropositionSection` component SHALL render as a React Server Component with no `use client` directive.

#### Scenario: No client JS for value proposition section
- **WHEN** the page is statically rendered
- **THEN** `ValuePropositionSection` contributes no client-side JavaScript bundle
