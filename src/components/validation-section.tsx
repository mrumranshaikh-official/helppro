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
            Why HelpPro Works
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Unlike Other <span className="bg-gradient-primary bg-clip-text text-transparent">Professional Platforms</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Existing platforms are either too broad, transaction-focused, or unreliable. 
            We built something different.
          </p>
        </div>

        {/* What Makes Us Different */}
        <div className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Your Professional Safety Net</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A reciprocal community where helping others builds your own professional insurance.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Verified Professionals Only</h4>
                <p className="text-sm text-muted-foreground">Skills + identity verification</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Give & Get System</h4>
                <p className="text-sm text-muted-foreground">Help others to earn help credits</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Instant Matching</h4>
                <p className="text-sm text-muted-foreground">Real-time skill-based connections</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Recognition System</h4>
                <p className="text-sm text-muted-foreground">Build reputation by helping</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Community Preview */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">See It In Action</h3>
          <Card className="p-6 bg-muted/30">
            <div className="text-center mb-6">
              <Badge variant="outline" className="mb-2">Live Preview</Badge>
              <p className="text-muted-foreground">Recent help requests from our early community</p>
            </div>
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">SJ</span>
                  </div>
                  <div>
                    <p className="font-medium">Sarah J. - Frontend Dev</p>
                    <p className="text-sm text-muted-foreground">Needs: React testing setup</p>
                  </div>
                </div>
                <Badge variant="secondary">2 min ago</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">MK</span>
                  </div>
                  <div>
                    <p className="font-medium">Mike K. - DevOps</p>
                    <p className="text-sm text-muted-foreground">Offering: Docker optimization tips</p>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white">Available</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">AL</span>
                  </div>
                  <div>
                    <p className="font-medium">Alex L. - Designer</p>
                    <p className="text-sm text-muted-foreground">Helped: UX audit completed ✓</p>
                  </div>
                </div>
                <Badge variant="outline">+15 points</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Exclusive CTA */}
        <Card className="p-8 text-center bg-gradient-primary">
          <h3 className="text-2xl font-bold text-white mb-4">Be One of the First 1000</h3>
          <p className="text-white/90 text-lg mb-6">
            Early members shape the platform and get lifetime benefits. 
            <strong>Limited spots available.</strong>
          </p>
          <Button variant="secondary" size="lg" className="text-lg px-8">
            Claim Your Spot Now
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default ValidationSection;