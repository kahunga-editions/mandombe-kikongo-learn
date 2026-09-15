---
name: Lien conjugaisons ↔ traducteur
description: Les conjugaisons validées alimentent le traducteur et les corrections expert apparaissent dans les conjugaisons
type: feature
---
- `scripts/build_translator_conjugations.ts` (bun) génère `supabase/functions/_shared/conjugations-corpus.ts` depuis `src/data/survivalVerbs.ts`, `conjugationSeries.ts`, `verbeBa.ts`, `lessons.ts`. Le relancer après toute modification des conjugaisons, puis redéployer `translate-lari` et `validated-forms`.
- `translate-lari` : correspondance exacte avec une forme conjuguée validée (après les corrections expert, qui priment) + bloc de prompt `buildConjugationsBlock` avec les formes pertinentes.
- `validated-forms` : fonction en lecture seule (service role) qui expose les corrections expert ressemblant à des conjugaisons ; consommée par `src/hooks/useValidatedForms.ts` et affichée dans `src/pages/Conjugations.tsx` (recherche + carte « Formes validées dans le traducteur »).
