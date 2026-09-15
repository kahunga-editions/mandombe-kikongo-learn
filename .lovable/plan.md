# Corriger le N latin dans « Njena » (verbe être)

## Le problème

Sur la carte du verbe être, le mandombe de « Njena » affiche un **N latin** collé aux glyphes, parce que la suite `nj` n'a pas de glyphe. Les leçons utilisent déjà la bonne graphie : `nje(na)` s'écrit **ngiena** en mandombe.

## Correction

- Pour les formes du verbe être **Njena** et sa forme courte **Nje**, écrire en mandombe **Ngiena** / **Ngie**.
- La translittération latine affichée reste **Njena** / **Nje**, ainsi que la traduction et l'audio.
- Aucune autre forme en `nje-` (Njeka, Njevo, njele, njelele…) n'est touchée : la correction ne vaut que pour le verbe être.

## Vérification

- La carte « Njena — Je suis. » ne contient plus aucune lettre latine dans le bloc mandombe.
- La ligne latine indique toujours « Njena » et « Forme courte : Nje. ».
- Contrôle visuel sur ordinateur et mobile.

## Détails techniques

- Ajout d'un champ `mandombe` sur la ligne concernée du verbe **Ba** dans `scripts/build_survival_verbs.py`, puis régénération de `src/data/survivalVerbs.ts` (la page utilise `r.mandombe || r.lari`).
- Vérifier que la note « Forme courte » du verbe être est rendue en mandombe sans lettre latine dans `src/pages/Conjugations.tsx`.
- Aucun document ODT/PDF, aucune entrée du dictionnaire modifiés.
