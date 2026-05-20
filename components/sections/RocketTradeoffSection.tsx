"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  rocketTradeoffMessages,
  rocketTradeoffOptions,
  type RocketTradeoffOptionId,
} from "@/lib/landing-content";

const contactHref = "mailto:hello@depth.studio";
const progressLevels = ["0%", "33.333%", "66.666%", "100%"] as const;

type SelectedState = Record<RocketTradeoffOptionId, boolean>;

const initialSelectedState = rocketTradeoffOptions.reduce(
  (state, option) => ({ ...state, [option.id]: false }),
  {} as SelectedState,
);

export function RocketTradeoffSection() {
  const [selected, setSelected] = useState<SelectedState>(initialSelectedState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasLaunched, setHasLaunched] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const selectedCount = useMemo(() => Object.values(selected).filter(Boolean).length, [selected]);
  const selectedKey = useMemo(
    () =>
      Object.entries(selected)
        .filter(([, isSelected]) => isSelected)
        .map(([key]) => key)
        .sort()
        .join(","),
    [selected],
  );
  const message = rocketTradeoffMessages[selectedKey] ?? rocketTradeoffMessages[""];
  const isAllSelected = selectedCount === rocketTradeoffOptions.length;
  const progress = progressLevels[selectedCount];

  useEffect(() => {
    if (isAllSelected && !hasLaunched) {
      setHasLaunched(true);
      burstConfetti(canvasRef.current);
    }

    if (!isAllSelected && hasLaunched) {
      setHasLaunched(false);
    }
  }, [hasLaunched, isAllSelected]);

  useEffect(() => {
    document.body.classList.toggle("is-contact-modal-open", isModalOpen);

    if (isModalOpen) {
      closeButtonRef.current?.focus();
    } else {
      lastFocusedElement.current?.focus();
    }

    return () => {
      document.body.classList.remove("is-contact-modal-open");
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsModalOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleOption = (id: RocketTradeoffOptionId) => {
    setSelected((current) => ({ ...current, [id]: !current[id] }));
  };

  const openModal = () => {
    lastFocusedElement.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="rocket-tradeoff" aria-labelledby="rocket-tradeoff-title">
        <canvas className="rocket-tradeoff__confetti" ref={canvasRef} aria-hidden="true" />

        <div className="rocket-tradeoff__intro">
          <span className="eyebrow">The tradeoff</span>
          <h2 id="rocket-tradeoff-title">
            Fast. <span>Affordable.</span> Reliable.
          </h2>
          <p>
            Most teams are told to choose two. Depth Studio uses senior engineering, QA discipline, and AI-assisted workflows to make all three work together.
          </p>
        </div>

        <div className="rocket-tradeoff__console">
          <div className={`rocket-tradeoff__selector ${isAllSelected ? "rocket-tradeoff__selector--complete" : ""}`}>
            <p className="rocket-tradeoff__hint">
              <span />
              Toggle to launch your project
            </p>

            <div className="rocket-tradeoff__options">
              {rocketTradeoffOptions.map((option) => {
                const isSelected = selected[option.id];

                return (
                  <button
                    className={`rocket-tradeoff__option ${isSelected ? "rocket-tradeoff__option--active" : ""}`}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleOption(option.id)}
                    key={option.id}
                  >
                    <span className="rocket-tradeoff__option-copy">
                      <span className="rocket-tradeoff__option-number">{option.number}</span>
                      <span>
                        <strong>{option.label}</strong>
                        <small>{option.description}</small>
                      </span>
                    </span>
                    <span className="rocket-tradeoff__switch" aria-hidden="true">
                      <span />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rocket-tradeoff__launch" aria-label="Launch progress">
            <span className="rocket-tradeoff__launch-label">Launch status</span>
            <div className={`rocket-tradeoff__track ${selectedCount === 0 ? "rocket-tradeoff__track--idle" : ""}`}>
              <span className="rocket-tradeoff__track-fill" style={{ height: progress }} />
              <span className="rocket-tradeoff__ticks" aria-hidden="true">
                {[3, 2, 1, 0].map((tick) => (
                  <span className={selectedCount > 0 && tick <= selectedCount ? "is-lit" : ""} key={tick} />
                ))}
              </span>
              <span className="rocket-tradeoff__rocket" style={{ bottom: progress }} aria-hidden="true">
                <img src="/assets/rocket.svg" alt="" />
              </span>
            </div>
          </div>

          <div className={`rocket-tradeoff__result ${isAllSelected ? "rocket-tradeoff__result--complete" : ""}`}>
            <span>Result</span>
            <strong>{message.title}</strong>
            <p>{message.body}</p>
            <button className="button button--primary rocket-tradeoff__cta" type="button" disabled={!isAllSelected} onClick={openModal}>
              Book a strategy call
              <img src="/assets/arrow-up-right.svg" alt="" />
            </button>
          </div>
        </div>
      </section>

      <div className="contact-modal" aria-hidden={!isModalOpen}>
        <div className="contact-modal__backdrop" onClick={() => setIsModalOpen(false)} />
        <section className="contact-modal__panel" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
          <button
            className="contact-modal__close"
            type="button"
            aria-label="Close contact modal"
            onClick={() => setIsModalOpen(false)}
            ref={closeButtonRef}
          >
            <span />
            <span />
          </button>
          <span className="eyebrow">Ready for launch</span>
          <h2 id="contact-modal-title">
            Tell us what <span>you want to build.</span>
          </h2>
          <p>
            Send us the product idea, system problem, or MVP goal. We will turn it into a clear first conversation about scope, risks, and launch path.
          </p>
          <a className="button button--primary" href={contactHref}>
            Email Depth Studio
            <img src="/assets/arrow-up-right.svg" alt="" />
          </a>
        </section>
      </div>
    </>
  );
}

function burstConfetti(canvas: HTMLCanvasElement | null) {
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const palette = ["#ee0e62", "#ff3a91", "#ffffff", "#ff80b3", "#cc0057"];
  const pieces = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: -12,
    vx: (Math.random() - 0.5) * 5,
    vy: Math.random() * 5 + 2,
    height: Math.random() * 5 + 2,
    width: Math.random() * 8 + 4,
    color: palette[Math.floor(Math.random() * palette.length)],
    alpha: 1,
    rotation: Math.random() * 360,
    rotationVelocity: (Math.random() - 0.5) * 10,
  }));

  const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let hasVisiblePieces = false;

    pieces.forEach((piece) => {
      piece.x += piece.vx;
      piece.y += piece.vy;
      piece.rotation += piece.rotationVelocity;
      piece.alpha -= 0.013;
      piece.vy += 0.08;

      if (piece.alpha <= 0) return;

      hasVisiblePieces = true;
      context.save();
      context.globalAlpha = piece.alpha;
      context.fillStyle = piece.color;
      context.translate(piece.x, piece.y);
      context.rotate((piece.rotation * Math.PI) / 180);
      context.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
      context.restore();
    });

    if (hasVisiblePieces) {
      requestAnimationFrame(draw);
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  draw();
}
