# Mundzula : graphie arbitrée

Dernier mot non composable de la v28. Ton arbitrage : on tape `nz`.

## Saisie Mandombe

- `Mundzula` se tape `M-U-N-Z-U-L-A` → **Munzula**
- `mindzula` se tape `M-I-N-Z-U-L-A` → **minzula**
- L'entrée garde donc le format habituel : `Munzula | minzula`

## Note de prononciation

Note bilingue ajoutée sous l'entrée, comme les 58 autres notes déjà en place :

- FR — Se prononce /mundzula/, pluriel /mindzula/.
- EN — Pronounced /mundzula/, plural /mindzula/.

(Si tu voulais au contraire que la note dise /munzula/ — c'est-à-dire que la prononciation suit la graphie et qu'il n'y a rien à signaler — dis-le et je retire la note.)

## Détails techniques

- `scripts/mandombe_graphies.py` : ajout des deux mots dans `WORD_MAP` (`mundzula` → `munzula`, `mindzula` → `minzula`). Aucune règle générale `ndz` → `nz` n'est créée : uniquement ce mot, comme le veut la skill.
- Note ajoutée à la table des notes de prononciation utilisée par le build.
- Régénération du dictionnaire (ODT seul) puis audit HarfBuzz attendu à **0 résidu latin**.
