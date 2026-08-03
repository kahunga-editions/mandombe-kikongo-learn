// Exporte les corrections validées du traducteur pour la génération du dictionnaire ODT/PDF.
// Protégé par le header x-service-token (secret TTS_SERVICE_TOKEN).
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { getServiceClient } from "../_shared/quota.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-service-token",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const token = req.headers.get("x-service-token");
  const expected = Deno.env.get("TTS_SERVICE_TOKEN");
  if (!expected || token !== expected) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = getServiceClient();
  const rows: unknown[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from("translation_corrections")
      .select("source_lang,target_lang,source_text,corrected_translation,corrected_mandombe,notes")
      .range(from, from + PAGE - 1);
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    rows.push(...(data ?? []));
    if (!data || data.length < PAGE) break;
  }

  return new Response(JSON.stringify({ corrections: rows }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
