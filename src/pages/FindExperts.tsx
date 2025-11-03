import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Star, 
  Briefcase, 
  MapPin,
  Award,
  Lightbulb,
  Target
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/ui/navbar";

interface Expert {
  id: string;
  full_name: string;
  avatar_url: string | null;
  headline: string | null;
  location: string | null;
  points: number;
  skills: string[];
  badges_count: number;
  total_helped: number;
}

const SKILL_CATEGORIES = [
  "All Fields",
  "Frontend",
  "Backend", 
  "DevOps",
  "Mobile",
  "Design",
  "Data Science",
  "System Admin"
];

const FindExperts = () => {
  const navigate = useNavigate();
  const [experts, setExperts] = useState<Expert[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("All Fields");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, headline, location, points')
        .gt('points', 0)
        .order('points', { ascending: false })
        .limit(100);

      if (error) throw error;

      const expertsWithDetails = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { data: skillsData } = await supabase
            .from('user_skills')
            .select('skills(name)')
            .eq('user_id', profile.id);

          const { data: badgesData } = await supabase
            .from('user_badges')
            .select('id')
            .eq('user_id', profile.id);

          const { data: helpedData } = await supabase
            .from('help_requests')
            .select('id')
            .eq('helper_id', profile.id)
            .eq('status', 'completed');

          return {
            ...profile,
            skills: skillsData?.map((s: any) => s.skills?.name).filter(Boolean) || [],
            badges_count: badgesData?.length || 0,
            total_helped: helpedData?.length || 0
          };
        })
      );

      setExperts(expertsWithDetails);
    } catch (error) {
      console.error('Error fetching experts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredExperts = experts.filter(expert => {
    const searchMatch =
      expert.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.headline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const fieldMatch =
      selectedField === "All Fields" ||
      expert.skills.some(skill => skill.toLowerCase().includes(selectedField.toLowerCase()));

    return searchMatch && fieldMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find <span className="bg-gradient-warm bg-clip-text text-transparent">Expert Help</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect with skilled professionals ready to solve your challenges
            </p>
          </div>

          {/* Search & Filters */}
          <Card className="mb-8 bg-card">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, expertise, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedField} onValueChange={setSelectedField}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Fields" />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILL_CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Experts</p>
                    <p className="text-2xl font-bold">{filteredExperts.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Skills</p>
                    <p className="text-2xl font-bold">
                      {filteredExperts.reduce((acc, e) => acc + e.skills.length, 0)}
                    </p>
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
                    <p className="text-sm text-muted-foreground">Problems Solved</p>
                    <p className="text-2xl font-bold">
                      {filteredExperts.reduce((acc, e) => acc + e.total_helped, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Experts Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-56 bg-muted rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredExperts.length === 0 ? (
            <Card className="bg-card">
              <CardContent className="p-12 text-center">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No experts found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperts.map((expert) => (
                <Card 
                  key={expert.id} 
                  className="bg-card hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
                  onClick={() => navigate(`/profile/${expert.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center mb-4">
                      <Avatar className="w-20 h-20 mb-3">
                        <AvatarImage src={expert.avatar_url || undefined} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xl">
                          {expert.full_name?.split(' ').map(n => n[0]).join('') || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-xl mb-1">{expert.full_name}</h3>
                      {expert.headline && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                          <Briefcase className="w-4 h-4" />
                          <span className="line-clamp-2">{expert.headline}</span>
                        </p>
                      )}
                      {expert.location && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {expert.location}
                        </p>
                      )}
                    </div>

                    {/* Skills */}
                    {expert.skills.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">EXPERTISE</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {expert.skills.slice(0, 4).map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {expert.skills.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{expert.skills.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-border mb-4">
                      <div className="text-center">
                        <Star className="w-4 h-4 text-primary mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Points</p>
                        <p className="font-bold">{expert.points}</p>
                      </div>
                      <div className="text-center">
                        <Award className="w-4 h-4 text-primary mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Badges</p>
                        <p className="font-bold">{expert.badges_count}</p>
                      </div>
                      <div className="text-center">
                        <Target className="w-4 h-4 text-primary mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Helped</p>
                        <p className="font-bold">{expert.total_helped}</p>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-warm hover:shadow-lg transition-all text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/profile/${expert.id}`);
                      }}
                    >
                      View Expert Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindExperts;