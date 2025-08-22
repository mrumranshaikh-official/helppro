import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  HelpCircle, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Code,
  Database,
  Shield,
  Globe,
  Smartphone,
  Monitor
} from "lucide-react";

const HelpSystemSection = () => {
  const helpCategories = [
    { icon: Code, label: "Frontend Development", count: 45 },
    { icon: Database, label: "Backend & APIs", count: 38 },
    { icon: Shield, label: "DevOps & Security", count: 29 },
    { icon: Globe, label: "Web Technologies", count: 52 },
    { icon: Smartphone, label: "Mobile Development", count: 23 },
    { icon: Monitor, label: "System Administration", count: 31 }
  ];

  const recentHelpRequests = [
    {
      id: 1,
      title: "Need help debugging React useEffect infinite loop",
      category: "Frontend",
      urgency: "Medium",
      points: 25,
      timeAgo: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      title: "PostgreSQL query optimization for large dataset",
      category: "Backend",
      urgency: "High",
      points: 40,
      timeAgo: "4 hours ago",
      status: "in-progress"
    },
    {
      id: 3,
      title: "Docker container won't start after deployment",
      category: "DevOps",
      urgency: "High",
      points: 35,
      timeAgo: "6 hours ago",
      status: "completed"
    },
    {
      id: 4,
      title: "CSS Grid layout issues on mobile devices",
      category: "Frontend",
      urgency: "Low",
      points: 15,
      timeAgo: "1 day ago",
      status: "active"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <HelpCircle className="w-4 h-4 text-blue-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return 'text-red-500 border-red-200 bg-red-50';
      case 'Medium':
        return 'text-yellow-600 border-yellow-200 bg-yellow-50';
      case 'Low':
        return 'text-green-600 border-green-200 bg-green-50';
      default:
        return 'text-gray-500 border-gray-200 bg-gray-50';
    }
  };

  return (
    <section id="help-system" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            Help System
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Help or <span className="bg-gradient-primary bg-clip-text text-transparent">Offer Support</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with peers for real-time assistance. Fair, transparent, and built on mutual support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Request Help Form */}
          <Card className="p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="flex items-center">
                <Send className="w-5 h-5 mr-2 text-primary" />
                Request Help
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">What do you need help with?</label>
                <Input placeholder="Brief title of your issue..." />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Urgency</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (15 pts)</SelectItem>
                      <SelectItem value="medium">Medium (25 pts)</SelectItem>
                      <SelectItem value="high">High (40 pts)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Detailed Description</label>
                <Textarea 
                  placeholder="Provide as much detail as possible about your issue, what you've tried, error messages, etc."
                  rows={4}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Technology Stack</label>
                <Input placeholder="e.g., React, Node.js, PostgreSQL, AWS..." />
              </div>
              
              <Button className="w-full bg-gradient-primary hover:opacity-90">
                <Send className="w-4 h-4 mr-2" />
                Submit Help Request
              </Button>
            </CardContent>
          </Card>

          {/* Help Categories */}
          <div className="space-y-6">
            <Card className="p-6">
              <CardHeader className="p-0 mb-6">
                <CardTitle>Popular Help Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 gap-3">
                  {helpCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center">
                        <category.icon className="w-5 h-5 mr-3 text-primary" />
                        <span className="font-medium">{category.label}</span>
                      </div>
                      <Badge variant="secondary">{category.count} requests</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 bg-gradient-secondary">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Available</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">15min</div>
                  <div className="text-sm text-muted-foreground">Avg Response</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Help Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Help Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentHelpRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(request.status)}
                    <div>
                      <h4 className="font-medium">{request.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">{request.category}</Badge>
                        <Badge variant="outline" className={`text-xs ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{request.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{request.points} pts</div>
                    {request.status === 'active' && (
                      <Button size="sm" variant="outline" className="mt-2">
                        Help Now
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

export default HelpSystemSection;