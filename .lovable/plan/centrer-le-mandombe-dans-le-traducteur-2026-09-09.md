# Centrer le Mandombe dans le traducteur

## Problème
Dans le panneau de résultat du traducteur, le texte en écriture Mandombe est aligné à gauche au lieu d'être centré horizontalement dans son encadré doré.

## Fichier concerné
- `src/pages/Translator.tsx` — bloc de rendu Mandombe dans le panneau de résultat (ligne ~384).

## Changement prévu
- Ajouter `text-center w-full` (ou équivalent) sur le paragraphe Mandombe pour centrer le glyphes horizontalement.
- Conserver la taille, la police, la couleur dorée et les boutons audio/copie à droite.
- S'assurer que l'interligne reste suffisant pour éviter tout chevauchement avec la ligne latine en dessous.

## Vérification
- Vérifier visuellement le rendu après correction (aperçu / capture) pour confirmer que le Mandombe est bien centré dans l'encadré et ne déborde pas sur le texte en dessous.
