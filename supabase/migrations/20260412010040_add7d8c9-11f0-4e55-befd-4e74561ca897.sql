-- Drop the overly broad ALL policy that applies to public role
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- Add explicit SELECT policy for admins (the existing one only lets users see their own)
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));