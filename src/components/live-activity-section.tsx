import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Activity, Users, ArrowRight, Zap, CheckCircle, Clock } from "lucide-react";

const LiveActivitySection = () => {
  const [currentActivity, setCurrentActivity] = useState(0);

  const activities = [
    {
      id: 1,
      user: "Sarah Chen",
      role: "DevOps Engineer",
      avatar: "/api/placeholder/40/40",
      action: "needs help with",
      task: "AWS Lambda deployment issues",
      type: "request",
      time: "2 min ago",
      points: 25,
      responses: 3
    },
    {
      id: 2,
      user: "Marcus Rodriguez",
      role: "Full Stack Developer",
      avatar: "/api/placeholder/40/40",
      action: "offering expertise in",
      task: "React performance optimization",
      type: "offer",
      time: "4 min ago",
      points: 0,
      responses: 0
    },
    {
      id: 3,
      user: "Aisha Patel",
      role: "QA Engineering Lead",
      avatar: "/api/placeholder/40/40",
      action: "just completed",
      task: "Test automation strategy review ✓",
      type: "completed",
      time: "6 min ago",
      points: 35,
      responses: 0
    },
    {
      id: 4,
      user: "David Kim",
      role: "Security Engineer",
      avatar: "/api/placeholder/40/40",
      action: "available for",
      task: "Security audit consultations",
      type: "available",
      time: "8 min ago",
      points: 0,
      responses: 2
    },
    {
      id: 5,
      user: "Maria Garcia",
      role: "Backend Developer",
      avatar: "/api/placeholder/40/40",
      action: "needs quick help with",
      task: "Database query optimization",
      type: "urgent",
      time: "just now",
      points: 15,
      responses: 5
    }
  ];

  // Auto-rotate activities
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activities.length]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'request':
      case 'urgent':
        return <Zap className="w-4 h-4 text-warning" />;
      case 'offer':
      case 'available':
        return <Users className="w-4 h-4 text-primary" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getActivityBadge = (type: string) => {
    switch (type) {
      case 'urgent':
        return <Badge className="bg-warning text-warning-foreground">Urgent</Badge>;
      case 'offer':
      case 'available':
        return <Badge className="bg-primary text-primary-foreground">Available</Badge>;
      case 'completed':
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      default:
        return <Badge variant="outline">Active</Badge>;
    }
  };

  return (
    <section id="live-activity" className="py-16 bg-gradient-to-br from-muted/30 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 animate-pulse">
            <Activity className="w-4 h-4 mr-2" />
            Live Community Activity
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real Professionals, <span className="bg-gradient-hero bg-clip-text text-transparent">Real Help</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch our community in action. Every request gets responses, every helper gets recognition.
          </p>
        </div>

        {/* Live Activity Feed */}
        <div className="max-w-4xl mx-auto">
          {/* Featured Activity */}
          <Card className="mb-6 bg-gradient-to-r from-card to-card/80 border-primary/20 shadow-lg animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm font-medium text-success">Live Activity</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Updates every 3s
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12 hover-scale">
                  <AvatarImage src={activities[currentActivity].avatar} alt={activities[currentActivity].user} />
                  <AvatarFallback className="bg-gradient-primary text-white">
                    {activities[currentActivity].user.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{activities[currentActivity].user}</h3>
                    {getActivityBadge(activities[currentActivity].type)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{activities[currentActivity].role}</p>
                  <div className="flex items-center text-foreground">
                    {getActivityIcon(activities[currentActivity].type)}
                    <span className="ml-2">
                      <strong>{activities[currentActivity].action}</strong> {activities[currentActivity].task}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-2">{activities[currentActivity].time}</div>
                  {activities[currentActivity].points > 0 && (
                    <Badge variant="outline" className="text-primary border-primary">
                      +{activities[currentActivity].points} pts
                    </Badge>
                  )}
                  {activities[currentActivity].responses > 0 && (
                    <div className="text-xs text-success mt-1">
                      {activities[currentActivity].responses} responses
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Stream */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {activities.slice(0, 4).map((activity, index) => (
              <Card 
                key={activity.id} 
                className={`transition-all duration-300 hover-scale cursor-pointer border-border/50 hover:border-primary/30 ${
                  index === currentActivity ? 'ring-2 ring-primary/20' : ''
                }`}
                onClick={() => setCurrentActivity(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={activity.avatar} alt={activity.user} />
                      <AvatarFallback className="bg-gradient-primary text-white text-sm">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm truncate">{activity.user}</h4>
                        {getActivityIcon(activity.type)}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{activity.task}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                        {activity.points > 0 && (
                          <Badge variant="outline" className="text-xs">
                            +{activity.points}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Activity Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">47</div>
              <div className="text-sm text-muted-foreground">Active now</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">126</div>
              <div className="text-sm text-muted-foreground">Helped today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">2.3k</div>
              <div className="text-sm text-muted-foreground">Points earned</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveActivitySection;