const contactHref = "mailto:hello@depth.studio";

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <img src="/assets/octopus.png" alt="" />
      </div>

      <div className="hero__copy">
        <h1 id="hero-title">
          <span>Think</span>
          <span className="accent">
            Deeply<span className="hero-title-dot">.</span>
          </span>
          <span>Build</span>
          <span className="accent">
            Faster<span className="hero-title-dot">.</span>
          </span>
        </h1>
        <p className="hero__tagline">
          We build MVPs, web &amp; mobile products, QA systems and legacy upgrades using senior expertise, QA discipline and AI-powered workflows
        </p>
        <a className="button button--primary" href={contactHref}>
          Book a strategy call
          <img src="/assets/arrow-up-right.svg" alt="" />
        </a>
      </div>

      <div className="metric metric--top">
        <strong>50+</strong>
        <span>launched products</span>
        <small>across industries</small>
      </div>
      <div className="metric metric--bottom">
        <strong>3x</strong>
        <span>faster delivery</span>
        <small>with AI-augmented engineering</small>
      </div>
    </section>
  );
}
