import type { Metadata } from "next";
import { TALLY_EMBED_URL, TALLY_FORM_URL } from "@/lib/contact";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

export const metadata: Metadata = {
  title: "Contact Depth Studio | Let's discuss your project",
  description:
    "Tell Depth Studio about your product, technical challenge, or idea so we can suggest the best next step.",
};

export default function ContactPage() {
  return (
    <>
      <ContactPageStyles />
      <SiteHeader />
      <main id="top" className="contact-page">
        <section className="contact-hero" aria-labelledby="contact-title">
          <div className="contact-hero__copy contact-surface">
            <span className="contact-eyebrow">Discovery</span>
            <h1 id="contact-title">
              Let&rsquo;s discuss <span>your project</span>
            </h1>
            <p>
              Tell us a bit about your product, technical challenge, or idea. We&apos;ll review your request and suggest the best next step.
            </p>
            <p>
              Usually, this starts with a short discovery call where we clarify the scope, goals, and possible solution approach.
            </p>
          </div>

          <div className="contact-form-card">
            <div className="contact-form-card__header">
              <span>Depth Studio</span>
              <strong>Project intake</strong>
            </div>
            <iframe
              src={TALLY_EMBED_URL}
              title="Depth Studio project discovery form"
              loading="lazy"
              width="100%"
              height="980"
              scrolling="no"
            />
          </div>

          <a className="contact-fallback" href={TALLY_FORM_URL} target="_blank" rel="noreferrer">
            Having trouble with the form? Open it in a new tab.
            <img src="/assets/arrow-up-right.svg" alt="" width="20" height="20" />
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function ContactPageStyles() {
  return (
    <style>{`
      body {
        margin: 0;
        background:
          radial-gradient(circle at 78% 9%, rgba(238, 14, 98, 0.16), transparent 34%),
          radial-gradient(circle at 12% 28%, rgba(255, 255, 255, 0.055), transparent 26%),
          #010001;
        color: #ffffff;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        overflow-x: hidden;
      }

      img {
        display: block;
        max-width: 100%;
      }

      a {
        color: inherit;
      }

      .site-header,
      .site-footer,
      .contact-page {
        width: min(1180px, calc(100% - 96px));
        margin-inline: auto;
      }

      .site-header {
        position: absolute;
        inset: 22px 0 auto;
        z-index: 5;
      }

      .brand {
        display: inline-flex;
        width: 174px;
      }

      .brand img {
        width: 100%;
        height: auto;
      }

      .contact-page {
        padding-top: 144px;
      }

      .contact-hero {
        position: relative;
        display: grid;
        grid-template-columns: minmax(320px, 0.78fr) minmax(480px, 1fr);
        gap: 34px;
        align-items: start;
      }

      .contact-surface,
      .contact-form-card {
        border: 1px solid rgba(238, 14, 98, 0.24);
        background:
          radial-gradient(circle at 16% 0%, rgba(238, 14, 98, 0.18), transparent 34%),
          linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.018)),
          rgba(5, 2, 5, 0.92);
        box-shadow: 0 26px 90px rgba(0, 0, 0, 0.5), 0 0 54px rgba(238, 14, 98, 0.12);
        backdrop-filter: blur(18px);
      }

      .contact-surface {
        position: sticky;
        top: 104px;
        min-height: 480px;
        padding: 42px;
        border-radius: 22px;
      }

      .contact-eyebrow {
        display: block;
        margin-bottom: 18px;
        color: #ee0e62;
        font-size: 13px;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .contact-hero h1 {
        max-width: 520px;
        margin: 0;
        font-family: "League Spartan", Inter, ui-sans-serif, system-ui, sans-serif;
        font-size: clamp(50px, 5vw, 78px);
        font-weight: 900;
        letter-spacing: 0;
        line-height: 0.96;
        text-transform: uppercase;
      }

      .contact-hero h1 span {
        display: block;
        color: #ee0e62;
      }

      .contact-hero p {
        max-width: 520px;
        margin: 24px 0 0;
        color: #c8bec6;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.36;
      }

      .contact-form-card {
        position: relative;
        min-width: 0;
        border-radius: 22px;
        overflow: hidden;
      }

      .contact-form-card__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        min-height: 58px;
        padding: 0 22px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        color: #c8bec6;
        font-size: 12px;
        font-weight: 900;
        text-transform: uppercase;
      }

      .contact-form-card__header strong {
        color: #ffffff;
        font-size: 13px;
      }

      .contact-form-card iframe {
        display: block;
        width: 100%;
        min-height: 980px;
        border: 0;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 247, 251, 0.96));
      }

      .contact-fallback {
        grid-column: 2;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        justify-self: start;
        margin-left: 4px;
        color: #ee0e62;
        font-size: 13px;
        font-weight: 900;
        line-height: 1.3;
        text-decoration: none;
        text-transform: uppercase;
      }

      .contact-fallback:hover {
        text-decoration: underline;
        text-underline-offset: 5px;
      }

      .contact-fallback:focus-visible {
        outline: 2px solid rgba(255, 255, 255, 0.86);
        outline-offset: 6px;
      }

      .contact-fallback img {
        width: 20px;
        filter: invert(18%) sepia(86%) saturate(4787%) hue-rotate(326deg) brightness(104%) contrast(105%);
      }

      .site-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 180px;
        margin-top: 76px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      .brand--footer {
        width: 142px;
      }

      .site-footer p {
        max-width: 460px;
        margin: 0;
        color: #aeaeae;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.25;
        text-align: right;
      }

      @media (max-width: 1100px) {
        .site-header,
        .site-footer,
        .contact-page {
          width: min(100% - 56px, 1180px);
        }

        .contact-hero {
          grid-template-columns: 1fr;
        }

        .contact-surface {
          position: static;
          min-height: 0;
        }

        .contact-fallback {
          grid-column: 1;
        }
      }

      @media (max-width: 700px) {
        .site-header,
        .site-footer,
        .contact-page {
          width: min(100% - 32px, 1180px);
        }

        .site-header {
          inset: 18px 0 auto;
        }

        .brand {
          width: 132px;
        }

        .contact-page {
          padding-top: 104px;
        }

        .contact-hero {
          gap: 22px;
        }

        .contact-surface {
          padding: 28px 22px;
          border-radius: 18px;
        }

        .contact-hero h1 {
          font-size: clamp(46px, 15vw, 64px);
        }

        .contact-hero p {
          font-size: 16px;
        }

        .contact-form-card {
          border-radius: 18px;
        }

        .contact-form-card__header {
          min-height: 52px;
          padding-inline: 18px;
        }

        .contact-form-card iframe {
          min-height: 980px;
        }

        .contact-fallback {
          align-items: flex-start;
          font-size: 12px;
        }

        .site-footer {
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 28px;
          min-height: 160px;
          margin-top: 64px;
        }

        .site-footer p {
          font-size: 16px;
          text-align: left;
        }
      }
    `}</style>
  );
}
