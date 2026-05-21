import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="site-header" aria-label="Depth Studio header">
      <a className="brand" href="#top" aria-label="Depth Studio home">
        <Image
          src="/assets/logo.png"
          alt="Depth Studio"
          width={1292}
          height={558}
          sizes="(max-width: 700px) 132px, 174px"
        />
      </a>
    </header>
  );
}
