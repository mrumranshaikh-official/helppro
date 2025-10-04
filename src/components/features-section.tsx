import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Clock, 
  Award, 
  TrendingUp, 
  Users, 
  Shield,
  Zap,
  Target,
  Heart
} from "lucide-react";

const FeaturesSection = () => {
  const primaryFeatures = [
    {
      icon: Globe,
      title: "Borderless Network",
      description: "Connect with IT professionals worldwide. No geographical limitations, just global expertise at your fingertips.",
      highlight: "Global Reach"
    },
    {
      icon: Clock,
      title: "Real-time Assistance",
      description: "Get help when you need it most. Our network operates 24/7 across all time zones for immediate support.",
      highlight: "24/7 Support"
    },
    {
      icon: Award,
      title: "Verified Expertise",
      description: "Every member is LinkedIn-verified with skill assessments. Work with proven professionals you can trust.",
      highlight: "Verified Skills"
    }
  ];

  const secondaryFeatures = [
    {
      icon: TrendingUp,
      title: "Fair Point System",
      description: "Transparent points economy ensures fair exchange. Help others, earn points, get help when needed."
    },
    {
      icon: Users,
      title: "Credibility Tracking",
      description: "Build your professional reputation through consistent help and quality work."
    },
    {
      icon: Shield,
      title: "Mandatory Payback",
      description: "System-enforced reciprocity ensures everyone contributes to the community."
    },
    {
      icon: Zap,
      title: "Instant Matching",
      description: "AI-powered matching connects you with the right expert for your specific needs."
    },
    {
      icon: Target,
      title: "Skill-based Routing",
      description: "Your requests reach professionals with the exact expertise you need."
    },
    {
      icon: Heart,
      title: "Burnout Prevention",
      description: "Share the load, reduce stress, and create a sustainable work-life balance."
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Built for{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Modern Professionals
            </span>
          </h2>
        </div>

        {/* Primary Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {primaryFeatures.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden bg-gradient-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <Badge variant="outline" className="group-hover:border-primary transition-colors">
                    {feature.highlight}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Secondary Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryFeatures.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:bg-card hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-primary flex-shrink-0">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;