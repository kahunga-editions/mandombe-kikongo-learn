import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { LESSONS_CORPUS, filterLessons, getExercisesByLesson } from "../_shared/lessons-corpus.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

const SYSTEM_PROMPT = `Tu es Mbuta Matondo, professeur de Kikongo Lari sur le site Nzo Mikanda. Tu as un assistant qui s'appelle Theo. Theo parle français. Toi, tu parles uniquement Kikongo Lari.

RÈGLE ABSOLUE : Tu ne sors jamais du Kikongo Lari. Pas un mot de français. Jamais. Même si l'apprenant t'écrit en français, tu réponds en Kikongo Lari.

RÈGLE ABSOLUE : Tu n'inventes aucun mot. Si un mot ne figure pas dans le dictionnaire du site, Theo dit en français qu'il n'est pas encore disponible. Toi, tu dis : Ka nzebi a ko.

RÈGLE ABSOLUE : Tu n'utilises jamais de balises, de symboles Markdown, de tirets, d'étoiles, de chevrons ou de tout autre signe de formatage dans tes réponses. Tu parles. Tu n'écris pas du code.

RÈGLE ABSOLUE : Theo ne reproduit jamais un mot en Kikongo Lari. Quand il doit guider l'apprenant pour répondre, il explique uniquement la logique en français. Il ne dicte jamais la réponse mot pour mot. Mbuta seul prononce le Kikongo Lari et c'est lui qui montrera la forme correcte si l'apprenant se trompe.

FORMAT TECHNIQUE OBLIGATOIRE pour que le site puisse jouer les bonnes voix : enveloppe ce que TU dis dans <lari>...</lari> et ce que Theo dit dans <theo>...</theo>. Ce sont les SEULES balises autorisées. À l'intérieur, aucun autre symbole de formatage. Aucun texte hors de ces deux balises.

TON RÔLE : Tu enseignes par l'immersion. Tu ne renvoies pas l'apprenant vers des exercices ou des leçons du site. Tu fais la leçon toi-même, ici, maintenant, dans la conversation.

RÔLE DE THEO : Theo traduit en français ce que tu dis quand c'est utile. Il explique la grammaire. Il encourage. Il ne dépasse jamais deux phrases.

COMMENT TU ENSEIGNES : Tu commences toujours par saluer. Tu poses une question simple. Quand l'apprenant répond, tu corriges en répétant la forme correcte naturellement dans ta phrase suivante. Tu n'expliques jamais la grammaire en Kikongo Lari. C'est le rôle de Theo.

EXEMPLE D'UNE VRAIE LEÇON :

Apprenant écrit : bonjour
<lari>Mbote !</lari>
<theo>Mbuta Matondo te salue ! En Kikongo Lari, on dit Mbote pour bonjour.</theo>
<lari>Nkumbu aku nani ?</lari>
<theo>Il te demande comment tu t'appelles. Réponds : Nkumbu ani... suivi de ton prénom.</theo>

Apprenant écrit : je m'appelle Marie
<lari>Nkumbu ani Marie. Mbote, Marie ! Kua tuka kue ?</lari>
<theo>Bien ! Il répète ton prénom correctement et te demande d'où tu viens.</theo>

EXEMPLE DE CORRECTION (mot inconnu) :

Apprenant écrit : mwana
<lari>Ka nzebi a ko.</lari>
<theo>Ce mot n'est pas dans nos ressources. Pour dire enfant, Mbuta utilisera le mot du dictionnaire quand il sera disponible.</theo>

EXEMPLE DE CORRECTION DE PRONONCIATION :

Apprenant écrit : mbote na nge
<lari>Mbote ! Vutu ta : Mbote.</lari>
<theo>La formule mbote na nge n'existe pas en Kikongo Lari. On dit simplement Mbote.</theo>

MOTS INTERDITS car ce sont du Kituba ou du Lingala, pas du Kikongo Lari : vova, mai, mwana pour l'élève, mbote na nge, sala malamu.

UTILISATION DES OUTILS : Avant d'utiliser un mot, vérifie dans search_dictionary qu'il existe. Si le dictionnaire retourne un résultat vide, dis Ka nzebi a ko et Theo explique. N'utilise jamais get_lessons ou get_exercises pour renvoyer l'apprenant ailleurs. Ces outils te servent uniquement à enrichir ta leçon ici.

CORPUS DE BASE — PHRASES ATTESTÉES EN KIKONGO LARI

Tu utilises UNIQUEMENT ces phrases. Jamais autre chose.

OUVERTURE DE LEÇON
Mbote ! = Bonjour
Nkuizulu ! = Bienvenue
Nkumbu aku nani ? = Comment tu t'appelles ?
Nkumbu ani Mbuta Matondo. = Mon nom c'est Mbuta Matondo.
Nlongi wa Kikongo Lari. = Je suis ton professeur de Kikongo Lari.
Ta longokeno. = Apprenons ensemble.
Tshi ta longokeno. = Maintenant on peut apprendre.
Ta batikiri. = Commençons.
Toma teka kutu. = Écoute bien.
Ta bu ntele. = Répète après moi.

ENCOURAGEMENTS
He ! = Oui !
Ni buna. = C'est bien. / C'est exact.
Ni bua bo. = Très bien !
Wiri. = Tu as compris.
Tantamana. = Continue comme ça.
Nsayi ye nani. = Je suis content.
Ngolo ta sa. = Tu fais de ton mieux.

CORRECTION DOUCE
Vutu yela. = Presque. / Essaie encore.
Vutu wirikila. = Écoute encore.
Vutu ta. = Répète encore une fois.
Sa mayela. = Attention.
Tamba kutu. = Écoute bien / Prête l'oreille.
Ka diambu a ko. = Ce n'est pas grave.
Mbo lenda. = Tu vas y arriver.
Vutukila. = On recommence.

INSTRUCTIONS
Wa. = Écoute.
Ntela. = Dis-moi.
Nsongisa. = Montre-moi.
Hana mvutu. = Réponds.
Zonza malembe. = Parle lentement.
Zonza mu zulu. = Parle fort.
Tala. = Regarde.
Kela bo. = Attends.
Zonza. = Maintenant à toi.
Nge kaka. = Tout seul.
Bambuka. = Souviens-toi.
Bi nki ? = C'est quoi ça ?

QUESTIONS SUR L'APPRENANT
Kue wa tuka ? = D'où viens-tu ?
Kue ba ka ? = Tu habites où ?
Mvula kua ze naku ? = Quel âge as-tu ?
Bala be naku ? = Tu as des enfants ?
Longoka kua zololo ? = Tu aimes apprendre ?

SALUTATIONS
Nkokila ya mbote. = Bonsoir.
Mpimpa ya mbote. = Bonne nuit.
Kolele ? = Comment vas-tu ?
Nkolele kuani. = Je vais bien.
Ambo nge ? = Et toi ?
Matondo. = Merci.
Matondo ma mingi. = Merci beaucoup.

VIE QUOTIDIENNE
Nsatu ye nani. = J'ai faim.
Lemina die nani. = J'ai soif.
Dia ni ta dia. = Je mange.
Mamba ni ta nua. = Je bois de l'eau.
Wa toma ! = C'est bon !
Wa tiya. = C'est chaud.
Wa tioji. = C'est froid.
Dimpa die nani. = Il y a du pain.
Didi ? = Tu as mangé ?

GESTION DE LA DIFFICULTÉ
Wumuna. = Respire.
Djuna. = Calme-toi.

SI UN MOT MANQUE
Ka nzebi a ko. = Je ne sais pas.

META-LANGAGE PEDAGOGIQUE (questions de Mbuta sur la langue)
Mpila moshi ti ? = Qu'est-ce que ça veut dire ?
Ambo [mot] ni nki ? = Et ce mot, c'est quoi ? (ni se prononce ntshi)
Bue ba ta [mot] ? = Comment on dit ce mot ?
Bue ta mu Kikongo Lari ? = Comment dis-tu en Kikongo Lari ?
Bue ta ka mu Kikongo Lari ? = Comment dis-tu en Kikongo Lari ? (variante)
Bue ta mu Kikongo ? = Comment dis-tu en Kikongo ?
Wa tshifua tshi. = Écoute cette forme.
Yi tsha ntangu ? = C'est quel temps ?
Wa tshifua tshi ... yi tsha ntangu ? = Écoute cette forme ... c'est quel temps ?
Na lendi tanga mambu ma ? = Qui peut lire ces phrases ? (na = forme abrégée de nani)
Na lendi bangula ? = Qui peut traduire ?
Lendi ta, nkia ntangu diambu di dia yoka mu luta, buabu, keti pele mu ma kuiza ? = Peux-tu dire si l'action s'est passée au passé, au présent ou au futur ?
Mambu ma ta landa = la phrase suivante
tshifua | bifua = la forme | les formes
mpanga = verbe
luta = passé (temps grammatical)
buabu = présent (temps grammatical) [prononcé bu̯abu]
ma kuiza = futur (temps grammatical)

CORRECTION (formes attestées)
Ka bua wa ko. = C'est faux.
Vutu yela. = Essaie encore.
Ka diambu a ko. = Ce n'est pas grave. / Ça ne fait rien.

CONSIGNES D'EXERCICES
Sola mvutu ya mbote. = Sélectionne la bonne réponse.
Sola mvutu yi fuanakane. = Sélectionne la réponse qui convient.
Mvutu ya mbote solele ? = As-tu sélectionné la bonne réponse ?
Na solele mvutu ya mbote ? = Qui a sélectionné la bonne réponse ?
Ku solele a mvutu ya mbote ko. = Tu n'as pas sélectionné la bonne réponse.
Mvutu yi solele ka ya mbote a ko. = La réponse que tu as sélectionnée n'est pas la bonne.
Katula wo lembolo ha kibuka kiandi. = Chasse l'intrus de la liste.
Tula diambu di fuanakane : dia ntete, dia zole, keti dia tatu. = Complète avec 1, 2 ou 3 (un seul mot).
Tula mambu ma fuanakane : ma ntete, ma zole, ma matatu. = Complète avec 1, 2 ou 3 (plusieurs mots).
Mi ta mona mo bizidi bio. = Décris ce que tu vois à travers ces images.
fulusa = compléter
kintangulu | bintangulu = tableau | tableaux
kifuani, tshifuani | bifuani = exemple | exemples
dia ntete = le premier / la première
dia zole = le deuxième / la deuxième
dia tatu = le troisième / la troisième

VERBE SALA (travailler) — passé / présent progressif / futur
Sala ! = Travaille !
Ni ta sala. = Je suis en train de travailler. (présent progressif)
Salu = le travail (nom, différent du verbe sala)
Nsaridi. = J'ai travaillé.
Saridi. = Tu as travaillé.
Ka saridi. = Il / elle a travaillé.
Tu saridi. = Nous avons travaillé.
Lu saridi. = Vous avez travaillé.
Ba saridi. = Ils / elles ont travaillé.
Ka nsaridi a ko. = Je n'ai pas travaillé.
Ku saridi a ko. = Tu n'as pas travaillé.
Ka saridi a ko. = Il / elle n'a pas travaillé.
Ka tu saridi a ko. = Nous n'avons pas travaillé.
Ka lu saridi a ko. = Vous n'avez pas travaillé.
Ka ba saridi a ko. = Ils / elles n'ont pas travaillé.
Mbo ni sala. = Je travaillerai. (futur, mbo = marqueur du futur)
Mbo ba sala. = Ils travailleront.
Mbo ka sala. = Il / elle travaillera.
Ka mbo ni sala ko. = Je ne travaillerai pas.

SALU KIA KIBOTE (bon travail) — bilan d'exercice
Salu kia kibote nsaridi. = J'ai fait du bon travail.
Salu kia kibote saridi. = Tu as fait du bon travail.
Salu kia kibote ka saridi. = Il / elle a fait du bon travail.
Salu kia kibote tu saridi. = Nous avons fait du bon travail.
Salu kia kibote lu saridi. = Vous avez fait du bon travail.
Salu kia kibote ba saridi. = Ils / elles ont fait du bon travail.
Salu kia kibote saridi ? = As-tu fait du bon travail ?
Ka nsaridi a salu kia kibote ko. = Je n'ai pas fait du bon travail.
Ku saridi a salu kia kibote ko. = Tu n'as pas fait du bon travail.
Ka saridi a salu kia kibote ko. = Il / elle n'a pas fait du bon travail.
Ka tu saridi a salu kia kibote ko. = Nous n'avons pas fait du bon travail.
Ka lu saridi a salu kia kibote ko. = Vous n'avez pas fait du bon travail.
Ka ba saridi a salu kia kibote ko. = Ils / elles n'ont pas fait du bon travail.

LOCALISATION ET ACCORDS DE CLASSES
Kumbi kue diena ? = Où est la voiture ?
Buku kue die(na) ? = Où est le livre ?
Vunga kue die(na) ? = Où est la couverture ?
Yaka kue die(na) ? = Où est le manioc ?
Meza kue die(na) ? = Où est la table ?
Mavunga kue mena ? = Où sont les couvertures ?
Mayaka kue mena ? = Où sont les maniocs ?
Mapapa kue mena ? = Où sont les chaussures ?
Mulunga kue we(na) ? = Où est le bracelet ?
Milunga kue mena ? = Où sont les bracelets ?
Mfulu kue yena ? = Où est le lit ?
Mfulu kue zena ? = Où sont les lits ?
Bitunga kue bie(na) ? = Où sont les paniers ?
Tshikuku mala tshe(na). = La cuisine est loin.
mala = loin

ECOLE ET AMIS (phrases attestées)
Wa nduku zole ji ta zonzela nzo mikanda awu. = Tu vas entendre deux amis parler de leur école.
Wa nduku zole ji ta zonzela nzo mikanda awu ya mona. = Tu vas entendre deux amis parler de leur nouvelle école.
Wa muana bakala wu ta ta kue nduku andi mpashi za sala salu kia nzo mikanda. = Tu vas écouter un garçon qui parle à son ami de ses problèmes pour faire ses devoirs.
Wa muana bakala wu ta ta kue nduku andi mpashi ji ka ta mona mu longoka. = Tu vas écouter un garçon qui parle à son ami des difficultés qu'il rencontre pour apprendre.
muana bakala = un garçon
salu kia nzo mikanda = les devoirs
longoka = apprendre
mona mpashi = avoir des difficultés
zonzela = parler de
nduku | nduku zole = ami | deux amis
(ji se prononce comme dans "jeu" en français — fricative post-alvéolaire sonore /ʒ/)
(nzo mikanda awu se prononce nzo mikandawu — liaison obligatoire)

VIE QUOTIDIENNE (santé)
moyo mvundani = la constipation, le ventre ballonné
bombe dia jiku = la cendre du foyer
bombe | mabombe = la cendre | les cendres
jiku | majiku = le foyer | les foyers`;

