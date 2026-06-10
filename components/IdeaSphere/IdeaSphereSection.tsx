"use client";

import { useRef, useEffect, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import { CONFIG, clamp } from "./config";
import { CONTACT_PAGE_HREF } from "@/lib/contact";
import Image from "next/image";

const IdeaSphereCanvas = dynamic(
  () => import("./IdeaSphereCanvas").then((m) => m.IdeaSphereCanvas),
  { ssr: false },
);

/* ================================================================== */
/*  IdeaSphereSection                                                  */
/*  Scroll-pinned hero with a WebGL particle sphere that the user      */
/*  "dives into" as they scroll through the four narrative phases.     */
/* ================================================================== */

export function IdeaSphereSection() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const heroRef = useRef<HTMLDivElement>(null!);
  const metricsRef = useRef<HTMLDivElement>(null!);
  const taglineRef = useRef<HTMLDivElement>(null!);
  const magentaBgRef = useRef<HTMLDivElement>(null!);

  const progressRef = useRef({ raw: 0, smooth: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  /* ---- client-only init ------------------------------------------ */
  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  /* ---- scroll → raw progress ------------------------------------- */
  useEffect(() => {
    if (reducedMotion || !mounted) return;
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      progressRef.current.raw = clamp(-rect.top / scrollable, 0, 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion, mounted]);

  /* ---- lerp loop + DOM style updates ----------------------------- */
  useEffect(() => {
    if (reducedMotion || !mounted) return;
    let raf: number;
    const loop = () => {
      const pr = progressRef.current;
      pr.smooth += (pr.raw - pr.smooth) * CONFIG.lerpFactor;
      if (Math.abs(pr.smooth - pr.raw) < 0.0001) pr.smooth = pr.raw;

      /* remap: animation 0→1 in first animEndAt, rest is dwell */
      const s = Math.min(pr.smooth / CONFIG.animEndAt, 1.0);

      /* hero copy + button fade-out (phase 1) */
      if (heroRef.current) {
        const fade = clamp(1 - s * 5, 0, 1);
        heroRef.current.style.opacity = String(fade);
        heroRef.current.style.transform = `translateY(${-s * 80}px)`;
      }

      /* metric cards fade-out */
      if (metricsRef.current) {
        const fade = clamp(1 - s * 4.5, 0, 1);
        metricsRef.current.style.opacity = String(fade);
      }

      /* phase-4 magenta: first fill the circle, then expand to fullscreen */
      if (magentaBgRef.current) {
        /* step 1: fade in inside the sphere circle (p 0.88→0.93) */
        const circleFade = clamp((s - 0.88) / 0.05, 0, 1);
        /* step 2: expand circle to cover viewport (p 0.93→0.98) */
        const expand = clamp((s - 0.93) / 0.05, 0, 1);
        /* circle radius: starts at ~28vh (sphere size), grows to 150vh */
        const radius = 28 + expand * 122;

        magentaBgRef.current.style.opacity = String(circleFade);
        magentaBgRef.current.style.clipPath = `circle(${radius}vh at 50% 50%)`;
      }

      /* phase-4 tagline: slides in from the right */
      if (taglineRef.current) {
        const fade = clamp((s - 0.95) / 0.04, 0, 1);
        taglineRef.current.style.opacity = String(fade);
        taglineRef.current.style.transform = `translateX(${(1 - fade) * 120}px)`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, mounted]);

  /* ---- mouse tracking (desktop only) ----------------------------- */
  useEffect(() => {
    if (isMobile || reducedMotion || !mounted) return;
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile, reducedMotion, mounted]);

  /* ---- visibility (tab + viewport) ------------------------------- */
  useEffect(() => {
    const onVis = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!document.hidden) isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    if (containerRef.current) obs.observe(containerRef.current);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      obs.disconnect();
    };
  }, [mounted]);

  /* ================================================================ */
  /*  prefers-reduced-motion: static hero fallback                     */
  /* ================================================================ */
  if (reducedMotion && mounted) {
    return <StaticHeroFallback />;
  }

  /* ================================================================ */
  /*  Shared inner layout (constrained to --max like the rest of page) */
  /* ================================================================ */
  const innerMax: CSSProperties = {
    width: "min(var(--max, 1320px), calc(100% - 136px))",
    marginInline: "auto",
    position: "relative",
    height: "100%",
  };

  /* ================================================================ */
  /*  Main render                                                      */
  /* ================================================================ */
  return (
    <div
      ref={containerRef}
      style={{
        height: `${(1 + CONFIG.scrollPages) * 100}vh`,
        position: "relative",
      }}
    >
      {/* ---- sticky viewport -------------------------------------- */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: CONFIG.colors.bg,
        }}
      >
        {/* ---- WebGL canvas --------------------------------------- */}
        {mounted && (
          <IdeaSphereCanvas
            progressRef={progressRef}
            isMobile={isMobile}
            mouseRef={mouseRef}
            isVisibleRef={isVisibleRef}
          />
        )}

        {/* ---- hero copy overlay (DOM — stays crisp + accessible) - */}
        <div
          ref={heroRef}
          className="hero"
          aria-labelledby="hero-title"
          style={{
            position: "absolute",
            inset: 0,
            minHeight: "unset",
            paddingTop: "clamp(140px, 20vh, 220px)",
            background: "transparent",
            pointerEvents: "none",
            willChange: "opacity, transform",
          }}
        >
          <div style={innerMax}>
            <div className="hero__copy" style={{ pointerEvents: "auto" }}>
              <h1 id="hero-title" style={{ fontSize: "clamp(52px, 5.5vw, 84px)" }}>
                <span>Think</span>
                <span className="accent">
                  Deeply<span className="hero-title-dot">.</span>
                </span>
                <span>Build</span>
                <span className="accent">
                  Faster<span className="hero-title-dot">.</span>
                </span>
              </h1>
              <p className="hero__tagline" style={{ margin: "28px 0 40px" }}>
                We build MVPs, web &amp; mobile products, QA systems and legacy
                upgrades using senior expertise, QA discipline and AI-powered
                workflows
              </p>
              <a
                className="button button--primary"
                href={CONTACT_PAGE_HREF}
              >
                Discuss Your Project
                <img
                  src="/assets/arrow-up-right.svg"
                  alt=""
                  width="31"
                  height="31"
                />
              </a>
            </div>
          </div>
        </div>

        {/* ---- metric cards overlay ------------------------------- */}
        <div
          ref={metricsRef}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            willChange: "opacity",
          }}
        >
          <div style={innerMax}>
            <div
              className="metric metric--top"
              style={{ pointerEvents: "auto" }}
            >
              <strong>50+</strong>
              <span>launched products</span>
              <small>across industries</small>
            </div>
            <div
              className="metric metric--bottom"
              style={{ pointerEvents: "auto" }}
            >
              <strong>3x</strong>
              <span>faster delivery</span>
              <small>with AI-augmented engineering</small>
            </div>
          </div>
        </div>

        {/* ---- phase 4 magenta: circle fill → fullscreen expand ------- */}
        <div
          ref={magentaBgRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #C2185B 0%, #E91E8C 50%, #AD1457 100%)",
            opacity: 0,
            clipPath: "circle(28vh at 50% 50%)",
            pointerEvents: "none",
            willChange: "opacity, clip-path",
          }}
        />

        {/* ---- phase 4 tagline (white on magenta) ------------------- */}
        <div
          ref={taglineRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            pointerEvents: "none",
            willChange: "opacity, transform",
          }}
        >
          <p
            style={{
              fontFamily: '"League Spartan", sans-serif',
              fontSize: "clamp(28px, 5vw, 60px)",
              fontWeight: 700,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              textAlign: "center",
              padding: "0 24px",
            }}
          >
            From idea to product.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Reduced-motion fallback: original static hero (with octopus img)   */
/* ================================================================== */

function StaticHeroFallback() {
  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
      style={{
        width: "min(var(--max, 1320px), calc(100% - 136px))",
        marginInline: "auto",
      }}
    >
      <div className="hero__media" aria-hidden="true">
        <Image
          src="/assets/octopus.avif"
          alt=""
          width={2508}
          height={2508}
          sizes="(max-width: 700px) 660px, (max-width: 1100px) 820px, min(860px, 72vw)"
          priority
          fetchPriority="high"
        />
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
          We build MVPs, web &amp; mobile products, QA systems and legacy
          upgrades using senior expertise, QA discipline and AI-powered
          workflows
        </p>
        <a className="button button--primary" href={CONTACT_PAGE_HREF}>
          Discuss Your Project
          <img
            src="/assets/arrow-up-right.svg"
            alt=""
            width="31"
            height="31"
          />
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
