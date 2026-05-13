import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/shared/SiteFooter";

export const metadata: Metadata = {
  title: "Depthspec | Spec-driven software delivery",
  description:
    "Depthspec turns product ideas into controlled, transparent, AI-assisted software delivery.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body className="bg-depth-bg text-depth-text antialiased">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
