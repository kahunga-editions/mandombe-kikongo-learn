// Expose en lecture seule les formes validées par l'expert dans le traducteur,
// filtrées pour ne garder que celles utiles au panneau de conjugaisons.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { CONJUGATION_FORMS } from "../_shared/conjugations-corpus.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const norm = (s: string): string =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_'’.,;:!?]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Marques de personne / temps typiques d'une forme conjuguée lari. */
const PERSON_MARKERS = [
  "ni", "na", "nde", "n", "wa", "we", "ka", "ku", "tu", "tua", "lu", "lua",
  "ba", "mbo", "mbaji", "sa", "mfueti", "fueti", "lendi", "ndendi",
];

/** Verbes connus des tableaux de conjugaison (racines et formes). */
const KNOWN_VERBS = new Set<string>();
for (const f of CONJUGATION_FORMS) {
  for (const w of norm(f.lari).split(" ")) if (w.length >= 3) KNOWN_VERBS.add(w);
  if (f.verb) {
    const root = norm(f.verb).split(" ")[0];
    if (root.length >= 2) KNOWN_VERBS.add(root);
  }
}

function looksConjugated(lari: string): boolean {
  const words = norm(lari).split(" ").filter(Boolean);
  if (words.length === 0 || words.length > 8) return false;
  if (PERSON_MARKERS.includes(words[0])) return true;
  return words.some((w) => KNOWN_VERBS.has(w));
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { data, error } = await supabase
      .from("translation_corrections")
      .select("source_text, source_lang, target_lang, corrected_translation, corrected_mandombe, notes, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error) throw error;

    const seen = new Set<string>();
    const forms = (data || [])
      .map((r) => {
        const toLari = r.target_lang === "lari";
        const fromLari = r.source_lang === "lari";
        if (!toLari && !fromLari) return null;
        const lari = (toLari ? r.corrected_translation : r.source_text) || "";
        const gloss = (toLari ? r.source_text : r.corrected_translation) || "";
        const lang = toLari ? r.source_lang : r.target_lang;
        if (!lari.trim() || !gloss.trim()) return null;
        if (!looksConjugated(lari)) return null;
        const key = norm(lari) + "|" + norm(gloss);
        if (seen.has(key)) return null;
        seen.add(key);
        return {
          lari: lari.trim(),
          mandombe: (r.corrected_mandombe || "").trim() || lari.trim(),
          gloss: gloss.trim(),
          lang,
          notes: (r.notes || "").trim() || undefined,
          createdAt: r.created_at,
        };
      })
      .filter(Boolean)
      .slice(0, 300);

    return new Response(JSON.stringify({ forms }), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=60" },
    });
  } catch (e) {
    console.error("validated-forms error:", e);
    return new Response(JSON.stringify({ forms: [], error: "Lecture impossible" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
