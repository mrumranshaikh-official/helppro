import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import PlatformDetailsSection from "@/components/platform-details-section";
import HelpRequestSection from "@/components/help-request-section";
import Footer from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HelpRequestSection />
      <PlatformDetailsSection />
      <Footer />
    </div>
  );
};

export default Index;
