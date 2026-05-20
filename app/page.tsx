import { AiCtaSection, FinalCtaSection } from "@/components/sections/CTASection";
import { FlowModal } from "@/components/sections/FlowModal";
import { HeroSection } from "@/components/sections/HeroSection";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { RocketTradeoffSection } from "@/components/sections/RocketTradeoffSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <HeroSection />
        <PillarsSection />
        <ServicesSection />
        <RocketTradeoffSection />
        <ProcessSection />
        <AiCtaSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
      <FlowModal />
    </>
  );
}
