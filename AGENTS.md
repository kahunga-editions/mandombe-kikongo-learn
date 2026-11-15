# Architecture rules

- Route Premium billing through `src/lib/premiumBilling.ts`; role-based access is not a paid subscription, and same-tab navigation avoids blocked payment popups.
- Edge functions authenticate using the managed `SUPABASE_ANON_KEY` when no privileged database operations are required; the browser publishable-key variable is not a server runtime secret.
- Stripe webhook signatures are verified on the raw body; current paid subscription state is reconciled through a service-only atomic RPC with duplicate/out-of-order protection, and access checks enforce the stored expiration date.
- PayPal lifetime Premium orders are created and captured server-side through the connector gateway; only confirmed captures create `full_premium` lifetime unlocks.