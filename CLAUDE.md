# Depthspec — CLAUDE.md

This is the primary context file for AI agents working on this project.
Read this before touching any code.

---

## What is Depthspec

Depthspec is a development studio landing page that presents a spec-driven,
AI-assisted development process as a service. The goal is to attract clients
who want controlled, transparent, fast software delivery.

---

## Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Framework   | Next.js 15 (App Router)           |
| Styling     | Tailwind CSS v4                   |
| Language    | TypeScript (strict)               |
| Deploy      | Vercel                            |
| Database    | None yet — Supabase when needed   |
| Specs       | OpenSpec (`openspec/specs/`)      |
| Analytics   | TBD — will be added via env var   |
| Booking     | TBD — Cal.com or similar          |
| Chat        | TBD — will be added as component  |

---

## Project Structure

```
depthspec/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx            # Landing page (root)
│   └── globals.css
├── components/
│   ├── ui/                 # Primitives: Button, Badge, etc.
│   ├── sections/           # Landing sections: Hero, Flow, CTA, etc.
│   └── shared/             # Header, Footer, ChatWidget, etc.
├── lib/                    # Utilities, helpers, constants
├── public/                 # Static assets
├── openspec/
│   └── specs/              # Feature specs live here
├── docs/
│   └── adr/                # Architecture Decision Records
├── CLAUDE.md               # ← You are here
└── .env.local              # Never commit this
```

---

## Conventions

### Components
- One component per file
- Named exports only — no default exports except pages
- File name = component name: `HeroSection.tsx`, `BookingButton.tsx`
- Props interface defined inline above the component

### Styling
- Tailwind only — no inline styles, no CSS modules
- No magic numbers — use Tailwind scale
- Dark mode first (site is dark-themed)
- Mobile first — sm: md: lg: breakpoints

### TypeScript
- Strict mode — no `any`
- Types co-located with the component unless shared
- Shared types go in `lib/types.ts`

### Git
- Trunk-based: commit to `main` directly or short-lived branches max 1 day
- Commit message format: `feat:`, `fix:`, `spec:`, `chore:`
- Never commit `.env.local`

---

## Development Process (OpenSpec)

This project uses Spec-Driven Development. Every new feature starts with a spec.

```bash
# 1. Start a new feature
/opsx:new "describe the feature"

# 2. Generate next artifact
/opsx:continue

# 3. Implement from spec
/opsx:apply
```

Specs live in `openspec/specs/<feature-name>/spec.md`.
Read the spec before writing any code for that feature.

---

## Environment Variables

```bash
# .env.local — never commit
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Add when ready:
# NEXT_PUBLIC_ANALYTICS_ID=
# NEXT_PUBLIC_BOOKING_URL=
# NEXT_PUBLIC_CHAT_TOKEN=
# SUPABASE_URL=
# SUPABASE_ANON_KEY=
```

---

## What This Site Does

The landing page has these sections (in order):

1. **Hero** — headline, subheadline, primary CTA (book a call)
2. **Problem** — what's broken with traditional dev agencies
3. **How it works** — simplified SDD flow for customers (no technical terms)
4. **Why Depthspec** — speed + control + AI-assisted
5. **CTA** — book a call / start a project
6. **Footer**

Future additions:
- Chat widget (quick answers to common questions)
- Analytics (pageviews, CTA clicks)
- Booking integration (Cal.com or similar)

---

## Do Not

- Do not install UI libraries (shadcn, MUI, etc.) without an ADR
- Do not add `use client` unless absolutely necessary — prefer server components
- Do not create new env vars without adding them to this file
- Do not write code for a feature that has no spec
- Do not use `any` in TypeScript
