import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

export const PAYPAL_GATEWAY_URL = "https://connector-gateway.lovable.dev/paypal";
export const FULL_PREMIUM_PRODUCT = "full_premium";
export const PREMIUM_AMOUNT_EUR = "37.00";
export const PREMIUM_CURRENCY = "EUR";

export class HttpError extends Error {
  status: number;
  details?: string;

  constructor(message: string, status: number, details?: string) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function getServiceClient(): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );
}

export async function requireUser(req: Request, supabase: SupabaseClient) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) throw new HttpError("Authentication required", 401);
  const token = authHeader.replace("Bearer ", "");
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) throw new HttpError("Authentication expired", 401);
  return data.user;
}

export async function paypalRequest(path: string, init: RequestInit = {}) {
  const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
  const paypalApiKey = Deno.env.get("PAYPAL_API_KEY");
  if (!lovableApiKey || !paypalApiKey) {
    throw new HttpError("PayPal is not configured", 500);
  }

  const response = await fetch(`${PAYPAL_GATEWAY_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${lovableApiKey}`,
      "X-Connection-Api-Key": paypalApiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers ?? {}),
    },
  });

  const body = await response.text();
  if (!response.ok) {
    console.error(`PayPal request failed [${response.status}]: ${body}`);
    throw new HttpError("PayPal request failed", response.status, body);
  }
  return body ? JSON.parse(body) : {};
}

export function paypalErrorResponse(error: unknown, corsHeaders: Record<string, string>) {
  const status = error instanceof HttpError ? error.status : 500;
  const message = error instanceof Error ? error.message : "Unknown error";
  const details = error instanceof HttpError ? error.details : undefined;
  return new Response(JSON.stringify({ error: message, status, details }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
