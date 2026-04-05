

# Plan : Remplacer les mots croisés par des exercices de reconnaissance Mandombe

## Problème

Les mots croisés générés ont des grilles déconnectées (pas de vrais croisements entre les mots). Créer de vrais mots croisés interconnectés est complexe et le résultat n'est pas satisfaisant.

## Solution

1. **Créer un nouveau composant `MandombeRecognition.tsx`** — exercice où l'apprenant voit un glyphe Mandombe et doit choisir la bonne transcription latine parmi 4 options. Variante inversée : on montre le mot en latin et l'apprenant choisit le bon glyphe Mandombe parmi 4.

2. **Nouveau type d'exercice `"mandombe-recognition"`** dans le schéma :
```typescript
interface MandombeRecognitionQuestion {
  type: "mandombe-recognition";
  title?: string;
  titleFr?: string;
  titlePt?: string;
  // Chaque item : un mot à reconnaître avec 3 distracteurs
  items: Array<{
    mandombe: string;    // le mot en Mandombe (rendu via la police)
    lari: string;        // la bonne réponse en latin
    distractors: string[]; // 3 mauvaises réponses
    french: string;      // indice/traduction
    mode: "glyph-to-latin" | "latin-to-glyph"; // sens de l'exercice
  }>;
}
```

3. **Design du composant** :
   - Mode `glyph-to-latin` : affiche le glyphe en grand (`font-mandombe text-6xl`), l'apprenant clique sur le bon mot latin parmi 4 boutons
   - Mode `latin-to-glyph` : affiche le mot latin, l'apprenant choisit le bon glyphe Mandombe parmi 4 boutons rendus en `font-mandombe`
   - Feedback vert/rouge après chaque réponse
   - Navigation item par item avec score final
   - Traduction française affichée en indice sous le mot

4. **Remplacer les 3 crosswords** des leçons récentes par des exercices `mandombe-recognition` (6-8 items chacun, alternant les deux modes)

5. **Garder les crosswords existants** dans les autres leçons (ils ont de meilleurs croisements)

## Fichiers modifiés

- **`src/components/exercises/MandombeRecognition.tsx`** — nouveau composant
- **`src/data/lessons.ts`** — remplacer les 3 crosswords (lignes ~16900, ~17088, ~17271) par des exercices `mandombe-recognition`
- **`src/pages/LessonDetail.tsx`** — ajouter le rendu du nouveau type d'exercice

## Résultat

L'apprenant pratique activement la lecture et la reconnaissance des glyphes Mandombe au lieu de remplir des grilles mal formées.

