

# Appliquer la palette personnalisée au tableau Ntalu

## Couleurs fournies

| Code | Teinte |
|------|--------|
| #f5c1b4 | Rose saumon clair |
| #fea347 | Orange doré |
| #f88e55 | Orange vif |
| #ffdab9 | Pêche clair |
| #ffcb60 | Jaune doré |

5 couleurs pour 6 nombres — je propose de réutiliser un mélange pour le 35e (par ex. #f5c1b4 légèrement assombri ou une des couleurs existantes en variante). Attribution :

| Nombre | Couleur |
|--------|---------|
| 1 | #fea347 (orange doré) |
| 2 | #f88e55 (orange vif) |
| 3 | #ffcb60 (jaune doré) |
| 4 | #ffdab9 (pêche) |
| 5 | #f5c1b4 (rose saumon) |
| 35 | #e8a090 (version plus foncée du saumon) |

## Modification dans `src/components/NtaluSection.tsx`

Remplacer les 3 objets de couleur (lignes 107-132) par des styles inline utilisant ces codes hex directement, via des objets de style au lieu de classes Tailwind (puisque ce sont des couleurs custom).

Concrètement, chaque bouton cliquable et badge utilisera `style={{ backgroundColor, color, borderColor }}` avec les hex fournis, texte en brun foncé (#5a3e2b) pour la lisibilité. En dark mode, les couleurs seront légèrement assombries via opacity.

## Fichier modifié
- `src/components/NtaluSection.tsx` — remplacement des 3 objets couleur + adaptation des classes en styles inline

