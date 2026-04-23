-- Table page_views pour tracking custom
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id UUID,
  user_email TEXT,
  page_path TEXT NOT NULL,
  country TEXT,
  country_code TEXT,
  city TEXT,
  device TEXT,
  user_agent TEXT,
  referrer TEXT,
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_page_views_session ON public.page_views(session_id);
CREATE INDEX idx_page_views_visited_at ON public.page_views(visited_at DESC);
CREATE INDEX idx_page_views_user ON public.page_views(user_id);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- N'importe qui (même anonyme) peut insérer une vue de page
CREATE POLICY "Anyone can insert page views"
ON public.page_views
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Seuls les admins peuvent lire les analytics
CREATE POLICY "Only admins can read page views"
ON public.page_views
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));