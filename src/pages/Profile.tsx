import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  Briefcase,
  MapPin,
  Coins,
  Star,
  MessageCircle,
  HandHelping,
  Calendar
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  id: string;
  full_name: string;
  avatar_url: string | null;
  headline: string | null;
  bio: string | null;
  location: string | null;
  points: number;
  email: string;
  experience: any[];
  created_at: string;
  coins: number;
  skills: Array<{ name: string; proficiency_level: string }>;
  badges: Array<{ name: string; description: string; earned_at: string }>;
}

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const isOwnProfile = user?.id === id;

  useEffect(() => {
    if (id) {
      fetchProfile();
    }
  }, [id]);

  const fetchProfile = async () => {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (profileError) throw profileError;

      // Fetch coins
      const { data: coinsData } = await supabase
        .from('user_coins')
        .select('balance')
        .eq('user_id', id)
        .single();

      // Fetch skills
      const { data: skillsData } = await supabase
        .from('user_skills')
        .select('skills(name), proficiency_level')
        .eq('user_id', id);

      // Fetch badges
      const { data: badgesData } = await supabase
        .from('user_badges')
        .select('badges(name, description), earned_at')
        .eq('user_id', id);

      setProfile({
        ...profileData,
        experience: Array.isArray(profileData.experience) ? profileData.experience : [],
        coins: coinsData?.balance || 0,
        skills: skillsData?.map((s: any) => ({
          name: s.skills?.name,
          proficiency_level: s.proficiency_level
        })) || [],
        badges: badgesData?.map((b: any) => ({
          name: b.badges?.name,
          description: b.badges?.description,
          earned_at: b.earned_at
        })) || []
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestHelp = () => {
    navigate('/requests/new', { state: { helperId: id } });
  };

  const handleOfferHelp = () => {
    navigate('/requests');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <Card className="animate-pulse">
            <CardContent className="p-8">
              <div className="h-64 bg-muted rounded" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
          <Button onClick={() => navigate('/community')}>
            Back to Community
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-6 bg-card">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-32 h-32">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback className="bg-primary/10 text-primary text-4xl">
                  {profile.full_name?.split(' ').map(n => n[0]).join('') || '?'}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{profile.full_name}</h1>
                    {profile.headline && (
                      <p className="text-lg text-muted-foreground flex items-center gap-2 mb-2">
                        <Briefcase className="w-5 h-5" />
                        {profile.headline}
                      </p>
                    )}
                    {profile.location && (
                      <p className="text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {profile.location}
                      </p>
                    )}
                  </div>
                </div>

                {profile.bio && (
                  <p className="text-muted-foreground mb-4">{profile.bio}</p>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Points</span>
                    </div>
                    <p className="text-2xl font-bold">{profile.points}</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Coins className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Coins</span>
                    </div>
                    <p className="text-2xl font-bold">{profile.coins}</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Badges</span>
                    </div>
                    <p className="text-2xl font-bold">{profile.badges.length}</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Member Since</span>
                    </div>
                    <p className="text-sm font-bold">
                      {new Date(profile.created_at).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                {!isOwnProfile && (
                  <div className="flex gap-3">
                    <Button 
                      className="bg-gradient-warm hover:shadow-lg transition-all text-white"
                      onClick={handleRequestHelp}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Request Help
                    </Button>
                    <Button variant="outline">
                      <HandHelping className="w-4 h-4 mr-2" />
                      Offer Help
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <Card className="bg-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Skills & Expertise</h3>
                {profile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm px-4 py-2">
                        {skill.name}
                        {skill.proficiency_level && (
                          <span className="ml-2 text-xs opacity-70">
                            • {skill.proficiency_level}
                          </span>
                        )}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No skills added yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience">
            <Card className="bg-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Work Experience</h3>
                {profile.experience && profile.experience.length > 0 ? (
                  <div className="space-y-4">
                    {profile.experience.map((exp: any, idx: number) => (
                      <div key={idx} className="border-l-2 border-primary pl-4 pb-4">
                        <h4 className="font-bold">{exp.title}</h4>
                        <p className="text-muted-foreground">{exp.company}</p>
                        <p className="text-sm text-muted-foreground">{exp.duration}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No experience added yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges">
            <Card className="bg-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Achievements</h3>
                {profile.badges.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.badges.map((badge, idx) => (
                      <div key={idx} className="bg-muted/30 p-4 rounded-lg flex items-start gap-3">
                        <Award className="w-8 h-8 text-primary flex-shrink-0" />
                        <div>
                          <h4 className="font-bold">{badge.name}</h4>
                          <p className="text-sm text-muted-foreground">{badge.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Earned {new Date(badge.earned_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No badges earned yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;