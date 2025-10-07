import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2 } from "lucide-react";

const PeerSupportPopup = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-2 bg-card/95 backdrop-blur-sm animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl md:text-3xl font-bold text-center bg-gradient-warm bg-clip-text text-transparent">
          Get Instant Peer Support For Your Professional Challenges
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Task Shared */}
        <div className="bg-muted/50 rounded-lg p-5 border border-border/50 space-y-3">
          <div className="flex items-start gap-3">
            <div className="text-3xl">👩‍💻</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-foreground">Ananya</span>
                <Badge variant="secondary" className="text-xs">shared a task</Badge>
              </div>
              <p className="text-muted-foreground italic">
                "Designing a responsive dashboard layout using Tailwind CSS for an admin panel."
              </p>
            </div>
          </div>
        </div>

        {/* Task Accepted */}
        <div className="bg-success/10 rounded-lg p-5 border border-success/30 space-y-3">
          <div className="flex items-start gap-3">
            <div className="text-3xl">🤝</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-foreground">Ravi</span>
                <Badge className="text-xs bg-success text-success-foreground">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  accepted this task
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>will complete it in <strong className="text-foreground">4 hours</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center pt-2">
          <p className="text-sm text-muted-foreground">
            Join hundreds of professionals helping each other succeed
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeerSupportPopup;
