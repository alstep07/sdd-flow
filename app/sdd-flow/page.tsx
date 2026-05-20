import type { Metadata } from "next";

type FlowRole = "baqa" | "dev" | "cust" | "ci";

interface FlowRoleDetails {
  label: string;
  owner: string;
  summary: string;
  classes: {
    dot: string;
    border: string;
    bg: string;
    text: string;
    tag: string;
  };
}

interface DetailItem {
  name?: string;
  copy: string;
}

interface ApprovalGate {
  label: string;
  who: string;
  where: string;
  why: string;
  feedback?: string;
}

interface FlowStep {
  id: number | string;
  title: string;
  role: string;
  roleColor: FlowRole;
  tools?: DetailItem[];
  benefits?: string[];
  gate?: ApprovalGate;
}

export const metadata: Metadata = {
  title: "Spec-Driven Development Flow | Depthspec",
  description: "A detailed look at how Depthspec moves work from discovery to deployment through specs, tests, approvals, and release.",
};

const roles: Record<FlowRole, FlowRoleDetails> = {
  baqa: {
    label: "BA/QA",
    owner: "Product",
    summary: "Requirements, AC, scope definition, spec review, QA sign-off. Owns what gets built and whether it meets the brief.",
    classes: {
      dot: "bg-[#a78bfa]",
      border: "border-[#a78bfa]/35",
      bg: "bg-[#a78bfa]/10",
      text: "text-[#c4b5fd]",
      tag: "border-[#a78bfa]/35 bg-[#a78bfa]/10 text-[#c4b5fd]",
    },
  },
  dev: {
    label: "Dev",
    owner: "Architecture + Code",
    summary: "Architecture decisions, infrastructure, CI/CD, DevOps, docs pipeline, and AI-assisted code generation from spec.",
    classes: {
      dot: "bg-[#60a5fa]",
      border: "border-[#60a5fa]/35",
      bg: "bg-[#60a5fa]/10",
      text: "text-[#93c5fd]",
      tag: "border-[#60a5fa]/35 bg-[#60a5fa]/10 text-[#93c5fd]",
    },
  },
  cust: {
    label: "Customer",
    owner: "Business approval",
    summary: "Confirms business intent at the start, approves AC, validates UAT, and decides when the solution fits the real problem.",
    classes: {
      dot: "bg-[#f59e0b]",
      border: "border-[#f59e0b]/35",
      bg: "bg-[#f59e0b]/10",
      text: "text-[#fbbf24]",
      tag: "border-[#f59e0b]/35 bg-[#f59e0b]/10 text-[#fbbf24]",
    },
  },
  ci: {
    label: "CI / auto",
    owner: "Automation",
    summary: "Runs tests, publishes docs, reports results, protects release quality, and keeps the process moving from verified signals.",
    classes: {
      dot: "bg-[#34d399]",
      border: "border-[#34d399]/35",
      bg: "bg-[#34d399]/10",
      text: "text-[#6ee7b7]",
      tag: "border-[#34d399]/35 bg-[#34d399]/10 text-[#6ee7b7]",
    },
  },
};

