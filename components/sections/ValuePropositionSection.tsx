import { Badge } from "@/components/ui/Badge";

const values = [
  {
    indicator: ">>",
    title: "Speed",
    description: "We remove the slow back-and-forth by deciding what matters early. The team starts with fewer unknowns and less waste.",
  },
  {
    indicator: "[]",
    title: "Control",
    description: "Scope, priorities, and approvals stay visible. You know what is changing before it affects timeline or budget.",
  },
  {
    indicator: "*",
    title: "AI-assisted",
    description: "AI helps accelerate planning, implementation, and checks while senior humans keep judgment, quality, and product fit in charge.",
  },
];

export function ValuePropositionSection() {
  return (
    <section className="px-5 py-20 sm:px-10 lg:px-16" aria-labelledby="value-title">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <Badge>Why Depthspec</Badge>
          <h2 id="value-title" className="mt-5 font-display text-4xl font-black uppercase leading-none tracking-normal sm:text-5xl">
            Built for momentum with control
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="rounded-2xl border border-depth-border bg-white/[0.045] p-6">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-depth-pink text-lg font-black text-white shadow-depth-glow">
                {value.indicator}
              </span>
              <h3 className="mt-8 text-2xl font-black leading-tight">{value.title}</h3>
              <p className="mt-4 text-base font-semibold leading-6 text-depth-muted">{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
