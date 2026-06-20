import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

export const FREE_LIMIT = 11;
export const LIFETIME_PRODUCT = "translator_dictionary";

export function getServiceClient(): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );
}

export async function hasUnlimitedAccess(
  supabase: SupabaseClient,
  userId: string,
): Promise<boolean> {
  // admin?
  const { data: roles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);
  if (roles?.some((r: { role: string }) => r.role === "admin")) return true;

  // active premium sub?
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("is_premium, status")
    .eq("user_id", userId)
    .eq("is_premium", true)
    .eq("status", "active")
    .maybeSingle();
  if (sub) return true;

  // lifetime unlock?
  const { data: unlock } = await supabase
    .from("lifetime_unlocks")
    .select("user_id")
    .eq("user_id", userId)
    .eq("product", LIFETIME_PRODUCT)
    .maybeSingle();
  return !!unlock;
}

export async function getUsageCount(
  supabase: SupabaseClient,
  userId: string,
  feature: string,
): Promise<number> {
  const { data } = await supabase
    .from("feature_usage")
    .select("count")
    .eq("user_id", userId)
    .eq("feature", feature)
    .maybeSingle();
  return data?.count ?? 0;
}

/**
 * Check quota & increment by 1 atomically. Returns whether allowed.
 * If unlimited access, returns {allowed:true, unlimited:true} without recording.
 */
export async function consumeQuota(
  supabase: SupabaseClient,
  userId: string,
  feature: string,
  limit = FREE_LIMIT,
): Promise<
  | { allowed: true; unlimited: true; remaining: null }
  | { allowed: true; unlimited: false; remaining: number }
  | { allowed: false; unlimited: false; remaining: 0; exceeded: true }
> {
  if (await hasUnlimitedAccess(supabase, userId)) {
    return { allowed: true, unlimited: true, remaining: null };
  }
  const current = await getUsageCount(supabase, userId, feature);
  if (current >= limit) {
    return { allowed: false, unlimited: false, remaining: 0, exceeded: true };
  }
  const next = current + 1;
  await supabase.from("feature_usage").upsert(
    { user_id: userId, feature, count: next, updated_at: new Date().toISOString() },
    { onConflict: "user_id,feature" },
  );
  return { allowed: true, unlimited: false, remaining: Math.max(0, limit - next) };
}

export function quotaExceededResponse(corsHeaders: Record<string, string>): Response {
  return new Response(
    JSON.stringify({
      error: "quota_exceeded",
      message:
        "You've used all 11 free translations. Unlock unlimited access for $19.99 or subscribe to Premium.",
    }),
    { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
}
