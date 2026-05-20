export const pillars = [
  { icon: "/assets/document-spec.svg", label: "Spec first" },
  { icon: "/assets/spark-ai.svg", label: "AI-augmented" },
  { icon: "/assets/shield-check.svg", label: "QA-driven" },
  { icon: "/assets/approval-check-user.svg", label: "Human approved" },
];

export const services = [
  {
    icon: "/assets/cube.svg",
    title: "MVP Development",
    description: "Validate ideas with lean, scalable MVPs.",
  },
  {
    icon: "/assets/devices.svg",
    title: "Web & Mobile",
    description: "High-performance web & mobile experiences.",
  },
  {
    icon: "/assets/shield-check.svg",
    title: "QA and Testing",
    description: "Quality built-in with manual, automation testing and CI/CD",
  },
  {
    icon: "/assets/code-window.svg",
    title: "AI & Tools Integration",
    description: "Integrate modern tools into your existing systems.",
  },
];

export const processSteps = [
  {
    icon: "/assets/discover-search.svg",
    title: "Discover",
    description: "We understand goals, users and constraints",
  },
  {
    icon: "/assets/document-spec.svg",
    title: "Spec",
    description: "We define scope, flows and technical plan",
  },
  {
    icon: "/assets/code.svg",
    title: "Build & Test",
    description: "We build in sprints with tests from day one",
  },
  {
    icon: "/assets/rocket.svg",
    title: "Approve & Launch",
    description: "You review, sign-off and we launch",
  },
];

export const rocketTradeoffOptions = [
  {
    id: "fast",
    number: "01",
    label: "Fast",
    description: "MVPs to production in weeks, not quarters",
  },
  {
    id: "affordable",
    number: "02",
    label: "Affordable",
    description: "Senior expertise without the agency markup",
  },
  {
    id: "reliable",
    number: "03",
    label: "Reliable",
    description: "QA systems and zero-corner-cut standards",
  },
] as const;

export type RocketTradeoffOptionId = (typeof rocketTradeoffOptions)[number]["id"];

export const rocketTradeoffMessages: Record<
  string,
  {
    title: string;
    body: string;
  }
> = {
  "affordable,fast,reliable": {
    title: "We have liftoff.",
    body: "All three unlocked. This is exactly what Depth Studio is built for.",
  },
  "affordable,fast": {
    title: "Fast and affordable, but fragile.",
    body: "You ship quickly and save money, but technical debt catches up.",
  },
  "affordable,reliable": {
    title: "Reliable and affordable, but slow.",
    body: "Solid and trustworthy, just not before the market moves.",
  },
  "fast,reliable": {
    title: "Fast and reliable, but costly.",
    body: "Top-tier quality at speed exists when the budget is enterprise-sized.",
  },
  fast: {
    title: "Just fast.",
    body: "Speed alone creates shortcuts that usually return as expensive fixes.",
  },
  affordable: {
    title: "Just affordable.",
    body: "Low spend helps only when the product still works, scales, and ships.",
  },
  reliable: {
    title: "Just reliable.",
    body: "Quality matters, but without speed and budget control it becomes hard to launch.",
  },
  "": {
    title: "Pick your launch profile.",
    body: "Flip the switches and watch how the usual tradeoff changes.",
  },
};

export interface FlowGate {
  label: string;
  who: string;
  where: string;
  why: string;
  feedback?: string;
}

export interface FlowStep {
  id: string;
  title: string;
  role: string;
  roleColor: "baqa" | "dev" | "cust" | "ci";
  tools: string[];
  benefits: string[];
  gate?: FlowGate;
}

