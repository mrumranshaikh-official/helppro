import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Zap, Shield, MessageSquare } from "lucide-react";

const AdvancedFeaturesSection = () => {
  const coreFeatures = [
    {
      icon: Users,
      title: "Smart Matching",
      description: "Connect with IT professionals who have the exact skills you need, when you need them."
    },
    {
      icon: Zap,
      title: "Signal System",
      description: "Real-time availability signals let professionals know when you're open to help or need assistance."
    },
    {
      icon: Shield,
      title: "Point System",
      description: "Transparent points-based ecosystem where helping others creates value for everyone."
    },
    {
      icon: MessageSquare,
      title: "Instant Communication",
      description: "Built-in messaging and video calls for seamless professional collaboration."
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Users className="w-4 h-4 mr-2" />
            Core Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Core <span className="bg-gradient-primary bg-clip-text text-transparent">Platform</span> Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A simple, transparent platform connecting IT professionals for mutual support and growth.
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreFeatures.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover-scale">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeaturesSection;