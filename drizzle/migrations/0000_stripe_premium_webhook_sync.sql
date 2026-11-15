CREATE TABLE public.stripe_webhook_events (
  event_id text PRIMARY KEY,
  event_created bigint NOT NULL,
  user_id uuid NOT NULL,
  processed_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.stripe_webhook_events TO service_role;
ALTER TABLE public.stripe_webhook_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages Stripe events" ON public.stripe_webhook_events FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE OR REPLACE FUNCTION public.sync_stripe_premium_event(
  p_event_id text, p_event_created bigint, p_customer_id text,
  p_user_id uuid, p_email text, p_subscription_id text,
  p_status text, p_is_premium boolean, p_period_start timestamptz, p_period_end timestamptz
) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_user_id uuid; v_existing_user uuid;
BEGIN
  SELECT user_id INTO v_existing_user FROM public.subscriptions WHERE stripe_customer_id = p_customer_id LIMIT 1;
  SELECT id INTO v_user_id FROM auth.users WHERE id = p_user_id;
  IF v_existing_user IS NOT NULL THEN
    IF v_user_id IS NOT NULL AND v_user_id <> v_existing_user THEN RAISE EXCEPTION 'Customer mapping mismatch'; END IF;
    v_user_id := v_existing_user;
  END IF;
  IF v_user_id IS NULL THEN SELECT id INTO v_user_id FROM public.profiles WHERE stripe_customer_id = p_customer_id LIMIT 1; END IF;
  IF v_user_id IS NULL AND p_email IS NOT NULL THEN SELECT id INTO v_user_id FROM auth.users WHERE lower(email) = lower(p_email) LIMIT 1; END IF;
  IF v_user_id IS NULL THEN RAISE EXCEPTION 'No account mapped to Stripe customer'; END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended(v_user_id::text, 0));
  IF EXISTS(SELECT 1 FROM public.stripe_webhook_events WHERE event_id = p_event_id) THEN RETURN false; END IF;
  INSERT INTO public.stripe_webhook_events(event_id, event_created, user_id) VALUES(p_event_id, p_event_created, v_user_id);
  IF EXISTS(SELECT 1 FROM public.stripe_webhook_events WHERE user_id = v_user_id AND event_created > p_event_created) THEN RETURN false; END IF;
  UPDATE public.subscriptions SET stripe_customer_id = p_customer_id, stripe_subscription_id = p_subscription_id,
    status = p_status, is_premium = p_is_premium, current_period_start = p_period_start,
    current_period_end = p_period_end, updated_at = now() WHERE user_id = v_user_id;
  IF NOT FOUND THEN
    INSERT INTO public.subscriptions(user_id, stripe_customer_id, stripe_subscription_id, status, is_premium, current_period_start, current_period_end)
    VALUES(v_user_id, p_customer_id, p_subscription_id, p_status, p_is_premium, p_period_start, p_period_end);
  END IF;
  UPDATE public.profiles SET stripe_customer_id = p_customer_id WHERE id = v_user_id;
  RETURN true;
END;
$$;
REVOKE ALL ON FUNCTION public.sync_stripe_premium_event(text,bigint,text,uuid,text,text,text,boolean,timestamptz,timestamptz) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.sync_stripe_premium_event(text,bigint,text,uuid,text,text,text,boolean,timestamptz,timestamptz) TO service_role;