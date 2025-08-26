import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Instagram, Heart, Target, Users, Shield } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Heart className="w-4 h-4 mr-2" />
            About HelpPro
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Mission</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building a fairer, more humane professional world where no IT professional feels isolated or without support.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="text-center p-6 hover:shadow-elegant transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-muted-foreground">
              Turn spare time into shared success. Create the first real-time borderless human safety net for the tech industry.
            </p>
          </Card>

          <Card className="text-center p-6 hover:shadow-elegant transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">The Problem</h3>
            <p className="text-muted-foreground">
              IT burnout costs billions annually. Too many skilled professionals work in isolation without immediate, reliable help.
            </p>
          </Card>

          <Card className="text-center p-6 hover:shadow-elegant transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Solution</h3>
            <p className="text-muted-foreground">
              A transparent, points-based ecosystem where helping others earns value and asking for help is seen as strength.
            </p>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-secondary rounded-3xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6">
              Join the Revolution
            </Badge>
            <h3 className="text-3xl font-bold mb-6">Ready to Transform Your Professional Network?</h3>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be among the first to experience a professional platform built for collaboration, growth, and mutual success.
            </p>
            
            <div className="text-center">
              <Button className="bg-gradient-primary hover:opacity-90 mr-4">
                <Mail className="w-4 h-4 mr-2" />
                Join Waitlist
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;