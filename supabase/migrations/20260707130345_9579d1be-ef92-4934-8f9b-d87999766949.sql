
-- 1. Attach missing triggers
DROP TRIGGER IF EXISTS trg_prevent_profile_sensitive_changes ON public.profiles;
CREATE TRIGGER trg_prevent_profile_sensitive_changes
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.prevent_profile_sensitive_changes();

DROP TRIGGER IF EXISTS trg_prevent_self_role_escalation ON public.user_roles;
CREATE TRIGGER trg_prevent_self_role_escalation
BEFORE INSERT OR UPDATE ON public.user_roles
FOR EACH ROW EXECUTE FUNCTION public.prevent_self_role_escalation();

-- 2. Revoke EXECUTE on internal SECURITY DEFINER cron/queue helpers
REVOKE EXECUTE ON FUNCTION public.email_queue_dispatch() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.email_queue_wake() FROM PUBLIC, anon, authenticated;

-- 3. Subscriptions: restrict writes to service_role only
DROP POLICY IF EXISTS "Service can manage subscriptions" ON public.subscriptions;
CREATE POLICY "Service role manages subscriptions"
ON public.subscriptions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 4. Battle profiles: leaderboard visible only to signed-in users
DROP POLICY IF EXISTS "Anyone can view battle profiles" ON public.battle_profiles;
CREATE POLICY "Authenticated users can view battle profiles"
ON public.battle_profiles
FOR SELECT
TO authenticated
USING (true);

REVOKE SELECT ON public.battle_profiles FROM anon;
