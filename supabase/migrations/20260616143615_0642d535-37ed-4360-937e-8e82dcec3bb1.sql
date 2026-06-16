
-- 1. Prevent stripe_customer_id tampering by users
CREATE OR REPLACE FUNCTION public.prevent_profile_sensitive_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow stripe_customer_id changes when no auth user (service role) or when caller is admin
  IF NEW.stripe_customer_id IS DISTINCT FROM OLD.stripe_customer_id THEN
    IF auth.uid() IS NOT NULL AND NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
      NEW.stripe_customer_id := OLD.stripe_customer_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_prevent_sensitive_changes ON public.profiles;
CREATE TRIGGER profiles_prevent_sensitive_changes
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.prevent_profile_sensitive_changes();

-- 2. Restrict user_roles "Users can view own role" to authenticated only
DROP POLICY IF EXISTS "Users can view own role" ON public.user_roles;
CREATE POLICY "Users can view own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- 3. Replace permissive page_views INSERT policy with basic validation
DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_views;
CREATE POLICY "Anyone can insert page views"
ON public.page_views
FOR INSERT
TO anon, authenticated
WITH CHECK (
  page_path IS NOT NULL
  AND length(page_path) <= 2048
  AND length(coalesce(session_id, '')) <= 256
);

-- 4. Revoke direct execute on has_role (RLS policies still work; they bypass these grants)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_premium_user(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.compute_league(integer) FROM PUBLIC, anon, authenticated;

-- 5. Storage: admin-only write policies on public-assets bucket
DROP POLICY IF EXISTS "Admins can insert public-assets" ON storage.objects;
CREATE POLICY "Admins can insert public-assets"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'public-assets'
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

DROP POLICY IF EXISTS "Admins can update public-assets" ON storage.objects;
CREATE POLICY "Admins can update public-assets"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'public-assets'
  AND public.has_role(auth.uid(), 'admin'::app_role)
)
WITH CHECK (
  bucket_id = 'public-assets'
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

DROP POLICY IF EXISTS "Admins can delete public-assets" ON storage.objects;
CREATE POLICY "Admins can delete public-assets"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'public-assets'
  AND public.has_role(auth.uid(), 'admin'::app_role)
);
