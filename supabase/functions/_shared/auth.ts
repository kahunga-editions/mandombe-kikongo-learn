import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

export type AuthCheck =
  | { ok: true; userId: string; email: string | null; isAdmin: boolean }
  | { ok: false; status: number; error: string };

/**
 * Validate the JWT from the Authorization header.
 * If requireAdmin is true, also checks user_roles for the 'admin' role.
 */
export async function requireAuth(
  req: Request,
  opts: { requireAdmin?: boolean } = {},
): Promise<AuthCheck> {
  const authHeader = req.headers.get("Authorization") || req.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    return { ok: false, status: 401, error: "Missing authorization token" };
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return { ok: false, status: 401, error: "Invalid or expired token" };
  }
  const user = data.user;

  let isAdmin = false;
  if (opts.requireAdmin) {
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);
    isAdmin = !!roles?.some((r: { role: string }) => r.role === "admin");
    if (!isAdmin) {
      return { ok: false, status: 403, error: "Admin role required" };
    }
  }

  return { ok: true, userId: user.id, email: user.email ?? null, isAdmin };
}

export function unauthorizedResponse(
  check: Extract<AuthCheck, { ok: false }>,
  corsHeaders: Record<string, string>,
): Response {
  return new Response(JSON.stringify({ error: check.error }), {
    status: check.status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
