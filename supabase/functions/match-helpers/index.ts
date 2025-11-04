import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MatchedHelper {
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

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the help request ID from the request
    const { help_request_id } = await req.json();

    if (!help_request_id) {
      return new Response(
        JSON.stringify({ error: 'help_request_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Finding matches for help request:', help_request_id);

    // Get the help request details
    const { data: helpRequest, error: requestError } = await supabase
      .from('help_requests')
      .select('tech_stack, category, requester_id')
      .eq('id', help_request_id)
      .single();

    if (requestError || !helpRequest) {
      console.error('Error fetching help request:', requestError);
      return new Response(
        JSON.stringify({ error: 'Help request not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Help request tech stack:', helpRequest.tech_stack);

    // If no tech stack specified, return empty array
    if (!helpRequest.tech_stack || helpRequest.tech_stack.length === 0) {
      return new Response(
        JSON.stringify({ matches: [] }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get all skills that match the tech stack
    const { data: matchingSkills, error: skillsError } = await supabase
      .from('skills')
      .select('id, name')
      .in('name', helpRequest.tech_stack);

    if (skillsError) {
      console.error('Error fetching skills:', skillsError);
      return new Response(
        JSON.stringify({ error: 'Error fetching skills' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Matching skills found:', matchingSkills?.length || 0);

    if (!matchingSkills || matchingSkills.length === 0) {
      return new Response(
        JSON.stringify({ matches: [] }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const skillIds = matchingSkills.map(s => s.id);

    // Get users who have these skills
    const { data: userSkillsData, error: userSkillsError } = await supabase
      .from('user_skills')
      .select('user_id, skill_id, proficiency_level, skills(name)')
      .in('skill_id', skillIds);

    if (userSkillsError) {
      console.error('Error fetching user skills:', userSkillsError);
      return new Response(
        JSON.stringify({ error: 'Error fetching user skills' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('User skills found:', userSkillsData?.length || 0);

    if (!userSkillsData || userSkillsData.length === 0) {
      return new Response(
        JSON.stringify({ matches: [] }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Group by user and calculate match scores
    const userMatches = new Map<string, {
      skills: string[];
      proficiency_levels: string[];
    }>();

    for (const userSkill of userSkillsData) {
      const userId = userSkill.user_id;
      
      // Skip the requester themselves
      if (userId === helpRequest.requester_id) {
        continue;
      }

      if (!userMatches.has(userId)) {
        userMatches.set(userId, {
          skills: [],
          proficiency_levels: []
        });
      }

      const match = userMatches.get(userId)!;
      const skillName = (userSkill.skills as any)?.name;
      
      if (skillName) {
        match.skills.push(skillName);
        if (userSkill.proficiency_level) {
          match.proficiency_levels.push(userSkill.proficiency_level);
        }
      }
    }

    console.log('Unique users with matching skills:', userMatches.size);

    // Get user profiles for matched users
    const userIds = Array.from(userMatches.keys());
    
    if (userIds.length === 0) {
      return new Response(
        JSON.stringify({ matches: [] }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, headline, location, points')
      .in('id', userIds);

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      return new Response(
        JSON.stringify({ error: 'Error fetching profiles' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build the final matched helpers array
    const matchedHelpers: MatchedHelper[] = [];

    for (const profile of profiles || []) {
      const matchData = userMatches.get(profile.id);
      if (!matchData) continue;

      // Calculate match score based on:
      // - Number of matching skills (40%)
      // - User points/reputation (30%)
      // - Proficiency level (30%)
      const skillMatchScore = (matchData.skills.length / helpRequest.tech_stack.length) * 40;
      const reputationScore = Math.min((profile.points / 1000) * 30, 30); // Cap at 30 points
      
      // Calculate proficiency score
      const proficiencyScores = {
        'expert': 10,
        'advanced': 7,
        'intermediate': 5,
        'beginner': 3
      };
      const avgProficiency = matchData.proficiency_levels.length > 0
        ? matchData.proficiency_levels.reduce((sum, level) => {
            return sum + (proficiencyScores[level.toLowerCase() as keyof typeof proficiencyScores] || 0);
          }, 0) / matchData.proficiency_levels.length
        : 5;
      const proficiencyScore = (avgProficiency / 10) * 30;

      const matchScore = Math.round(skillMatchScore + reputationScore + proficiencyScore);

      matchedHelpers.push({
        user_id: profile.id,
        full_name: profile.full_name || 'Anonymous',
        avatar_url: profile.avatar_url,
        headline: profile.headline,
        location: profile.location,
        points: profile.points || 0,
        matched_skills: matchData.skills,
        match_score: matchScore,
        proficiency_levels: matchData.proficiency_levels
      });
    }

    // Sort by match score (highest first)
    matchedHelpers.sort((a, b) => b.match_score - a.match_score);

    console.log('Total matches found:', matchedHelpers.length);

    return new Response(
      JSON.stringify({ 
        matches: matchedHelpers,
        total_matches: matchedHelpers.length,
        help_request_id 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in match-helpers function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});