export const sddSteps: FlowStep[] = [
  {
    id: "01",
    title: "Discovery - collect requirements and problems",
    role: "BA/QA + Customer",
    roleColor: "baqa",
    tools: [
      "<strong>ClickUp</strong> - task created with raw problem description from Customer",
      "<strong>Calls / interviews</strong> - BA/QA collects context, pain points, business goals",
      "<strong>Figma</strong> - Customer shares designs or references if available",
      "<strong>Mermaid</strong> - BA/QA sketches complex flows if needed during discovery",
    ],
    benefits: [
      "Problem is defined before any solution is proposed",
      "BA/QA owns the translation from business language to structured requirements",
      "Customer articulates what they need, not how to build it",
    ],
  },
  {
    id: "02",
    title: "Write AC and define scope",
    role: "BA/QA",
    roleColor: "baqa",
    tools: [
      "<strong>ClickUp</strong> - custom Gherkin text field: Given / When / Then per scenario",
      "<strong>Figma</strong> - component links pasted inline for design reference",
      "<strong>Mermaid</strong> - added inline for complex business logic schemas",
    ],
    benefits: [
      "One place for all requirements, not scattered across tools",
      "Given / When / Then removes ambiguity before dev touches the task",
      "Figma links give dev and AI the design context needed to generate correct components",
      "Structured format from the start",
    ],
    gate: {
      label: "AC requires approval",
      who: "Customer approves, BA/QA facilitates",
      where: "ClickUp comment",
      why: "Customer confirms the AC reflects their actual problem. BA/QA confirms scope is complete.",
    },
  },
  {
    id: "03",
    title: "Estimate scope",
    role: "Dev",
    roleColor: "dev",
    tools: [
      "<strong>ClickUp</strong> - task with approved AC",
      "<strong>Claude Code</strong> - reads AC and lists affected files, components, and API endpoints",
      "Dev adds time estimate directly to ClickUp task",
    ],
    benefits: [
      "AI-assisted scope analysis makes estimates faster and more accurate",
      "Scope agreed before work starts",
    ],
    gate: {
      label: "Estimate requires approval",
      who: "BA/QA reviews first, then Customer/PM approves",
      where: "ClickUp",
      why: "BA/QA validates the estimate against the scope. Customer/PM approves cost before code is written.",
    },
  },
  {
    id: "04",
    title: "Create spec.md - open spec-PR",
    role: "Dev",
    roleColor: "dev",
    tools: [
      "<strong>OpenSpec</strong> - spec.md lives in repo at openspec/specs/feature/spec.md",
      "<strong>Claude Code</strong> - converts ClickUp AC into structured spec.md scenarios",
      "<strong>Figma MCP</strong> - expands component links into design tokens and structure",
      "<strong>GitHub PR</strong> - spec-PR contains only spec.md, zero code",
      "<strong>GitHub Action</strong> - posts spec-PR link directly into the ClickUp task",
    ],
    benefits: [
      "Spec versions with the code and does not go stale",
      "BA/QA reads spec.md as plain text in GitHub",
      "BA approves dev's interpretation of the AC",
      "PR comments and change requests are tracked permanently",
      "Fixing a misunderstanding in text costs minutes; in code it costs days",
    ],
    gate: {
      label: "BA/QA approves spec-PR in GitHub",
      who: "BA/QA",
      where: "GitHub PR, link posted to ClickUp by CI",
      why: "Implementation cannot start until the PR is approved and merged.",
    },
  },
  {
    id: "05",
    title: "Implementation",
    role: "Dev + Claude Code",
    roleColor: "dev",
    tools: [
      "<strong>Claude Code</strong> - reads spec.md and CLAUDE.md for full project context",
      "<strong>/openspec:proposal</strong> - generates implementation plan before code",
      "<strong>Figma MCP</strong> - reads component frame, generates Component.tsx",
      "<strong>Storybook</strong> - stories generated from spec.md scenarios automatically",
      "<strong>Feature flags</strong> - feature ships to main from day one but stays hidden",
      "<strong>Trunk-based dev</strong> - no long-lived branches",
    ],
    benefits: [
      "AI sees spec, Figma, and repo context simultaneously",
      "Component and Storybook stories are created from the same spec",
      "Feature in main daily keeps AI tools on the current codebase",
    ],
  },
  {
    id: "05B",
    title: "Docs updated during development",
    role: "CI / auto",
    roleColor: "ci",
    tools: [
      "<strong>Mintlify</strong> - features section auto-updated from openspec/specs/*.md",
      "<strong>Storybook on Chromatic</strong> - UI components published automatically",
      "<strong>JSDoc inline</strong> - API reference generated from route comments",
      "<strong>CLAUDE.md + ADRs</strong> - dev guide and architecture decisions in docs/",
    ],
    benefits: [
      "Docs update as a side effect of writing code",
      "One URL for features, UI components, API reference, and dev guide",
      "New team members and AI agents get context instantly",
    ],
  },
  {
    id: "06",
    title: "QA Dev - automated tests in CI",
    role: "CI / auto",
    roleColor: "ci",
    tools: [
      "<strong>GitHub Actions</strong> - runs on every PR automatically",
      "<strong>Claude Code</strong> - generates Playwright tests from spec.md scenarios",
      "<strong>Playwright</strong> - each Given/When/Then scenario becomes one test block",
      "<strong>Chromatic</strong> - visual diff catches UI regressions",
      "<strong>ClickUp</strong> - test results posted as comment",
    ],
    benefits: [
      "Tests come from requirements, not from implementation assumptions",
      "BA/QA sees exactly which scenario failed without opening GitHub",
      "Visual regressions are caught before human review",
    ],
    gate: {
      label: "All scenarios green",
      who: "CI",
      where: "GitHub Actions",
      why: "If any spec scenario fails, task returns to In Progress automatically.",
      feedback: "Red means task returns to In Progress",
    },
  },
  {
    id: "07",
    title: "QA Staging - manual review",
    role: "BA/QA",
    roleColor: "baqa",
    tools: [
      "<strong>Staging environment</strong> - full feature behind flag, now enabled",
      "<strong>Playwright HTML report</strong> - available as link in ClickUp task",
      "<strong>spec.md</strong> - BA/QA walks through each scenario manually",
      "<strong>ClickUp</strong> - any bug found becomes a new scenario added to spec.md",
    ],
    benefits: [
      "Every bug found becomes a permanent spec scenario",
      "BA/QA works entirely in ClickUp",
    ],
    gate: {
      label: "BA/QA sign-off",
      who: "BA/QA",
      where: "ClickUp status change",
      why: "Human confirmation that all scenarios pass in a real environment.",
      feedback: "Bug found means new scenario is added to spec.md",
    },
  },
  {
    id: "08",
    title: "UAT - Customer tests on staging",
    role: "Customer",
    roleColor: "cust",
    tools: [
      "<strong>Staging environment</strong> - real feature, real data",
      "<strong>Mintlify docs</strong> - product documentation for context",
      "<strong>ClickUp</strong> - Customer approves or requests changes",
    ],
    benefits: [
      "Customer validates business intent, not just technical correctness",
      "Mintlify docs give Customer context without needing a walkthrough call",
    ],
    gate: {
      label: "Customer approves UAT",
      who: "Customer",
      where: "ClickUp",
      why: "Final human gate: confirms we built the right thing correctly.",
    },
  },
  {
    id: "09",
    title: "Deploy + docs finalized",
    role: "Dev + CI",
    roleColor: "ci",
    tools: [
      "<strong>GitHub Actions</strong> - canary deploy to 5% traffic first",
      "<strong>Feature flag removed</strong> - after successful monitoring window",
      "<strong>Mintlify</strong> - already up to date from development phase",
      "<strong>Chromatic</strong> - Storybook already published",
      "<strong>JSDoc API reference</strong> - already generated and live",
    ],
    benefits: [
      "Canary deploy limits blast radius",
      "All docs are already current",
      "Full audit trail from AC to spec to tests to deploy",
    ],
  },
];
