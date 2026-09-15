# Relier le traducteur et les conjugaisons

Objectif : les formes validées d'un côté deviennent immédiatement disponibles de l'autre.

## 1. Les conjugaisons alimentent le traducteur

- Un script génère un corpus compact de toutes les conjugaisons validées de l'app (verbes de survie, séries de conjugaison, verbe « ba », tableaux des leçons) : pour chaque ligne, la forme lari + la traduction française et anglaise + la note éventuelle.
- Ce corpus est injecté dans le traducteur comme section « Conjugaisons validées » avec la même autorité que les corrections expert : le traducteur doit réutiliser ces formes verbatim et ne jamais en inventer d'autres.
- Avant même d'appeler l'IA, le traducteur vérifie une correspondance exacte avec une forme de conjugaison (dans les deux sens, français ↔ lari) et la renvoie directement, avec sa note.

## 2. Le traducteur alimente les conjugaisons

- Les corrections validées par l'expert dans le traducteur ne sont aujourd'hui lisibles que par leur auteur. On ajoute un accès en lecture seule dédié, qui ne renvoie que les formes utiles aux conjugaisons (phrases commençant par un pronom / une marque de personne, ou contenant un verbe déjà présent dans les tableaux).
- La page Conjugaisons charge ces formes et les fait apparaître dans la recherche, regroupées dans une carte « Formes validées dans le traducteur », avec la phrase lari, la traduction et la note de l'expert.
- Ces entrées sont clairement distinguées des tableaux figés, et la page fonctionne normalement si le chargement échoue.

## Détails techniques

- `scripts/build_translator_conjugations.ts` (bun) lit `src/data/survivalVerbs.ts`, `conjugationSeries.ts`, `verbeBa.ts`, `lessons.ts` et écrit `supabase/functions/_shared/conjugations-corpus.ts` (`CONJUGATION_FORMS` + texte pré-formaté).
- `supabase/functions/translate-lari/index.ts` : import du corpus, bloc ajouté au prompt système, et court-circuit de correspondance exacte avant l'appel IA.
- Nouvelle fonction `supabase/functions/validated-forms/index.ts` (service role, lecture seule, filtrage conjugaison) ; appelée par `src/pages/Conjugations.tsx` via React Query et fusionnée dans les résultats de recherche.
- Pas de changement de schéma, pas de modification des formes lari existantes.
