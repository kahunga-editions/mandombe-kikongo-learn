

# Édition directe de la traduction dans le traducteur

## Problème
Le traducteur produit parfois des traductions Lari dont la syntaxe ne respecte pas l'ordre canonique (S+O+P+V). L'utilisateur doit pouvoir corriger directement le texte traduit sans quitter le traducteur.

## Solution
Rendre le texte de traduction éditable dans le panneau résultat. Un bouton "Éditer" (icône crayon) bascule le texte statique en `Textarea` modifiable. Quand l'utilisateur modifie le texte, le Mandombe et l'IPA se mettent à jour en temps réel.

## Modifications — `src/pages/Translator.tsx`

### 1. Nouvel état `isEditing`
- `const [isEditing, setIsEditing] = useState(false)` — contrôle le mode édition
- Reset à `false` à chaque nouvelle traduction

### 2. Rendre la traduction éditable
- Ligne ~263 : remplacer le `<p>` statique par un composant conditionnel :
  - Si `isEditing` → `<Textarea>` pré-rempli avec `result.translation`, qui met à jour `result.translation` via `setResult({...result, translation: newValue})`
  - Sinon → le `<p>` actuel
- Ajouter un bouton crayon (`Pencil` de Lucide) à côté du bouton copier pour basculer `isEditing`

### 3. Mise à jour du Mandombe en temps réel
- Quand l'utilisateur édite la traduction et que la cible est Lari, le champ `mandombe` du résultat est mis à jour avec le texte édité (le Mandombe utilise les mêmes caractères latins rendus via la police custom)
- Le `lariText` utilisé pour le speaker sera aussi mis à jour automatiquement

### 4. Icône et UX
- Icône `Pencil` (mode lecture) → `Check` (mode édition, pour valider)
- Le `Textarea` d'édition reprend le même style que le panneau source (border-0, bg-transparent, text-lg)

## Portée
- 1 fichier modifié : `src/pages/Translator.tsx` (~25 lignes)
- 0 dépendance ajoutée