const steps: FlowStep[] = [
  {
    id: 1,
    title: "Discovery - collect requirements and problems",
    role: "BA/QA + Customer",
    roleColor: "baqa",
    tools: [
      { name: "ClickUp", copy: "task created with raw problem description from Customer" },
      { name: "Calls / interviews", copy: "BA/QA collects context, pain points, business goals" },
      { name: "Figma", copy: "Customer shares designs or references if available" },
      { name: "Mermaid", copy: "BA/QA sketches complex flows if needed during discovery" },
    ],
    benefits: [
      "Problem is defined before any solution is proposed - no premature tech decisions",
      "BA/QA owns the translation from business language to structured requirements",
      "Customer articulates what they need, not how to build it",
    ],
  },
  {
    id: 2,
    title: "Write AC and define scope",
    role: "BA/QA",
    roleColor: "baqa",
    tools: [
      { name: "ClickUp", copy: "custom Gherkin text field: Given / When / Then per scenario" },
      { name: "Figma", copy: "component links pasted inline for design reference" },
      { name: "Mermaid", copy: "added inline for complex business logic schemas" },
    ],
    benefits: [
      "One place for all requirements - not scattered across Notion, Slack, calls",
      "Given / When / Then removes ambiguity before dev touches the task",
      "Figma links give dev and AI the design context needed to generate correct components",
      "Structured format from the start - dev can convert to spec without back-and-forth",
    ],
    gate: {
      label: "Gate - AC requires approval",
      who: "Customer approves, BA/QA facilitates",
      where: "ClickUp comment",
      why: "Customer confirms the AC reflects their actual problem. BA/QA confirms scope is complete. Both must agree before any dev time is spent",
    },
  },
  {
    id: 3,
    title: "Estimate scope",
    role: "Dev",
    roleColor: "dev",
    tools: [
      { name: "ClickUp", copy: "task with approved AC" },
      { name: "Claude Code", copy: "reads AC and lists affected files, components, and API endpoints" },
      { copy: "Dev adds time estimate directly to ClickUp task" },
    ],
    benefits: [
      "AI-assisted scope analysis makes estimates faster and more accurate",
      "Scope agreed before work starts - no surprise refactors mid-sprint",
    ],
    gate: {
      label: "Gate - Estimate requires approval",
      who: "BA/QA reviews first, then Customer/PM approves",
      where: "ClickUp",
      why: "BA/QA validates that estimate makes sense given the scope they defined. Customer/PM approves cost before any code is written",
    },
  },
  {
    id: 4,
    title: "Create spec.md - open spec-PR",
    role: "Dev",
    roleColor: "dev",
    tools: [
      { name: "OpenSpec", copy: "spec.md lives in repo at openspec/specs/feature/spec.md" },
      { name: "Claude Code", copy: "converts ClickUp AC into structured spec.md scenarios" },
      { name: "Figma MCP", copy: "expands component links into actual design tokens and structure" },
      { name: "GitHub PR", copy: "spec-PR contains only spec.md, zero code" },
      { name: "GitHub Action", copy: "posts spec-PR link directly into the ClickUp task" },
    ],
    benefits: [
      "Spec lives in the repo - versions with the code, never goes stale",
      "BA/QA reads spec.md as plain text in GitHub - no code knowledge needed",
      "BA approves dev's interpretation of the AC, not their own original text",
      "PR comments and change requests are tracked permanently in GitHub history",
      "Fixing a misunderstanding in text costs minutes - in code it costs days",
    ],
    gate: {
      label: "Gate - BA/QA approves spec-PR in GitHub",
      who: "BA/QA",
      where: "GitHub PR - link posted to ClickUp task by CI",
      why: "BA/QA reads the spec.md diff, leaves comments or requests changes, and approves the PR directly in GitHub. Implementation cannot start until the PR is merged. Most valuable gate in the entire flow",
    },
  },
  {
    id: 5,
    title: "Implementation",
    role: "Dev + Claude Code",
    roleColor: "dev",
    tools: [
      { name: "Claude Code", copy: "reads spec.md and CLAUDE.md for full project context" },
      { name: "/openspec:proposal", copy: "generates implementation plan before any code is written" },
      { name: "Figma MCP", copy: "reads component frame, generates Component.tsx" },
      { name: "Storybook", copy: ".stories.tsx generated from spec.md scenarios automatically" },
      { name: "Feature flags", copy: "feature ships to main from day one but stays hidden" },
      { name: "Trunk-based dev", copy: "no long-lived branches, no merge conflict churn" },
    ],
    benefits: [
      "AI sees spec + Figma + repo context simultaneously - generates correct, contextual code",
      "Component and its Storybook stories created in one pass from the same spec",
      "Feature in main daily - AI tools always work on current codebase, not stale branches",
    ],
  },
  {
    id: "5b",
    title: "Docs updated during development",
    role: "CI / auto",
    roleColor: "ci",
    tools: [
      { name: "Mintlify", copy: "features section auto-updated from openspec/specs/*.md on every push" },
      { name: "Storybook on Chromatic", copy: "UI components published from .stories.tsx automatically" },
      { name: "JSDoc inline", copy: "API reference generated from comments in route files" },
      { name: "CLAUDE.md + ADRs", copy: "dev guide and architecture decisions in docs/" },
    ],
    benefits: [
      "Docs are never a separate task - they update as a side effect of writing code",
      "One URL for all roles: features + UI components + API reference + dev guide",
      "New team member onboards via CLAUDE.md - AI agent has full context instantly",
    ],
  },
  {
    id: 6,
    title: "QA Dev - automated tests in CI",
    role: "CI / auto",
    roleColor: "ci",
    tools: [
      { name: "GitHub Actions", copy: "runs on every PR automatically" },
      { name: "Claude Code", copy: "generates Playwright tests from spec.md scenarios" },
      { name: "Playwright", copy: "each Given/When/Then scenario becomes one test block" },
      { name: "Chromatic", copy: "visual diff on Storybook components catches UI regressions" },
      { name: "ClickUp", copy: "test results posted as comment, BA/QA sees pass/fail per scenario" },
    ],
    benefits: [
      "Tests come from requirements - not from what dev decided to test",
      "BA/QA sees exactly which scenario failed without opening GitHub",
      "Visual regressions caught before any human reviews the PR",
    ],
    gate: {
      label: "Gate - all scenarios green",
      who: "CI",
      where: "GitHub Actions",
      why: "Automated gate. If any spec scenario fails, task returns to In Progress automatically",
      feedback: "Red -> task returns to In Progress",
    },
  },
  {
    id: 7,
    title: "QA Staging - manual review",
    role: "BA/QA",
    roleColor: "baqa",
    tools: [
      { name: "Staging environment", copy: "full feature behind flag, now enabled" },
      { name: "Playwright HTML report", copy: "available as link in ClickUp task" },
      { name: "spec.md", copy: "BA/QA walks through each scenario manually" },
      { name: "ClickUp", copy: "any bug found becomes a new scenario added to spec.md" },
    ],
    benefits: [
      "Every bug found becomes a permanent spec scenario - it can never silently regress again",
      "BA/QA works entirely in ClickUp - no Git, no terminals, no context switching",
    ],
    gate: {
      label: "Gate - BA/QA sign-off",
      who: "BA/QA",
      where: "ClickUp status change",
      why: "Human confirmation that all scenarios pass in a real environment",
      feedback: "Bug found -> new scenario added to spec.md -> returns to In Progress",
    },
  },
  {
    id: 8,
    title: "UAT - Customer tests on staging",
    role: "Customer",
    roleColor: "cust",
    tools: [
      { name: "Staging environment", copy: "real feature, real data" },
      { name: "Mintlify docs", copy: "product documentation for context" },
      { name: "ClickUp", copy: "Customer approves or requests changes" },
    ],
    benefits: [
      "Customer validates business intent, not just technical correctness",
      "Mintlify docs give Customer context without needing a walkthrough call",
    ],
    gate: {
      label: "Gate - Customer approves UAT",
      who: "Customer",
      where: "ClickUp",
      why: "Final human gate. Confirms we built the right thing correctly. Along with AC approval, this is one of only two gates that cannot be automated - and that is intentional",
    },
  },
  {
    id: 9,
    title: "Deploy + docs finalized",
    role: "Dev + CI",
    roleColor: "ci",
    tools: [
      { name: "GitHub Actions", copy: "canary deploy to 5% traffic first" },
      { name: "Feature flag removed", copy: "after successful monitoring window" },
      { name: "Mintlify", copy: "already up to date from development phase" },
      { name: "Chromatic", copy: "Storybook already published" },
      { name: "JSDoc API reference", copy: "already generated and live" },
    ],
    benefits: [
      "Canary deploy limits blast radius - 5% traffic before full rollout",
      "All docs already current - deploy triggers no documentation work",
      "Full audit trail from AC to spec to tests to deploy in one repo",
    ],
  },
];

