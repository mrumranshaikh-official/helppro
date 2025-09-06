import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/hero-section";
import SectionsCarousel from "@/components/sections-carousel";
import Footer from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SectionsCarousel />
      <Footer />
    </div>
  );
};

export default Index;
