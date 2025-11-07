import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Clock, 
  Award, 
  TrendingUp, 
  Users, 
  Shield,
  Zap,
  Target,
  Heart,
  UserPlus,
  HandHeart,
  Coins,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const PlatformDetailsSection = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const features = [
    {
      id: "borderless",
      icon: Globe,
      title: "Global Collaboration",
      subtitle: "Borderless Support",
      description: "Share workloads with professionals worldwide, anytime, anywhere.",
      details: [
        "24/7 global peer network",
        "Multi-language support",
        "Cross-timezone task sharing",
        "Regional skill matching"
      ]
    },
    {
      id: "realtime",
      icon: Clock,
      title: "Real-time Collaboration",
      subtitle: "Instant Connection",
      description: "Connect with peers instantly to tackle tasks together, whenever pressure builds.",
      details: [
        "Instant peer matching",
        "Live collaboration tools",
        "Priority for urgent tasks",
        "Average response: 15 min"
      ]
    },
    {
      id: "verified",
      icon: Award,
      title: "Verified Expertise",
      subtitle: "Trusted Professionals",
      description: "Every member is LinkedIn-verified with comprehensive skill assessments.",
      details: [
        "LinkedIn profile verification",
        "Technical skill assessments",
        "Peer review system",
        "Continuous credibility tracking"
      ]
    },
    {
      id: "fairpoints",
      icon: TrendingUp,
      title: "Fair Point System",
      subtitle: "Balanced Exchange",
      description: "A balanced points economy ensures fair workload sharing across the community.",
      details: [
        "Earn points by sharing your skills",
        "Spend points when workload builds",
        "Transparent contribution tracking",
        "Community-driven fairness"
      ]
    },
    {
      id: "matching",
      icon: Zap,
      title: "AI-Powered Matching",
      subtitle: "Smart Connections",
      description: "Advanced algorithms match you with the right peer to collaborate on your task.",
      details: [
        "Skills-based peer matching",
        "Experience level pairing",
        "Availability optimization",
        "Collaboration success tracking"
      ]
    },
    {
      id: "security",
      icon: Shield,
      title: "Security & Privacy",
      subtitle: "Protected Data",
      description: "Enterprise-grade security ensures your data remains confidential.",
      details: [
        "End-to-end encryption",
        "GDPR compliant",
        "Secure payment processing",
        "Regular security audits"
      ]
    }
  ];

  const howItWorks = [
    {
      id: "join",
      icon: UserPlus,
      step: "01",
      title: "Join & Get Verified",
      description: "Connect your LinkedIn profile and complete skill assessments to establish your professional credentials.",
      details: [
        "Connect LinkedIn profile",
        "Complete skill assessments",
        "Verify professional experience",
        "Set availability preferences"
      ]
    },
    {
      id: "help",
      icon: HandHeart,
      step: "02",
      title: "Collaborate & Contribute",
      description: "Share your expertise to help peers complete tasks and build your points balance.",
      details: [
        "Browse collaboration requests",
        "Accept matching projects",
        "Earn points through contribution",
        "Build your reputation"
      ]
    },
    {
      id: "spend",
      icon: Coins,
      step: "03",
      title: "Share Your Workload",
      description: "Use your earned points to find peers who'll collaborate on tasks when pressure builds.",
      details: [
        "Post your task request",
        "Get matched with skilled peers",
        "Spend points for collaboration",
        "Complete projects together"
      ]
    },
    {
      id: "balance",
      icon: CheckCircle,
      step: "04",
      title: "Maintain Balance",
      description: "The system ensures fairness through balanced contribution and credibility tracking.",
      details: [
        "Automatic balance monitoring",
        "Mandatory payback system",
        "Reputation score tracking",
        "Community feedback"
      ]
    }
  ];

  const mission = [
    {
      id: "vision",
      icon: Target,
      title: "Our Vision",
      description: "Building the world's first peer-to-peer workload sharing platform where professionals reduce pressure and complete projects together.",
      color: "primary"
    },
    {
      id: "problem",
      icon: Users,
      title: "The Problem",
      description: "Professional burnout costs billions annually. Too many talented people struggle alone with workloads that could be shared.",
      color: "destructive"
    },
    {
      id: "solution",
      icon: Shield,
      title: "Our Solution",
      description: "A transparent, peer-to-peer ecosystem where sharing workloads creates value, reduces pressure, and builds genuine community.",
      color: "success"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Platform Overview
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Know About HelpPro
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our platform features, understand how it works, and learn about our mission.
          </p>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 h-14">
            <TabsTrigger value="features" className="text-base">
              <Zap className="w-4 h-4 mr-2" />
              Features
            </TabsTrigger>
            <TabsTrigger value="howworks" className="text-base">
              <Target className="w-4 h-4 mr-2" />
              How It Works
            </TabsTrigger>
            <TabsTrigger value="mission" className="text-base">
              <Heart className="w-4 h-4 mr-2" />
              Our Mission
            </TabsTrigger>
          </TabsList>

          {/* Features Tab */}
          <TabsContent value="features" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  className={cn(
                    "group cursor-pointer transition-all duration-300 hover:shadow-xl border-2",
                    expandedCard === feature.id
                      ? "border-primary bg-gradient-card md:col-span-2 lg:col-span-3"
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => setExpandedCard(expandedCard === feature.id ? null : feature.id)}
                >
                  <CardContent className="p-6">
                    {expandedCard === feature.id ? (
                      // Expanded View
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <Badge variant="outline" className="mb-4">
                            {feature.subtitle}
                          </Badge>
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                              <feature.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold">{feature.title}</h3>
                          </div>
                          <p className="text-lg text-muted-foreground mb-6">
                            {feature.description}
                          </p>
                          <div className="inline-flex items-center text-sm text-primary font-medium">
                            Click to collapse
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-4 text-lg">Key Features:</h4>
                          <div className="space-y-3">
                            {feature.details.map((detail, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <p className="text-foreground">{detail}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Collapsed View
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                          <feature.icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                        <div className="inline-flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                          Learn more
                          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* How It Works Tab */}
          <TabsContent value="howworks" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {howItWorks.map((step, index) => (
                <Card
                  key={step.id}
                  className="group border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-xl"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-2">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <step.icon className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold">{step.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">{step.description}</p>
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mission Tab */}
          <TabsContent value="mission" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 gap-8">
                {mission.map((item) => (
                  <Card
                    key={item.id}
                    className="border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-xl"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-6">
                        <div className={cn(
                          "flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center",
                          item.color === "primary" && "bg-primary/10",
                          item.color === "destructive" && "bg-destructive/10",
                          item.color === "success" && "bg-success/10"
                        )}>
                          <item.icon className={cn(
                            "w-8 h-8",
                            item.color === "primary" && "text-primary",
                            item.color === "destructive" && "text-destructive",
                            item.color === "success" && "text-success"
                          )} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Call to Action */}
                <Card className="border-2 border-primary bg-gradient-primary/5">
                  <CardContent className="p-8 text-center">
                    <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-3">Join Our Community</h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      Join professionals who believe in sharing workloads, reducing pressure, and succeeding together.
                    </p>
                    <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                      Get Started Today
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default PlatformDetailsSection;
