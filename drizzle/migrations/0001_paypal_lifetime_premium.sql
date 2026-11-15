ALTER TABLE public.lifetime_unlocks
  ADD COLUMN IF NOT EXISTS paypal_order_id text,
  ADD COLUMN IF NOT EXISTS paypal_capture_id text,
  ADD COLUMN IF NOT EXISTS currency text;

CREATE UNIQUE INDEX IF NOT EXISTS lifetime_unlocks_paypal_order_id_idx
  ON public.lifetime_unlocks (paypal_order_id)
  WHERE paypal_order_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS lifetime_unlocks_paypal_capture_id_idx
  ON public.lifetime_unlocks (paypal_capture_id)
  WHERE paypal_capture_id IS NOT NULL;