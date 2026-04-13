

# Copier le Mandombe en tant qu'image

## Problème
Le Mandombe est rendu via une police custom (webfont). Quand on copie le texte, on obtient du Latin — le destinataire sans la police ne voit que des lettres latines, pas les glyphes Mandombe.

## Solution
Ajouter un bouton "Copier en image" à côté du texte Mandombe dans le traducteur. Ce bouton :
1. Utilise `html2canvas` (ou l'API native `Canvas`) pour capturer le rendu Mandombe en image PNG
2. Copie l'image dans le presse-papier via `navigator.clipboard.write()` avec un `ClipboardItem` de type `image/png`
3. Affiche une coche + toast de confirmation

Ainsi, le destinataire reçoit une image des glyphes Mandombe, indépendamment de la police installée.

## Modifications

### 1. Installer `html2canvas`
```bash
npm install html2canvas
```

### 2. `src/pages/Translator.tsx`
- Ajouter une `ref` sur le `<p className="font-mandombe">` contenant le Mandombe
- Ajouter un bouton `Image` (icône Lucide) à côté du bouton speaker
- Au clic : capturer le nœud via `html2canvas`, convertir en blob PNG, copier dans le presse-papier avec `navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])`
- Gérer un state `copiedMandombe` pour l'animation de confirmation
- Fallback : si `navigator.clipboard.write` n'est pas supporté, télécharger l'image en PNG

### 3. Ajout d'un état `copiedMandombe` 
Étendre le type `copied` existant pour inclure `"mandombe"` comme valeur possible.

## Portée
- 1 dépendance ajoutée (`html2canvas`)
- 1 fichier modifié (`src/pages/Translator.tsx`, ~30 lignes)

