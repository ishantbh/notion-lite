import { FinalCTA } from "@/components/landing-page/final-cta";
import { Footer } from "@/components/landing-page/footer";
import { Header } from "@/components/landing-page/header";
import { HeroSection } from "@/components/landing-page/hero-section";
import { HowItWorks } from "@/components/landing-page/how-it-works";
import { ShowcaseSection } from "@/components/landing-page/showcase-section";
import { TechStackSection } from "@/components/landing-page/tech-stack-section";
import { ValueSection } from "@/components/landing-page/value-section";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <Header />
      <HeroSection />
      <HowItWorks />
      <ValueSection/>
      <ShowcaseSection/>
      <TechStackSection/>
      <FinalCTA/>
      <Footer/>
    </div>
  );
}