function DetailList({ items, type }: { items: DetailItem[] | string[]; type: "tools" | "benefits" }) {
  return (
    <div className="border-depth-line bg-white/[0.035] p-5 sm:p-6">
      <h3 className="text-xs font-black uppercase tracking-normal text-depth-muted">{type}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item, index) => {
          const detail = typeof item === "string" ? { copy: item } : item;

          return (
            <li key={`${detail.name ?? detail.copy}-${index}`} className="flex gap-3 text-sm font-semibold leading-6 text-depth-muted">
              <span className="mt-3 h-px w-4 shrink-0 bg-depth-pink/70" />
              <span>
                {detail.name ? <strong className="font-black text-white">{detail.name}</strong> : null}
                {detail.name ? " - " : null}
                {detail.copy}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function GateCard({ gate }: { gate: ApprovalGate }) {
  return (
    <div className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-4">
      <div className="flex flex-col items-center">
        <span className="h-3 w-px bg-depth-line" />
        <span className="h-3.5 w-3.5 rotate-45 border border-[#f97316]/50 bg-[#f97316]/15" />
        <span className="min-h-4 flex-1 border-l border-depth-line" />
      </div>
      <div className="my-2 rounded-lg border border-[#f97316]/40 bg-[#f97316]/10 p-5">
        <h3 className="text-xs font-black uppercase tracking-normal text-[#fdba74]">{gate.label}</h3>
        <div className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-depth-muted sm:grid-cols-2">
          <p>
            Who: <span className="text-white">{gate.who}</span>
          </p>
          <p>
            Where: <span className="text-white">{gate.where}</span>
          </p>
        </div>
        <p className="mt-3 text-sm font-semibold leading-6 text-depth-muted">{gate.why}</p>
        {gate.feedback ? <p className="mt-3 text-xs font-black uppercase tracking-normal text-[#fdba74]">{gate.feedback}</p> : null}
      </div>
    </div>
  );
}

export default function SddFlowPage() {
  return (
    <main className="px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <header className="border-b border-depth-line pb-10">
          <p className="text-xs font-black uppercase tracking-normal text-depth-pink">Engineering Process</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-black uppercase leading-none tracking-normal text-white sm:text-6xl">
            Spec-Driven Development Flow
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-depth-muted sm:text-lg">
            Every feature starts with a spec. Every test comes from the spec. Every doc is generated from code. AI handles the mechanical work;
            humans make the decisions.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {Object.values(roles).map((role) => (
              <article key={role.label} className={`rounded-lg border p-5 ${role.classes.border} ${role.classes.bg}`}>
                <h2 className={`text-xs font-black uppercase tracking-normal ${role.classes.text}`}>
                  {role.label} - {role.owner}
                </h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-depth-muted">{role.summary}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2" aria-label="Flow role legend">
            {Object.values(roles).map((role) => (
              <div key={role.label} className="inline-flex items-center gap-2 rounded-full border border-depth-line bg-white/[0.045] px-3 py-2 text-xs font-black uppercase tracking-normal text-depth-muted">
                <span className={`h-2 w-2 rounded-full ${role.classes.dot}`} />
                {role.label}
              </div>
            ))}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f97316]/40 bg-[#f97316]/10 px-3 py-2 text-xs font-black uppercase tracking-normal text-[#fdba74]">
              <span className="h-2 w-2 rotate-45 bg-[#f97316]" />
              Gate - cannot proceed without approval
            </div>
          </div>
        </header>

        <section className="mt-12" aria-label="Spec-driven development process timeline">
          {steps.map((step, index) => {
            const role = roles[step.roleColor];
            const isLast = index === steps.length - 1;

            return (
              <article key={step.id} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-4">
                <div className="flex flex-col items-center pt-8">
                  <span className={`h-3 w-3 rounded-full border-2 border-depth-bg ${role.classes.dot}`} />
                  {!isLast ? <span className="min-h-8 flex-1 border-l border-depth-line" /> : null}
                </div>
                <div className="min-w-0 pb-5 pt-3">
                  <div className="overflow-hidden rounded-lg border border-depth-line bg-white/[0.045]">
                    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                      <div className="min-w-0">
                        <p className="text-xs font-black uppercase tracking-normal text-depth-muted">Step {step.id}</p>
                        <h2 className="mt-2 text-xl font-black leading-tight text-white sm:text-2xl">{step.title}</h2>
                      </div>
                      <span className={`w-fit shrink-0 rounded-full border px-3 py-1.5 text-xs font-black uppercase tracking-normal ${role.classes.tag}`}>
                        {step.role}
                      </span>
                    </div>
                    {step.tools || step.benefits ? (
                      <div className="grid border-t border-depth-line md:grid-cols-2">
                        {step.tools ? <DetailList items={step.tools} type="tools" /> : null}
                        {step.benefits ? <DetailList items={step.benefits} type="benefits" /> : null}
                      </div>
                    ) : null}
                  </div>
                  {step.gate ? <GateCard gate={step.gate} /> : null}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
