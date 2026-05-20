## Why

Landing page CTAs currently point to direct contact or modal flows instead of one consistent discovery path. A dedicated contact page lets prospects stay inside the Depth Studio experience while submitting project details through the chosen Tally form.

## What Changes

- Add a dedicated `/contact` page with concise discovery copy and an embedded Tally form.
- Configure the Tally share URL and embed URL in one local module.
- Update primary landing CTAs to navigate to `/contact`.
- Replace the unlocked rocket tradeoff contact modal with navigation to the contact page.
- Add a fallback link that opens the original Tally share link in a new tab.

## Capabilities

### New Capabilities
- `contact-discovery-flow`: Dedicated contact/discovery page with embedded Tally form, responsive layout, and fallback external form link.

### Modified Capabilities
- `hero-section`: Primary CTA routes to the contact page and uses IT-company discovery copy.
- `cta-section`: Closing CTA routes to the contact page.
- `rocket-tradeoff-section`: Unlocked CTA routes to the contact page instead of opening a modal.

## Impact

- Adds `app/contact/page.tsx`.
- Adds shared contact constants in `lib/contact.ts`.
- Updates CTA components under `components/sections`.
- Extends existing global landing styles with scoped contact page styles.
- No new runtime package, backend endpoint, or UI library is required.
