# Plan — Réconciliation `lessons.ts` ↔ `mbuta-corpus-v2.json`

## Contexte
La QA dictionnaire (`scripts/qa-dictionary.ts`) signale **456 warnings de cohérence** : pour une même clé Lari normalisée, la traduction française (ou autre) diverge entre `src/data/lessons.ts` (UI) et `supabase/functions/_shared/mbuta-corpus-v2.json` (corpus IA / traducteur). Objectif : passer à **0 warning** sans régression visible côté apprenant.

## Principe directeur
**Source de vérité unique = `mbuta-corpus-v2.json`** (validé par Mbuta Matondo, utilisé par le traducteur, l'IA prof et l'edge function). `lessons.ts` doit s'aligner dessus. Les divergences réelles (sens contextuel différent) sont conservées via une allowlist explicite.

## Phases

### Phase 1 — Instrumenter (1 itération)
1. Étendre `scripts/qa-dictionary-core.ts` pour **exporter le détail des warnings** : `{ key, lariOriginal, lessonFr, corpusFr, lessonId, section }`.
2. Ajouter `scripts/qa-dictionary-report.ts` : génère `qa-coherence-report.csv` (trié par lesson, puis par clé) — lisible dans Numbers/Excel.
3. Catégoriser automatiquement chaque divergence :
   - **A. Typo / casse / ponctuation** (Levenshtein ≤ 2, ou diff uniquement `.`/`?`/maj.) → auto-fix safe.
   - **B. Reformulation synonyme** (mêmes mots-clés, ordre différent) → auto-fix vers corpus.
   - **C. Sens divergent** (mots-clés disjoints) → revue humaine.
   - **D. Traduction manquante d'un côté** → copier depuis l'autre.

### Phase 2 — Auto-fix sûr (catégories A + D)
1. `scripts/qa-dictionary-autofix.ts` : applique uniquement A et D, en écrivant `lessons.ts` via AST (`ts-morph`) pour ne pas casser le formatage.
2. Sortie : un patch git diff inspectable + le rapport mis à jour.
3. Cible attendue : **~250 warnings résolus** (estimation : la majorité = ponctuation finale + casse).

### Phase 3 — Reformulations (catégorie B)
1. Script semi-automatique : propose la version corpus, demande validation interactive (`bun scripts/qa-dictionary-review.ts`).
2. Validation par lots de 20 entrées max pour rester maintenable.
3. Cible : **~150 warnings résolus**.

### Phase 4 — Divergences réelles (catégorie C)
1. Pour chaque cas : décider entre
   - aligner `lessons.ts` sur corpus,
   - corriger le corpus si `lessons.ts` est plus juste (rare),
   - ou **acter la divergence légitime** (ex. un même mot a deux sens selon la leçon) dans `scripts/qa-coherence-allowlist.ts` avec justification.
2. Cible : **~50 warnings résolus + ~6 allowlistés**.

### Phase 5 — Verrouillage CI
1. Une fois à 0 warning : passer la coherence check **du niveau warning au niveau error** dans `runDictionaryQA`.
2. Ajouter au test Vitest existant : `expect(report.warnings).toHaveLength(0)`.
3. Documenter le flux dans `scripts/README.md` : « toute nouvelle entrée doit être ajoutée d'abord au corpus, puis répliquée dans `lessons.ts` ».

## Outils livrés
- `scripts/qa-dictionary-report.ts` (CSV + classification)
- `scripts/qa-dictionary-autofix.ts` (A + D)
- `scripts/qa-dictionary-review.ts` (B, interactif)
- `scripts/qa-coherence-allowlist.ts` (C, justifié)
- Test Vitest renforcé en fin de Phase 5

## Estimation
| Phase | Warnings restants | Effort |
|---|---|---|
| Départ | 456 | — |
| Après P2 | ~200 | 1 itération |
| Après P3 | ~50 | 2–3 itérations |
| Après P4 | 0 | 1–2 itérations |
| P5 | 0 (verrouillé) | 1 itération |

## Hors périmètre
- Pas de modification du corpus Mandombe / phonétique.
- Pas de changement de schéma `lessons.ts`.
- Pas de migration DB (les `translation_corrections` Supabase ne sont pas concernées).

## Prochaine étape proposée
Démarrer **Phase 1** : étendre le QA pour produire le CSV catégorisé. Tu valides et je code.
