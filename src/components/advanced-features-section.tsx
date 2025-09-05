import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Zap, Shield, MessageSquare, Star, ArrowRight, CheckCircle } from "lucide-react";

const AdvancedFeaturesSection = () => {
  const challenges = [
    {
      icon: Users,
      title: "Smart Professional Matching",
      description: "Connect with verified IT professionals who have exactly the skills and experience you need for your challenges.",
      features: ["Skill-based matching", "Real-time verification", "Experience rating"],
      color: "bg-orange-50 border-orange-200",
      iconBg: "bg-orange-500"
    },
    {
      icon: Zap,
      title: "Instant Availability Signals",
      description: "Real-time signals show when professionals are available to help, making support predictable and reliable.",
      features: ["Live availability status", "Response time tracking", "Scheduled help sessions"],
      color: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-500"
    },
    {
      icon: Shield,
      title: "Fair Point-Based System",
      description: "Transparent ecosystem where helping others earns points you can use when you need assistance.",
      features: ["Earn by helping", "Transparent pricing", "No hidden costs"],
      color: "bg-green-50 border-green-200",
      iconBg: "bg-green-500"
    },
    {
      icon: MessageSquare,
      title: "Seamless Communication",
      description: "Built-in messaging, video calls, and screen sharing for effective professional collaboration.",
      features: ["Integrated chat", "Video conferencing", "Screen sharing"],
      color: "bg-purple-50 border-purple-200",
      iconBg: "bg-purple-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-orange-600 border-orange-200 bg-orange-50">
            <Star className="w-4 h-4 mr-2" />
            Core Platform Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            How Do We Solve Your <br />
            <span className="text-orange-500">Professional Challenges?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our platform addresses the core challenges IT professionals face when seeking peer support, 
            creating a reliable ecosystem for knowledge sharing and collaboration.
          </p>
        </div>

        {/* Challenges Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {challenges.map((challenge, index) => (
            <Card key={index} className={`p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${challenge.color}`}>
              <CardHeader className="p-0 mb-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${challenge.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <challenge.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-foreground">{challenge.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {challenge.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="space-y-3">
                  {challenge.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
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