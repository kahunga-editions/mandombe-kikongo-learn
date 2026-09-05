# Plan : réparer le surlignage des formes verbales Mandombe

## Problème constaté
Sur `/conjugations`, le surlignage doré des formes verbales s'affiche comme un rectangle vide au-dessus des glyphes : la police Mandombe dessine ses glyphes plus bas que la ligne de texte, donc le fond doré (calé sur la ligne) ne recouvre pas les glyphes, qui débordent en dessous. Visible sur toutes les cartes (ex. « Passé composé » : mbendji, bendji, tu bendji…).

## Cause technique vérifiée
Dans `src/pages/Conjugations.tsx`, `HighlightedMandombe` pose le fond via un `<span absolute inset-0 bg-verb>` dimensionné sur la boîte de ligne du texte. Les glyphes de `font-mandombe` débordent visuellement sous cette boîte (métriques de la police), d'où le décalage.

## Correction prévue
1. **Recentrer le glyphe dans son surlignage** : remplacer la superposition `absolute inset-0` par un conteneur en ligne avec centrage vertical (`inline-flex items-center`), un interligne resserré (`leading-none` sur le texte) et un rembourrage vertical sur le fond, de sorte que le rectangle doré englobe réellement les glyphes.
2. **Conserver le style choisi** (fond miel clair arrondi, verbe en brun-doré gras) — seule la géométrie change.
3. **Vérifier les deux variantes** : verbe seul (mbendji) et verbe en fin de phrase (tu bendji), ainsi que la section « Le verbe être dans tous ses états ».
4. **Validation visuelle** : captures Playwright de la page `/conjugations` avant de conclure, pour confirmer que chaque verbe est bien à l'intérieur de son rectangle doré, sans chevauchement avec le latin.

## Fichiers concernés
- `src/pages/Conjugations.tsx` (fonction `HighlightedMandombe` uniquement).

Aucune donnée n'est modifiée.
