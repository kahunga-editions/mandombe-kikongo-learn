

# Reprendre les illustrations Nsayi + correction Mandombe "tshia" → "KIA"

## Deux changements demandés

### 1. Régénérer les 25 illustrations avec cohérence visuelle

Utiliser le modèle d'image AI (google/gemini-3-pro-image-preview ou gemini-3.1-flash-image-preview) pour générer 25 illustrations cohérentes avec :
- **Nsayi** : peau foncée (#4f2903), queue de cheval avec ruban rose, robe/tenue rose
- **Sunda** : peau foncée (#4f2903), cheveux courts bouclés avec serre-tête blanc, tenue bleu clair
- Style : illustration animée colorée, décor tropical congolais (palmiers, végétation luxuriante), illustrations nettes et consistantes

Chaque panneau aura un prompt décrivant la scène fidèle au texte Lari, avec les mêmes personnages visuellement identiques d'un panneau à l'autre.

Les 25 images seront générées via un script, sauvegardées dans `src/assets/` en remplacement des fichiers existants (`nsayi-panel-1.jpg` à `nsayi-panel-25.jpg`).

### 2. Correction "tshia" → "KIA" dans le Mandombe uniquement

Actuellement, le composant `ComicPanel` utilise le même champ `lari` pour le texte Mandombe et le texte latin. Il faut :
- Ajouter un champ `mandombe` optionnel dans les données `storyPanels`
- Pour les panneaux contenant "tshia" (panneaux 4 et 5), fournir un champ `mandombe` avec "tshia" remplacé par "KIA"
- Dans `ComicPanel`, utiliser `mandombe || lari` pour le rendu en police Mandombe

**Panneaux concernés** :
- Panneau 4 : `lari` contient "Tshibuka tshia..." → `mandombe` = "Tshibuka KIA..."
- Panneau 5 : `lari` contient "tshia tshiri tshia fioti" → `mandombe` = "KIA tshiri KIA fioti"

## Fichiers modifiés
- `src/assets/nsayi-panel-*.jpg` — 25 images régénérées
- `src/components/StoryPreview.tsx` — ajout champ `mandombe`, remplacement "tshia"→"KIA", utilisation dans ComicPanel

## Remarque technique
La génération de 25 images AI prendra du temps. Le script générera les images par lots pour respecter les limites de l'API.

