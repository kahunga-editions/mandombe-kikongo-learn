

# Plan : Mbuta Matondo branché aux outils du site (tool calling) + corpus dynamique + SSML

## Objectif

Transformer Mbuta Matondo en vrai professeur qui **appelle les ressources internes** (dictionnaire, traducteur, leçons) au lieu de générer librement. Pour quoi qu'il ne trouve pas, il dit `Ka nzebi a ko` dans `<lari>` et Theo l'explique.

## Architecture : Tool Calling (function calling Gemini)

L'edge function `mbuta-matondo` gère une boucle de tool calls. Gemini via Lovable AI Gateway supporte le format OpenAI tools.

```
User message
   ↓
Gemini (avec tools disponibles)
   ↓
Tool call(s) → execute server-side → return result
   ↓
Gemini (avec résultats) → réponse finale en <lari>/<theo>
```

### Tools exposés à Gemini

| Tool | Source | Usage |
|------|--------|-------|
| `search_dictionary(query, lang?)` | `translation_corrections` (admin) + corpus Lari du site | Trouve un mot/définition. Retourne entries avec lari, fr, mandombe, notes |
| `translate(text, source_lang, target_lang)` | Réutilise `translate-lari` edge function | Traduit avec corrections admin déjà persistées |
| `get_lessons(level?, topic?)` | `src/data/lessons.ts` exposé via nouvel endpoint | Liste des leçons disponibles |
| `get_exercises(lesson_id?, type?)` | `src/data/lessons.ts` | Exercices existants (multiple-choice, fill-in-blank, etc.) |

### Comportement obligatoire

- **Avant** chaque réponse en Lari, Mbuta DOIT appeler `search_dictionary` ou `translate` pour valider le mot
- Si `search_dictionary` retourne vide → `<lari>Ka nzebi a ko</lari>` + Theo explique
- Pour proposer un exercice → `get_exercises` d'abord, créer seulement si rien ne convient

## Implémentation

### 1. Nouveaux endpoints (lecture publique)

**`supabase/functions/lessons-data/index.ts`** (nouveau)
- GET → expose le contenu de `src/data/lessons.ts` en JSON
- Filtres : `?level=beginner&topic=salutations`
- Public (verify_jwt = false), CORS ouvert
- Retourne titre, niveau, vocabulaire, exercices

Note : `src/data/lessons.ts` est un fichier client. L'edge function va le **dupliquer** côté Deno (ou on extrait en JSON statique servi). Approche : créer `supabase/functions/_shared/lessons-corpus.ts` avec un export de la même structure (copie du subset pertinent : titre, niveau, vocab, exercices).

**Pas besoin de nouvel endpoint pour le dictionnaire/traducteur** : on appelle directement depuis l'edge function `mbuta-matondo` via `supabase-js` (lecture `translation_corrections`) et invocation interne de `translate-lari`.

### 2. Refonte `supabase/functions/mbuta-matondo/index.ts`

- Ajouter `tools: [...]` dans le payload Gemini (format OpenAI)
- Boucle tool-calling :
  ```ts
  while (response a des tool_calls) {
    pour chaque tool_call → exécuter handler local → ajouter résultat aux messages
    rappeler Gemini
  }
  stream la réponse finale
  ```
- Handlers locaux :
  - `search_dictionary` → `supabase.from('translation_corrections').select().ilike(...)` + fallback recherche dans corpus statique
  - `translate` → `supabase.functions.invoke('translate-lari', {...})`
  - `get_lessons` / `get_exercises` → lecture `_shared/lessons-corpus.ts`
- Le streaming SSE final ne démarre **qu'après** la dernière itération (sinon on stream uniquement la réponse synthétique)

### 3. Mise à jour du SYSTEM_PROMPT

Ajouter section :
```
## OUTILS DISPONIBLES
Tu DOIS appeler search_dictionary AVANT d'utiliser tout mot Lari.
Tu DOIS appeler translate pour toute traduction demandée.
Tu DOIS appeler get_exercises avant de proposer un exercice.
Si search_dictionary retourne vide → <lari>Ka nzebi a ko</lari>
Theo explique alors : "Ce mot n'est pas dans nos ressources actuelles."
```

### 4. SSML / IPA pour le TTS Lari

**`supabase/functions/elevenlabs-tts-lari/index.ts`** + **`src/lib/lari-phonetic-engine.ts`**

Ajouter une table IPA complète (extraite du document) appliquée en pré-traitement syllabique, encapsulée dans `<speak><phoneme alphabet="ipa" ph="...">syllabe</phoneme></speak>`.

Syllabes traitées en SSML :
- `ngi/nge/ngo/nga/ngu` → `ŋɡi ŋɡe ŋɡo ŋɡa ŋɡu`
- `gi/ge` → `ɡi ɡe` (G dur)
- `shi/shu/she/sho/sha` → `ʃi ʃu ʃe ʃo ʃa`
- `ji/ju/je/jo/ja` → `ʒi ʒu ʒe ʒo ʒa` (fricative — règle confirmée)
- `nji/nju/nje/njo/nja` → `ndʒi ndʒu ndʒe ndʒo ndʒa` (affriquée prénasalisée — règle confirmée)
- `ri/ru/re/ro/ra` → `ɾi ɾu ɾe ɾo ɾa`
- `nyi/nyu/nye/nyo/nya` → `ɲi ɲu ɲe ɲo ɲa`
- `n'ki/n'ku/n'ke/n'ko/n'ka` → coup de glotte
- **NOUVEAU** : H aspiré → `hi/hu/he/ho/ha` → `hi hu he ho ha` (comme "hache" français)

Les overrides mot-par-mot existants restent prioritaires.

### 5. Mémoire

- `mem://audio/ipa-ssml-table` (nouveau) : table IPA complète
- `mem://features/ai-teacher` (mise à jour) : documenter le tool calling
- `mem://index.md` : ajouter l'entrée

## Fichiers modifiés / créés

| Fichier | Action |
|---|---|
| `supabase/functions/mbuta-matondo/index.ts` | Refonte : ajout tools + boucle tool-calling |
| `supabase/functions/_shared/lessons-corpus.ts` | **Nouveau** — corpus leçons côté Deno |
| `supabase/functions/lessons-data/index.ts` | **Nouveau** — endpoint public lecture leçons |
| `supabase/functions/elevenlabs-tts-lari/index.ts` | Ajout table IPA + SSML + H aspiré |
| `src/lib/lari-phonetic-engine.ts` | Synchroniser table IPA + H aspiré |
| `supabase/config.toml` | Déclarer `lessons-data` avec `verify_jwt = false` |
| `mem://audio/ipa-ssml-table` | Nouveau fichier mémoire |
| `mem://features/ai-teacher` | Mise à jour : tool calling |
| `mem://index.md` | Ajouter référence |

## Notes

- Pas de changement de schéma DB (on lit `translation_corrections` qui existe déjà).
- Le streaming SSE est conservé pour la réponse finale ; les itérations de tool calling sont non-streamées (latence acceptable).
- Limite de 5 itérations de tool calling par requête (garde-fou anti-boucle).

