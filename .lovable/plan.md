
Ajouter le nouveau corpus + leçon 3 famille au `SYSTEM_PROMPT` de `supabase/functions/mbuta-matondo/index.ts`, durcir la règle anti-Lari pour Theo, ajouter un post-filtre code, et pousser des overrides phonétiques TTS.

## 1. Corpus à ajouter (`supabase/functions/mbuta-matondo/index.ts`)

Nouvelles sections dans `CORPUS_DE_BASE` :

**Mot inconnu / gestion**
- `Diambu dio ka nzebi a dio ko buabu.` = Je ne connais pas encore ce mot
- `Mu tela ka ku bangurila mu lumputu.` = Demande-lui d'expliquer en français
- `ntela / tu tela / ba tela` = dis-moi / dis-nous / dis-leur (/t/ palatal, /e:/ long)
- `Diambu dio tshika wa longoka dio.` = Tu vas apprendre ce mot bientôt

**Changer de sujet / futur immédiat**
- `Ta zonzela bima biaka.` / `Ta zonzela misamu miaka.` = Parlons d'autre chose
- `Zonzeleno musamu ka / mambu maka / misamu miaka.` = Parlez d'autre chose
- `Ba zonzela musamu ka / mambu maka.` = Qu'ils parlent d'autre chose
- `Ta kala ku malongi meto.` / `Ta vutukila malongi meto.` = Revenons à notre leçon
- `Vutukeno ku malongi meno.` / `Kaleno ku malongi meno.` = Revenez à votre leçon
- `Mbo ta tala wo ntangu ka.` = On verra ça plus tard
- `Mbo ta zonzela wo ntangu ka.` = On parlera de ça plus tard

**Futur de ZONZA**
- Aff : `mbo ni zonza`, `mbo zonza`, `mbo ka zonza`, `mbo tu zonza`, `mbo lu zonza`, `mbo ba zonza`
- Nég : `ka ni zonza ko`, `ku zonza ko`, `ka zonza ko`, `ka tu zonza ko`, `ka lu zonza ko`, `ka ba zonza ko`

**Méta-langage du professeur** (sans la phrase retirée précédemment)
- `Lumbu tshi nki tu longoka ?` = C'est quoi la leçon du jour ?
- `Tanga diambu di moshi di moshi.` = Lis chaque phrase
- `Tanga nsangu zazi / zi / ji.` / `Tanga mambu ma.` / `Tanga diambu di.` = Lis cette information
- `Bue ta tangila mazita ma ?` = Comment dis-tu ces syllabes ?
- `Fulusa mambu ma nzuridi.` = Complète les questions suivantes
- `Delakasa mambu ma nzuridi na mvutu zawu.` = Fais correspondre questions et réponses
- `Wa / Wirikila mambu ma ni ta yula, hana mvutu.` = Écoute les questions et réponds
- `Vutula / Hana mvutu zole keti tatu.` = Réponds en deux ou trois phrases
- `Vutula mambu ma nzuridi.` = Réponds aux questions
- `Tala bizidi bio, ta mi yirika / sa muna muntu muntu mbaji.` = Regarde les images et dis ce que chaque personne fera demain
- `Sa ntangu yi fuanakane, sarila mpe nkumbu ji ba heni.` = Utilise le bon temps et les noms donnés

**Vocabulaire**
- `diambu/mambu` = mot/sujet/question, `nzuridi` (/ndjuridi/) = ce qui a été demandé
- `lumputu` = français, `bangula` = expliquer, `tshika` = bientôt, `mbaji` = demain
- `lolo` = aujourd'hui, `mutima/mitima` = cœur(s), `nlungu` = ennui, `yula` = demander
- `muntu muntu` = chacun, `yirika` = faire/accomplir, `vutuka` = revenir, `kala` = retourner à
- `mbo` = futur, `ntangu ka` = plus tard, `delakasa` = faire correspondre

## 2. Nouvelle leçon scriptée : LEÇON 3 — KANDA NA BANDIKU (Famille)

