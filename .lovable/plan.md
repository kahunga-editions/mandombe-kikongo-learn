

# Restaurer "Wa (ton H)" dans l'exercice de correspondance

## Problème
La modification précédente a changé `"Wa (ton H)"` en `"wa"` dans l'exercice matching (ligne 26831). Il faut restaurer les annotations tonales dans le champ `left` des paires de l'exercice matching, car ce champ sert à l'affichage Latin.

Les exemples de syntaxe (lignes 26720-26723) sont déjà corrects : `lari: "Wa (ton H)"` avec `mandombe: "Wa"` séparé.

## Modification

**`src/data/lessons.ts`** ligne 26831 :
- Changer `"wa"` → `"Wa (ton H)"`

Note : les exercices matching n'ont pas de champ `mandombe` séparé — le champ `left` est affiché tel quel. Si on veut aussi que le Mandombe n'affiche pas les parenthèses dans les exercices matching, il faudrait modifier le composant `MatchingExercise` pour supporter un champ `leftMandombe` optionnel. Mais actuellement la structure de données ne le permet pas.

## Portée
- 1 ligne modifiée dans `src/data/lessons.ts`

