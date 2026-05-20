import { CONTACT_PAGE_HREF } from "@/lib/contact";

export function AiCtaSection() {
  return (
    <section className="cta-panel cta-panel--trail" aria-labelledby="ai-title">
      <img src="/assets/energy_trail.png" alt="" />
      <div>
        <h2 id="ai-title">
          AI moves fast. <span>Depth makes it right.</span>
        </h2>
        <p>
          We use AI to accelerate specs, code, tests and documentation - but architecture, QA sign-off and product decisions stay human.
        </p>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section className="cta-panel cta-panel--portal" id="cta-final" aria-labelledby="build-title">
      <img src="/assets/neon_portal.png" alt="" />
      <div>
        <h2 id="build-title">
          Ready to build <span>with depth?</span>
        </h2>
        <p>
          Bring us an idea, old system or MVP concept. We&apos;ll turn it into a clear plan, realistic scope and working product.
        </p>
        <a className="button button--primary" href={CONTACT_PAGE_HREF}>
          Discuss Your Project
          <img src="/assets/arrow-up-right.svg" alt="" />
        </a>
      </div>
    </section>
  );
}
