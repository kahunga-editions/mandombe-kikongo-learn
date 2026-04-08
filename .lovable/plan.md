

# Recadrer 8 panneaux — corrections ciblées

## Panneaux à modifier (8 appels)

| Panneau | Correction |
|---------|-----------|
| 10 | Plan moyen, visage de Nsayi visible |
| 12 | Nsayi adulte médecin : peau foncée #4f2903, cheveux bouclés (pas lisses) |
| 13 | Cheveux bouclés pour Nsayi, plan moyen, visages des 2 filles visibles |
| 16 | Plan moyen, visage de Nsayi visible |
| 17 | Style du panneau 1, visages diversifiés pour les enfants |
| 19 | Desserrer le plan, champignon visible en entier |
| 22 | Desserrer le cadrage, plan moyen, visage de Nsayi visible |
| 25 | Plan moyen, visage de Nsayi visible |

## Panneaux NON touchés
8, 9, 11, 14, 15, 18, 20, 21, 23, 24 — aucune modification.

## Approche technique
- Modèle : `google/gemini-3-pro-image-preview`
- Référence stylistique : `nsayi-panel-1.jpg` pour chaque appel
- 8 appels `edit_image`, un par panneau
- Prompts très explicites sur "medium shot", "full face visible", "NOT a close-up"
- Pour le panneau 12 : insister sur "adult Black Congolese woman, very dark skin #4f2903, natural curly/kinky hair, NOT straight hair, NOT lighter skin"
- Pour le panneau 17 : insister sur "each child has a different face, different hairstyle"

## Fichiers modifiés
- `src/assets/nsayi-panel-10.jpg`
- `src/assets/nsayi-panel-12.jpg`
- `src/assets/nsayi-panel-13.jpg`
- `src/assets/nsayi-panel-16.jpg`
- `src/assets/nsayi-panel-17.jpg`
- `src/assets/nsayi-panel-19.jpg`
- `src/assets/nsayi-panel-22.jpg`
- `src/assets/nsayi-panel-25.jpg`

