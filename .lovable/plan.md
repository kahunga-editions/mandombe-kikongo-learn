

# Ajouter `leftMandombe` + règle "pas d'accent en Mandombe"

## Contexte
Le champ `left` des paires matching sert à la fois pour le Latin (avec annotations tonales comme "(ton H)") et pour le Mandombe. Il faut un champ séparé. De plus, une règle générale doit être appliquée : **jamais d'accent sur le texte Mandombe** (strip diacritiques).

## Modifications

### 1. Type `MatchingQuestion` — `src/data/lessons.ts` (ligne 41)
Ajouter `leftMandombe?: string` au type des paires :
```ts
pairs: { left: string; leftMandombe?: string; right: string; rightFr?: string; rightPt?: string }[];
```

### 2. Données de la leçon phonologie — `src/data/lessons.ts`
Ajouter `leftMandombe` sans parenthèses aux paires de l'exercice de tons (ex: `left: "Wa (ton H)"`, `leftMandombe: "Wa"`).

### 3. Composant `MatchingExercise.tsx`
- Ligne 96 : utiliser `pair.leftMandombe || pair.left` pour le span Mandombe
- Ajouter un `stripAccents()` sur tout texte affiché en `font-mandombe` pour garantir la règle "pas d'accent en Mandombe"

### 4. Règle globale — utilitaire `stripAccents`
Créer/réutiliser un helper `stripAccents` (NFD + strip combining marks) et l'appliquer systématiquement dans tous les composants qui rendent du texte en `font-mandombe`. Les fichiers concernés :
- `MatchingExercise.tsx` (ligne 96 — span Mandombe du `left`)
- Les autres composants utilisent déjà des champs `mandombe` dédiés depuis les données, donc la protection se fait au niveau des données elles-mêmes (les champs `mandombe` dans lessons.ts sont déjà sans accent)

### Portée
- 2 fichiers modifiés : `src/data/lessons.ts` (type + données), `src/components/exercises/MatchingExercise.tsx`
- ~15 lignes changées au total

