

# Corriger l'affichage des glyphes Mandombe dans la grille Kilolaka

## Problème
La concaténation directe `cons + v` (ligne 409) produit des chaînes comme `"SHe"`, `"DJi"`, `"TSHa"` en majuscules complètes. La police Masono Mandombe attend une casse spécifique (ex : `"She"`, `"Dji"`, `"Tsha"`) pour déclencher le mapping du glyphe complet. Quand la casse est incorrecte, la police rend le consonant en glyphe mais la voyelle retombe en Latin — d'où les petites lettres latines visibles en exposant.

## Solution : `public/kilolaka_grille.html`

**1. Ajouter une fonction de conversion de casse** (avant `buildGrid()`, ~ligne 385) :

Créer une fonction `toFontSyllable(cons, vowel)` qui transforme la consonne en casse compatible avec la police :
- Première lettre en majuscule, le reste en minuscule
- Exemples : `SH` → `Sh`, `DJ` → `Dj`, `TSH` → `Tsh`, `MB` → `Mb`, `ND` → `Nd`, `NG` → `Ng`
- Cas spécial : `N'K` → `N'k`
- Concaténer avec la voyelle en minuscule

```javascript
function toFontSyllable(cons, vowel) {
  const fontCons = cons.charAt(0).toUpperCase() + cons.slice(1).toLowerCase().replace("'k","'k");
  return fontCons + vowel;
}
```

**2. Modifier la ligne 409** : remplacer `cons + v` par `toFontSyllable(cons, v)` pour le glyph uniquement.

**3. Ligne 414-416** : le `<span class="glyph">` utilisera `toFontSyllable(cons, v)` au lieu de `syllable` brut. Le meaning reste inchangé.

Un seul fichier modifié, aucun impact sur le reste de l'app.