Ajouter une section `LECON_3_FAMILLE` au prompt avec :
- Salutations : `Mbote mpangi. Nkumbu aku ani ?` / `Mbote kua nge mpangi.`
- Famille : `nkazi` (frère, /nkaji/), `bushi/kibushi/tshibushi` (sœur), `yaya` (aîné, /a:/ longs), `mpangi` (cadet), `nduku` (ami)
- Possessifs avec `nkumbu` (/u:/ long) : `nkumbu ani`, `nkumbu aku`, `nkumbu andi`, `nkumbu awu`
- Présentation : `Nkumbu ani Mbuta Matondo.` / `Meno, Mbuta Matondo.`
- Série `nduku ani / aku / andi`
- Tests : `Yaya ni nki ?` / `Mpangi ni nki ?` avec feedback `Ni buna.`
- Note culturelle aîné/cadet en français (Theo)

## 3. RÈGLE ABSOLUE durcie (remplace les règles Theo existantes)

> THEO NE PRONONCE ET N'ÉCRIT JAMAIS UN SEUL MOT EN KIKONGO LARI. Pas entre guillemets. Pas en exemple. Pas pour aider l'apprenant. Jamais. Si Theo doit faire référence à ce que Mbuta a dit, il dit uniquement "ce mot", "cette phrase", "ce que Mbuta vient de dire". Quand Theo doit guider l'apprenant pour répondre, il explique uniquement la logique en français. Exemple : "Mbuta vient de te demander ton nom. Pour répondre, utilise la même structure mais à la première personne — Mbuta te montrera la forme correcte."

## 4. Post-filtre code sur les blocs `<theo>`

Dans `supabase/functions/mbuta-matondo/index.ts`, intercepter le streaming SSE OpenAI et, à la volée (ou en buffer par segment `<theo>...</theo>`), appliquer un sanitizer sur le contenu de chaque bloc Theo avant ré-émission :

```typescript
function sanitizeTheo(text: string): string {
  return text
    // Supprime contenu entre guillemets droits/français/italiques markdown
    .replace(/"[^"]*"/g, '')
    .replace(/«[^»]*»/g, '')
    .replace(/[""][^""]*[""]/g, '')
    .replace(/\*[^*\n]+\*/g, '')
    .replace(/_[^_\n]+_/g, '')
    // Supprime phrases contenant déclencheurs
    .split(/(?<=[.!?])\s+/)
    .filter(s => !/\b(en Kikongo Lari|dit\s*:|réponds\s*:|repond\s*:)/i.test(s))
    .join(' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
```

Wrapping du flux : bufferiser jusqu'à la fermeture `</theo>`, sanitizer, ré-émettre comme deltas SSE. Les blocs `<lari>` (Mbuta) restent intacts.

**Note technique** : implémenter un parser d'état (`outside | inLari | inTheo`) sur le buffer concaténé, ne pas streamer caractère par caractère mais segment par segment pour permettre le filtrage, puis renvoyer chaque segment sanitisé en un chunk SSE unique.

## 5. Overrides phonétiques TTS Lari

Mettre à jour `src/lib/lari-phonetic-engine.ts` (ou table d'overrides g2p selon `mem://audio/tts-phonetics-g-logic`) :

| Mot | Règle |
|---|---|
| `ntu` | bloc unique, pas de séparation /n/+/t/ |
| `nse` | é ouvert sonore /nsɛ/ |
| `lulabu` | /a/ très court, accent sur `la` |
| `tshibanga` | /i:/ long |
| `biyelo` | syllabation `bi.ye.lo`, jamais /bielo/ |
| `hembo` / `mahembo` | /h/ doux à la française |
| moustache | écrire `nzevo` (rendu /ndjevo/) |

Ajout d'entrées dans la table de prononciation IPA/SSML (`mem://audio/ipa-ssml-table`).

## 6. Déploiement

`supabase--deploy_edge_functions(["mbuta-matondo"])` après édition.

## Fichiers touchés
- `supabase/functions/mbuta-matondo/index.ts` (corpus + leçon 3 + règle Theo + filtre code)
- `src/lib/lari-phonetic-engine.ts` (overrides phonétiques)
- `mem://grammar/...` : nouveau fichier `verb-zonza-future.md` + `meta-language-teacher.md` + update index
