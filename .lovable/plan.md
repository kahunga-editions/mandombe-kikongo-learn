

# Mode comparatif Lari/Lingala côte à côte pour les exercices

## Résumé
Ajouter un toggle "Lari ↔ Lingala" visible quand `language === "ln"` au-dessus des exercices. Quand activé, chaque exercice affiche le texte Lari ET sa traduction Lingala en Mandombe côte à côte.

## Changements

### 1. `src/components/exercises/LariLingalaToggle.tsx` (nouveau)
- Petit composant toggle : "Mode comparatif Lari / Lingala 🇨🇩"
- N'apparaît que quand `language === "ln"`
- Retourne un boolean `showComparative`

### 2. `src/components/exercises/MultipleChoice.tsx`
- Accepter une nouvelle prop `showLingala?: boolean`
- Quand activé : sous le texte de la question, afficher la traduction Lingala en `font-mandombe text-2xl text-gold/80` (via `useTranslatedContent`)
- Même traitement pour l'explication après soumission

### 3. `src/components/exercises/FillInBlank.tsx`
- Accepter `showLingala?: boolean`
- Afficher la phrase traduite en Lingala Mandombe sous la phrase originale

### 4. `src/components/exercises/MatchingExercise.tsx`
- Accepter `showLingala?: boolean`
- Sur les items de gauche : ajouter le texte Lingala en Mandombe sous le texte Lari
- Sur les items de droite : ajouter la traduction Lingala en Mandombe

### 5. `src/pages/LessonDetail.tsx`
- Ajouter le toggle au-dessus de la zone exercices (visible uniquement en mode Lingala)
- Passer `showLingala` aux composants d'exercices

### Logique de traduction
Utiliser `useTranslatedContent().getTranslation(frenchText)` pour obtenir le texte Lingala, puis le rendre avec `font-mandombe text-2xl text-gold/80` préfixé par 🇨🇩.

### Vérification
Après implémentation, naviguer vers une leçon en mode Lingala et tester que le toggle fonctionne et que le rendu côte à côte s'affiche correctement.

### Fichiers modifiés
- `src/components/exercises/LariLingalaToggle.tsx` (nouveau)
- `src/components/exercises/MultipleChoice.tsx`
- `src/components/exercises/FillInBlank.tsx`
- `src/components/exercises/MatchingExercise.tsx`
- `src/pages/LessonDetail.tsx`

