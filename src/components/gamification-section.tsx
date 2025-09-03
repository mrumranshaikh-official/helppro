import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  Award, 
  Crown, 
  Shield, 
  Zap, 
  TrendingUp, 
  Users,
  Target,
  Gift,
  Coins,
  ArrowUp
} from "lucide-react";

const GamificationSection = () => {
  const levels = [
    { 
      name: "Newcomer", 
      icon: Users, 
      points: "0-100", 
      color: "text-muted-foreground",
      bgColor: "bg-muted/20",
      perks: ["Basic help requests", "Community access"] 
    },
    { 
      name: "Helper", 
      icon: Shield, 
      points: "101-500", 
      color: "text-primary",
      bgColor: "bg-primary/20",
      perks: ["Priority matching", "Helper badge", "Extended requests"] 
    },
    { 
      name: "Expert", 
      icon: Star, 
      points: "501-1500", 
      color: "text-accent",
      bgColor: "bg-accent/20",
      perks: ["Expert status", "Skill verification", "Mentor access"] 
    },
    { 
      name: "Master", 
      icon: Award, 
      points: "1501-3000", 
      color: "text-warning",
      bgColor: "bg-warning/20",
      perks: ["Master badge", "Beta features", "Recognition board"] 
    },
    { 
      name: "Legend", 
      icon: Crown, 
      points: "3000+", 
      color: "text-success",
      bgColor: "bg-success/20",
      perks: ["Legend status", "Advisory board", "Exclusive events"] 
    }
  ];

  const achievements = [
    { 
      icon: Trophy, 
      name: "First Helper", 
      description: "Complete your first help session",
      rarity: "Common",
      color: "text-yellow-500"
    },
    { 
      icon: Zap, 
      name: "Speed Helper", 
      description: "Respond to 5 requests within 1 hour",
      rarity: "Rare",
      color: "text-blue-500"
    },
    { 
      icon: Target, 
      name: "Problem Solver", 
      description: "Maintain 95% success rate for 50 helps",
      rarity: "Epic",
      color: "text-purple-500"
    },
    { 
      icon: Crown, 
      name: "Community Hero", 
      description: "Help 100 different professionals",
      rarity: "Legendary",
      color: "text-orange-500"
    }
  ];

  const pointEarning = [
    { action: "Quick Help (< 30 min)", points: "+10", icon: Zap, color: "text-green-500" },
    { action: "Standard Help (1-2 hours)", points: "+25", icon: Shield, color: "text-blue-500" },
    { action: "Complex Project Help", points: "+50", icon: Award, color: "text-purple-500" },
    { action: "Mentoring Session", points: "+35", icon: Star, color: "text-yellow-500" },
    { action: "Code Review", points: "+20", icon: Target, color: "text-indigo-500" },
    { action: "5-Star Rating Bonus", points: "+5", icon: Trophy, color: "text-pink-500" }
  ];

  const pointSpending = [
    { action: "Request Quick Help", points: "-10", icon: Zap, color: "text-red-500" },
    { action: "Request Standard Help", points: "-25", icon: Shield, color: "text-red-600" },
    { action: "Request Expert Help", points: "-50", icon: Award, color: "text-red-700" },
    { action: "Priority Queue", points: "-15", icon: ArrowUp, color: "text-orange-500" },
    { action: "Skill Assessment", points: "-30", icon: Target, color: "text-purple-500" },
    { action: "Exclusive Resources", points: "-40", icon: Gift, color: "text-indigo-500" }
  ];

  return (
    <section id="gamification" className="py-20 bg-gradient-to-br from-background via-muted/20 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Trophy className="w-4 h-4 mr-2" />
            Gamification System
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Level Up Your <span className="bg-gradient-hero bg-clip-text text-transparent">Professional Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every help you give and receive builds your reputation. Earn points, unlock levels, and become a recognized expert.
          </p>
        </div>

        {/* Level Progression */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Professional Levels & Rewards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {levels.map((level, index) => (
              <Card key={index} className="hover-scale transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${level.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <level.icon className={`w-8 h-8 ${level.color}`} />
                  </div>
                  <h4 className={`font-bold text-lg mb-2 ${level.color}`}>{level.name}</h4>
                  <Badge variant="outline" className="mb-3 text-xs">
                    {level.points} points
                  </Badge>
                  <div className="space-y-1">
                    {level.perks.map((perk, perkIndex) => (
                      <div key={perkIndex} className="text-xs text-muted-foreground flex items-center">
                        <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                        {perk}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Points System */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Earning Points */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700 dark:text-green-300">
                <TrendingUp className="w-5 h-5 mr-2" />
                Earn Points (+)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pointEarning.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 transition-colors hover-scale">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white dark:bg-black/40 rounded-lg flex items-center justify-center mr-3">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="font-medium text-sm">{item.action}</span>
                  </div>
                  <Badge className="bg-green-500 text-white">
                    {item.points}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Spending Points */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
                <Coins className="w-5 h-5 mr-2" />
                Spend Points (-)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pointSpending.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 transition-colors hover-scale">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white dark:bg-black/40 rounded-lg flex items-center justify-center mr-3">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="font-medium text-sm">{item.action}</span>
                  </div>
                  <Badge variant="outline" className="border-red-200 text-red-600 dark:border-red-800 dark:text-red-400">
                    {item.points}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Achievement System */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">Achievement Badges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="hover-scale transition-all duration-300 hover:shadow-lg group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent"></div>
                <CardContent className="p-6 text-center relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-muted/50 to-muted/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                  </div>
                  <h4 className="font-bold text-lg mb-2">{achievement.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      achievement.rarity === 'Legendary' ? 'border-orange-500 text-orange-600' :
                      achievement.rarity === 'Epic' ? 'border-purple-500 text-purple-600' :
                      achievement.rarity === 'Rare' ? 'border-blue-500 text-blue-600' :
                      'border-gray-500 text-gray-600'
                    }`}
                  >
                    {achievement.rarity}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamificationSection;