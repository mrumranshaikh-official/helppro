import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Zap, Target, Search } from "lucide-react";
import { MatchedHelpersDialog } from "@/components/matched-helpers-dialog";

export const SkillMatchingDemo = () => {
  const [showMatchDialog, setShowMatchDialog] = useState(false);
  const [demoRequestId, setDemoRequestId] = useState("");

  // Example help requests for demo
  const exampleRequests = [
    {
      id: "example-1",
      title: "React Performance Optimization",
      tech_stack: ["React", "JavaScript", "Performance"],
      category: "Frontend Development"
    },
    {
      id: "example-2", 
      title: "PostgreSQL Query Optimization",
      tech_stack: ["PostgreSQL", "SQL", "Database"],
      category: "Backend & APIs"
    },
    {
      id: "example-3",
      title: "AWS Lambda Deployment Issue",
      tech_stack: ["AWS", "Lambda", "DevOps"],
      category: "DevOps & Security"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Target className="w-4 h-4 mr-2" />
            Smart Matching System
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI-Powered{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Skill Matching
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our intelligent matching system connects your help requests with professionals
            who have the exact skills you need.
          </p>
        </div>

        {/* How It Works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">1. Analyze Request</h3>
            <p className="text-sm text-muted-foreground">
              System analyzes your tech stack and requirements
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">2. Find Matches</h3>
            <p className="text-sm text-muted-foreground">
              Finds professionals with matching skills and experience
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">3. Ranked Results</h3>
            <p className="text-sm text-muted-foreground">
              Get ranked list based on skills, reputation, and availability
            </p>
          </Card>
        </div>

        {/* Demo Section */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Try the Matching System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Custom Request ID */}
            <div>
              <Label htmlFor="request-id">Enter Help Request ID</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="request-id"
                  placeholder="e.g., 123e4567-e89b-12d3-a456-426614174000"
                  value={demoRequestId}
                  onChange={(e) => setDemoRequestId(e.target.value)}
                />
                <Button
                  onClick={() => setShowMatchDialog(true)}
                  disabled={!demoRequestId.trim()}
                >
                  Find Matches
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Note: This requires an actual help request ID from the database
              </p>
            </div>

            {/* Example Requests */}
            <div>
              <Label className="mb-3 block">Or Try These Examples:</Label>
              <div className="space-y-3">
                {exampleRequests.map((request) => (
                  <Card key={request.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{request.title}</h4>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {request.tech_stack.map((tech, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">{request.category}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setDemoRequestId(request.id);
                          setShowMatchDialog(true);
                        }}
                      >
                        Find Matches
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Match Score Calculation
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>Skill Match (40%):</strong> Number of matching skills</li>
                <li>• <strong>Reputation (30%):</strong> Helper's points and history</li>
                <li>• <strong>Proficiency (30%):</strong> Expert level in required skills</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Matched Helpers Dialog */}
        <MatchedHelpersDialog
          open={showMatchDialog}
          onOpenChange={setShowMatchDialog}
          helpRequestId={demoRequestId}
        />
      </div>
    </section>
  );
};