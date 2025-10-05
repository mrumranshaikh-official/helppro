-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create enum for help request status
CREATE TYPE public.help_request_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');

-- Create enum for help request urgency
CREATE TYPE public.urgency_level AS ENUM ('low', 'medium', 'high', 'urgent');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create coins table to track user coin balance
CREATE TABLE public.user_coins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    balance INTEGER NOT NULL DEFAULT 0,
    total_earned INTEGER NOT NULL DEFAULT 0,
    total_spent INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create skills table
CREATE TABLE public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_skills junction table
CREATE TABLE public.user_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE NOT NULL,
    proficiency_level TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, skill_id)
);

-- Create badges table
CREATE TABLE public.badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon_url TEXT,
    criteria TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_badges junction table
CREATE TABLE public.user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, badge_id)
);

-- Create help_requests table
CREATE TABLE public.help_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    helper_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT,
    urgency urgency_level NOT NULL DEFAULT 'medium',
    coin_reward INTEGER DEFAULT 0,
    status help_request_status NOT NULL DEFAULT 'open',
    tech_stack TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    accepted_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create messages table for chat system
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    help_request_id UUID REFERENCES public.help_requests(id) ON DELETE CASCADE NOT NULL,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT,
    file_url TEXT,
    file_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create coin_transactions table to track all coin movements
CREATE TABLE public.coin_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    amount INTEGER NOT NULL,
    transaction_type TEXT NOT NULL,
    description TEXT,
    help_request_id UUID REFERENCES public.help_requests(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add LinkedIn fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN linkedin_id TEXT UNIQUE,
ADD COLUMN headline TEXT,
ADD COLUMN bio TEXT,
ADD COLUMN experience JSONB DEFAULT '[]'::jsonb,
ADD COLUMN points INTEGER DEFAULT 0,
ADD COLUMN location TEXT;

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_coins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.help_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coin_transactions ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_coins
CREATE POLICY "Users can view their own coins"
ON public.user_coins FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can view others' coin balance"
ON public.user_coins FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "System can update coins"
ON public.user_coins FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "System can insert coins"
ON public.user_coins FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for skills
CREATE POLICY "Everyone can view skills"
ON public.skills FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage skills"
ON public.skills FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_skills
CREATE POLICY "Everyone can view user skills"
ON public.user_skills FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can manage their own skills"
ON public.user_skills FOR ALL
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies for badges
CREATE POLICY "Everyone can view badges"
ON public.badges FOR SELECT
TO authenticated
USING (true);

-- RLS Policies for user_badges
CREATE POLICY "Everyone can view user badges"
ON public.user_badges FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "System can award badges"
ON public.user_badges FOR INSERT
TO authenticated
WITH CHECK (true);

-- RLS Policies for help_requests
CREATE POLICY "Everyone can view open help requests"
ON public.help_requests FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can create help requests"
ON public.help_requests FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Requesters and helpers can update their requests"
ON public.help_requests FOR UPDATE
TO authenticated
USING (auth.uid() = requester_id OR auth.uid() = helper_id);

-- RLS Policies for messages
CREATE POLICY "Participants can view messages"
ON public.messages FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.help_requests
    WHERE id = help_request_id
    AND (requester_id = auth.uid() OR helper_id = auth.uid())
  )
);

CREATE POLICY "Participants can send messages"
ON public.messages FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = sender_id AND
  EXISTS (
    SELECT 1 FROM public.help_requests
    WHERE id = help_request_id
    AND (requester_id = auth.uid() OR helper_id = auth.uid())
  )
);

-- RLS Policies for coin_transactions
CREATE POLICY "Users can view their own transactions"
ON public.coin_transactions FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "System can create transactions"
ON public.coin_transactions FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Trigger to update updated_at on user_coins
CREATE TRIGGER update_user_coins_updated_at
BEFORE UPDATE ON public.user_coins
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to update updated_at on help_requests
CREATE TRIGGER update_help_requests_updated_at
BEFORE UPDATE ON public.help_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically create user_coins entry when profile is created
CREATE OR REPLACE FUNCTION public.handle_new_user_coins()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_coins (user_id, balance)
  VALUES (NEW.id, 100); -- Give new users 100 coins to start
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger to create user_coins when profile is created
CREATE TRIGGER on_profile_created
AFTER INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_coins();