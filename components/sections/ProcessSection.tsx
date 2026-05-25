"use client";

import { useEffect, useRef } from "react";
import { processSteps } from "@/lib/landing-content";

interface ProcessSectionProps {
  onOpenFlowId?: string;
}

export function ProcessSection({ onOpenFlowId = "open-flow-modal" }: ProcessSectionProps) {
  const processRef = useRef<HTMLElement | null>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridPointerRef = useRef({ x: -9999, y: -9999, active: false });

  const updateGridPointer = (clientX: number, clientY: number) => {
    if (!gridCanvasRef.current) return;

    const bounds = gridCanvasRef.current.getBoundingClientRect();
    gridPointerRef.current = {
      x: clientX - bounds.left,
      y: clientY - bounds.top,
      active: true,
    };
  };

  const hideGridPointer = () => {
    gridPointerRef.current.active = false;
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = gridCanvasRef.current;
    const section = processRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !section || !context) return;

    const spacing = 72;
    const radius = 190;
    const sample = 10;
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let glow = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const warpPoint = (x: number, y: number, pointer: { x: number; y: number }) => {
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance >= radius || distance === 0) return { x, y };

      const strength = Math.pow(1 - distance / radius, 2) * 16;
      return {
        x: x + (dx / distance) * strength,
        y: y + (dy / distance) * strength,
      };
    };

    const drawWarpedLine = (
      orientation: "vertical" | "horizontal",
      fixed: number,
      start: number,
      end: number,
      pointer: { x: number; y: number },
    ) => {
      context.beginPath();

      for (let position = start; position <= end; position += sample) {
        const point =
          orientation === "vertical" ? warpPoint(fixed, position, pointer) : warpPoint(position, fixed, pointer);

        if (position === start) {
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      }

      context.stroke();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const pointer = gridPointerRef.current;
      const targetGlow = pointer.active ? 1 : 0;
      glow += (targetGlow - glow) * 0.12;

      if (glow > 0.01) {
        const lensRadius = radius * (0.9 + glow * 0.1);

        context.save();
        context.beginPath();
        context.arc(pointer.x, pointer.y, lensRadius, 0, Math.PI * 2);
        context.clip();

        const halo = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, lensRadius);
        halo.addColorStop(0, `rgba(255, 255, 255, ${(0.035 * glow).toFixed(3)})`);
        halo.addColorStop(0.45, `rgba(238, 14, 98, ${(0.05 * glow).toFixed(3)})`);
        halo.addColorStop(1, "rgba(238, 14, 98, 0)");
        context.fillStyle = halo;
        context.fillRect(pointer.x - lensRadius, pointer.y - lensRadius, lensRadius * 2, lensRadius * 2);

        context.lineWidth = 1;
        context.strokeStyle = `rgba(255, 255, 255, ${(0.18 * glow).toFixed(3)})`;

        const left = Math.floor((pointer.x - lensRadius) / spacing) * spacing;
        const right = Math.ceil((pointer.x + lensRadius) / spacing) * spacing;
        const top = Math.floor((pointer.y - lensRadius) / spacing) * spacing;
        const bottom = Math.ceil((pointer.y + lensRadius) / spacing) * spacing;

        for (let x = left; x <= right; x += spacing) {
          drawWarpedLine("vertical", x, top, bottom, pointer);
        }

        for (let y = top; y <= bottom; y += spacing) {
          drawWarpedLine("horizontal", y, left, right, pointer);
        }

        context.strokeStyle = `rgba(238, 14, 98, ${(0.28 * glow).toFixed(3)})`;
        context.lineWidth = 0.8;

        for (let x = left; x <= right; x += spacing) {
          drawWarpedLine("vertical", x, top, bottom, pointer);
        }

        for (let y = top; y <= bottom; y += spacing) {
          drawWarpedLine("horizontal", y, left, right, pointer);
        }

        context.restore();

        const ring = context.createRadialGradient(pointer.x, pointer.y, lensRadius * 0.52, pointer.x, pointer.y, lensRadius);
        ring.addColorStop(0, "rgba(238, 14, 98, 0)");
        ring.addColorStop(0.82, `rgba(255, 255, 255, ${(0.025 * glow).toFixed(3)})`);
        ring.addColorStop(1, "rgba(238, 14, 98, 0)");
        context.strokeStyle = ring;
        context.lineWidth = 1;
        context.beginPath();
        context.arc(pointer.x, pointer.y, lensRadius, 0, Math.PI * 2);
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
    <section
      className="process-section"
      aria-labelledby="process-title"
      ref={processRef}
      onPointerEnter={(event) => updateGridPointer(event.clientX, event.clientY)}
      onPointerMove={(event) => updateGridPointer(event.clientX, event.clientY)}
      onPointerLeave={hideGridPointer}
    >
      <div className="process-bg-dots" aria-hidden="true" />
      <canvas className="process-grid-lens" ref={gridCanvasRef} aria-hidden="true" />

      <span className="plus plus--one" aria-hidden="true" />
      <span className="plus plus--two" aria-hidden="true" />
      <span className="plus plus--three" aria-hidden="true" />
      <span className="plus plus--four" aria-hidden="true" />

      <div className="process-inner">
        <header className="process-header">
          <p className="process-label">Process</p>
          <h2 className="process-title" id="process-title">
            How we go deep
            <br />
            before we build
          </h2>
          <p className="process-subtitle">
            A deliberate process that aligns goals, de-risks execution, and builds the right thing faster.
          </p>
        </header>

        <div className="timeline" aria-label="Depth Studio process timeline">
          <div className="timeline-line" aria-hidden="true" />

          <div className="timeline-steps">
            {processSteps.map((step, index) => (
              <article className="step" key={step.title}>
                <span className="timeline-node" aria-hidden="true" />

                <div className="step-head">
                  <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="step-icon" aria-hidden="true">
                    <img src={step.icon} alt="" width="64" height="64" />
                  </span>
                </div>

                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="process-cta-wrap">
          <button className="process-cta" type="button" id={onOpenFlowId}>
            View the full flow
            <img src="/assets/arrow-up-right.svg" alt="" width="28" height="28" />
          </button>
        </div>
      </div>
    </section>
  );
}
