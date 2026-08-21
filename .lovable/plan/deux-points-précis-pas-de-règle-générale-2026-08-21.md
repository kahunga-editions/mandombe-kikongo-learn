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

## 3. Contrôle avant la prochaine version du dictionnaire

Quand tu diras « refais la version », la génération sera bloquée tant que l'audit n'est pas vert. L'audit vérifie :

- aucune lettre latine résiduelle dans un segment Mandombe
- ponctuation présente et rendue dans la police Mandombe, jamais en latin noir
- chaque phrase commence par une majuscule et se termine par un point (ou ?/!)
- pas de voyelle doublée en Mandombe, pas de `w`/`y` de liaison ajouté
- pas de doublons d'entrées, pas d'article `the/a/an` en tête d'index anglais
- toute entrée a bien ses gloses FR et EN
- source = ton fichier corrigé, vérifié par empreinte SHA-256

Un rapport listant chaque anomalie te sera montré avant tout export.

Limite honnête : l'audit attrape les défauts de forme, pas une erreur de sens sur un mot absent du lexique de contrôle. Ces cas-là restent à ta validation.

## Détails techniques

- `.agents/skills/taper-le-mandombe/SKILL.md` : ajouter `kua` à la liste des mots qui se tapent tels quels.
- Générateur de cartes (`generate-letter-illustrations.py` / script de cartes de mots) : retirer la ligne de glose, garder Mandombe + translittération.
- Audit : script unique exécuté avant l'export ODT, sortie Markdown, code de sortie non nul en cas d'anomalie.
