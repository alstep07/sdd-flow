import { Badge } from "@/components/ui/Badge";

const steps = [
  {
    title: "Shape the goal",
    description: "We turn the idea, audience, and limits into a shared picture of what should happen.",
  },
  {
    title: "Agree on the path",
    description: "You review the plan, priorities, and tradeoffs before anyone starts building.",
  },
  {
    title: "Build in clear slices",
    description: "Work moves in small pieces you can see, test, and approve as it grows.",
  },
  {
    title: "Launch with confidence",
    description: "We polish the final details, confirm the experience, and help you go live.",
  },
];

export function FlowSection() {
  return (
    <section id="how-it-works" className="px-5 py-20 sm:px-10 lg:px-16" aria-labelledby="flow-title">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <Badge>How it works</Badge>
          <h2 id="flow-title" className="mt-5 font-display text-4xl font-black uppercase leading-none tracking-normal sm:text-5xl">
            A clearer way to build
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.title} className="relative rounded-2xl border border-depth-border bg-white/[0.045] p-6">
              <strong className="text-4xl leading-none text-depth-pink">{String(index + 1).padStart(2, "0")}</strong>
              <h3 className="mt-8 text-xl font-black leading-tight">{step.title}</h3>
              <p className="mt-4 text-base font-semibold leading-6 text-depth-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
