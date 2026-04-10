

# Retirer la translitération latine de la grille Kilolaka

## Modification : `public/kilolaka_grille.html`

**2 changements :**

1. **Ligne 415** : Supprimer `<span class="latin">${syllable}</span>` du innerHTML des cellules — ne garder que le glyphe et la signification cachée.

2. **Ligne 394** : Dans le header de groupe, supprimer le `<span>` latin en doublon (le petit texte sous le glyphe consonantique) — ne garder que le glyphe Mandombe.

Résultat : chaque cellule affiche uniquement le glyphe Mandombe. Au clic, seule la signification apparaît. La translitération latine est visible dans l'en-tête du tableau (colonnes voyelles) et dans la signification révélée, ce qui suffit pour la lecture.

