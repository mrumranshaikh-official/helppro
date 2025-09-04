import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/hero-section";
import LiveActivitySection from "@/components/live-activity-section";
import AdvancedFeaturesSection from "@/components/advanced-features-section";
import HowItWorks from "@/components/how-it-works";
import GamificationSection from "@/components/gamification-section";
import HelpSystemSection from "@/components/help-system-section";
import ValidationSection from "@/components/validation-section";
import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LiveActivitySection />
      <AdvancedFeaturesSection />
      <HowItWorks />
      <GamificationSection />
      <HelpSystemSection />
      <ValidationSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
