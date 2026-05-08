# Depthspec

Spec-driven development studio landing page.

## Stack

- **Frontend:** Next.js 15 / React 19
- **Styling:** Tailwind CSS v4
- **Deploy:** Vercel
- **Specs:** OpenSpec
- **Testing:** Playwright
- **CI/CD:** GitHub Actions

## Getting Started

```bash
npm install
npm run dev
```

## Development Process

This project uses Spec-Driven Development with OpenSpec.
No code is written without an approved spec.

### Prerequisites

```bash
npm install -g @fission-ai/openspec@latest
```

### Starting a new feature

```bash
# 1. Create a proposal and spec
/opsx:propose

# 2. Commit openspec/changes/ — no code yet
# 3. Open a PR for review
# 4. After approval, implement
/opsx:apply
```

### OpenSpec structure

```
openspec/
├── changes/          # Active work — proposals, specs, tasks for current features
│   └── feature-name/
│       ├── proposal.md   # What and why — BA reviews this
│       ├── design.md     # Technical decisions
│       ├── tasks.md      # Implementation breakdown
│       └── specs/        # Given/When/Then scenarios per section
└── specs/            # Permanent library — specs of completed features
```

### Review flow

1. Run `/opsx:propose` and describe the feature
2. Commit only `openspec/changes/` — zero code
3. Open a PR → BA reads `proposal.md` and `specs/`
4. BA approves in GitHub → merge
5. Run `/opsx:apply` to implement

BA never reviews code — only `proposal.md` and spec scenarios.

## Key Files

- `CLAUDE.md` — full context for AI agents, read this first
- `openspec/specs/` — completed feature specs
- `openspec/changes/` — active proposals and specs in progress
- `docs/adr/` — architecture decisions
```