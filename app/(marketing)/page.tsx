import { Header } from "@/components/header";
import { HeroSection } from "@/components/landing-page/hero-section";
import { HowItWorks } from "@/components/landing-page/how-it-works";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <Header />
      <HeroSection />
      <HowItWorks />
    </div>
  );
}
