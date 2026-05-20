## Context

The existing landing page is a Next.js App Router site composed from section components. Most sections are server-rendered, with interactive behavior isolated in client components such as `FlowModal`.

## Decisions

### 1. Manual interaction over scroll automation

The section uses manual toggles as the primary interaction. The user should actively choose Fast, Affordable, and Reliable, because the value proposition depends on breaking the familiar "pick two" constraint.

### 2. Place the section between Services and Process

The user first sees what Depth Studio offers, then interacts with the tradeoff promise, then sees the process that explains how the promise is delivered.

### 3. Use a scoped client component

The component owns toggle state, rocket progress, reduced-motion-friendly confetti, and contact modal state. Static homepage sections remain server-rendered.

### 4. Preserve the landing visual language

The design reuses the existing dark background, hot pink accents, gradient borders, button style, League Spartan display type, and `/assets/rocket.svg` asset rather than embedding the standalone widget's page-level CSS.

## Risks / Trade-offs

- The section adds client-side JavaScript to the homepage. This is limited to one focused component.
- Contact handling is currently mailto-based because the project does not yet define a booking provider or backend form endpoint.
