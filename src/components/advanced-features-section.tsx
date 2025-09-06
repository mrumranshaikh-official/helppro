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
    <section id="features" className="py-20 bg-muted/30">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {coreFeatures.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-elegant transition-all duration-300 hover-scale">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Platform Preview */}
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-4 h-4 mr-2" />
                Platform Preview
              </Badge>
              <h3 className="text-3xl font-bold mb-4">Professional Dashboard</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your central hub for managing connections, tracking your contributions, and discovering opportunities 
                to help fellow IT professionals while growing your own career.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">Track your helping points and achievements</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm">Manage your availability and skills</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-sm">Connect with verified professionals</span>
                </div>
              </div>
              <Button className="bg-gradient-primary hover:opacity-90">
                Join Waitlist
              </Button>
            </div>
            <div className="relative">
              <div className="bg-card rounded-2xl p-6 border border-border shadow-elegant">
                <h4 className="font-semibold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Available Professionals
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mr-3">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">Frontend Developer</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">Available</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mr-3">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">DevOps Engineer</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">Helping</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mr-3">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">Backend Specialist</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">Online</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AdvancedFeaturesSection;