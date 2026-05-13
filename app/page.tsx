import { CTASection } from "@/components/sections/CTASection";
import { FlowSection } from "@/components/sections/FlowSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ValuePropositionSection } from "@/components/sections/ValuePropositionSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <FlowSection />
      <ValuePropositionSection />
      <CTASection />
    </main>
  );
}
