import { Header } from "@/components/header";
import { HeroSection } from "@/components/landing-page/hero-section";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <Header />
      <HeroSection />
    </div>
  );
}
