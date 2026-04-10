

# Corriger le centrage de la grille Kilolaka

## Problème
L'ajout de `display: flex` sur `td.cell` casse le layout du tableau HTML — les cellules ne se comportent plus comme des cellules de tableau, d'où l'affichage cassé.

## Solution : `public/kilolaka_grille.html`

Revenir à un centrage simple compatible avec `<table>` :

**`td.cell` (lignes 110-125)** — Retirer `display: flex`, `flex-direction`, `align-items`, `justify-content`. Garder uniquement :
- `vertical-align: middle;`
- `text-align: center;`
- `padding: 10px 6px;`

**`.glyph` (lignes 138-146)** — Remettre :
- `display: block;`
- `margin: 0 auto;`
- Garder `text-align: center`, `font-size: 2.2rem`, `line-height: 2`

C'est la méthode standard pour centrer du contenu dans une cellule de tableau sans casser le layout.

