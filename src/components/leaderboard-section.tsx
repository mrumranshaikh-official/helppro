import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award, TrendingUp, Users, Star } from "lucide-react";

const LeaderboardSection = () => {
  const topHelpers = [
    {
      rank: 1,
      name: "Alex Thompson",
      role: "Senior DevOps Engineer",
      points: 4250,
      helped: 189,
      avatar: "/api/placeholder/100/100",
      badge: "Gold Helper",
      specialty: "AWS & Kubernetes"
    },
    {
      rank: 2,
      name: "Maria Garcia",
      role: "Full Stack Developer",
      points: 3890,
      helped: 167,
      avatar: "/api/placeholder/100/100",
      badge: "Silver Helper",
      specialty: "React & Node.js"
    },
    {
      rank: 3,
      name: "James Wu",
      role: "Security Engineer",
      points: 3650,
      helped: 145,
      avatar: "/api/placeholder/100/100",
      badge: "Bronze Helper",
      specialty: "Cybersecurity"
    },
    {
      rank: 4,
      name: "Sarah Johnson",
      role: "QA Engineer",
      points: 3420,
      helped: 134,
      avatar: "/api/placeholder/100/100",
      badge: "Top Contributor",
      specialty: "Test Automation"
    },
    {
      rank: 5,
      name: "David Chen",
      role: "Backend Developer",
      points: 3180,
      helped: 128,
      avatar: "/api/placeholder/100/100",
      badge: "Rising Star",
      specialty: "Database Design"
    }
  ];

  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Active Members",
      color: "text-blue-500"
    },
    {
      icon: Star,
      value: "2,847",
      label: "Help Sessions",
      color: "text-yellow-500"
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Success Rate",
      color: "text-green-500"
    },
    {
      icon: Award,
      value: "12k+",
      label: "Points Earned",
      color: "text-purple-500"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold">#{rank}</span>;
    }
  };

  const getBadgeVariant = (rank: number) => {
    switch (rank) {
      case 1:
        return "default";
      case 2:
        return "secondary";
      case 3:
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <section id="leaderboard" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Trophy className="w-4 h-4 mr-2" />
            Leaderboard
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Top <span className="bg-gradient-primary bg-clip-text text-transparent">Contributors</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Celebrating our most helpful community members who make HelpPro a thriving ecosystem of support.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6">
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Leaderboard */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Monthly Top Helpers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {topHelpers.map((helper, index) => (
                <div
                  key={index}
                  className={`flex items-center p-6 transition-colors hover:bg-muted/50 ${
                    index < 3 ? 'bg-gradient-to-r from-primary/5 to-transparent' : ''
                  }`}
                >
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12 h-12 mr-4">
                    {getRankIcon(helper.rank)}
                  </div>

                  {/* Avatar */}
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={helper.avatar} alt={helper.name} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {helper.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-lg truncate">{helper.name}</h3>
                      <Badge variant={getBadgeVariant(helper.rank)} className="text-xs">
                        {helper.badge}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">{helper.role}</p>
                    <p className="text-primary text-xs">{helper.specialty}</p>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{helper.points}</div>
                    <div className="text-xs text-muted-foreground">points earned</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {helper.helped} people helped
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How Points Work */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gradient-secondary border-primary/20">
            <CardHeader>
              <CardTitle className="text-center">How the Points System Works</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3">Earn Points (+)</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Small help task: +10 points</li>
                  <li>• Medium help task: +25 points</li>
                  <li>• Complex help task: +50 points</li>
                  <li>• Positive review bonus: +5 points</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-3">Spend Points (-)</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Request help: -10 to -50 points</li>
                  <li>• Missed payback (15 days): -10 points</li>
                  <li>• False review: -25 points</li>
                  <li>• Missed commitment: -50 points</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;