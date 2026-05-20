import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Depth Studio | Think Deeply. Build Faster.",
  description:
    "Depth Studio builds MVPs, web and mobile products, QA systems, and legacy upgrades with AI-augmented engineering.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body className="bg-depth-bg text-depth-text antialiased">
        {children}
      </body>
    </html>
  );
}
