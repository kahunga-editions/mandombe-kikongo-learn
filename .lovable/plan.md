# Deux points précis (pas de règle générale)

## 1. Saisie de `kua`

`kua` se tape `k-u-a`. Le glyphe existe et sort directement. Ne pas taper `k-u-w-a`.

C'est ajouté à la skill « taper le Mandombe » comme cas nommé, avec `nua`, sans en tirer de règle générale sur les semi-voyelles.

## 2. Cartes d'illustration de mots

Sur les cartes (fond marron, glyphes dorés), on garde uniquement :

- le mot en Mandombe
- sa translittération latine en dessous

Pas de ligne de traduction française/anglaise (« Combien ? / Une igname » disparaît).

## Quand

Rien n'est régénéré maintenant. Les corrections seront appliquées au moment où on refera la version du dictionnaire.

## Détails techniques

- `.agents/skills/taper-le-mandombe/SKILL.md` : ajouter `kua` à la liste des mots qui se tapent tels quels.
- Générateur de cartes (`generate-letter-illustrations.py` / script de cartes de mots) : retirer la ligne de glose, garder Mandombe + translittération.
