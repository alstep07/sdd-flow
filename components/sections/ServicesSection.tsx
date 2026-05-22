"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CONTACT_PAGE_HREF } from "@/lib/contact";
import { serviceModalDetails, services } from "@/lib/landing-content";

type ServiceModalDetail = (typeof serviceModalDetails)[number];

const serviceDetailsByTitle = new Map<string, ServiceModalDetail>(
  serviceModalDetails.map((detail) => [detail.title, detail]),
);
const focusableSelector =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ServicesSection() {
  const [activeService, setActiveService] = useState<ServiceModalDetail | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isClosePreview, setIsClosePreview] = useState(false);
  const servicesRef = useRef<HTMLElement | null>(null);
  const sonarCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sonarPointerRef = useRef({ x: -9999, y: -9999, active: false });
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const activeTitleId = useMemo(() => (activeService ? `service-modal-title-${activeService.slug}` : undefined), [activeService]);
  const activeDescriptionId = useMemo(() => (activeService ? `service-modal-intro-${activeService.slug}` : undefined), [activeService]);

  const updateServicesPointer = (clientX: number, clientY: number) => {
    if (!sonarCanvasRef.current) return;

    const bounds = sonarCanvasRef.current.getBoundingClientRect();
    sonarPointerRef.current = {
      x: clientX - bounds.left,
      y: clientY - bounds.top,
      active: true,
    };
  };

  const hideServicesPointer = () => {
    sonarPointerRef.current.active = false;
  };

  const openService = (detail: ServiceModalDetail) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    lastFocusedElement.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIsClosing(false);
    setIsClosePreview(false);
    setActiveService(detail);
  };

  const closeService = () => {
    if (!activeService || isClosing) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsClosing(true);
    setIsClosePreview(false);

    closeTimerRef.current = window.setTimeout(
      () => {
        setActiveService(null);
        setIsClosing(false);
        lastFocusedElement.current?.focus();
      },
      reduceMotion ? 0 : 820,
    );
  };

  useEffect(() => {
    if (!activeService) return;

    document.body.classList.add("is-service-modal-open");
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeService();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const focusableElements = Array.from(modalRef.current.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => !element.hasAttribute("disabled") && element.offsetParent !== null,
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("is-service-modal-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeService, isClosing]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      document.body.classList.remove("is-service-modal-open");
    };
  }, []);

  useEffect(() => {
    const canvas = sonarCanvasRef.current;
    const section = servicesRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !section || !context) return;

    const spacing = 38;
    const maxDistance = 130;
    const dots: Array<{ x: number; y: number; glow: number; seed: number }> = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationFrame = 0;

    const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
    const ease = (value: number) => 1 - Math.pow(1 - value, 2.4);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots.length = 0;

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          dots.push({
            x: offsetX + col * spacing,
            y: offsetY + row * spacing,
            glow: 0,
            seed: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const draw = () => {
      frame += 0.014;
      context.clearRect(0, 0, width, height);

      const pointer = sonarPointerRef.current;
      const depth = pointer.active ? clamp01(pointer.y / Math.max(height, 1)) : 0.48;
      const sonarRadius = 62 + depth * 74 + Math.sin(frame * 4) * 1.5;

      for (const dot of dots) {
        const dx = dot.x - pointer.x;
        const dy = dot.y - pointer.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const hover = pointer.active && distance < maxDistance ? ease(1 - distance / maxDistance) : 0;
        const sonarBand = pointer.active ? Math.max(0, 1 - Math.abs(distance - sonarRadius) / 22) * 0.16 : 0;
        const idle = (Math.sin(frame * 0.6 + dot.seed) * 0.5 + 0.5) * 0.018 + 0.008;
        const target = Math.max(idle, hover, sonarBand);

        dot.glow += (target - dot.glow) * 0.1;

        if (dot.glow > 0.06) {
          const glowRadius = 7 + dot.glow * 26;
          const gradient = context.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, glowRadius);
          gradient.addColorStop(0, `rgba(255, 58, 145, ${(dot.glow * 0.18).toFixed(3)})`);
          gradient.addColorStop(0.42, `rgba(238, 14, 98, ${(dot.glow * 0.075).toFixed(3)})`);
          gradient.addColorStop(1, "rgba(238, 14, 98, 0)");
          context.fillStyle = gradient;
          context.beginPath();
          context.arc(dot.x, dot.y, glowRadius, 0, Math.PI * 2);
          context.fill();
        }

        const coreSize = 1.1 + dot.glow * 2.4;
        const coreAlpha = 0.075 + dot.glow * 0.42;
        context.strokeStyle = `rgba(238, 14, 98, ${coreAlpha.toFixed(3)})`;
        context.lineWidth = 0.45;
        context.beginPath();
        context.moveTo(dot.x - coreSize, dot.y);
        context.lineTo(dot.x + coreSize, dot.y);
        context.stroke();
        context.beginPath();
        context.moveTo(dot.x, dot.y - coreSize);
        context.lineTo(dot.x, dot.y + coreSize);
        context.stroke();

        context.fillStyle = `rgba(255, ${Math.round(150 * dot.glow)}, 230, ${(0.16 + dot.glow * 0.42).toFixed(3)})`;
        context.beginPath();
        context.arc(dot.x, dot.y, 0.65 + dot.glow * 1.4, 0, Math.PI * 2);
        context.fill();
      }

      if (pointer.active) {
        const pulse = Math.sin(frame * 4) * 1.5;
        context.strokeStyle = "rgba(238, 14, 98, 0.32)";
        context.lineWidth = 0.7;
        context.beginPath();
        context.arc(pointer.x, pointer.y, 9 + pulse, 0, Math.PI * 2);
        context.stroke();

        context.strokeStyle = "rgba(255, 58, 145, 0.18)";
        context.lineWidth = 0.5;
        context.beginPath();
        context.arc(pointer.x, pointer.y, 4, 0, Math.PI * 2);
        context.stroke();

        context.fillStyle = "rgba(255, 180, 240, 0.68)";
        context.beginPath();
        context.arc(pointer.x, pointer.y, 1.5, 0, Math.PI * 2);
        context.fill();

        const crosshair = 16;
        context.strokeStyle = "rgba(238, 14, 98, 0.14)";
        context.lineWidth = 0.5;
        context.beginPath();
        context.moveTo(pointer.x - crosshair, pointer.y);
        context.lineTo(pointer.x - 6, pointer.y);
        context.stroke();
        context.beginPath();
        context.moveTo(pointer.x + 6, pointer.y);
        context.lineTo(pointer.x + crosshair, pointer.y);
        context.stroke();
        context.beginPath();
        context.moveTo(pointer.x, pointer.y - crosshair);
        context.lineTo(pointer.x, pointer.y - 6);
        context.stroke();
        context.beginPath();
        context.moveTo(pointer.x, pointer.y + 6);
        context.lineTo(pointer.x, pointer.y + crosshair);
        context.stroke();

        context.font = "9px monospace";
        context.fillStyle = "rgba(255, 58, 145, 0.3)";
        context.fillText(`${Math.round(200 + depth * 800)}m`, pointer.x + 13, pointer.y - 7);

        context.strokeStyle = "rgba(238, 14, 98, 0.1)";
        context.lineWidth = 0.7;
        context.beginPath();
        context.arc(pointer.x, pointer.y, sonarRadius, 0, Math.PI * 2);
        context.stroke();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(section);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <section
        className="section services"
        aria-labelledby="services-title"
        ref={servicesRef}
        onPointerEnter={(event) => updateServicesPointer(event.clientX, event.clientY)}
        onPointerMove={(event) => updateServicesPointer(event.clientX, event.clientY)}
        onPointerLeave={hideServicesPointer}
      >
        <canvas className="services__sonar" ref={sonarCanvasRef} aria-hidden="true" />
        <div className="section__intro">
          <span className="eyebrow">Services</span>
          <h2 id="services-title">Digital products built with depth</h2>
        </div>

        <div className="card-grid service-layers" aria-label="Depth Studio services">
          {services.map((service, index) => {
            const detail = serviceDetailsByTitle.get(service.title);
            const serviceTitleId = `service-card-title-${index}`;
            const serviceDescriptionId = `service-card-description-${index}`;

            return (
              <article className="service-card" key={service.title}>
                <button
                  className="service-card__trigger"
                  type="button"
                  aria-labelledby={serviceTitleId}
                  aria-describedby={serviceDescriptionId}
                  aria-haspopup="dialog"
                  aria-controls="service-detail-modal"
                  onClick={() => detail && openService(detail)}
                />
                <span className="service-card__dots" aria-hidden="true" />
                <div className="service-card__topline">
                  <span className="service-card__number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="service-card__signal" aria-hidden="true" />
                </div>
                <img src={service.icon} alt="" width="89" height="89" aria-hidden="true" />
                <div className="service-card__copy">
                  <h3 id={serviceTitleId}>{service.title}</h3>
                  <p id={serviceDescriptionId}>{service.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div
        className={`service-modal${activeService ? " service-modal--open" : ""}${isClosing ? " service-modal--closing" : ""}${
          isClosePreview ? " service-modal--close-preview" : ""
        }`}
        id="service-detail-modal"
        aria-hidden={!activeService}
      >
        <div className="service-modal__backdrop" onClick={closeService} />
        {activeService ? (
          <section
            className="service-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={activeTitleId}
            aria-describedby={activeDescriptionId}
            ref={modalRef}
          >
            <ServiceModalTentacles />

            <button
              className="service-modal__close"
              type="button"
              onClick={closeService}
              onMouseEnter={() => setIsClosePreview(true)}
              onMouseLeave={() => setIsClosePreview(false)}
              onFocus={() => setIsClosePreview(true)}
              onBlur={() => setIsClosePreview(false)}
              aria-label={`Close ${activeService.title} details`}
              ref={closeButtonRef}
            >
              <span />
              <span />
            </button>

            <div className="service-modal__content">
              <span className="eyebrow">Service detail</span>
              <h2 id={activeTitleId}>{activeService.title}</h2>
              <p id={activeDescriptionId} className="service-modal__intro">
                {activeService.intro}
              </p>

              <div className="service-modal__grid">
                <ServiceModalList title="Best for" items={activeService.bestFor} />
                <ServiceModalList title="What we do" items={activeService.whatWeDo} />
              </div>

              <div className="service-modal__outcome">
                <strong>Outcome</strong>
                <p>{activeService.outcome}</p>
              </div>

              <a className="button button--primary service-modal__cta" href={`${CONTACT_PAGE_HREF}?service=${activeService.slug}`}>
                {activeService.cta}
                <img src="/assets/arrow-up-right.svg" alt="" width="31" height="31" />
              </a>
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}

function ServiceModalTentacles() {
  return (
    <div className="service-modal__tentacles" aria-hidden="true">
      <ServiceTentacle className="service-modal__tentacle service-modal__tentacle--top-left" variant="top" gradientId="service-tentacle-skin-tl" />
      <ServiceTentacle className="service-modal__tentacle service-modal__tentacle--top-right" variant="top" gradientId="service-tentacle-skin-tr" />
      <ServiceTentacle className="service-modal__tentacle service-modal__tentacle--bottom-left" variant="bottom" gradientId="service-tentacle-skin-bl" />
      <ServiceTentacle className="service-modal__tentacle service-modal__tentacle--bottom-right" variant="bottom" gradientId="service-tentacle-skin-br" />
    </div>
  );
}

function ServiceTentacle({ className, variant, gradientId }: { className: string; variant: "top" | "bottom"; gradientId: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 520 330" focusable="false">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffc0d8" />
            <stop offset=".22" stopColor="#ff5aa0" />
            <stop offset=".58" stopColor="#ee0e62" />
            <stop offset="1" stopColor="#79052e" />
          </linearGradient>
        </defs>
        {variant === "top" ? <TopTentacleShape gradientId={gradientId} /> : <BottomTentacleShape gradientId={gradientId} />}
      </svg>
    </div>
  );
}

function TopTentacleShape({ gradientId }: { gradientId: string }) {
  return (
    <>
      <path
        className="service-modal__tentacle-skin"
        fill={`url(#${gradientId})`}
        d="M64 218C118 122 196 126 252 169c49 38 88 23 103-22 17-51-21-95-69-88-37 5-51 37-39 61 9 18 33 17 40 2 6-12-2-24-15-23-8 1-12 6-12 12-15-17-3-49 24-61 47-21 108 15 122 70 18 70-28 130-96 141-69 11-108-48-159-55-37-5-63 19-80 45-16 24-21-6-7-33z"
      />
      <path
        className="service-modal__tentacle-side"
        d="M72 224c32-47 70-56 113-34 48 25 77 72 140 43 44-20 69-61 70-104 9 54-16 111-72 133-71 28-112-31-164-41-38-7-65 7-87 3z"
      />
      <path className="service-modal__tentacle-highlight" d="M92 209c44-57 99-55 145-20 38 28 72 28 101-5" />
      <ServiceTentacleSuckers
        suckers={[
          [105, 218, 17, 12, 7, 4.5, "rotate(-18 105 218)"],
          [149, 192, 16, 11, 6.5, 4.2],
          [200, 198, 15, 11, 6, 4, "rotate(18 200 198)"],
          [247, 228, 14, 10, 5.7, 3.8, "rotate(24 247 228)"],
          [302, 237, 13, 9, 5.2, 3.4],
          [352, 208, 12, 8, 4.8, 3.2, "rotate(-24 352 208)"],
        ]}
      />
    </>
  );
}

function BottomTentacleShape({ gradientId }: { gradientId: string }) {
  return (
    <>
      <path
        className="service-modal__tentacle-skin"
        fill={`url(#${gradientId})`}
        d="M61 91c71 80 153 77 217 39 58-35 104-25 124 16 23 48-7 96-55 97-36 1-57-27-49-54 6-20 30-24 41-10 9 12 3 28-11 30-9 1-15-4-17-11-10 20 10 49 40 53 53 7 103-43 97-101-8-76-81-116-154-94-76 23-114 75-176 58-39-11-59-39-70-64-11-25-10 17 13 41z"
      />
      <path className="service-modal__tentacle-side" d="M74 99c47 42 99 49 158 18 65-35 117-50 167-2-40-27-82-25-134 6-75 45-141 31-191-22z" />
      <path className="service-modal__tentacle-highlight" d="M100 103c52 37 102 39 160 8 49-26 92-28 128-3" />
      <ServiceTentacleSuckers
        suckers={[
          [117, 105, 18, 12, 7, 4.5],
          [166, 124, 17, 12, 6.8, 4.4],
          [221, 119, 16, 11, 6.4, 4.2],
          [277, 92, 15, 10, 6, 4],
          [334, 86, 14, 10, 5.6, 3.8],
          [385, 118, 13, 9, 5.2, 3.4],
        ]}
      />
    </>
  );
}

function ServiceTentacleSuckers({
  suckers,
}: {
  suckers: Array<[number, number, number, number, number, number, string?]>;
}) {
  return (
    <g>
      {suckers.map(([cx, cy, rx, ry, holeRx, holeRy, transform]) => (
        <g key={`${cx}-${cy}`}>
          <ellipse className="service-modal__sucker-rim" cx={cx} cy={cy} rx={rx} ry={ry} transform={transform} />
          <ellipse className="service-modal__sucker-hole" cx={cx} cy={cy} rx={holeRx} ry={holeRy} />
        </g>
      ))}
    </g>
  );
}

function ServiceModalList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="service-modal__list">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
