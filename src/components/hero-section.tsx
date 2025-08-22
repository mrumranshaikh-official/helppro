import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Shield, TrendingUp } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Professional network visualization"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/40 to-accent/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border mb-8">
            <Shield className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-secondary-foreground">
              Verified Professional Network
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Turn Your{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Spare Time
            </span>{" "}
            Into{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Shared Success
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            The first peer-to-peer network where IT professionals help each other with real, 
            hands-on tasks. Earn points by helping, spend points to get help. 
            <strong className="text-foreground"> Fair. Transparent. Reliable.</strong>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg text-lg px-8 py-4 h-auto"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-border hover:bg-secondary/50 text-lg px-8 py-4 h-auto backdrop-blur-sm"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-border">
              <Users className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">Verified Professionals</h3>
              <p className="text-muted-foreground text-center">
                Every member is verified with LinkedIn and skills assessment
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-border">
              <Shield className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold text-lg mb-2">Transparent Points</h3>
              <p className="text-muted-foreground text-center">
                Fair exchange system with mandatory payback and credibility tracking
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-border">
              <TrendingUp className="w-8 h-8 text-success mb-3" />
              <h3 className="font-semibold text-lg mb-2">Real-time Help</h3>
              <p className="text-muted-foreground text-center">
                Get immediate assistance from skilled professionals worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;