import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  BarChart3, 
  Zap, 
  Globe, 
  Shield, 
  Users, 
  Monitor,
  MessageSquare,
  Trophy,
  Clock,
  Target,
  Network
} from "lucide-react";

const AdvancedFeaturesSection = () => {
  const platformFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Professional Matching",
      description: "Advanced algorithms analyze skills, availability, and project requirements to create optimal professional connections.",
      features: ["Smart skill matching", "Availability predictions", "Quality scoring"]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics Dashboard",
      description: "Comprehensive insights into your professional growth, collaboration patterns, and network effectiveness.",
      features: ["Performance metrics", "Growth tracking", "Network analytics"]
    },
    {
      icon: Zap,
      title: "Real-Time Signal System",
      description: "Instant availability signals and smart notifications ensure you never miss important collaboration opportunities.",
      features: ["Status indicators", "Smart alerts", "Priority queuing"]
    },
    {
      icon: Network,
      title: "Professional Network Mapping",
      description: "Visualize and grow your professional network with intelligent relationship mapping and growth recommendations.",
      features: ["Network visualization", "Growth insights", "Connection suggestions"]
    }
  ];

  const dashboardFeatures = [
    { icon: Monitor, title: "Project Dashboard", description: "Track all active collaborations" },
    { icon: MessageSquare, title: "Communication Hub", description: "Centralized messaging and video calls" },
    { icon: Trophy, title: "Achievement System", description: "Gamified professional development" },
    { icon: Clock, title: "Time Tracking", description: "Automated collaboration time logs" },
    { icon: Shield, title: "Security Center", description: "Advanced privacy and security controls" },
    { icon: Target, title: "Goal Setting", description: "Professional growth objectives" }
  ];

  return (
    <section id="advanced-features" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Brain className="w-4 h-4 mr-2" />
            Advanced Platform Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Enterprise-Grade <span className="bg-gradient-primary bg-clip-text text-transparent">Professional Tools</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cutting-edge technology designed for modern professionals who demand efficiency, security, and scalability.
          </p>
        </div>

        {/* Main Platform Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {platformFeatures.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-elegant transition-all duration-300">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <div className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="bg-gradient-secondary rounded-3xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4">
              Professional Dashboard
            </Badge>
            <h3 className="text-3xl font-bold mb-4">Your Command Center</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive dashboard designed for professional efficiency and growth tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardFeatures.map((feature, index) => (
              <Card key={index} className="p-4 bg-card/60 backdrop-blur-sm border border-border hover-scale">
                <div className="flex items-center mb-3">
                  <feature.icon className="w-6 h-6 text-primary mr-3" />
                  <h4 className="font-semibold">{feature.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Signal System Feature */}
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-4 h-4 mr-2" />
                Signal System
              </Badge>
              <h3 className="text-3xl font-bold mb-4">Professional Availability Signals</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Revolutionary real-time signaling system that connects professionals when they need each other most. 
                Smart notifications, availability tracking, and instant collaboration opportunities.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-sm">Available for collaboration</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-sm">Open to quick consultations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-sm">Seeking specific expertise</span>
                </div>
              </div>
              <Button className="bg-gradient-primary hover:opacity-90">
                Learn More About Signals
              </Button>
            </div>
            <div className="relative">
              <div className="bg-card rounded-2xl p-6 border border-border shadow-elegant">
                <h4 className="font-semibold mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-primary" />
                  Live Professional Network
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mr-3">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">Sarah Chen</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">React Expert</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mr-3">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">Alex Rodriguez</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">DevOps Lead</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mr-3">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">Maria Silva</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">Security Arch</Badge>
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