# Corriger la superposition Mandombe / latin (dictionnaire + traducteur)

## Le problème (visible sur les deux captures)
Les glyphes Mandombe débordent sous leur ligne et chevauchent le texte qui suit :
- **Dictionnaire** : la translittération latine (« a ma ») passe par-dessus le bas des glyphes dorés.
- **Traducteur** : la ponctuation latine (les points) se promène au milieu des glyphes Mandombe dans le cadre de sortie.

Cause : les glyphes de la police Masono Mandombe dépassent largement de leur boîte de ligne (l'encre descend bien sous la ligne de base). La règle globale `.font-mandombe` ne réserve qu'un `line-height: 1.8` avec `0.25em` de marge intérieure, et certains composants écrasent encore cet espace (`leading-[1.5]` dans le dictionnaire). La ligne suivante n'a donc pas assez d'espace et passe sous l'encre des glyphes.

## La correction
1. **Règle globale** : renforcer `.font-mandombe` dans `src/index.css` — hauteur de ligne plus généreuse (~2) et respiration verticale suffisante pour que les glyphes ne débordent jamais sur la ligne suivante, quelle que soit la taille d'affichage. `overflow: visible` conservé.
2. **Dictionnaire** (`src/pages/Dictionary.tsx`) : retirer le `leading-[1.5]` trop serré du span Mandombe (`text-4xl md:text-5xl`), et donner assez de marge au titre latin qui suit (`mt-1` → espacement suffisant).
3. **Traducteur** (`src/pages/Translator.tsx`) : le champ Mandombe affiché doit recevoir le même traitement — vérifier le composant qui rend la sortie Mandombe, retirer toute ponctuation latine résiduelle du bloc (les points visibles sur la capture) via le nettoyage `cleanMandombe`, et appliquer la hauteur de ligne correcte.
4. **Vérification** : captures d'écran du dictionnaire (entrée courte comme « a ma » et entrée longue) et du traducteur, en desktop et en largeur mobile, pour confirmer qu'il n'y a plus de chevauchement.

## Détails techniques
- `src/index.css`, règle `.font-mandombe` : `line-height` ~2, `padding-block` augmenté.
- `src/pages/Dictionary.tsx` : supprimer `leading-[1.5]`, augmenter la marge du `<h3>` latin.
- `src/pages/Translator.tsx` : appliquer `cleanMandombe` à la sortie Mandombe si ce n'est pas déjà fait, corriger l'espacement vertical.
- Aucun changement de contenu, d'orthographe Mandombe ou de données : purement affichage. Aucun nouveau document généré.
