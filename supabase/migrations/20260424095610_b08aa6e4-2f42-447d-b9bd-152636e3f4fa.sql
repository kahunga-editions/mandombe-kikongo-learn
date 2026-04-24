-- Battle profiles table
CREATE TABLE public.battle_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  battle_name TEXT,
  elo INTEGER NOT NULL DEFAULT 1000,
  league TEXT NOT NULL DEFAULT 'Nlongoki',
  wins INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  draws INTEGER NOT NULL DEFAULT 0,
  games_played INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.battle_profiles ENABLE ROW LEVEL SECURITY;

-- Public leaderboard read
CREATE POLICY "Anyone can view battle profiles"
ON public.battle_profiles
FOR SELECT
USING (true);

-- Users can create their own profile
CREATE POLICY "Users can insert own battle profile"
ON public.battle_profiles
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Users can update only battle_name on their own profile
-- (Elo/league/stats updated via security-definer function from edge later)
CREATE POLICY "Users can update own battle profile"
ON public.battle_profiles
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Updated_at trigger
CREATE TRIGGER update_battle_profiles_updated_at
BEFORE UPDATE ON public.battle_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- League computation helper (pure function)
CREATE OR REPLACE FUNCTION public.compute_league(_elo INTEGER)
RETURNS TEXT
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT CASE
    WHEN _elo >= 1800 THEN 'Nganga'
    WHEN _elo >= 1500 THEN 'Mbuta'
    WHEN _elo >= 1300 THEN 'Kinuani'
    WHEN _elo >= 1100 THEN 'Nlongi'
    ELSE 'Nlongoki'
  END
$$;

-- Auto-create battle_profile on new user signup (extend handle_new_user)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');

  INSERT INTO public.battle_profiles (user_id, battle_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));

  RETURN NEW;
END;
$$;

-- Index for leaderboard ordering
CREATE INDEX idx_battle_profiles_elo ON public.battle_profiles (elo DESC);