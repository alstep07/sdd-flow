## Context

The current homepage has already adopted the Depth Studio visual language: black background, neon pink accents, bold condensed headings, glass panels, and glow borders. The Services section should evolve within that language instead of introducing a separate component system.

## Decisions

### 1. Preserve card content source

Service content remains in `lib/landing-content.ts`. `ServicesSection` maps the existing `services` array and derives card numbers from the array index.

Modal-specific detail copy is stored separately in the structured `serviceModalDetails` array so the visible card copy can remain unchanged while each service gets richer dialog content.

### 2. Use existing visual tokens

The redesign uses existing CSS variables such as `--pink`, `--pink-hot`, `--panel`, `--panel-soft`, `--gray`, `--gradient-border`, and `--shadow-depth-glow`.

### 3. Section-specific CSS

The existing global stylesheet already owns the native reference visual system, so the change extends the existing class-based CSS instead of adding dependencies or moving the section to a different styling approach.

### 4. Responsive depth layout

Desktop keeps the two-column section structure with intro copy on the left and wide horizontal service panels on the right. The panels alternate horizontal offsets to create the stepped "depth layers" composition from the visual reference. Tablet keeps the wide-panel feel with reduced offsets. Mobile stacks cards full width and removes decorative connector lines that could create overlap.

### 5. Accessible modal behavior

Service cards become keyboard-operable dialog triggers. The modal moves focus to the close button on open, traps Tab navigation inside the dialog, closes with Escape and backdrop click, and restores focus to the triggering card after close.

### 6. Premium close enhancement

The close button hover/focus state follows the provided `octopus_tentacle_modal_demo.html` reference: a decorative tentacle layer fades in, and four filled SVG tentacles slide in from the modal edges as if wrapping the panel. Each tentacle uses a filled pink body, darker side shape, highlight stroke, and large suction cups. On close, the tentacles tighten while the modal scales, blurs, fades, and moves downward. Reduced-motion users receive the same usable modal with simplified fade behavior and without complex movement.

### 7. Modal overflow containment

The overlay owns the full viewport and clips overflow so the modal cannot create page-level horizontal overflow. The modal panel is capped to the safe viewport width and height, and the panel itself hides overflow. If content needs vertical scrolling, only the inner modal content body scrolls. Tentacle elements are positioned inside the modal panel and clipped by it, so they do not expand layout bounds.

## Risks / Trade-offs

- Decorative depth lines are implemented in CSS pseudo-elements and are hidden on narrow screens to avoid layout fragility.
- The service cards are now interactive, so the implementation must keep visible focus states and keyboard activation in sync with pointer activation.
- The tentacle layer is decorative, pointer-transparent, clipped by the modal panel, and hidden from assistive technology.
