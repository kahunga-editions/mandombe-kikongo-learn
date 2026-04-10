

# Corriger l'affichage latin des consonnes dans la première colonne

## Problème
Ligne 395 : le header de groupe utilise `font-family:'Masono Mandombe'` pour afficher la consonne. Résultat : « S », « NS », « SH », « TSH » (et potentiellement d'autres) s'affichent en glyphes Mandombe au lieu de l'alphabet latin.

## Solution : `public/kilolaka_grille.html`

**Ligne 395** — Retirer la police Mandombe du header de groupe. Remplacer :
```html
<span style="font-family:'Masono Mandombe',serif;font-size:1.2rem;display:block">${cons}</span>
```
par :
```html
<span style="font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:700;display:block">${cons}</span>
```

Cela affichera toutes les consonnes (B, D, F, G, S, NS, SH, TSH, DJ, etc.) en alphabet latin standard, cohérent avec le rôle d'en-tête de ligne.

