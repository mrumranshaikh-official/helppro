import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Shield, TrendingUp, Rocket } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import ChatSimulation from "@/components/chat-simulation";
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
          {/* Launching Soon Badge - Mobile Responsive */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-primary/10 backdrop-blur-sm border border-primary/20 mb-6 sm:mb-8 animate-fade-in hover-scale">
            <Rocket className="w-4 h-4 text-primary mr-2 animate-pulse flex-shrink-0" />
            <span className="text-sm font-semibold text-primary animate-pulse">
              🚀 Launching Soon - Professional Network Revolution
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
            Get Instant{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Peer Support
            </span>{" "}
            <br className="hidden md:block" />
            For Your{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Professional Challenges
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.6s'}}>
            Connect with verified professionals in seconds. Give help, get help back. 
            <strong className="text-foreground"> Real expertise when you need it most.</strong>
          </p>

          {/* CTA Button */}
          <div className="flex justify-center items-center mb-12 animate-fade-in" style={{animationDelay: '0.8s'}}>
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg text-lg px-8 py-4 h-auto hover-scale w-full sm:w-auto"
              onClick={() => {
                const emailInput = document.getElementById('waitlist-email') as HTMLInputElement;
                if (emailInput) {
                  emailInput.scrollIntoView({ behavior: 'smooth' });
                  emailInput.focus();
                }
              }}
            >
              Join First 1000 Members Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Live Chat Demo */}
          <div className="mb-12 animate-fade-in" style={{animationDelay: '1s'}}>
            <ChatSimulation />
          </div>

          {/* Advanced Platform Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in" style={{animationDelay: '1.2s'}}>
            <div className="group flex flex-col items-center p-8 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-center group-hover:text-primary transition-colors">AI-Powered Matching</h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                Smart algorithms connect you with professionals who have the exact skills you need
              </p>
            </div>
            <div className="group flex flex-col items-center p-8 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-center group-hover:text-accent transition-colors">Professional Dashboard</h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                Advanced analytics, collaboration history, and skill development tracking
              </p>
            </div>
            <div className="group flex flex-col items-center p-8 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 hover:border-success/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-success/10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-center group-hover:text-success transition-colors">Signal System</h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                Real-time availability signals and instant professional networking
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;