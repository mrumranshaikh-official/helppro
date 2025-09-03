import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/hero-section";
import LiveActivitySection from "@/components/live-activity-section";
import GamificationSection from "@/components/gamification-section";
import InteractiveHelpForm from "@/components/interactive-help-form";
import HowItWorks from "@/components/how-it-works";
import ValidationSection from "@/components/validation-section";
import HelpSystemSection from "@/components/help-system-section";
import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LiveActivitySection />
      <GamificationSection />
      <InteractiveHelpForm />
      <HowItWorks />
      <ValidationSection />
      <HelpSystemSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
