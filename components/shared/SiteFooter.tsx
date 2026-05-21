import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="brand brand--footer" href="#top" aria-label="Depth Studio home">
        <Image
          src="/assets/logo.png"
          alt="Depth Studio"
          width={1292}
          height={558}
          sizes="142px"
        />
      </a>
      <p>Senior product engineering, QA discipline, and AI-powered delivery.</p>
    </footer>
  );
}
