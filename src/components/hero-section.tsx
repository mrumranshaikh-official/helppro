import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Shield, TrendingUp, Rocket } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern Tech Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-secondary/20">
        {/* Animated tech grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, hsl(var(--accent)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-primary opacity-20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-32 w-48 h-48 bg-gradient-hero opacity-15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/30 rounded-full blur-lg animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Theme Toggle - Responsive positioning */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <div className="bg-card/90 backdrop-blur-sm border border-border rounded-full p-1.5 md:p-2 shadow-lg">
            <div className="scale-75 md:scale-100">
              <ThemeToggle />
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Launching Soon Badge - Animated */}
          <div className="inline-flex items-center px-3 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-primary/10 backdrop-blur-sm border border-primary/20 mb-6 sm:mb-8 animate-fade-in hover-scale max-w-full">
            <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-1 sm:mr-2 animate-pulse flex-shrink-0" />
            <span className="text-sm sm:text-lg font-semibold text-primary animate-pulse truncate">
              🚀 Launching Soon - Join the Revolution!
            </span>
          </div>

          {/* Secondary Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <Shield className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-secondary-foreground">
              Verified Professional Network
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
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
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.6s'}}>
            The first peer-to-peer network where IT professionals help each other with real, 
            hands-on tasks. Earn points by helping, spend points to get help. 
            <strong className="text-foreground"> Fair. Transparent. Reliable.</strong>
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center items-center mb-12 animate-fade-in" style={{animationDelay: '0.8s'}}>
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg text-lg px-8 py-4 h-auto hover-scale"
              onClick={() => {
                const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                if (emailInput) {
                  emailInput.scrollIntoView({ behavior: 'smooth' });
                  emailInput.focus();
                }
              }}
            >
              Join the Waitlist
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in" style={{animationDelay: '1s'}}>
            <div className="flex flex-col items-center p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-border hover-scale">
              <Users className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">Verified Professionals</h3>
              <p className="text-muted-foreground text-center">
                Every member is verified with LinkedIn and skills assessment
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-border hover-scale">
              <Shield className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold text-lg mb-2">Transparent Points</h3>
              <p className="text-muted-foreground text-center">
                Fair exchange system with mandatory payback and credibility tracking
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-border hover-scale">
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