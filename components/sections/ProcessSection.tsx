import { processSteps } from "@/lib/landing-content";

interface ProcessSectionProps {
  onOpenFlowId?: string;
}

export function ProcessSection({ onOpenFlowId = "open-flow-modal" }: ProcessSectionProps) {
  return (
    <section className="section process" aria-labelledby="process-title">
      <div className="section__intro">
        <span className="eyebrow">Process</span>
        <h2 id="process-title">How we go deep before we build</h2>
        <button className="text-link" type="button" id={onOpenFlowId}>
          View the full flow
          <img src="/assets/arrow-up-right.svg" alt="" width="31" height="31" />
        </button>
      </div>

      <div className="steps" aria-label="Depth Studio process">
        {processSteps.map((step, index) => (
          <article className="step-card" key={step.title}>
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <img src={step.icon} alt="" width="58" height="58" />
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
