# Conjugaisons : « pouvoir se battre » + correction du présent progressif

## 1. Ajouter « pouvoir se battre » (nuana)

Deux séries sous le verbe **Lenda** (pouvoir), reprises exactement telles que fournies :

Présent — Ndendi nuana / Lendi nuana / Lendi nuana / tu lendi nuana / lu lendi nuana / ba lendi nuana.

Passé — na lendi nuana / wa lendi nuana / wa lendi nuana / ta lendi nuana (variante notée : tua lendi nuana) / lua lendi nuana / ba lendi nuana.

Chaque ligne : phrase complète en Mandombe avec la forme verbale (Ndendi, Lendi, lendi) mise en valeur, translittération latine avec bouton audio, traduction française puis anglaise. Recherchable par « se battre », « nuana », « je peux me battre », « Ndendi nuana », « pouvais me battre ».

## 2. Corriger le présent progressif dans les tableaux de leçons

Aujourd'hui, une partie des tableaux affiche la forme nue « ni ta sa », « ka ta dia », « tu ta bonga »… sans thème devant, ce qui est faux. La règle est : **thème + particule du pronom + ta + verbe**.

Correction de toutes les lignes concernées (55 lignes, 11 verbes : sa, dia, nua, bonga, banza, futa, mona, sala, longoka, nimba, kwiza) en rétablissant le thème devant, comme dans les séries déjà correctes :

- sa ni ta sa, sa ta sa, sa ka ta sa, sa tu ta sa, sa lu ta sa, sa ba ta sa
- dia ni ta dia, nua ni ta nua, bonga ni ta bonga, banza ni ta banza, futa ni ta futa, mona ni ta mona, sala ni ta sala, longoka ni ta longoka, nimba ni ta nimba
- pour « venir », le thème attesté est **mwizu** : mwizu ni ta kwiza, mwizu ka ta kwiza…

Le Mandombe de chaque ligne est régénéré en conséquence. Les deux exercices qui proposent « ni ta sa » et « ni ta zenga » comme réponses sont corrigés de la même manière.

## 3. Deux phrases attestées ajoutées

- **Binkuti ni ta sala** = Je fabrique des habits. / I make clothes.
- **Binkuti ni ta sukula** = Je lave des habits. / I wash clothes.

Ajoutées au dictionnaire en ligne et comme exemples du présent progressif dans les conjugaisons.

## Vérification

- Recherche des nouvelles formes sur ordinateur et mobile.
- Plus aucune forme progressive sans thème dans les tableaux.
- Mandombe, translittération, audio et traductions correctement espacés.

## Hors périmètre

- Aucune forme ajoutée par analogie, aucun autre verbe modifié.
- Aucun document ODT/PDF généré.

## Détails techniques

- `scripts/build_survival_verbs.py` : deux blocs `tense(...)` pour nuana, puis régénération de `src/data/survivalVerbs.ts`.
- `src/data/lessons.ts` : correction des lignes de conjugaison progressive (lari + mandombe) et des deux options d'exercice.
- `data/dictionary-entries.json` : deux nouvelles entrées d'exemple.
- Mise à jour de `.lovable/memory/grammar/zonza-verbes-de-survie.md` (règle « jamais de progressif sans thème »).
