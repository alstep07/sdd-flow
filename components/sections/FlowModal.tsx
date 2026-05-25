"use client";

import { useEffect, useRef, useState } from "react";
import { sddSteps } from "@/lib/landing-content";

interface FlowModalProps {
  openButtonId?: string;
}

export function FlowModal({ openButtonId = "open-flow-modal" }: FlowModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSteps, setOpenSteps] = useState<Set<string>>(new Set());
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOpen = () => {
      lastFocusedElement.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setIsOpen(true);
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(`[id="${openButtonId}"]`)) return;

      handleOpen();
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [openButtonId]);

  useEffect(() => {
    document.body.classList.toggle("is-flow-modal-open", isOpen);
    if (isOpen) {
      shellRef.current?.scrollTo({ top: 0 });
      closeButtonRef.current?.focus();
    } else {
      lastFocusedElement.current?.focus();
    }

    return () => {
      document.body.classList.remove("is-flow-modal-open");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleStep = (id: string) => {
    setOpenSteps((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flow-modal" id="sdd-flow-modal" aria-hidden={!isOpen}>
      <div className="flow-modal__backdrop" onClick={() => setIsOpen(false)} />
      <section className="flow-modal__panel" role="dialog" aria-modal="true" aria-labelledby="flow-modal-title">
        <div className="flow-modal__shell" ref={shellRef}>
          <header className="flow-modal__header">
            <div>
              <span className="eyebrow">Engineering Process</span>
              <h2 id="flow-modal-title">
                Spec-Driven Development <span>Flow</span>
              </h2>
              <p>
                Every feature starts with a spec. Every test comes from the spec. Every doc is generated from code. AI handles the mechanical work; humans make the decisions.
              </p>
            </div>
            <button className="flow-modal__close" type="button" onClick={() => setIsOpen(false)} aria-label="Close full flow" ref={closeButtonRef}>
              <span />
              <span />
            </button>
          </header>

          <div className="flow-modal__roles" aria-label="Flow roles">
            <span><i className="role-dot role-dot--baqa" />BA/QA</span>
            <span><i className="role-dot role-dot--dev" />Dev</span>
            <span><i className="role-dot role-dot--cust" />Customer</span>
            <span><i className="role-dot role-dot--ci" />CI / auto</span>
            <span><i className="role-dot role-dot--gate" />Approval gate</span>
          </div>

          <div className="flow-modal__ownership" aria-label="Process ownership">
            <article>
              <strong>BA/QA - Product</strong>
              <p>Requirements, AC, scope definition, spec review, QA sign-off, and product fit.</p>
            </article>
            <article>
              <strong>Dev - Architecture + Code</strong>
              <p>Architecture, infrastructure, CI/CD, docs pipeline, and AI-assisted implementation.</p>
            </article>
          </div>

          <div className="flow-timeline" id="sdd-flow">
            {sddSteps.map((step) => {
              const isStepOpen = openSteps.has(step.id);

              return (
                <article className={`flow-step flow-step--${step.roleColor}`} key={step.id}>
                  <button className="flow-step__head" type="button" aria-expanded={isStepOpen} onClick={() => toggleStep(step.id)}>
                    <span className="flow-step__num">{step.id}</span>
                    <span className="flow-step__title">{step.title}</span>
                    <span className="flow-step__role">{step.role}</span>
                    <span className="flow-step__toggle" aria-hidden="true" />
                  </button>
                  <div className="flow-step__body" hidden={!isStepOpen}>
                    <div className="flow-step__grid">
                      <div>
                        <h3>Tools</h3>
                        <ul>
                          {step.tools.map((item) => (
                            <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3>Benefits</h3>
                        <ul>
                          {step.benefits.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {step.gate ? (
                      <aside className="flow-gate">
                        <span>Gate</span>
                        <strong>{step.gate.label}</strong>
                        <p><b>Who:</b> {step.gate.who}</p>
                        <p><b>Where:</b> {step.gate.where}</p>
                        <p>{step.gate.why}</p>
                        {step.gate.feedback ? <em>{step.gate.feedback}</em> : null}
                      </aside>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
