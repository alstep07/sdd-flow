import { services } from "@/lib/landing-content";

export function ServicesSection() {
  return (
    <section className="section services" aria-labelledby="services-title">
      <div className="section__intro">
        <span className="eyebrow">Services</span>
        <h2 id="services-title">Digital products built with depth</h2>
      </div>

      <div className="card-grid service-layers" aria-label="Depth Studio services">
        {services.map((service, index) => (
          <article className="service-card" key={service.title}>
            <span className="service-card__dots" aria-hidden="true" />
            <div className="service-card__topline">
              <span className="service-card__number">{String(index + 1).padStart(2, "0")}</span>
              <span className="service-card__signal" aria-hidden="true" />
            </div>
            <img src={service.icon} alt="" width="89" height="89" aria-hidden="true" />
            <div className="service-card__copy">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
