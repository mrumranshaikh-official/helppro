import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TrendingUp,
  Coins,
  CircleHelp,
  MessageSquare,
  Star,
  Award,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import Navbar from "@/components/ui/navbar";
import type { Database } from "@/integrations/supabase/types";

type HelpRequest = Database["public"]["Tables"]["help_requests"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface HelpRequestWithProfile extends HelpRequest {
  requester?: Profile;
  helper?: Profile;
}

interface DashboardStats {
  totalPoints: number;
  coinBalance: number;
  activeRequests: number;
  completedRequests: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalPoints: 0,
    coinBalance: 0,
    activeRequests: 0,
    completedRequests: 0
  });
  const [myRequests, setMyRequests] = useState<HelpRequestWithProfile[]>([]);
  const [helpingRequests, setHelpingRequests] = useState<HelpRequestWithProfile[]>([]);
  const [recommendedRequests, setRecommendedRequests] = useState<HelpRequestWithProfile[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch user profile and stats
      const { data: profile } = await supabase
        .from('profiles')
        .select('points')
        .eq('id', user.id)
        .single();

      const { data: coins } = await supabase
        .from('user_coins')
        .select('balance')
        .eq('user_id', user.id)
        .single();

      // Fetch my requests (as requester)
      const { data: myRequestsData } = await supabase
        .from('help_requests')
        .select(`
          *,
          helper:profiles!help_requests_helper_id_fkey(*)
        `)
        .eq('requester_id', user.id)
        .in('status', ['open', 'in_progress'])
        .order('created_at', { ascending: false })
        .limit(5);

      // Fetch requests I'm helping with
      const { data: helpingData } = await supabase
        .from('help_requests')
        .select(`
          *,
          requester:profiles!help_requests_requester_id_fkey(*)
        `)
        .eq('helper_id', user.id)
        .eq('status', 'in_progress')
        .order('accepted_at', { ascending: false })
        .limit(5);

      // Count completed requests
      const { count: completedCount } = await supabase
        .from('help_requests')
        .select('*', { count: 'exact', head: true })
        .or(`requester_id.eq.${user.id},helper_id.eq.${user.id}`)
        .eq('status', 'completed');

      // Fetch user skills for recommendations
      const { data: userSkills } = await supabase
        .from('user_skills')
        .select('skills(name, category)')
        .eq('user_id', user.id);

      // Fetch recommended requests based on user skills
      let recommendedData: HelpRequestWithProfile[] = [];
      if (userSkills && userSkills.length > 0) {
        const skillCategories = userSkills
          .map((s: any) => s.skills?.category)
          .filter(Boolean);

        if (skillCategories.length > 0) {
          const { data: recommended } = await supabase
            .from('help_requests')
            .select(`
              *,
              requester:profiles!help_requests_requester_id_fkey(*)
            `)
            .eq('status', 'open')
            .neq('requester_id', user.id)
            .in('category', skillCategories)
            .order('created_at', { ascending: false })
            .limit(6);

          recommendedData = recommended as HelpRequestWithProfile[] || [];
        }
      }

      // If no skill-based recommendations, fetch recent open requests
      if (recommendedData.length === 0) {
        const { data: recent } = await supabase
          .from('help_requests')
          .select(`
            *,
            requester:profiles!help_requests_requester_id_fkey(*)
          `)
          .eq('status', 'open')
          .neq('requester_id', user.id)
          .order('created_at', { ascending: false })
          .limit(6);

        recommendedData = recent as HelpRequestWithProfile[] || [];
      }

      setStats({
        totalPoints: profile?.points || 0,
        coinBalance: coins?.balance || 0,
        activeRequests: (myRequestsData?.length || 0) + (helpingData?.length || 0),
        completedRequests: completedCount || 0
      });

      setMyRequests(myRequestsData as HelpRequestWithProfile[] || []);
      setHelpingRequests(helpingData as HelpRequestWithProfile[] || []);
      setRecommendedRequests(recommendedData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    const colors: { [key: string]: string } = {
      urgent: "bg-red-500 text-white",
      high: "bg-orange-500 text-white",
      medium: "bg-yellow-500 text-white",
      low: "bg-green-500 text-white"
    };
    return colors[urgency] || "bg-gray-500 text-white";
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Welcome back, <span className="bg-gradient-warm bg-clip-text text-transparent">{user.email?.split('@')[0]}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Here's what's happening with your HelpPro activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <p className="text-2xl font-bold">{stats.totalPoints}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/coins')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Coins className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Coin Balance</p>
                  <p className="text-2xl font-bold">{stats.coinBalance}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <CircleHelp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Requests</p>
                  <p className="text-2xl font-bold">{stats.activeRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{stats.completedRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Requests */}
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold">My Requests</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/help-requests')}
              >
                <Plus className="w-4 h-4 mr-1" />
                New Request
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-muted rounded" />
                    </div>
                  ))}
                </div>
              ) : myRequests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CircleHelp className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="mb-4">No active requests</p>
                  <Button
                    onClick={() => navigate('/help-requests')}
                    variant="outline"
                  >
                    Create Request
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myRequests.map(request => (
                    <Card
                      key={request.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => navigate('/help-requests')}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold line-clamp-1">{request.title}</h4>
                          <Badge className={getUrgencyColor(request.urgency)}>
                            {request.urgency}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{formatDistanceToNow(new Date(request.created_at!), { addSuffix: true })}</span>
                          {request.coin_reward && (
                            <>
                              <span>•</span>
                              <Coins className="w-4 h-4" />
                              <span>{request.coin_reward}</span>
                            </>
                          )}
                        </div>
                        {request.status === 'in_progress' && request.helper && (
                          <div className="mt-2 flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={request.helper.avatar_url || undefined} />
                              <AvatarFallback className="text-xs">
                                {request.helper.full_name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                              Being helped by {request.helper.full_name}
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  {myRequests.length > 0 && (
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => navigate('/help-requests')}
                    >
                      View All Requests
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Requests I'm Helping */}
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold">Helping Others</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/messages')}
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                Messages
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-muted rounded" />
                    </div>
                  ))}
                </div>
              ) : helpingRequests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Award className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="mb-4">Not helping anyone yet</p>
                  <Button
                    onClick={() => navigate('/help-requests')}
                    variant="outline"
                  >
                    Browse Requests
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {helpingRequests.map(request => (
                    <Card
                      key={request.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => navigate('/messages')}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold line-clamp-1">{request.title}</h4>
                          {request.coin_reward && request.coin_reward > 0 && (
                            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
                              <Coins className="w-4 h-4 text-primary" />
                              <span className="text-sm font-bold text-primary">{request.coin_reward}</span>
                            </div>
                          )}
                        </div>
                        {request.requester && (
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={request.requester.avatar_url || undefined} />
                              <AvatarFallback className="text-xs">
                                {request.requester.full_name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                              Helping {request.requester.full_name}
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  {helpingRequests.length > 0 && (
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => navigate('/messages')}
                    >
                      Go to Messages
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recommended Requests */}
        <Card className="bg-card mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recommended For You</CardTitle>
            <p className="text-sm text-muted-foreground">
              Based on your skills and expertise
            </p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-32 bg-muted rounded" />
                  </div>
                ))}
              </div>
            ) : recommendedRequests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No recommendations available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedRequests.slice(0, 6).map(request => (
                  <Card
                    key={request.id}
                    className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
                    onClick={() => navigate('/help-requests')}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm line-clamp-2 flex-1">{request.title}</h4>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {request.category && (
                          <Badge variant="outline" className="text-xs">
                            {request.category}
                          </Badge>
                        )}
                        <Badge className={`text-xs ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency}
                        </Badge>
                      </div>
                      {request.coin_reward && request.coin_reward > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          <Coins className="w-4 h-4 text-primary" />
                          <span className="font-bold text-primary">{request.coin_reward} coins</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {recommendedRequests.length > 0 && (
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/help-requests')}
              >
                View All Help Requests
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
