import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { requireAuth, unauthorizedResponse } from "../_shared/auth.ts";
import { consumeQuota, FREE_LIMIT, getServiceClient, quotaExceededResponse } from "../_shared/quota.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ALLOWED_FEATURES = new Set(["translator_dictionary"]);

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const auth = await requireAuth(req);
  if (!auth.ok) return unauthorizedResponse(auth, corsHeaders);

  try {
    const { feature } = await req.json().catch(() => ({}));
    const featureKey = typeof feature === "string" && ALLOWED_FEATURES.has(feature)
      ? feature
      : "translator_dictionary";

    const supabase = getServiceClient();
    const result = await consumeQuota(supabase, auth.userId, featureKey, FREE_LIMIT);
    if (!result.allowed) return quotaExceededResponse(corsHeaders);

    return new Response(
      JSON.stringify({
        allowed: true,
        unlimited: result.unlimited,
        remaining: result.remaining,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
