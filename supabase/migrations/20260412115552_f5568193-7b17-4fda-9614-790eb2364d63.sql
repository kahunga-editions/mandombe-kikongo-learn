-- 1. Remove unused realtime publication for flashcard_reviews
ALTER PUBLICATION supabase_realtime DROP TABLE public.flashcard_reviews;

-- 2. Prevent self-elevation to admin in user_roles
CREATE OR REPLACE FUNCTION public.prevent_self_role_escalation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id = auth.uid() AND NEW.role = 'admin' THEN
    RAISE EXCEPTION 'Self-elevation to admin is not allowed';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER no_self_escalation
  BEFORE INSERT OR UPDATE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_self_role_escalation();

-- 3. Fix profiles INSERT policy: scope to authenticated instead of public
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- Also fix profiles UPDATE policy to authenticated
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

-- Fix profiles SELECT policy to authenticated
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING ((id = auth.uid()) OR has_role(auth.uid(), 'admin'::app_role));

-- Fix subscriptions SELECT policy to authenticated
DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscriptions;
CREATE POLICY "Users can view own subscription"
  ON public.subscriptions
  FOR SELECT
  TO authenticated
  USING ((user_id = auth.uid()) OR has_role(auth.uid(), 'admin'::app_role));