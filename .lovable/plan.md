

# Grille interactive Kilolaka — Tableau des glyphes Mandombe avec significations cachées

## Résumé

Créer un fichier HTML interactif (`public/kilolaka_grille.html`) contenant l'intégralité des glyphes Mandombe organisés par consonnes, avec leurs significations cachées révélées au clic. Intégrer ce tableau dans la section Kilolaka de la page d'accueil via une iframe ou un composant dédié.

## Fichiers créés / modifiés

### 1. `public/kilolaka_grille.html` (nouveau)

Fichier HTML autonome avec :
- **~35 groupes consonantiques** (B, D, F, G, MB, MF, ND, NG, N, S, V, T, NT, NS, MV, K, L, M, P, MP, NK, NL, N'K, W, R, Z, Y, NY, NZ, MW, SH, DJ, TSH, J, NI, SI, TI, NTI) × 12 colonnes voyelles (i, u, e, o, a, ie, io, ia, iu, ue, ui, ua)
- **Interaction** : chaque cellule montre le glyphe Mandombe (font-mandombe) + translitération latine. Au clic, la signification cachée apparaît/disparaît en slide-down
- **Complétion des significations manquantes** : suivre le modèle systématique du document (chaque consonne a un sens racine, chaque voyelle un modificateur : i=intérieur, u=qui porte vie/engendre, e=qui reçoit, o=ascensionnel, a=manifesté, ie=intérieur qui reçoit, io=intérieur qui ascensionne, ia=intérieur manifesté, iu=intérieur qui engendre, ue=qui engendre et reçoit, ui=qui engendre et internalise, ua=qui engendre et manifeste)
- **Palette de couleurs** : dégradés de #fef86c (jaune), #eaeaea (gris clair), #fea9af (rose) avec alternance par groupe
- **Responsive** : scroll horizontal sur mobile, taille de police adaptative
- **Police Mandombe** : chargée via `@font-face` depuis les assets existants du projet

### 2. `src/components/KilolakaPreview.tsx` (modifié)

Ajouter après les séries premium (F, D, G) un bouton/lien "Explorer la Grille complète du Kilolaka" qui ouvre le tableau interactif :
- Option A : iframe intégrée dans la section Kilolaka
- Option B : lien vers une nouvelle route `/kilolaka-grille`

Je choisirai l'option **iframe** intégrée directement dans la section, accessible via un bouton toggle pour ne pas alourdir la page.

### 3. Logique de complétion des significations

Racines consonantiques extraites du document :
- B = être, D = lumière, F = vie après cette mort, G = principe générateur, MB = feu/multiplication de l'être, MF = multiplication de la seconde mort, ND = vitesse de la lumière, NG = soleil, N = conscience multiverselle, S = travail, V = possession, T = parole, NT = parole de la conscience multiverselle, NS = dimension, MV = multiplication de la possession, K = énergie/particule, L = connaissance profonde, M = multiplication, P = don, MP = don (multiplicatif), NK = conscience multiverselle (énergie), NL = conscience multiverselle connaissance profonde, N'K = conscience multiverselle énergie, W = énergie spiralée, R = soleil, Z = connaissance dynamique, Y = feu, NY = conscience multiverselle du feu, NZ = conscience multiverselle de la connaissance dynamique, MW = multiplication de la spirale, SH = ante-énergie du travail, DJ = ante-énergie de la lumière et connaissance, TSH = ante-énergie, J = ante-énergie de la connaissance dynamique, NI = conscience multiverselle, SI = travail, VI = possession, TI = parole, NTI = parole de la conscience multiverselle

Modificateurs voyelles (colonnes) :
- i = intérieur(e), u = qui porte vie / qui engendre, e = qui reçoit, o = ascensionnel(le), a = manifesté(e), ie = intérieur(e) qui reçoit, io = intérieur(e) qui ascensionne, ia = intérieur(e) manifesté(e), iu = intérieur(e) qui engendre, ue = qui engendre et reçoit, ui = qui engendre et internalise, ua = qui engendre et manifeste

Chaque cellule vide sera complétée par : `[racine consonantique] + [modificateur voyelle]`.

## Détail technique
- HTML/CSS/JS pur dans le fichier HTML (pas de dépendances React)
- La police Mandombe sera référencée via chemin relatif `./masono_mandombe-webfont.ttf` (ou le chemin existant du projet)
- Chaque cellule utilise `data-meaning` pour stocker la signification, un `onclick` toggle la visibilité
- CSS Grid ou table HTML avec `position: sticky` pour les en-têtes
- Animations CSS pour le reveal (opacity + max-height transition)

