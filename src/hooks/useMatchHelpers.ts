import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MatchedHelper {
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  headline: string | null;
  location: string | null;
  points: number;
  matched_skills: string[];
  match_score: number;
  proficiency_levels: string[];
}

export const useMatchHelpers = () => {
  const [matches, setMatches] = useState<MatchedHelper[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const findMatches = async (helpRequestId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('match-helpers', {
        body: { help_request_id: helpRequestId }
      });

      if (error) throw error;

      setMatches(data.matches || []);
      return data.matches || [];
    } catch (error) {
      console.error('Error finding matches:', error);
      toast({
        title: "Error",
        description: "Failed to find matching helpers. Please try again.",
        variant: "destructive"
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    matches,
    isLoading,
    findMatches
  };
};