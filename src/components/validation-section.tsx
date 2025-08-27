import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  DollarSign,
  Trophy,
  Briefcase
} from "lucide-react";

const ValidationSection = () => {
  const alternatives = [
    {
      name: "LinkedIn",
      icon: Users,
      drawbacks: ["Too broad, focuses on connections", "No real-time help system", "Unreliable for urgent assistance"],
      status: "limited"
    },
    {
      name: "Upwork/Fiverr",
      icon: DollarSign,
      drawbacks: ["Transaction-focused, not community", "No trust-building system", "Expensive for quick help"],
      status: "expensive"
    },
    {
      name: "Personal Networks",
      icon: Users,
      drawbacks: ["Limited reach and expertise", "Unreliable availability", "Awkward to ask repeatedly"],
      status: "unreliable"
    }
  ];

  const mvpFeatures = [
    { feature: "Simple LinkedIn verification", priority: "Must-have" },
    { feature: "Post & match help requests", priority: "Must-have" },
    { feature: "Expertise showcase profiles", priority: "Must-have" },
    { feature: "Controlled messaging system", priority: "Must-have" },
    { feature: "Trust signals & gamification", priority: "Must-have" },
    { feature: "Advanced analytics dashboard", priority: "Nice-to-have" },
    { feature: "Video call integration", priority: "Nice-to-have" }
  ];

  const monetizationStreams = [
    {
      title: "Top-up Points",
      description: "Buy extra points for urgent help when your balance is low",
      icon: Zap
    },
    {
      title: "Premium Mentorship",
      description: "Connect with senior professionals for career guidance",
      icon: Trophy
    },
    {
      title: "Hiring Partnerships",
      description: "Companies scout top helpers and post hiring opportunities",
      icon: Briefcase
    }
  ];

  return (
    <section id="validation" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Target className="w-4 h-4 mr-2" />
            Market Validation
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Why <span className="bg-gradient-primary bg-clip-text text-transparent">HelpPro</span> Now?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Current solutions fall short. We're building what professionals actually need: 
            a trusted, skill-based help exchange that puts community over profit.
          </p>
        </div>

        {/* Current Alternatives Comparison */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Current Alternatives & Their Limitations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alternatives.map((alt, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <alt.icon className="w-5 h-5 mr-2" />
                    {alt.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {alt.drawbacks.map((drawback, idx) => (
                      <div key={idx} className="flex items-start">
                        <XCircle className="w-4 h-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{drawback}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* HelpPro's Edge */}
        <div className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">HelpPro's Unique Edge</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We blend professional credibility with community-driven assistance, enabling quick, 
                trustworthy, skill-based help that actually works.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Verified Only</h4>
                <p className="text-sm text-muted-foreground">LinkedIn + skills verification</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Fair Point Exchange</h4>
                <p className="text-sm text-muted-foreground">Transparent, mandatory payback</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Real-time Matching</h4>
                <p className="text-sm text-muted-foreground">Instant skill-based connections</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Example User Flow */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Real-World Example</h3>
          <Card className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Developer's Challenge</h4>
                <p className="text-sm text-muted-foreground">Sarah needs API endpoints while building frontend UI</p>
              </div>
              <ArrowRight className="hidden lg:block w-6 h-6 text-primary mx-auto" />
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Quick Match</h4>
                <p className="text-sm text-muted-foreground">Posts "Help Needed: API Setup" and gets matched instantly</p>
              </div>
              <ArrowRight className="hidden lg:block w-6 h-6 text-primary mx-auto" />
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Efficient Solution</h4>
                <p className="text-sm text-muted-foreground">API expert helps while Sarah focuses on frontend</p>
              </div>
            </div>
          </Card>
        </div>

        {/* MVP Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>MVP Launch Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mvpFeatures.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{item.feature}</span>
                    <Badge variant={item.priority === "Must-have" ? "default" : "secondary"}>
                      {item.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Launch Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-sm">Web-first platform (not mobile app)</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-sm">Target verified IT professionals only</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-sm">Early-access leaderboard challenges</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-sm">Seed with experienced mentors</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-sm">Highlight successful matches publicly</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monetization Preview */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Sustainable Monetization</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {monetizationStreams.map((stream, index) => (
              <Card key={index} className="text-center p-6">
                <stream.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">{stream.title}</h4>
                <p className="text-sm text-muted-foreground">{stream.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Formula */}
        <Card className="p-8 text-center bg-gradient-primary">
          <h3 className="text-2xl font-bold text-white mb-4">Our Success Formula</h3>
          <p className="text-white/90 text-lg mb-6">
            Validate demand → Build core features → Focus on trust & convenience → 
            Make it professional-only → Monetize fairly
          </p>
          <Button variant="secondary" size="lg">
            Join the Validation
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default ValidationSection;