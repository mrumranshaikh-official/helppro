import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Send,
  Code2,
  Database,
  Shield,
  Globe,
  Smartphone,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

const HelpRequestSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    urgency: "",
    description: "",
    techStack: "",
  });

  const categories = [
    { icon: Code2, name: "Frontend Development", requests: 45 },
    { icon: Database, name: "Backend & APIs", requests: 38 },
    { icon: Shield, name: "DevOps & Security", requests: 29 },
    { icon: Globe, name: "Web Technologies", requests: 52 },
    { icon: Smartphone, name: "Mobile Development", requests: 23 },
    { icon: Monitor, name: "System Administration", requests: 31 },
  ];

  const recentRequests = [
    {
      title: "Need help debugging React useEffect infinite loop",
      category: "Frontend",
      urgency: "Medium",
      timeAgo: "2 hours ago",
      points: 25,
      status: "open",
    },
    {
      title: "PostgreSQL query optimization for large dataset",
      category: "Backend",
      urgency: "High",
      timeAgo: "4 hours ago",
      points: 40,
      status: "open",
    },
    {
      title: "Docker container won't start after deployment",
      category: "DevOps",
      urgency: "High",
      timeAgo: "6 hours ago",
      points: 35,
      status: "resolved",
    },
    {
      title: "CSS Grid layout issues on mobile devices",
      category: "Frontend",
      urgency: "Low",
      timeAgo: "1 day ago",
      points: 15,
      status: "open",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form fields
    if (!formData.title || !formData.category || !formData.urgency || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Show success message
    toast({
      title: "Help Request Submitted!",
      description: "Your request has been posted. You'll be notified when someone responds.",
    });

    // Reset form
    setFormData({
      title: "",
      category: "",
      urgency: "",
      description: "",
      techStack: "",
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Share Tasks or{" "}
            <span className="bg-gradient-warm bg-clip-text text-transparent">
              Collaborate on Projects
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with peers for real-time collaboration. Fair, transparent, and
            built on shared workloads.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Request Help Form */}
          <Card className="bg-card border-border">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Send className="w-5 h-5 text-primary" />
                <h3 className="text-2xl font-bold">Share a Task</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">What task do you need support with?</Label>
                  <Input
                    id="title"
                    placeholder="Brief description of the task..."
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger id="category" className="mt-2">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend Development</SelectItem>
                        <SelectItem value="backend">Backend & APIs</SelectItem>
                        <SelectItem value="devops">DevOps & Security</SelectItem>
                        <SelectItem value="web">Web Technologies</SelectItem>
                        <SelectItem value="mobile">Mobile Development</SelectItem>
                        <SelectItem value="system">System Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="urgency">Urgency</Label>
                    <Select
                      value={formData.urgency}
                      onValueChange={(value) =>
                        setFormData({ ...formData, urgency: value })
                      }
                    >
                      <SelectTrigger id="urgency" className="mt-2">
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the task, what you've tried so far, and what collaboration you're looking for..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                <div>
                  <Label htmlFor="techStack">Technology Stack</Label>
                  <Input
                    id="techStack"
                    placeholder="e.g., React, Node.js, PostgreSQL, AWS..."
                    value={formData.techStack}
                    onChange={(e) =>
                      setFormData({ ...formData, techStack: e.target.value })
                    }
                    className="mt-2"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-warm hover:shadow-lg transition-all duration-300 text-white"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Share Task
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Popular Help Categories */}
          <div className="space-y-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-6">
                  Popular Collaboration Areas
                </h3>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <category.icon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary">
                        {category.requests} active
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-border">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-black text-primary mb-1">
                      24/7
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Support Available
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-primary mb-1">
                      15min
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg Response
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-primary mb-1">
                      95%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Success Rate
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Help Requests */}
        <Card className="bg-card border-border">
          <CardContent className="p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">Recent Collaboration Requests</h3>
            <div className="space-y-4">
              {recentRequests.map((request, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">
                      {request.status === "resolved" ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{request.title}</h4>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {request.category}
                        </Badge>
                        <Badge
                          variant={getUrgencyColor(request.urgency) as any}
                          className="text-xs"
                        >
                          {request.urgency}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {request.timeAgo}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary mb-1">
                      {request.points} pts
                    </div>
                    {request.status === "open" && (
                      <Button size="sm" variant="outline">
                        Collaborate
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HelpRequestSection;
