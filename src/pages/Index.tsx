import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import ValidationSection from "@/components/validation-section";

import AdvancedFeaturesSection from "@/components/advanced-features-section";
import HelpSystemSection from "@/components/help-system-section";
import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <ValidationSection />
      <AdvancedFeaturesSection />
      <HelpSystemSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
