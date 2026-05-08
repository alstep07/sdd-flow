# Project Name

One-line description of what this is.

## Stack

- **Frontend:** Next.js 15 / React 19
- **Styling:** Tailwind CSS
- **Docs:** Mintlify
- **Testing:** Playwright
- **CI/CD:** GitHub Actions

## Getting Started

```bash
npm install
npm run dev
```

## Development Process

This project uses Spec-Driven Development with OpenSpec.

Every feature starts with a spec — no code is written without an approved spec.md.

```bash
# Start a new feature
/openspec:proposal "describe what you want to build"
```

Specs live in `openspec/specs/`. Read them to understand what the system does and why.

## Key Files

- `CLAUDE.md` — full context for AI agents, start here
- `openspec/specs/` — feature specs
- `docs/adr/` — architecture decisions

## Docs

Link to Mintlify docs if exists.
