import { services } from "@/lib/landing-content";

export function ServicesSection() {
  return (
    <section className="section services" aria-labelledby="services-title">
      <div className="section__intro">
        <span className="eyebrow">Services</span>
        <h2 id="services-title">Digital products built with depth</h2>
      </div>

      <div className="card-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <img src={service.icon} alt="" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
