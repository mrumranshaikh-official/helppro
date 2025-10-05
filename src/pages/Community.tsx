import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Star, 
  Award, 
  Briefcase, 
  MapPin,
  Coins,
  TrendingUp
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface CommunityMember {
  id: string;
  full_name: string;
  avatar_url: string | null;
  headline: string | null;
  location: string | null;
  points: number;
  coins: number;
  skills: string[];
  badges: string[];
}

const Community = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunityMembers();
  }, []);

  const fetchCommunityMembers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          avatar_url,
          headline,
          location,
          points
        `)
        .order('points', { ascending: false })
        .limit(50);

      if (profilesError) throw profilesError;

      // Fetch coins and skills for each member
      const membersWithDetails = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { data: coinsData } = await supabase
            .from('user_coins')
            .select('balance')
            .eq('user_id', profile.id)
            .single();

          const { data: skillsData } = await supabase
            .from('user_skills')
            .select('skills(name)')
            .eq('user_id', profile.id)
            .limit(5);

          const { data: badgesData } = await supabase
            .from('user_badges')
            .select('badges(name)')
            .eq('user_id', profile.id);

          return {
            ...profile,
            coins: coinsData?.balance || 0,
            skills: skillsData?.map((s: any) => s.skills?.name).filter(Boolean) || [],
            badges: badgesData?.map((b: any) => b.badges?.name).filter(Boolean) || []
          };
        })
      );

      setMembers(membersWithDetails);
    } catch (error) {
      console.error('Error fetching community members:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(member =>
    member.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.headline?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Community <span className="bg-gradient-warm bg-clip-text text-transparent">Network</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect with skilled professionals ready to help
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, skills, or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                  <p className="text-2xl font-bold">{members.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Skills</p>
                  <p className="text-2xl font-bold">
                    {members.reduce((acc, m) => acc + m.skills.length, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Badges Earned</p>
                  <p className="text-2xl font-bold">
                    {members.reduce((acc, m) => acc + m.badges.length, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Members Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-48 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card 
                key={member.id} 
                className="bg-card hover:shadow-lg transition-all cursor-pointer"
                onClick={() => navigate(`/profile/${member.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={member.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {member.full_name?.split(' ').map(n => n[0]).join('') || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{member.full_name}</h3>
                      {member.headline && (
                        <p className="text-sm text-muted-foreground mb-2 flex items-start gap-1">
                          <Briefcase className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{member.headline}</span>
                        </p>
                      )}
                      {member.location && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {member.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Skills */}
                  {member.skills.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {member.skills.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Points</p>
                        <p className="font-bold">{member.points}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Coins</p>
                        <p className="font-bold">{member.coins}</p>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  {member.badges.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">
                          {member.badges.length} Badge{member.badges.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full mt-4 bg-gradient-warm hover:shadow-lg transition-all text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/profile/${member.id}`);
                    }}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredMembers.length === 0 && !loading && (
          <Card className="bg-card">
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No members found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Community;