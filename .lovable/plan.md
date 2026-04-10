

# Centrer les glyphes dans chaque case de la grille Kilolaka

## Modification : `public/kilolaka_grille.html`

Changer `vertical-align: top` → `vertical-align: middle` sur `td.cell` (ligne 117), et ajouter `display: flex; align-items: center; justify-content: center; flex-direction: column;` pour un centrage parfait du contenu. Alternativement, le plus simple : juste passer à `vertical-align: middle` et s'assurer que `.glyph` a `margin: 0 auto`.

**Changements concrets :**
1. **Ligne 117** : `vertical-align: top;` → `vertical-align: middle;`
2. **Ligne 139** : Ajouter `margin: 0 auto;` sur `.glyph` pour centrage horizontal explicite

