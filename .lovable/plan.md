# Cédille manquante sur la couverture — correction (v33)

## Ce qui s'est passé

Le texte intérieur du livre est correct : « Français » y est bien accentué partout.

Le problème vient uniquement de **l'image de couverture**. La couverture n'est pas du texte : c'est un PNG pleine page fabriqué par `scripts/generate-letter-illustrations.py`, puis inséré tel quel dans l'ODT. Dans ce script, la ligne de la couverture est écrite en ASCII sans accents :

```text
ctr("Francais · English · Kikongo Lari", ...)
```

Le « ç » n'a donc jamais été dessiné — ce n'est pas un problème de police ni de conversion PDF. L'image datant du 21 août, elle a été recopiée à l'identique dans toutes les versions suivantes, jusqu'à la v32.

Deux autres détails de la même image, à corriger en même temps :
- le sous-titre utilise un trait d'union `-` au lieu du tiret cadratin `–` employé dans le livre ;
- l'ordre des langues y est « Francais · English · Kikongo Lari », alors que la page de titre intérieure dit « Lari · Français · English ».

## Correction

1. Dans `generate-letter-illustrations.py`, passer les textes de la couverture en Unicode accentué : « Français », et « Dictionnaire Kikongo Lari – Mandombe » avec le tiret cadratin. Aligner l'ordre des langues sur la page de titre : « Kikongo Lari · Français · English ».
2. Vérifier que la police utilisée pour ce texte contient bien « ç » et « É » ; si un glyphe manque, basculer sur une police latine complète déjà présente dans le projet (aucun changement de style visuel : même couleur dorée, même taille, même fond marron).
3. Régénérer uniquement `cover_page.png` (et `cover.png` pour rester cohérent) — les 22 cartes de lettres ne changent pas.
4. Reconstruire le livre avec `scripts/build_dictionary_book.py` en remplaçant l'image de couverture dans l'ODT par la nouvelle, sans toucher au corpus : **aucune entrée n'est modifiée**, les mêmes 4693 entrées, les mêmes contrôles bloquants.
5. Sortie : `Buku-dia-Binsono-dictionnaire-Lari-v33.odt` + PDF.

## Vérification avant livraison

- Rendu de la page 1 en image et lecture du texte : « Français » avec cédille, tiret cadratin correct.
- Contrôle automatique : refuser la génération si un caractère de la couverture est perdu (comparaison du texte attendu avec les glyphes réellement dessinés par la police).
- Nombre de pages et nombre d'entrées identiques à la v32.
