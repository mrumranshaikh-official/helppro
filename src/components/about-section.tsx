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

        {/* Founder Section */}
        <div className="bg-gradient-secondary rounded-3xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4">
                Meet the Founder
              </Badge>
              <h3 className="text-3xl font-bold mb-4">Umran Shaikh</h3>
              <p className="text-primary font-medium">Founder & Visionary</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Founder Avatar */}
              <div className="text-center lg:text-left">
                <Avatar className="w-32 h-32 mx-auto lg:mx-0 mb-4">
                  <AvatarImage src="/api/placeholder/200/200" alt="Umran Shaikh" />
                  <AvatarFallback className="bg-gradient-primary text-white text-2xl">US</AvatarFallback>
                </Avatar>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center lg:justify-start">
                    <Phone className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-sm">+91 80551 01869</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start">
                    <Mail className="w-4 h-4 mr-2 text-primary" />
                    <a href="mailto:mrumranshaikh@gmail.com" className="text-sm hover:text-primary transition-colors">
                      mrumranshaikh@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start">
                    <Instagram className="w-4 h-4 mr-2 text-primary" />
                    <a href="https://instagram.com/umran_80.ig" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
                      @umran_80.ig
                    </a>
                  </div>
                </div>
              </div>

              {/* Founder Message */}
              <div className="lg:col-span-2">
                <blockquote className="text-lg leading-relaxed text-muted-foreground italic mb-6">
                  "I envision HelpPro as a powerful, trusted support system—where verified professionals stand by each other during moments of overload, stress or uncertainty. In today's high-pressure work culture, no professional should ever feel isolated or without options."
                </blockquote>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Recent tragic losses including the suicides of IT professionals burdened by burnout are a wake-up call. These aren't just headlines, they are lives that could have been saved with timely support, empathy and a system that values people over deadlines.
                  </p>
                  
                  <p>
                    Though I don't come from an IT background, I come with a deep desire to build something revolutionary. HelpPro is my answer—a transparent points-based ecosystem where helping others earns value and asking for help is seen as strength, not weakness.
                  </p>
                  
                  <p className="font-medium text-foreground">
                    HelpPro is more than a tool, it's my commitment to a fairer, more humane professional world.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-8 pt-8 border-t border-border">
              <h4 className="text-xl font-semibold mb-4">Want to Connect?</h4>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline">
                  <Instagram className="w-4 h-4 mr-2" />
                  Follow on Instagram
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;