

# Plan : Remplacer tous les mots cachés par des exercices de reconnaissance Mandombe

## Problème

Les grilles de mots cachés (word-search) sont remplies de "X" partout, ce qui les rend triviales — aucun défi pour l'apprenant. La technique n'est pas maîtrisée et le résultat nuit à l'expérience.

## Solution

Remplacer **les 14 exercices `word-search`** existants dans toutes les leçons par des exercices `mandombe-recognition`, qui mettent le Mandombe à l'honneur :
- L'apprenant voit un glyphe Mandombe (sans translittération latine) et doit identifier le bon mot parmi 4 options
- Ou inversement : il voit un mot latin et doit trouver le bon glyphe Mandombe

Chaque ancien word-search sera remplacé par 6-8 items de reconnaissance, tirés du vocabulaire de la leçon concernée.

## Exercices à remplacer (14 au total)

1. **Ligne ~3389** — Fi- & Fu- Verbs (leçon verbes Fi-/Fu-)
2. **Ligne ~6194** — Negation key words
3. **Ligne ~8812** — Find the Foods
4. **Ligne ~9125** — Flavours & Food
5. **Ligne ~10603** — Yala vocabulary
6. **Ligne ~10923** — Body & Objects
7. **Ligne ~11108** — Fatigue
8. **Ligne ~11126** — Pronouns & Fatigue
9. **Ligne ~11253** — Fu- & Fi- Vocabulary
10. **Ligne ~11680** — Interrogative Words
11. **Ligne ~16935** — Verbes cachés (leçon verbes-actions-etendus)
12. **Ligne ~17125** — Animals & Nature (leçon nature-animaux-objets-etendus)
13. **Ligne ~17310** — Tradition Kongo (leçon tradition-kongo-societe)
14. Vérifier s'il y en a dans les 6 nouvelles leçons aussi

## Format de remplacement

Chaque word-search devient :
```typescript
{
  type: "mandombe-recognition" as const,
  titleFr: "Reconnaître le Mandombe",
  titlePt: "Reconhecer o Mandombe",
  title: "Recognize Mandombe",
  items: [
    { mandombe: "mot", lari: "mot", distractors: ["x", "y", "z"], french: "traduction", mode: "glyph-to-latin" },
    // 5-7 autres items alternant les deux modes
  ]
}
```

Les mots et distracteurs seront tirés du vocabulaire de chaque leçon respective.

## Fichier modifié

- `src/data/lessons.ts` — 14 blocs word-search remplacés par mandombe-recognition

## Résultat

Plus aucune grille de X. À la place, des exercices interactifs de lecture du Mandombe dans chaque leçon.

