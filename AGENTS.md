# Architecture rules

- Route Premium billing through `src/lib/premiumBilling.ts`; role-based access is not a paid subscription, and same-tab navigation avoids blocked payment popups.
- Edge functions authenticate using the managed `SUPABASE_ANON_KEY` when no privileged database operations are required; the browser publishable-key variable is not a server runtime secret.
- Stripe webhook signatures are verified on the raw body; current paid subscription state is reconciled through a service-only atomic RPC with duplicate/out-of-order protection, and access checks enforce the stored expiration date.
- PayPal lifetime Premium orders are created and captured server-side through the connector gateway; only confirmed captures create `full_premium` lifetime unlocks.
- Keep the retired `create-checkout` endpoint as a non-charging 410 response and remove subscription checkout/portal links from the UI to prevent stale clients from opening a new recurring purchase; retain existing paid-access reconciliation.