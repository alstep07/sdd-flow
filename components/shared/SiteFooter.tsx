export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-depth-border px-5 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm font-semibold text-depth-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <strong className="block text-lg font-black text-white">Depthspec</strong>
          <span>Spec-driven, AI-assisted product delivery.</span>
        </div>
        <p>© {year} Depthspec. All rights reserved.</p>
      </div>
    </footer>
  );
}
