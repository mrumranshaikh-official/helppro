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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-secondary/20">
        {/* Animated particles */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-primary rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-40 right-32 w-48 h-48 bg-gradient-hero rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/30 rounded-full blur-lg animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        {/* Tech grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, hsl(var(--accent)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
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

        {/* 2-Column Layout for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-8 sm:py-12">
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left px-4 sm:px-0 order-2 lg:order-1">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 animate-fade-in px-2 sm:px-0" style={{animationDelay: '0.2s'}}>
              <span className="block mb-2 animate-fade-in" style={{animationDelay: '0.3s'}}>
                Get Instant{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent animate-pulse">
                  Peer Support
                </span>
              </span>
              <span className="block animate-fade-in" style={{animationDelay: '0.5s'}}>
                For Your{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Professional Challenges
                </span>
              </span>
            </h1>

            {/* Launching Soon Badge - Below Headline */}
            <div className="flex justify-center lg:justify-start mb-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <Badge className="bg-gradient-primary/10 text-primary border-primary/20 hover-scale px-4 py-2">
                <Rocket className="w-4 h-4 mr-2 animate-pulse" />
                🚀 Launching Soon - Professional Network Revolution
              </Badge>
            </div>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed animate-fade-in px-2 sm:px-0 max-w-2xl mx-auto lg:mx-0" style={{animationDelay: '0.7s'}}>
              Connect with verified professionals in seconds. Give help, get help back. 
              <strong className="text-foreground block sm:inline mt-1 sm:mt-0"> Real expertise when you need it most.</strong>
            </p>

            {/* Community Proof */}
            <div className="mb-8 animate-fade-in" style={{animationDelay: '0.8s'}}>
              <div className="flex items-center justify-center lg:justify-start mb-3">
                <div className="flex -space-x-2">
                  {communityMembers.map((member, index) => (
                    <Avatar key={index} className="w-10 h-10 border-2 border-background hover-scale">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-gradient-primary text-white text-sm">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="w-10 h-10 bg-muted/80 border-2 border-background rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-muted-foreground">+495</span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <span className="text-sm font-medium text-foreground">287 professionals online now</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Join verified IT professionals</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start mb-8 animate-fade-in" style={{animationDelay: '1s'}}>
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg text-lg px-8 py-4 h-auto hover-scale group"
                onClick={() => {
                  const emailInput = document.getElementById('waitlist-email') as HTMLInputElement;
                  if (emailInput) {
                    emailInput.scrollIntoView({ behavior: 'smooth' });
                    emailInput.focus();
                  }
                }}
              >
                Join First 1000 Members Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Trust Stats - Below CTA */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8 animate-fade-in">
              {trustStats.map((stat, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border-primary/20 hover-scale">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center lg:justify-start gap-6 mb-8 animate-fade-in" style={{animationDelay: '1.2s'}}>
              <Badge variant="outline" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Verified Professionals
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Star className="w-3 h-3 mr-1" />
                4.9/5 Rating
              </Badge>
              <Badge variant="outline" className="text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                No-Spam Promise
              </Badge>
            </div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="animate-fade-in order-1 lg:order-2 mb-8 lg:mb-0" style={{animationDelay: '1.4s'}}>
            <ChatSimulation />
            
            {/* Advanced Platform Features */}
            <div className="mt-8 space-y-4">
              <div className="group flex items-center p-4 rounded-xl bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover-scale">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">AI-Powered Matching</h3>
                  <p className="text-sm text-muted-foreground">Smart algorithms connect you with exact expertise</p>
                </div>
              </div>
              
              <div className="group flex items-center p-4 rounded-xl bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-sm border border-border/50 hover:border-accent/30 transition-all duration-300 hover-scale">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">Professional Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Analytics, history, and skill development tracking</p>
                </div>
              </div>
              
              <div className="group flex items-center p-4 rounded-xl bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-sm border border-border/50 hover:border-success/30 transition-all duration-300 hover-scale">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-success transition-colors">Signal System</h3>
                  <p className="text-sm text-muted-foreground">Real-time availability and instant networking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;