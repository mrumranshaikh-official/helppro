import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Shield,
  Zap,
  Target,
  Heart
} from "lucide-react";

const FeaturesSection = () => {
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

        {/* Features Grid */}
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