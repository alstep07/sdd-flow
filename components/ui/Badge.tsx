import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-depth-border bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-normal text-depth-pink shadow-[0_0_28px_rgba(238,14,98,0.16)]">
      {children}
    </span>
  );
}
