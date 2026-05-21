## Context

The current homepage has already adopted the Depth Studio visual language: black background, neon pink accents, bold condensed headings, glass panels, and glow borders. The Services section should evolve within that language instead of introducing a separate component system.

## Decisions

### 1. Preserve content source

Service content remains in `lib/landing-content.ts`. `ServicesSection` maps the existing `services` array and derives card numbers from the array index.

### 2. Use existing visual tokens

The redesign uses existing CSS variables such as `--pink`, `--pink-hot`, `--panel`, `--panel-soft`, `--gray`, `--gradient-border`, and `--shadow-depth-glow`.

### 3. Section-specific CSS

The existing global stylesheet already owns the native reference visual system, so the change extends the existing class-based CSS instead of adding dependencies or moving the section to a different styling approach.

### 4. Responsive depth layout

Desktop keeps the two-column section structure with intro copy on the left and wide horizontal service panels on the right. The panels alternate horizontal offsets to create the stepped "depth layers" composition from the visual reference. Tablet keeps the wide-panel feel with reduced offsets. Mobile stacks cards full width and removes decorative connector lines that could create overlap.

## Risks / Trade-offs

- Decorative depth lines are implemented in CSS pseudo-elements and are hidden on narrow screens to avoid layout fragility.
- Cards remain non-interactive because the current service cards have no links or buttons. Hover styles enhance pointer exploration without changing keyboard navigation semantics.
