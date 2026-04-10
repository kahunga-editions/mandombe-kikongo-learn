

# Centrage parfait des glyphes dans la grille Kilolaka

## Modification : `public/kilolaka_grille.html`

Transformer chaque cellule en conteneur flexbox centré pour garantir un centrage parfait horizontal et vertical du glyphe.

### Changements CSS

1. **`td.cell`** (ligne 110-120) : ajouter `display: flex; flex-direction: column; align-items: center; justify-content: center;` et fixer une hauteur minimale (`min-height: 70px`) pour que le centrage vertical fonctionne.

2. **`.glyph`** (ligne 133-141) : retirer `display: block` et `margin: 0 auto`, remplacer par `text-align: center; width: 100%;` — le flex parent gère désormais le centrage.

Un seul fichier modifié, aucun impact sur le reste de l'app.

