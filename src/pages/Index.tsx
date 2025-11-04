import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import ValidationSection from "@/components/validation-section";
import HelpRequestSection from "@/components/help-request-section";
import { SkillMatchingDemo } from "@/components/skill-matching-demo";
import PlatformDetailsSection from "@/components/platform-details-section";
import Footer from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ValidationSection />
      <SkillMatchingDemo />
      <HelpRequestSection />
      <PlatformDetailsSection />
      <Footer />
    </div>
  );
};

export default Index;
