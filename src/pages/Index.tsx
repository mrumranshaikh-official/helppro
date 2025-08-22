import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import FeaturesSection from "@/components/features-section";
import CommunitySection from "@/components/community-section";
import HelpSystemSection from "@/components/help-system-section";
import LeaderboardSection from "@/components/leaderboard-section";
import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <CommunitySection />
      <HelpSystemSection />
      <LeaderboardSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
