
CREATE TABLE public.translation_corrections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_text text NOT NULL,
  source_lang text NOT NULL,
  target_lang text NOT NULL,
  corrected_translation text NOT NULL,
  corrected_mandombe text DEFAULT '',
  corrected_ipa text DEFAULT '',
  notes text DEFAULT '',
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX idx_corrections_lookup 
  ON public.translation_corrections (lower(source_text), source_lang, target_lang);

ALTER TABLE public.translation_corrections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage corrections"
  ON public.translation_corrections FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated can read corrections"
  ON public.translation_corrections FOR SELECT TO authenticated
  USING (true);
