## Pilote — 1 grille de mots croisés interactive avec Mandombe

Confirmé : pages 39 (énoncé) + 40 (solution) contiennent bien grille + définitions FR + illustration + réponses Mandombe. Réponses validées par toi :

```
HORIZONTAL                          VERTICAL
4. homme               → BAKALA     1. argent          → NGELA
5. femme               → MUKENTO    2. hommes          → BAKALA
7. gagner, attraper    → BAKA       3. femmes          → BAKENTO
                                    6. refuser, nier   → KALA
```

On fait **uniquement cette grille pilote**. Si le rendu te convient, on industrialise ensuite. Sinon on s'arrête là, zéro perte.

## Étapes

1. **Étendre `CrosswordPuzzle.tsx`**
   - support grille rectangulaire (`gridRows` + `gridCols`, pas seulement carrée)
   - rendu Mandombe à côté de chaque définition FR (`font-mandombe`, sans accents)
   - illustration optionnelle sous la grille
   - bouton 🔊 par mot via `MandombeSpeaker` (TTS Lari existant, déjà patché pour G dur)
   - persistance localStorage (clé `crossword.<id>`)

2. **Données pilote** : `src/data/crosswords/mc-01-bakala.ts` avec les 7 mots ci-dessus, coordonnées calées sur la grille image-40.

3. **Illustration** : extraite de l'image-39 → `src/assets/crosswords/mc-01-bakala.png` (homme en costume, déjà conforme à la charte Black Congolese).

4. **Route démo** : `/mots-croises/pilote` accessible depuis un lien temporaire dans la navbar.

5. **QA** : je vérifie que la grille rendue correspond pixel à pixel à l'image-40 (placement des cases noires/blanches, numérotation 1–7).

## Hors scope (à décider après le pilote)

- Pipeline OCR/vision pour les 77 autres planches du PDF
- Page liste `/mots-croises`
- Admin upload PDF
- Appariement automatique énoncé ↔ solution sur tout le PDF

## Livrable

URL `/mots-croises/pilote` que tu juges sur :
- fidélité visuelle à la grille du PDF
- lisibilité du Mandombe à côté des définitions FR
- audio + saisie + score
→ décision GO/NO-GO pour les 77 planches restantes.
