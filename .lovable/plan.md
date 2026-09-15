# Corriger le N latin des mots en « nje- »

## Le problème

Sur la carte du verbe être, le mandombe de « Njena » affiche un **N latin** collé aux glyphes, parce que la suite `nj` n'a pas de glyphe. Les leçons utilisent déjà la bonne graphie : `nje(na)` s'écrit **ngiena** en mandombe.

## Correction

- Verbe être : **Njena** et sa forme courte **Nje** s'écrivent en mandombe **Ngiena** / **Ngie**.
- Les suites **Njeka**, **Njevo**, **njele**, **njelele** s'écrivent en mandombe avec **nz** : **Nzeka**, **Nzevo**, **nzele**, **nzelele**.
- Dans tous les cas, la translittération latine affichée reste inchangée (Njena, Nje, Njeka, Njevo, njele, njelele), ainsi que les traductions et l'audio.

## Vérification

- Plus aucune lettre latine dans les blocs mandombe de ces mots (conjugaisons, leçons, dictionnaire en ligne).
- Les lignes latines affichent toujours l'orthographe d'origine, dont « Forme courte : Nje. ».
- Contrôle visuel sur ordinateur et mobile.

## Détails techniques

- Champ `mandombe` renseigné pour la ligne du verbe **Ba** dans `scripts/build_survival_verbs.py`, puis régénération de `src/data/survivalVerbs.ts` (la page utilise `r.mandombe || r.lari`).
- Champ `mandombe` renseigné pour les occurrences de Njeka / Njevo / njele / njelele dans `src/data/survivalVerbs.ts`, `src/data/lessons.ts` et `data/dictionary-entries.json`, sans toucher au champ `lari`.
- Mémorisation de ces cas nommés dans la base de saisie du mandombe (pas de règle générale sur `nj`).
- Aucun document ODT/PDF régénéré.
