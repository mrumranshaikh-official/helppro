import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import FeaturesSection from "@/components/features-section";
import HelpSystemSection from "@/components/help-system-section";
import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <HelpSystemSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
