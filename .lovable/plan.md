# Corriger la superposition Mandombe / latin dans le dictionnaire

## Le problème (visible sur la capture)
Sur une fiche du dictionnaire, les glyphes Mandombe dorés et la translittération latine (« a ma ») se chevauchent : le texte latin passe par-dessus le bas des glyphes.

Cause : les glyphes Mandombe débordent largement de leur boîte de ligne (leur encre dépasse sous la ligne de base), alors que la règle globale `.font-mandombe` ne réserve qu'un `line-height: 1.8` et `0.25em` de marge intérieure. Dans la carte du dictionnaire, le glyphe est affiché en très grande taille (`text-4xl`/`text-5xl`) avec un `leading-[1.5]` qui écrase encore l'espace, et la ligne latine suit immédiatement avec `mt-1`. Le débordement retombe donc sur la ligne du dessous.

## La correction
1. Dans la carte d'entrée du dictionnaire : mettre le bloc Mandombe sur sa propre ligne réservée — supprimer le `leading-[1.5]` trop serré, laisser la hauteur de ligne globale Mandombe agir, et donner un espacement suffisant entre le bloc Mandombe et la translittération latine.
2. Renforcer la règle globale `.font-mandombe` pour que les glyphes ne débordent jamais sur la ligne suivante, quelle que soit la taille : hauteur de ligne plus généreuse et respiration verticale, en gardant le rendu inchangé partout ailleurs.
3. Vérifier le résultat dans le navigateur (capture d'écran de la page dictionnaire, y compris sur une entrée courte comme « a ma » et sur une entrée longue), en desktop et en largeur mobile.

## Détails techniques
- `src/pages/Dictionary.tsx` : span `font-mandombe text-4xl md:text-5xl text-gold leading-[1.5]` → retirer `leading-[1.5]`, passer le conteneur du glyphe en bloc propre et augmenter la marge du `<h3>` latin (`mt-1` → espacement suffisant).
- `src/index.css`, règle `.font-mandombe` : `line-height` porté à ~2, `padding-block` augmenté, `overflow: visible` conservé.
- Aucun changement de contenu, d'orthographe Mandombe ou de données : purement affichage.
