import { Badge } from "@/components/ui/Badge";

const pains = [
  {
    title: "The plan keeps changing",
    description: "You approve one thing, then discover the team built around a different assumption.",
  },
  {
    title: "Progress is hard to judge",
    description: "Updates sound busy, but you cannot tell what is done, blocked, or ready to review.",
  },
  {
    title: "Quality arrives too late",
    description: "Testing happens after the budget is tired and fixes become expensive.",
  },
  {
    title: "You lose control of scope",
    description: "Small surprises turn into new invoices because decisions were never made clearly.",
  },
];

export function ProblemSection() {
  return (
    <section className="px-5 py-20 sm:px-10 lg:px-16" aria-labelledby="problem-title">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[22rem_1fr] lg:gap-20">
        <div>
          <Badge>The problem</Badge>
          <h2 id="problem-title" className="mt-5 font-display text-4xl font-black uppercase leading-none tracking-normal sm:text-5xl">
            Why most dev shops fail you
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {pains.map((pain) => (
            <article key={pain.title} className="rounded-2xl border border-depth-border bg-white/[0.045] p-6">
              <h3 className="text-xl font-black leading-tight">{pain.title}</h3>
              <p className="mt-4 text-base font-semibold leading-6 text-depth-muted">{pain.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
