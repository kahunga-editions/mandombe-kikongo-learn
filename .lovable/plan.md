# Deux corrections : note culturelle parenté + « suis-moi » = Ndanda

## 1. Note culturelle Kongo dans la leçon « Les termes de parenté »

### Objectif
Ajouter un encadré culturel dans la leçon existante `termes-de-parente`, sans modifier les traductions de `taata` (père) et `maama` (mère).

### Contenu exact
- « Dans la tradition Kongo, il n'y a pas de patriarches, car les pères ne font pas partie de la famille. »
- Précision : le pouvoir n'appartient pas aux pères — il appartient au clan (kanda), pas aux individus.
- Les traductions `taata = père`, `maama = mère` restent inchangées.

### Implémentation
1. Dans `src/data/lessons.ts`, ajouter au type `Lesson` les champs optionnels `culturalNote?`, `culturalNoteFr?`, `culturalNotePt?`.
2. Remplir ces champs sur la leçon `id: "termes-de-parente"` (FR = formulation exacte ci-dessus ; EN et PT = traductions fidèles).
3. Dans `src/pages/LessonDetail.tsx`, afficher la note dans un encart distinct (bordure latérale, fond accentué) sous la description de la leçon, avant le vocabulaire, en respectant la langue active.

## 2. « Suis-moi » : Landa mono → Ndanda

### Décision arbitrée
- `Landa mono` n'est pas du Lari : la forme est **Ndanda**.
- Les /a/ sont longs à l'oral, mais on ne note pas les accents pour l'instant : la graphie reste `Ndanda`, avec une **note** indiquant la prononciation à /a/ longs.
- `Landa` (suivre) et `Landana` (se suivre) sont conservés tels quels.

### Emplacements à corriger
- `data/dictionary-entries.json` — entrée `Landa mono` (ligne ~8804) → `Ndanda`, avec la note de prononciation.
- `src/data/lessons.ts` — vocabulaire/phrase (ligne ~4740), indice d'exercice (ligne ~4802), item de reconnaissance Mandombe (ligne ~4813), distracteur (ligne ~4330).
- `supabase/functions/_shared/lessons-corpus.ts` — copie du corpus (ligne ~3996).
- `supabase/functions/translate-lari/index.ts` — lexique du traducteur (ligne ~3171).

### Mandombe
`Ndanda` se tape tel quel — aucun glyphe problématique, aucune substitution.

## 3. Mémoire projet
- `mem://culture/parente-kongo` : la parenté kongo se pense par le matrilignage (`kanda`) ; ne jamais présenter la société Kongo comme patriarcale ; le pouvoir appartient au clan, pas aux individus ; `taata` / `maama` gardent leur sens de père / mère.
- `mem://vocabulary/ndanda` : « suis-moi » = `Ndanda` (a longs à l'oral, non notés) ; `Landa mono` est une forme rejetée.

## 4. Vérification
- `bunx tsgo --noEmit -p tsconfig.app.json`
- Gardes du dictionnaire (`scripts/dictionary_guards.py`)
- Recherche finale : plus aucune occurrence de `Landa mono`
- Aperçu visuel de la leçon « Les termes de parenté »

## Hors scope
- Aucune nouvelle leçon.
- Aucune régénération de document ODT/PDF.
- Aucun changement sur `Landa` / `Landana`.
