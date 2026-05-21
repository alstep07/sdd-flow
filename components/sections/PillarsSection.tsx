import { pillars } from "@/lib/landing-content";

export function PillarsSection() {
  return (
    <section className="pillars" aria-label="Delivery pillars">
      {pillars.map((pillar) => (
        <div className="pillar" key={pillar.label}>
          <img src={pillar.icon} alt="" width="54" height="54" />
          <span>{pillar.label}</span>
        </div>
      ))}
    </section>
  );
}
