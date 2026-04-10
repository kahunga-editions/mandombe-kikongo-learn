

# Supprimer les lettres latines parasites des glyphes Kilolaka

## Diagnostic

Le problème vient du fait que certaines combinaisons consonne+voyelle (ex : `She`, `Shu`, `Dji`, `Tshe`) n'ont pas de ligature complète dans la police Masono Mandombe. La police rend la partie consonne en glyphe Mandombe, mais la voyelle retombe en alphabet latin — d'où les petites lettres visibles en exposant.

Ceci affecte potentiellement :
- Les consonnes composées (SH, DJ, TSH, J) avec certaines voyelles
- Les voyelles composées (ue, ui, ua, ie, io, ia, iu) pour la plupart des consonnes

## Solution : `public/kilolaka_grille.html`

### 1. Activer explicitement les ligatures OpenType (CSS)

Ajouter dans `.glyph` :
```css
font-feature-settings: "liga" 1, "clig" 1, "calt" 1;
-webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1;
```
Cela force le navigateur à activer toutes les substitutions de ligatures de la police.

### 2. Détection JavaScript + masquage des caractères latins

Après `buildGrid()`, parcourir chaque `.glyph` et utiliser un `<canvas>` pour tester si la police Mandombe rend le texte différemment d'une police serif standard. Si le glyphe est identique au rendu serif (= pas de mapping Mandombe), masquer la voyelle :

```javascript
function hideLatinFallback() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  document.querySelectorAll('.glyph').forEach(span => {
    const text = span.textContent;
    // Mesurer avec Mandombe
    ctx.font = '40px "Masono Mandombe"';
    const mW = ctx.measureText(text).width;
    // Mesurer avec serif 
    ctx.font = '40px serif';
    const sW = ctx.measureText(text).width;
    
    // Si les largeurs sont similaires = pas de ligature
    // Garder seulement la partie consonne
    if (Math.abs(mW - sW) < 2) {
      // Extraire la consonne seule
      const cons = text.replace(/[iueoa]+$/i, '');
      span.textContent = cons;
    }
  });
}
```

### 3. Alternative plus simple (si la détection canvas n'est pas fiable)

Séparer consonne et voyelle dans des `<span>` distincts. Appliquer la police Mandombe uniquement à la consonne, et masquer complètement la voyelle :

```javascript
td.innerHTML = `
  <span class="glyph">${syllable}</span>
  <div class="meaning">${meaning}</div>
`;
```
→ devient :
```javascript
td.innerHTML = `
  <span class="glyph" data-full="${syllable}">${syllable}</span>
  <div class="meaning">${meaning}</div>
`;
```

Puis après le rendu, vérifier chaque glyphe et retirer les voyelles parasites si elles ne sont pas rendues en Mandombe.

### Approche recommandée

Combiner les étapes 1 et 2 :
1. D'abord ajouter `font-feature-settings` au CSS (peut résoudre le problème seul)
2. Ensuite ajouter la détection canvas comme filet de sécurité pour masquer tout caractère latin restant

Un seul fichier modifié : `public/kilolaka_grille.html`.

