# Architecture rules

- Route Premium billing through `src/lib/premiumBilling.ts`; role-based access is not a paid subscription, and same-tab navigation avoids blocked payment popups.
- Edge functions authenticate using the managed `SUPABASE_ANON_KEY` when no privileged database operations are required; the browser publishable-key variable is not a server runtime secret.