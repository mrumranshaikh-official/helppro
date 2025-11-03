import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, Code, Database, Globe, Shield } from "lucide-react";

const CommunitySection = () => {
  const professionals = [
    {
      name: "Sarah Chen",
      role: "Senior DevOps Engineer",
      company: "TechCorp",
      points: 2850,
      skills: ["AWS", "Kubernetes", "CI/CD", "Docker"],
      avatar: "/api/placeholder/100/100",
      rating: 4.9,
      helps: 127,
      availability: "Available this week"
    },
    {
      name: "Marcus Rodriguez",
      role: "Full Stack Developer",
      company: "StartupXYZ",
      points: 1920,
      skills: ["React", "Node.js", "PostgreSQL", "TypeScript"],
      avatar: "/api/placeholder/100/100",
      rating: 4.8,
      helps: 89,
      availability: "Available weekends"
    },
    {
      name: "Aisha Patel",
      role: "QA Engineering Lead",
      company: "InnovateLabs",
      points: 3100,
      skills: ["Automation Testing", "Selenium", "Jest", "Cypress"],
      avatar: "/api/placeholder/100/100",
      rating: 5.0,
      helps: 156,
      availability: "Available evenings"
    },
    {
      name: "David Kim",
      role: "Security Engineer",
      company: "CyberSecure Inc",
      points: 2340,
      skills: ["Penetration Testing", "OWASP", "Security Audits"],
      avatar: "/api/placeholder/100/100",
      rating: 4.7,
      helps: 92,
      availability: "Available this week"
    }
  ];

  return (
    <section id="community" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Users className="w-4 h-4 mr-2" />
            Community
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our <span className="bg-gradient-primary bg-clip-text text-transparent">Verified Professionals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with skilled IT professionals ready to help. Each member is verified with real credentials and workplace proof.
          </p>
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {professionals.map((professional, index) => (
            <Card key={index} className="hover:shadow-elegant transition-all duration-300 border-primary/10">
              <CardHeader className="text-center pb-4">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={professional.avatar} alt={professional.name} />
                  <AvatarFallback className="bg-gradient-primary text-white text-lg">
                    {professional.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{professional.name}</h3>
                <p className="text-muted-foreground text-sm">{professional.role}</p>
                <p className="text-primary text-sm font-medium">{professional.company}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Points & Rating */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{professional.rating}</span>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary">
                    {professional.points} pts
                  </Badge>
                </div>

                {/* Skills */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {professional.skills.slice(0, 3).map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {professional.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{professional.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="text-xs text-muted-foreground">
                  <p>Helped {professional.helps} times</p>
                  <p className="text-green-600">{professional.availability}</p>
                </div>

                <Button size="sm" className="w-full">
                  Request Help
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="inline-block p-8 bg-gradient-secondary border-primary/20">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Join Our Verified Network</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Connect with 500+ verified IT professionals. Help others, earn points, and get the support you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-gradient-primary hover:opacity-90">
                Join Community
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;