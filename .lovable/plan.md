

# Corriger les illustrations et le texte Mandombe

## 1. Régénérer / recadrer 12 illustrations

Les panneaux suivants doivent être régénérés avec des prompts corrigés, en insistant sur le cadrage (personnages visibles tête aux pieds ou au minimum visage entièrement visible) et la cohérence ethnique (peau #4f2903, cheveux bouclés/crépus) :

| Panneau | Problème | Correction |
|---------|----------|------------|
| 1 | On ne voit rien | Recadrer : Nsayi et Sunda visibles, plan moyen |
| 4 | On ne voit rien | Recadrer : scène du soleil/ombre, personnages visibles |
| 5 | Enfants blancs | Régénérer avec exclusivement des enfants noirs |
| 7 | On ne voit pas Nsayi | Recadrer : Nsayi visible, plan rapproché |
| 9 | Maîtresse et enfants non noirs | Régénérer avec maîtresse et enfants tous noirs |
| 10 | On ne voit pas Nsayi | Recadrer : Nsayi lisant/écrivant, visage visible |
| 12 | Peau claire, cheveux lisses | Régénérer : Nsayi adulte médecin, peau #4f2903, cheveux bouclés |
| 13 | On ne voit pas les filles | Recadrer : Nsayi et Sunda dans la savane, plan moyen |
| 16 | On ne voit pas le visage | Recadrer : Nsayi cherchant des champignons, visage visible |
| 17 | Enfants identiques | Régénérer avec des enfants aux visages diversifiés |
| 19 | On ne voit qu'un champignon | Recadrer : champignon nsempela orange en entier, contexte visible |
| 22 | On ne voit pas le visage | Recadrer : Nsayi mangeant/appréciant nsempela, visage visible |

Chaque prompt inclura systématiquement :
- "dark-skinned Black Congolese girl, skin tone #4f2903, curly/kinky hair"
- "full face visible, medium shot framing"
- "colorful children's book illustration, tropical Congolese setting"

Modèle utilisé : `google/gemini-3-pro-image-preview` pour la qualité.

## 2. Correction Mandombe : "tsoneka" → "NSONEKA"

Ajouter un champ `mandombe` aux panneaux 8, 9 et 10 (ceux contenant "tsoneka") avec le remplacement :

- **Panneau 8** : `mandombe: "Mabuku ma ka zolo mu tanga, weri zolo mpe mu kue NSONEKA binsamu."`
- **Panneau 9** : `mandombe: "Weri tomo wirikila mieri longesa ba milongi miandi, mboko keri NSONEKA mi mingi mu mikanda miandi."`
- **Panneau 10** : `mandombe: "Bu keri kala kuna nzo andi ntangu ya yingi keri bonga mu tanga ma buku na mu kue NSONEKA binsamu bia ba nduku zandi."`

Le champ `lari` reste inchangé (orthographe latine correcte). Le `ComicPanel` utilise déjà `mandombe || lari` pour le rendu Mandombe.

## Fichiers modifiés
- `src/assets/nsayi-panel-{1,4,5,7,9,10,12,13,16,17,19,22}.jpg` — 12 images régénérées
- `src/components/StoryPreview.tsx` — ajout champ `mandombe` aux panneaux 8, 9, 10

