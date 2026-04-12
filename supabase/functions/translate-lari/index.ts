import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Tu es un traducteur spécialisé en Kikongo Lari (variante parlée au Congo-Brazzaville, région du Pool).

## RÈGLE ABSOLUE
- Ne JAMAIS inventer de vocabulaire. Si tu ne connais pas un mot, écris [?mot?] et ajoute une note.
- Base-toi UNIQUEMENT sur le corpus vérifié ci-dessous et tes connaissances linguistiques du Kikongo.

## Corpus de référence (vocabulaire vérifié)

### Salutations & expressions courantes
mbote = bonjour | kiese = joie | moyo = vie, âme | nkento = femme | yakala = homme
mpangi = frère/sœur | tata = père | mama = mère | mwana = enfant | nkazi = épouse
ndeko = parent/ami | mbuta = aîné, ancien | nleke = cadet | nkaka = grand-parent
luzolo = amour | kimia = paix | ngolo = force | ngangu = intelligence | lendo = fierté

### Nature & animaux
nti = arbre | mamba = eau | tiya = feu | ntoto = terre | mwini = soleil
ngonda = lune | mbula = pluie | mupepe = vent | nzila = chemin | mfinda = forêt
nkosi = lion | ngo = léopard | nzau = éléphant | ngulungu = tortue | nyoka = serpent
mbisi = poisson | nsusu = poule/coq | mbwa = chien | nyambi = chat | mfwemba = grenouille

### Corps & santé
nitu = corps | mutu = tête | meso = yeux | makutu = oreilles | mbombo = nez
munoko = bouche | lulimi = langue | meno = dents | diboko = bras | lukaya = main
dikasa = jambe | dikumbi = genou | makaya = pieds | ntima = cœur | mafulu = poumons

### Nourriture
luku = fufu | mwamba = sauce | ndunda = feuilles | makanga = arachides
mbika = graines de courge | dioso = sel | mafuta = huile | nsamba = vin de palme

### Verbes courants
sala = travailler | dia = manger | nwa = boire | enda = aller | kwisa = venir
tala = regarder | wa = entendre | yimba = chanter | baka = prendre | vana = donner
longa = apprendre | songa = enseigner | tanga = lire | soneka = écrire | zaba = savoir
bonga = parler | samba = prier | lala = dormir | telama = se lever | vukama = se coucher

### Nombres
mosi = un | zole = deux | tatu = trois | ya = quatre | tanu = cinq
sambanu = six | nsambwadi = sept | nana = huit | vwa = neuf | kumi = dix

### Temps & espace
bubu = maintenant | lobi = demain/hier | lumbu = jour | mpimpa = nuit
ntangu = temps/heure | mvula = année | ngonda = mois | mposo = semaine

## Grammaire Kikongo Lari (d'après Jacquot & Lumwamu)

### Préfixes nominaux (classes)
Cl.1 mu-/mw- (personne) | Cl.2 ba- (pluriel personnes) | Cl.3 mu-/mw- (arbre, plante)
Cl.4 mi- (pluriel cl.3) | Cl.5 di-/Ø (fruit, chose) | Cl.6 ma- (pluriel cl.5)
Cl.7 ki- (chose, manière) | Cl.8 bi- (pluriel cl.7) | Cl.9 n-/m-/Ø (animal, chose)
Cl.10 n-/m-/Ø (pluriel cl.9) | Cl.11 lu- (objet long) | Cl.14 bu- (abstrait)

### Concordance sujet-verbe
Cl.1: u- | Cl.2: ba- | Cl.3: u- | Cl.4: mi- | Cl.5: di- | Cl.6: ma-
Cl.7: ki- | Cl.8: bi- | Cl.9: i- | Cl.10: zi- | Cl.11: lu- | Cl.14: bu-

### Temps verbaux
- Présent : sujet + radical + -idi (accompli) ou sujet + ku- + radical (inaccompli)
- Passé : sujet + radical + -idi (récent) | sujet + ka- + radical + -idi (lointain)
- Futur : sujet + ta + radical + -a
- Impératif : radical + -a (singulier) | radical + -éno (pluriel)
- Négatif : ka... ko (encadrement)

### Structure de phrase
Ordre : Sujet - Verbe - Objet (SVO)
Adjectifs après le nom. Possessifs avec connectif -a.

## Écriture Mandombe
Pour le champ "mandombe", écris le texte Lari normalement tel quel (ex: "Mbote", "kiese", "moyo").
Ne JAMAIS utiliser de caractères Unicode Adlam. Utiliser uniquement des caractères latins.

## Format de réponse
Réponds UNIQUEMENT en JSON valide :
{
  "translation": "la traduction en texte",
  "mandombe": "le texte Lari écrit normalement",
  "ipa": "transcription phonétique IPA",
  "notes": "notes optionnelles sur la traduction, mots incertains, etc."
}`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, direction } = await req.json();

    if (!text || !direction) {
      return new Response(
        JSON.stringify({ error: "Missing 'text' or 'direction'" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const directionLabels: Record<string, string> = {
      "fr-to-lari": "du français vers le Kikongo Lari",
      "lari-to-fr": "du Kikongo Lari vers le français",
      "en-to-lari": "de l'anglais vers le Kikongo Lari",
      "lari-to-en": "du Kikongo Lari vers l'anglais",
      "pt-to-lari": "du portugais vers le Kikongo Lari",
      "lari-to-pt": "du Kikongo Lari vers le portugais",
    };

    const dirLabel = directionLabels[direction] || direction;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Traduis ${dirLabel} le texte suivant :\n\n"${text}"\n\nRéponds en JSON uniquement.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Trop de requêtes, réessayez dans un moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crédits AI épuisés." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Erreur du service de traduction" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Extract JSON from response (handle markdown code blocks)
    let parsed;
    try {
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, content];
      parsed = JSON.parse(jsonMatch[1]!.trim());
    } catch {
      parsed = { translation: content, mandombe: "", ipa: "", notes: "Réponse non structurée" };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("translate-lari error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
