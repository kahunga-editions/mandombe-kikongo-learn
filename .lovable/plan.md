

# Ancrer Mbuta Matondo sur les leçons réelles + corrections TTS/prompt

## Problème

1. **"nge" prononcé avec un G mou** : en Lari, "nge" a un G dur (comme NGO) → ajout override TTS
2. **Phrases inventées** : "mbote na nge", "kunsamu kaku bwe bweni?" — n'existent pas dans le corpus
3. **Le problème fondamental** : le prompt donne des règles grammaticales abstraites mais aucun contenu réel des leçons. L'IA invente donc du faux Kikongo Lari
4. **Le français est OK comme support visuel** : Mbuta Matondo peut afficher du français à l'écrit, mais il ne LIT/PARLE qu'en Kikongo Lari attesté dans les leçons du site

## Solution : injecter le corpus réel dans le prompt

### 1. `supabase/functions/mbuta-matondo/index.ts` — Refonte complète du SYSTEM_PROMPT

**Changement de paradigme** : au lieu de règles abstraites, injecter les **phrases et vocabulaire réels** de `src/data/lessons.ts` directement dans le prompt.

- **Extraire** les salutations, phrases, vocabulaire clé des leçons existantes et les copier-coller dans le prompt comme seul corpus autorisé
- **Règle absolue** : Mbuta Matondo ne peut utiliser QUE des mots et phrases qui existent dans ce corpus injecté. S'il ne connaît pas un mot, il dit (en Lari) que ce n'est pas dans le corpus
- **Français autorisé à l'écrit** : Mbuta Matondo peut écrire du français comme support visuel (traductions entre parenthèses, explications écrites). Mais il ne PARLE/LIT qu'en Kikongo Lari attesté — le TTS ne lira que le Lari
- **Supprimer** toutes les phrases inventées du prompt actuel ("mbote na nge", "kunsamu kaku bwe bweni?", etc.)
- **Supprimer** les règles grammaticales abstraites que l'IA utilise pour inventer des phrases

Le corpus injecté inclura (extrait directement de `lessons.ts`) :
- Salutations : Mbote, Kolele?, Nkolele, Mbote mpangi nkumbu aku nani?, Mbote aku mpangi, Ta kuambileno, Lumbu kia kibote, Mpimpa ya mbote, Lala bubote, Mbaji kua, Ntangu ka kua, etc.
- Vocabulaire thématique : les mots attestés des leçons
- Phrases attestées : uniquement celles présentes dans les leçons

### 2. `supabase/functions/elevenlabs-tts-lari/index.ts` — Override phonétique "nge"

Ajouter dans `PHONETIC_OVERRIDES` :
```
"nge": "ngué"
```
Pour forcer le G dur devant le E (comme dans NGO).

### 3. Mémoire projet

Mettre à jour `mem://features/ai-teacher` et `mem://constraints/source-material` :
- Français OK à l'écrit, interdit à l'oral/TTS
- Corpus = contenu réel des leçons, zéro invention

## Fichiers modifiés

| Fichier | Action |
|---|---|
| `supabase/functions/mbuta-matondo/index.ts` | Prompt refondu : corpus réel des leçons injecté, français OK à l'écrit seulement |
| `supabase/functions/elevenlabs-tts-lari/index.ts` | Ajout override "nge" → "ngué" |
| `mem://features/ai-teacher` | Mise à jour contraintes |
| `mem://constraints/source-material` | Mise à jour |

