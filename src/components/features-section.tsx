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
  const allFeatures = [
    {
      icon: Globe,
      title: "Borderless Network",
      description: "Connect with IT professionals worldwide. No geographical limitations."
    },
    {
      icon: Clock,
      title: "Real-time Assistance",
      description: "Get help 24/7 across all time zones for immediate support."
    },
    {
      icon: Award,
      title: "Verified Expertise",
      description: "LinkedIn-verified professionals with skill assessments."
    },
    {
      icon: TrendingUp,
      title: "Fair Point System",
      description: "Transparent points economy ensures fair exchange."
    },
    {
      icon: Users,
      title: "Credibility Tracking",
      description: "Build reputation through consistent help and quality work."
    },
    {
      icon: Shield,
      title: "Mandatory Payback",
      description: "System-enforced reciprocity ensures everyone contributes."
    },
    {
      icon: Zap,
      title: "Instant Matching",
      description: "AI-powered matching connects you with the right expert."
    },
    {
      icon: Target,
      title: "Skill-based Routing",
      description: "Reach professionals with exact expertise you need."
    },
    {
      icon: Heart,
      title: "Burnout Prevention",
      description: "Share the load and create sustainable work-life balance."
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Discover all the features and benefits HelpPro offers
          </h2>
        </div>

        {/* All Features in One Box */}
        <Card className="border-border shadow-xl">
          <CardContent className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allFeatures.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeaturesSection;