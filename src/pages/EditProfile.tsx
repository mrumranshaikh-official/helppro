import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Plus, X, Save } from 'lucide-react';
import Navbar from '@/components/ui/navbar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useProfile } from '@/hooks/useProfile';

interface ProfileData {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  headline: string | null;
  bio: string | null;
  location: string | null;
  points: number | null;
  created_at: string;
  updated_at: string;
}

interface Skill {
  id: string;
  name: string;
  category: string;
}

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [searchSkill, setSearchSkill] = useState('');
  
  const [formData, setFormData] = useState({
    full_name: '',
    headline: '',
    bio: '',
    location: '',
    avatar_url: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchSkills();
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setProfileLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (data) {
      setProfileData(data as any);
      setFormData({
        full_name: data.full_name || '',
        headline: (data as any).headline || '',
        bio: (data as any).bio || '',
        location: (data as any).location || '',
        avatar_url: data.avatar_url || ''
      });
      fetchUserSkills();
    }
    setProfileLoading(false);
  };

  const fetchSkills = async () => {
    const { data } = await supabase
      .from('skills')
      .select('*')
      .order('name');
    
    if (data) setAllSkills(data);
  };

  const fetchUserSkills = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('user_skills')
      .select('skill_id, skills(name)')
      .eq('user_id', user.id);
    
    if (data) {
      setUserSkills(data.map((item: any) => item.skill_id));
    }
  };

  const handleAddSkill = async (skillId: string) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('user_skills')
      .insert({ user_id: user.id, skill_id: skillId, proficiency_level: 'intermediate' });
    
    if (error) {
      toast.error('Failed to add skill');
    } else {
      setUserSkills([...userSkills, skillId]);
      setSearchSkill('');
      toast.success('Skill added');
    }
  };

  const handleRemoveSkill = async (skillId: string) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('user_skills')
      .delete()
      .eq('user_id', user.id)
      .eq('skill_id', skillId);
    
    if (error) {
      toast.error('Failed to remove skill');
    } else {
      setUserSkills(userSkills.filter(id => id !== skillId));
      toast.success('Skill removed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    
    const { error } = await supabase
      .from('profiles')
      .update(formData)
      .eq('id', user.id);
    
    if (error) {
      toast.error('Failed to update profile');
    } else {
      toast.success('Profile updated successfully!');
      navigate(`/profile/${user.id}`);
    }
    
    setLoading(false);
  };

  const filteredSkills = allSkills.filter(skill => 
    skill.name.toLowerCase().includes(searchSkill.toLowerCase()) &&
    !userSkills.includes(skill.id)
  );

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={formData.avatar_url || undefined} />
                  <AvatarFallback>{formData.full_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Label htmlFor="avatar_url">Avatar URL</Label>
                  <Input
                    id="avatar_url"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="headline">Headline</Label>
                <Input
                  id="headline"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., San Francisco, CA"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>

              <div>
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {userSkills.map(skillId => {
                    const skill = allSkills.find(s => s.id === skillId);
                    return skill ? (
                      <Badge key={skillId} variant="secondary" className="gap-1">
                        {skill.name}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-destructive"
                          onClick={() => handleRemoveSkill(skillId)}
                        />
                      </Badge>
                    ) : null;
                  })}
                </div>
                <div className="relative">
                  <Input
                    value={searchSkill}
                    onChange={(e) => setSearchSkill(e.target.value)}
                    placeholder="Search skills to add..."
                  />
                  {searchSkill && filteredSkills.length > 0 && (
                    <Card className="absolute z-10 w-full mt-1 max-h-48 overflow-y-auto">
                      <CardContent className="p-2">
                        {filteredSkills.slice(0, 5).map(skill => (
                          <div
                            key={skill.id}
                            className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
                            onClick={() => handleAddSkill(skill.id)}
                          >
                            <span>{skill.name}</span>
                            <Plus className="w-4 h-4" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(`/profile/${user?.id}`)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
