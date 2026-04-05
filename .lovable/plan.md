

# Plan : Séparer clairement glyphe Mandombe et texte latin dans les exercices de reconnaissance

## Problème

En mode `glyph-to-latin`, le glyphe Mandombe affiché en haut est rendu via `font-mandombe` sur le même texte latin que les options de réponse. L'apprenant peut deviner la réponse en comparant visuellement les lettres. De plus, l'indice (traduction française) rend l'exercice encore plus facile.

## Solution

Modifier `MandombeRecognition.tsx` pour :

1. **Supprimer l'indice `💡 hint`** de l'affichage principal — il sera montré uniquement après la sélection (en feedback), pas avant
2. **En mode `glyph-to-latin`** : afficher le glyphe Mandombe en grand (déjà correct) mais sans aucun texte latin ni traduction visible. Les 4 options restent en texte latin. L'apprenant doit reconnaître le glyphe sans aide
3. **En mode `latin-to-glyph`** : afficher le mot latin + la traduction française en question. Les 4 options sont en Mandombe (glyphes). L'apprenant doit associer le mot au bon glyphe
4. **Après sélection** : afficher la traduction comme feedback (pour apprentissage) avec le résultat correct/incorrect

## Fichier modifié

- `src/components/exercises/MandombeRecognition.tsx`

## Changements concrets

- Lignes 118-119 : supprimer la ligne `💡 {hint}` en mode `glyph-to-latin`
- Lignes 128-129 : garder le hint en mode `latin-to-glyph` (car là c'est utile pour comprendre le mot)
- Après la sélection (quand `selected` n'est pas null), afficher un petit texte de feedback avec la traduction

