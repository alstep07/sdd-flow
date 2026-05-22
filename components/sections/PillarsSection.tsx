import { pillars } from "@/lib/landing-content";

export function PillarsSection() {
  return (
    <section className="pillars" aria-labelledby="pillars-title">
      <div className="pillars__bg" aria-hidden="true" />

      <div className="pillars__header">
        <p className="pillars__eyebrow">Why Depth Studio</p>
        <h2 id="pillars-title">
          <span />
          Built-in advantages
          <span />
        </h2>
      </div>

      <div className="pillars__panel">
        {pillars.map((pillar) => (
          <article className="pillar" key={pillar.label}>
            <img src={pillar.icon} alt="" width="78" height="78" />
            <p className="pillar__kicker">{pillar.kicker}</p>
            <h3>{pillar.label}</h3>
            <p>{pillar.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
