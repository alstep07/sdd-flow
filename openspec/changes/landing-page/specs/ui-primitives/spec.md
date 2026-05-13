## ADDED Requirements

### Requirement: Button primitive supports primary and outline variants
The `Button` component SHALL accept a `variant` prop of `"primary"` or `"outline"`. It SHALL render as an `<a>` tag when an `href` prop is provided, and as a `<button>` element otherwise.

#### Scenario: Primary variant renders with filled background
- **WHEN** `<Button variant="primary">` is rendered
- **THEN** the button has a filled background using the brand accent color

#### Scenario: Outline variant renders with a border and transparent background
- **WHEN** `<Button variant="outline">` is rendered
- **THEN** the button has a visible border and a transparent or subtle background

#### Scenario: Button renders as anchor when href is provided
- **WHEN** `<Button href="/some-url">` is rendered
- **THEN** the output element is an `<a>` tag with `href="/some-url"`

#### Scenario: Button renders as button element without href
- **WHEN** `<Button>` is rendered without an `href` prop
- **THEN** the output element is a `<button>` tag

### Requirement: Badge primitive displays a short label with a subtle style
The `Badge` component SHALL render inline text with a pill/chip visual style. It SHALL accept a `children` prop for the label text.

#### Scenario: Badge renders with pill styling
- **WHEN** `<Badge>New</Badge>` is rendered
- **THEN** the text "New" is displayed with rounded corners and a subtle background or border

### Requirement: UI primitives are server components
Both `Button` and `Badge` SHALL be React Server Components unless interactivity explicitly requires `use client`.

#### Scenario: No unnecessary client JS from primitives
- **WHEN** Button and Badge are rendered on a server-rendered page
- **THEN** neither component adds to the client JavaScript bundle