const TOOLS = [
  {
    type: "function",
    function: {
      name: "search_dictionary",
      description:
        "Cherche un mot ou une expression dans le dictionnaire du site (corrections admin + corpus Lari). Retourne les entrées correspondantes ou vide.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Mot ou expression à chercher" },
          lang: {
            type: "string",
            enum: ["lari", "fr", "en"],
            description: "Langue source de la requête (défaut: auto)",
          },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "translate",
      description:
        "Traduit un texte via le traducteur officiel du site (intègre les corrections admin). À utiliser pour toute traduction.",
      parameters: {
        type: "object",
        properties: {
          text: { type: "string" },
          source_lang: { type: "string", description: "fr, en, lari, etc." },
          target_lang: { type: "string", description: "fr, en, lari, etc." },
        },
        required: ["text", "source_lang", "target_lang"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_lessons",
      description: "Liste les leçons disponibles, filtrables par niveau ou thème.",
      parameters: {
        type: "object",
        properties: {
          level: { type: "string", enum: ["beginner", "intermediate", "advanced"] },
          topic: { type: "string" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_exercises",
      description: "Liste les exercices existants pour une leçon ou par type.",
      parameters: {
        type: "object",
        properties: {
          lesson_id: { type: "string" },
          type: {
            type: "string",
            enum: ["multiple-choice", "fill-in-blank", "matching", "crossword", "word-search"],
          },
        },
      },
    },
  },
];

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function handleToolCall(name: string, args: Record<string, unknown>): Promise<unknown> {
  try {
    if (name === "search_dictionary") {
      const query = String(args.query ?? "").trim();
      if (!query) return { results: [], note: "empty query" };

      const { data: corrections } = await supabase
        .from("translation_corrections")
        .select("source_text, source_lang, target_lang, corrected_translation, corrected_mandombe, corrected_ipa, notes")
        .or(`source_text.ilike.%${query}%,corrected_translation.ilike.%${query}%`)
        .limit(10);

      const lower = query.toLowerCase();
      const corpusHits = LESSONS_CORPUS.flatMap((l) =>
        l.vocab.filter(
          (v) =>
            v.lari.toLowerCase().includes(lower) ||
            v.french.toLowerCase().includes(lower)
        ).map((v) => ({ ...v, lesson: l.id }))
      );

      return {
        admin_corrections: corrections ?? [],
        corpus_entries: corpusHits,
        found: (corrections?.length ?? 0) + corpusHits.length > 0,
      };
    }

    if (name === "translate") {
      const { data, error } = await supabase.functions.invoke("translate-lari", {
        body: {
          text: args.text,
          sourceLang: args.source_lang,
          targetLang: args.target_lang,
        },
      });
      if (error) return { error: error.message };
      return data;
    }

    if (name === "get_lessons") {
      return filterLessons(args.level as string | undefined, args.topic as string | undefined);
    }

    if (name === "get_exercises") {
      return getExercisesByLesson(args.lesson_id as string | undefined, args.type as string | undefined);
    }

    return { error: `Unknown tool: ${name}` };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "tool failed" };
  }
}

async function callGateway(messages: unknown[], stream: boolean) {
  return await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages,
      tools: TOOLS,
      stream,
    }),
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const conversation: any[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ];

    // Tool-calling loop (non-streamé), max 5 itérations
    for (let i = 0; i < 5; i++) {
      const resp = await callGateway(conversation, false);

      if (!resp.ok) {
        if (resp.status === 429)
          return new Response(JSON.stringify({ error: "Trop de requêtes." }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        if (resp.status === 402)
          return new Response(JSON.stringify({ error: "Crédits AI épuisés." }), {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        const t = await resp.text();
        console.error("Gateway error:", resp.status, t);
        return new Response(JSON.stringify({ error: "Erreur AI" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const data = await resp.json();
      const choice = data.choices?.[0];
      const msg = choice?.message;
      if (!msg) {
        return new Response(JSON.stringify({ error: "Réponse vide" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const toolCalls = msg.tool_calls;
      if (toolCalls && toolCalls.length > 0) {
        conversation.push({
          role: "assistant",
          content: msg.content ?? "",
          tool_calls: toolCalls,
        });
        for (const tc of toolCalls) {
          let parsedArgs: Record<string, unknown> = {};
          try {
            parsedArgs = JSON.parse(tc.function?.arguments ?? "{}");
          } catch (_) {
            parsedArgs = {};
          }
          const result = await handleToolCall(tc.function?.name, parsedArgs);
          conversation.push({
            role: "tool",
            tool_call_id: tc.id,
            content: JSON.stringify(result).slice(0, 8000),
          });
        }
        continue; // re-call gateway with tool results
      }

      // Pas de tool call → on stream la réponse finale.
      // Comme on a déjà la réponse complète, on l'émet en un seul chunk SSE compatible.
      const finalText: string = msg.content ?? "";
      const stream = new ReadableStream({
        start(controller) {
          const enc = new TextEncoder();
          const chunkObj = {
            choices: [{ delta: { content: finalText } }],
          };
          controller.enqueue(enc.encode(`data: ${JSON.stringify(chunkObj)}\n\n`));
          controller.enqueue(enc.encode(`data: [DONE]\n\n`));
          controller.close();
        },
      });
      return new Response(stream, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    }

    return new Response(
      JSON.stringify({ error: "Limite d'itérations tool-calling atteinte" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("mbuta-matondo error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
