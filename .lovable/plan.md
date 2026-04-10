

# Supprimer la détection canvas qui casse les glyphes

## Problème
La fonction `hideLatinFallback()` (lignes 444-475) compare les largeurs de rendu Mandombe vs Serif pour détecter les fallbacks. Cette méthode est trop imprécise : elle détecte des faux positifs et supprime les voyelles de syllabes parfaitement rendues comme `Fi`, `Fe`, `Jo`, `Pi`, `Te`.

## Solution

**Supprimer entièrement** les lignes 444-475 de `public/kilolaka_grille.html` (la fonction `hideLatinFallback` et son appel via `document.fonts.ready`).

La correction de casse via `toFontSyllable()` (ligne 388-391) est suffisante pour garantir le bon mapping des glyphes. La détection canvas faisait plus de mal que de bien.

### Détail technique
- **Fichier** : `public/kilolaka_grille.html`
- **Lignes à supprimer** : 444-475 (tout le bloc `hideLatinFallback` + l'appel `document.fonts.ready`)
- **Conserver** : les `font-feature-settings` dans le CSS `.glyph` (utile pour les ligatures)

