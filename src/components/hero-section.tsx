import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Shield, TrendingUp, Rocket, Star, Clock, CheckCircle } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import ChatSimulation from "@/components/chat-simulation";

const HeroSection = () => {
  const communityMembers = [
    { name: "Sarah Chen", avatar: "/api/placeholder/40/40", role: "DevOps" },
    { name: "Marcus R.", avatar: "/api/placeholder/40/40", role: "Frontend" },
    { name: "Aisha P.", avatar: "/api/placeholder/40/40", role: "QA Lead" },
    { name: "David K.", avatar: "/api/placeholder/40/40", role: "Security" },
    { name: "Maria G.", avatar: "/api/placeholder/40/40", role: "Full Stack" }
  ];

  const trustStats = [
    { value: "95%", label: "Success Rate" },
    { value: "15 min", label: "Avg Response" },
    { value: "500+", label: "Professionals" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-accent/5">
      {/* Large Circular Graphics */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main hero circle */}
        <div className="absolute top-10 right-10 w-96 h-96 lg:w-[600px] lg:h-[600px] bg-gradient-warm rounded-full opacity-90 animate-pulse" style={{animationDelay: '0s'}}></div>
        
        {/* Smaller accent circles */}
        <div className="absolute top-40 right-20 w-32 h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-accent/40 to-primary/30 rounded-full blur-sm animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 lg:w-36 lg:h-36 bg-gradient-to-br from-warning/30 to-accent/20 rounded-full blur-lg animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, hsl(var(--primary)) 1px, transparent 1px),
                             radial-gradient(circle at 80% 20%, hsl(var(--accent)) 1px, transparent 1px),
                             radial-gradient(circle at 40% 40%, hsl(var(--warning)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px, 80px 80px, 100px 100px'
          }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <div className="bg-card/90 backdrop-blur-sm border border-border rounded-full p-1.5 md:p-2 shadow-lg">
            <div className="scale-75 md:scale-100">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Hero Content - Zepcruit-inspired Layout */}
        <div className="text-left pt-20 sm:pt-24 pb-12 animate-fade-in max-w-4xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] mb-8 tracking-tight">
            <span className="block animate-fade-in" style={{animationDelay: '0.1s'}}>
              <span className="text-foreground">Get Instant</span>
            </span>
            <span className="block animate-fade-in" style={{animationDelay: '0.2s'}}>
              <span className="bg-gradient-warm bg-clip-text text-transparent">Peer Support</span>
            </span>
            <span className="block animate-fade-in text-foreground" style={{animationDelay: '0.3s'}}>
              & Professional Help
            </span>
            <span className="block animate-fade-in text-muted-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl" style={{animationDelay: '0.4s'}}>
              in a Flash
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 animate-fade-in max-w-2xl font-medium" style={{animationDelay: '0.5s'}}>
            AI-powered Solution to Connect with Verified Professionals Instantly
          </p>
          
          {/* CTA Button */}
          <div className="animate-fade-in mb-8" style={{animationDelay: '0.6s'}}>
            <Button 
              size="lg" 
              className="bg-gradient-warm hover:opacity-90 transition-all duration-300 shadow-xl text-white text-lg px-10 py-4 h-auto hover-scale group rounded-full font-semibold"
              onClick={() => {
                const emailInput = document.getElementById('waitlist-email') as HTMLInputElement;
                if (emailInput) {
                  emailInput.scrollIntoView({ behavior: 'smooth' });
                  emailInput.focus();
                }
              }}
            >
              GET STARTED
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-in" style={{animationDelay: '0.7s'}}>
            <p className="text-sm text-muted-foreground mb-4 font-medium">Partnerships & Certifications:</p>
            <div className="flex items-center gap-6 mb-8">
              <Badge variant="outline" className="text-xs bg-card/80">
                <Shield className="w-3 h-3 mr-1" />
                Verified Professionals
              </Badge>
              <Badge variant="outline" className="text-xs bg-card/80">
                <Star className="w-3 h-3 mr-1" />
                4.9/5 Rating
              </Badge>
              <Badge variant="outline" className="text-xs bg-card/80">
                <CheckCircle className="w-3 h-3 mr-1" />
                Enterprise Ready
              </Badge>
            </div>
          </div>
        </div>

        {/* 2-Column Layout for Desktop - Simplified Zepcruit Style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto px-4">
          {/* Left Column - Main Content */}
          <div className="order-2 lg:order-1">
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-fade-in max-w-xl" style={{animationDelay: '0.8s'}}>
              Connect with verified professionals in seconds. Give help, get help back. Real expertise when you need it most.
            </p>

            {/* Community Proof - Simplified */}
            <div className="mb-8 animate-fade-in" style={{animationDelay: '1s'}}>
              <div className="flex items-center mb-3">
                <div className="flex -space-x-2">
                  {communityMembers.slice(0, 4).map((member, index) => (
                    <Avatar key={index} className="w-12 h-12 border-2 border-background hover-scale">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-gradient-warm text-white text-sm font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="w-12 h-12 bg-muted/80 border-2 border-background rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-muted-foreground">+496</span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2"></div>
                    <span className="text-lg font-semibold text-foreground">287 online now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Stats - Zepcruit Style */}
            <div className="grid grid-cols-3 gap-6 mb-8 animate-fade-in" style={{animationDelay: '1.2s'}}>
              {trustStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-black text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Interactive Demo with Circular Background */}
          <div className="order-1 lg:order-2 relative animate-fade-in" style={{animationDelay: '0.9s'}}>
            {/* Circular design element behind chat */}
            <div className="absolute inset-0 transform scale-110">
              <div className="w-full h-full bg-gradient-circle rounded-full opacity-60"></div>
            </div>
            
            {/* Chat simulation in front */}
            <div className="relative z-10">
              <ChatSimulation />
            </div>
          </div>
        </div>

        {/* Bottom Section - Welcome Message Zepcruit Style */}
        <div className="text-center max-w-4xl mx-auto pt-20 pb-12 px-4 animate-fade-in" style={{animationDelay: '1.4s'}}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground">
            Welcome to the Future of <br />
            <span className="bg-gradient-warm bg-clip-text text-transparent">Professional Networking</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            HelpPro was born from the idea that peer support should be fast and efficient for professionals. 
            We've reimagined networking to bring not just speed, but also purpose together.
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-warm hover:opacity-90 transition-all duration-300 shadow-xl text-white text-lg px-10 py-4 h-auto hover-scale group rounded-full font-semibold"
          >
            GET STARTED
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;