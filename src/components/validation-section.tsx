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

        {/* Success Promise */}
        <Card className="p-8 text-center bg-gradient-primary">
          <h3 className="text-2xl font-bold text-white mb-4">Join the Professional Revolution</h3>
          <p className="text-white/90 text-lg mb-6">
            Be part of a community where helping others creates real professional value. 
            No corporate politics, just skilled professionals supporting each other.
          </p>
          <Button variant="secondary" size="lg">
            Get Early Access
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default ValidationSection;