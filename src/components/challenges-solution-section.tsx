import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Clock, Target, Zap, Star, MessageSquare } from "lucide-react";

const ChallengesSolutionSection = () => {
  const challenges = [
    {
      title: "Struggling with complex technical problems",
      highlighted: true
    },
    {
      title: "Limited access to expert knowledge",
      highlighted: false
    },
    {
      title: "Time-consuming research and troubleshooting", 
      highlighted: false
    },
    {
      title: "Lack of real-time professional guidance",
      highlighted: false
    },
    {
      title: "Difficulty finding industry-specific expertise",
      highlighted: false
    },
    {
      title: "Inefficient knowledge sharing in teams",
      highlighted: false
    },
    {
      title: "High costs of external consultancy",
      highlighted: false
    },
    {
      title: "Delayed project deliveries due to blockers",
      highlighted: false
    }
  ];

  const solutions = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Instant Expert Matching",
      description: "Connect with verified professionals in your field within minutes using our AI-powered matching system."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-Time Support",
      description: "Get immediate help through live chat, video calls, and screen sharing with industry experts."
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Quality Assurance",
      description: "All experts are verified professionals with proven track records and peer ratings for reliability."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-secondary/10">
      <div className="container mx-auto px-4">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How Do We Solve Your Professional Challenges
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Challenges Section */}
          <div className="space-y-6">
            <div className="mb-8">
              <Badge variant="secondary" className="text-sm font-semibold px-4 py-2 bg-muted">
                THE CHALLENGES
              </Badge>
            </div>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 space-y-4">
                {challenges.map((challenge, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg transition-all duration-300 ${
                      challenge.highlighted
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    <p className={`text-sm font-medium ${
                      challenge.highlighted ? "text-primary-foreground" : ""
                    }`}>
                      {challenge.title}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Solutions Section */}
          <div className="space-y-6">
            <div className="mb-8">
              <Badge variant="default" className="text-sm font-semibold px-4 py-2">
                <span className="text-primary font-bold">HELP</span>
                <span className="text-foreground">PRO SOLUTION</span>
              </Badge>
            </div>

            {/* Illustration Area */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-8">
              <CardContent className="p-8">
                <div className="flex items-center justify-center min-h-[300px] relative">
                  {/* Central Hub */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <Users className="h-10 w-10 text-primary-foreground" />
                    </div>
                  </div>
                  
                  {/* Orbiting Elements */}
                  <div className="relative w-full h-full">
                    {/* Expert Avatars */}
                    <div className="absolute top-8 left-16 w-12 h-12 bg-secondary rounded-full flex items-center justify-center animate-pulse">
                      <CheckCircle className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div className="absolute top-8 right-16 w-12 h-12 bg-accent rounded-full flex items-center justify-center animate-pulse delay-100">
                      <Star className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div className="absolute bottom-8 left-20 w-12 h-12 bg-muted rounded-full flex items-center justify-center animate-pulse delay-200">
                      <MessageSquare className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="absolute bottom-8 right-20 w-12 h-12 bg-primary/70 rounded-full flex items-center justify-center animate-pulse delay-300">
                      <Zap className="h-6 w-6 text-primary-foreground" />
                    </div>
                    
                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="2" cy="2" r="1" fill="currentColor" className="text-primary/20" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#dots)" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Solution Features */}
            <div className="grid gap-6">
              {solutions.map((solution, index) => (
                <Card key={index} className="bg-card/30 backdrop-blur-sm border-border/30 hover:bg-card/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        {solution.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {solution.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengesSolutionSection;