import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Target, Zap, Star, MessageSquare, User, Video } from "lucide-react";

const ChallengesSolutionSection = () => {
  const challenges = [
    "Lengthy & inefficient problem-solving process",
    "High consultation costs & resource dependency", 
    "Limited data for informed decision making",
    "Meetings are time consuming",
    "Assessing expertise & skills is difficult",
    "Delays in project delivery hurt competitiveness",
    "Poor knowledge sharing experience",
    "Struggles with complex technical issues"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-secondary/5">
      <div className="container mx-auto px-4">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How Do We Ease Out Your Professional Challenges
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Side - Challenges */}
          <div>
            <Badge variant="secondary" className="mb-6 text-sm font-semibold px-4 py-2">
              THE CHALLENGES
            </Badge>
            
            <Card className="bg-muted/30 border border-border/50 rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        index === 0
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-transparent text-muted-foreground hover:bg-muted/30"
                      }`}
                    >
                      <p className="text-sm font-medium">
                        {challenge}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Solutions */}
          <div>
            <Badge variant="default" className="mb-6 text-sm font-semibold px-4 py-2">
              <span className="text-primary">HELP</span>PRO SOLUTION
            </Badge>
            
            <Card className="bg-card border border-border/50 rounded-3xl overflow-hidden mb-8">
              <CardContent className="p-8">
                {/* Illustration Area */}
                <div className="flex items-center justify-center min-h-[280px] relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl mb-6">
                  {/* Central figure */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-primary-foreground" />
                    </div>
                    
                    {/* Floating elements around */}
                    <div className="absolute -top-4 -left-8 w-10 h-10 bg-secondary rounded-full flex items-center justify-center animate-bounce">
                      <Clock className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    
                    <div className="absolute -top-4 -right-8 w-10 h-10 bg-accent rounded-full flex items-center justify-center animate-bounce delay-100">
                      <Star className="h-5 w-5 text-accent-foreground" />
                    </div>
                    
                    <div className="absolute -bottom-4 left-6 w-8 h-8 bg-muted rounded-lg flex items-center justify-center animate-pulse">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </div>
                    
                    <div className="absolute top-6 -right-12 bg-card border border-border rounded-lg p-2 shadow-lg">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Solution Features Grid */}
            <div className="grid gap-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-card/50 border border-border/30 rounded-2xl hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      AI-Driven Expert Matching
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Automatically connects you with verified professionals based on your specific needs and expertise requirements.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border border-border/30 rounded-2xl hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Automated Scheduling
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Professionals respond at their convenience, eliminating scheduling conflicts and delays.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border border-border/30 rounded-2xl hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      AI-Powered Support Sessions
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      HelpPro facilitates tailored sessions autonomously, drastically reducing time-to-solution.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengesSolutionSection;