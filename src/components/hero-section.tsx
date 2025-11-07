import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Shield, TrendingUp, Rocket, Star, Clock, CheckCircle } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import PeerSupportPopup from "@/components/peer-support-popup";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
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
      {/* Refined Circular Graphics */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main hero circle - subtle and clean */}
        <div className="absolute top-10 right-10 w-96 h-96 lg:w-[600px] lg:h-[600px] bg-gradient-warm rounded-full opacity-20 transition-opacity duration-1000"></div>
        
        {/* Smaller accent circles - minimal and refined */}
        <div className="absolute top-40 right-20 w-32 h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-accent/10 to-primary/8 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 lg:w-36 lg:h-36 bg-gradient-to-br from-primary/8 to-accent/6 rounded-full blur-3xl"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
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

        {/* Desktop: Side-by-Side Layout */}
        <div className="pt-20 sm:pt-24 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Hero Content */}
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black leading-[1.1] mb-8 tracking-tight">
                <span className="block animate-fade-in" style={{animationDelay: '0.1s'}}>
                  <span className="text-foreground">Share Workloads,</span>
                </span>
                <span className="block animate-fade-in" style={{animationDelay: '0.2s'}}>
                  <span className="bg-gradient-warm bg-clip-text text-transparent">Complete Projects</span>
                </span>
                <span className="block animate-fade-in text-foreground" style={{animationDelay: '0.3s'}}>
                  Together With Peers
                </span>
              </h1>

              {/* CTA Button */}
              <div className="animate-fade-in mb-8 lg:mb-0" style={{animationDelay: '0.6s'}}>
                <Button 
                  size="lg" 
                  className="bg-gradient-warm hover:shadow-lg transition-all duration-500 shadow-md text-white text-lg px-10 py-4 h-auto group rounded-full font-semibold transform hover:scale-105"
                  onClick={() => navigate('/auth')}
                >
                  GET STARTED
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>

            {/* Right Column - Interactive Demo with Enhanced Animations */}
            <div className="relative animate-fade-in lg:pl-8" style={{animationDelay: '0.4s'}}>
              {/* Circular design element behind chat */}
              <div className="absolute inset-0 transform scale-110">
                <div className="w-full h-full bg-gradient-circle rounded-full opacity-60"></div>
              </div>
              
              {/* Peer Support Popup */}
              <div className="relative z-10">
                <PeerSupportPopup />
              </div>
            </div>
          </div>
        </div>

        {/* Below Hero - Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Main Content */}
          <div className="order-2 lg:order-1">
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-fade-in max-w-xl" style={{animationDelay: '0.8s'}}>
              Connect with verified professionals. Collaborate on tasks, reduce pressure, and complete work together. Real peer support when you need it most.
            </p>

            {/* Community Proof - Simplified */}
            <div className="mb-8 animate-fade-in" style={{animationDelay: '1s'}}>
              <div className="flex items-center mb-3">
                <div className="flex -space-x-2">
                  {communityMembers.slice(0, 4).map((member, index) => (
                    <Avatar key={index} className="w-12 h-12 border-2 border-background transition-transform duration-300 hover:scale-110">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-gradient-warm text-white text-sm font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="w-12 h-12 bg-muted border-2 border-background rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-muted-foreground">+496</span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" style={{animationDuration: '2s'}}></div>
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

          {/* Right Column - Spacer for layout balance on desktop */}
          <div className="order-1 lg:order-2 hidden lg:block"></div>
        </div>

        {/* Bottom Section - Welcome Message Zepcruit Style */}
        <div className="text-center max-w-4xl mx-auto pt-20 pb-12 px-4 animate-fade-in" style={{animationDelay: '1.4s'}}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground">
            Welcome to the Future of <br />
            <span className="bg-gradient-warm bg-clip-text text-transparent">Workload Sharing</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            HelpPro was built on the belief that professionals shouldn't work in isolation. 
            We've created a platform where teams collaborate, share tasks, and reduce pressure together.
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-warm hover:shadow-lg transition-all duration-500 shadow-md text-white text-lg px-10 py-4 h-auto group rounded-full font-semibold transform hover:scale-105"
            onClick={() => navigate('/auth')}
          >
            GET STARTED
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;