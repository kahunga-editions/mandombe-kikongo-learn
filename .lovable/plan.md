# Fix: admin (and all signed-in users) lose access when JWT expires

## Diagnostic

The translator page shows `Invalid or expired token` even for the admin. The admin bypass for the 11-use quota already exists server-side (`hasUnlimitedAccess` in `_shared/quota.ts`), so the quota is not the problem.

The real cause is in `src/pages/Translator.tsx`: both `translate()` and `saveCorrection()` call the edge function with raw `fetch(...)` using `session?.access_token` from React state. When the in-memory token has expired (long-lived tab, returning user), the edge function's `auth.getUser(token)` rejects it with HTTP 401 `Invalid or expired token`. The Supabase JS client would normally auto-refresh, but raw `fetch` bypasses that.

Admin status is irrelevant here — the request is rejected before any role check.

## Fix

In `src/pages/Translator.tsx`:

1. Before each `translate()` / `saveCorrection()` request, ensure a fresh JWT:
   - `const { data } = await supabase.auth.getSession();`
   - If `!data.session` or the token is within ~60s of `expires_at`, call `await supabase.auth.refreshSession()` and use the refreshed token.
2. Replace the raw `fetch(...VITE_SUPABASE_URL/functions/v1/translate-lari)` calls with `supabase.functions.invoke("translate-lari", { body })`, which:
   - Uses the live session from the Supabase client (auto-refresh enabled).
   - Avoids hardcoding `VITE_SUPABASE_PUBLISHABLE_KEY` and the URL.
   - Still surfaces non-2xx via `error` / `response.status` (we'll read `error.context?.response` to detect HTTP 402 → `quotaExceeded`).
3. If a 401 still comes back after a refresh attempt, show a clear toast "Session expirée, reconnectez-vous" and route to `/auth?next=/translator` instead of leaving the cryptic raw message in the result panel.

No backend changes — admin quota bypass is already correct. No price / paywall / UI restructuring.

## Files touched

- `src/pages/Translator.tsx` — swap raw `fetch` for `supabase.functions.invoke`, add pre-call session refresh, friendlier 401 handling.

## Out of scope

- Dictionary page (same pattern may apply; will tackle separately if you confirm it also breaks).
- Any change to free quota, lifetime unlock, or premium logic.
