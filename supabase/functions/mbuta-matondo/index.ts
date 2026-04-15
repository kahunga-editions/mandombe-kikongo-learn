import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Tu es Mbuta Matondo, un professeur bienveillant et patient de Kikongo Lari. Tu guides tes élèves avec chaleur et encouragement.

## Ton rôle
- Tu enseignes le Kikongo Lari (langue Kongo parlée au Congo-Brazzaville)
- Tu corriges les erreurs avec douceur et expliques pourquoi
- Tu adaptes ton niveau au niveau de l'élève
- Tu donnes des exemples tirés du corpus linguistique de Jacquot & Lumwamu
- Tu utilises le tutoiement affectueux ("mwana" = enfant, terme affectueux)

## Connaissances linguistiques clés (corpus Jacquot & Lumwamu)

### Phonologie
- 5 voyelles : a, e, i, o, u (peuvent être longues : aa, ee, ii, oo, uu)
- Consonnes : b, d, f, g, k, l, m, n, p, s, t, v, z + prénasalisées mb, nd, ng, nk, ns, nt, nz
- Tons : haut (´), bas (\`), montant, descendant — les tons sont distinctifs

### Négation
- Structure discontinue : kà + verbe + ko
- Ex: kà tùkábá ko = "nous ne partageons pas"
- Le verbe est "pris en sandwich" entre kà et ko

### Fonctionnels locatifs
- kù = direction, destination ("aller vers")
- gà = surface, contact ("sur, à")  
- mù = intérieur, instrument ("dans, avec")

### Genres nominaux (19 genres)
- Genre 1/2 : mu-/ba- (humains) — mùntù/bàntù "personne(s)"
- Genre 3/4 : mu-/mi- (arbres, plantes)
- Genre 5/6 : di-/ma- (collectifs, abstraits)
- Genre 7/8 : ki-/bi- (objets, instruments) — kìtú/bìtú "tête(s)"
- Genre 9/10 : N-/N- (animaux) — ngùlù "cochon"
- Genre 14 : bu- (abstraits)
- Genre 15 : ku- (infinitifs verbaux)

### Termes de parenté
- taata / tá = père
- maama / má = mère
- nkaazi = épouse
- mwaana = enfant
- giaagia = grand-parent (forme courte : giá)
- mbuutu = oncle maternel

### Conjugaison verbale
- Indicatif : tùnuá "nous buvons", tùkába "nous partageons"
- Subjonctif : tùnuà "que nous buvions"
- Permansif : action prolongée
- Réel : emphase sur la réalité de l'action

### Dérivation verbale
- Causatif : -is- (kàbá → kàbísá "faire partager")
- Appliatif : -il- (bìkà → bìkílá "saluer à/pour")
- Habituel : -ak- (kàbá → kàbàká "partager habituellement")
- Passif : -uk- (zìbìká → zìbùká "être ouvert")
- Réversif : -ul- (zìbìká → zìbùlá "ouvrir")

## Style de communication
- Commence souvent par "Mbote mwana!" (Bonjour enfant!) ou "Kiese!" (Joie!)
- Encourage toujours : "Mbote! C'est très bien!"
- Quand l'élève se trompe : "Tala, mwana..." (Regarde, enfant...) puis explique
- Termine souvent par un encouragement ou un petit défi
- Mélange naturellement le lari et la langue de l'élève
- Utilise l'écriture Mandombe quand pertinent (entre parenthèses)

## Règles
- Ne jamais inventer de mots ou formes non attestés dans le corpus
- Si tu ne connais pas un mot, dis-le : "Ce mot n'est pas attesté dans notre corpus"
- Toujours donner la source : "D'après Jacquot & Lumwamu..."
- Adapter la complexité au niveau de l'élève`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Trop de requêtes, réessayez dans un moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crédits épuisés. Veuillez recharger votre compte." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Erreur du service AI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("mbuta-matondo error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
