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
            A Different Approach to <span className="bg-gradient-primary bg-clip-text text-transparent">Professional Collaboration</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Traditional platforms focus on networking or transactions. 
            We focus on peer-to-peer workload sharing and real collaboration.
          </p>
        </div>


        {/* Live Community Activity */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Live Community Activity</h3>
          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/20 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">SJ</span>
                </div>
                <div>
                  <p className="font-medium">Sarah J. - Frontend Dev</p>
                  <p className="text-sm text-muted-foreground">Task: React testing setup collaboration</p>
                </div>
              </div>
              <Badge variant="secondary">2 min ago</Badge>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/20 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">MK</span>
                </div>
                <div>
                  <p className="font-medium">Mike K. - DevOps</p>
                  <p className="text-sm text-muted-foreground">Sharing: Docker optimization expertise</p>
                </div>
              </div>
              <Badge className="bg-green-500 text-white">Available</Badge>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/20 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">AL</span>
                </div>
                <div>
                  <p className="font-medium">Alex L. - Designer</p>
                  <p className="text-sm text-muted-foreground">Completed: UX audit collaboration ✓</p>
                </div>
              </div>
              <Badge variant="outline">+15 points</Badge>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ValidationSection;