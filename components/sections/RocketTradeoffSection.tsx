"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  rocketTradeoffMessages,
  rocketTradeoffOptions,
  type RocketTradeoffOptionId,
} from "@/lib/landing-content";
import { CONTACT_PAGE_HREF } from "@/lib/contact";

const progressLevels = ["0%", "33.333%", "66.666%", "100%"] as const;

type SelectedState = Record<RocketTradeoffOptionId, boolean>;

const initialSelectedState = rocketTradeoffOptions.reduce(
  (state, option) => ({ ...state, [option.id]: false }),
  {} as SelectedState,
);

export function RocketTradeoffSection() {
  const [selected, setSelected] = useState<SelectedState>(initialSelectedState);
  const [hasLaunched, setHasLaunched] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  const toggleOption = (id: RocketTradeoffOptionId) => {
    setSelected((current) => ({ ...current, [id]: !current[id] }));
  };

  return (
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
            <a
              className="button button--primary rocket-tradeoff__cta"
              href={isAllSelected ? CONTACT_PAGE_HREF : undefined}
              aria-disabled={!isAllSelected}
              onClick={(event) => {
                if (!isAllSelected) event.preventDefault();
              }}
            >
              Book a Discovery Call
              <img src="/assets/arrow-up-right.svg" alt="" />
            </a>
          </div>
        </div>
      </section>
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
