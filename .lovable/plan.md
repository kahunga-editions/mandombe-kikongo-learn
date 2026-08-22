# Annexe Kilolaka — deux livres distincts

## Ce qui est acté

- **Livre 1 (v30)** : dictionnaire Kikongo Lari, en **français et anglais uniquement**. C'est celui qui reçoit l'annexe Kilolaka. Aucun coréen.
- **Livre 2** : l'édition coréenne reste un ouvrage séparé. Elle recevra la même annexe, dans un second temps, une fois l'annexe du livre 1 validée.

## L'annexe s'écrit dans la langue du Mandombe

L'annexe ne parle pas de « consonnes » ni de « voyelles ». Elle utilise les noms que le Mandombe donne lui-même à ses éléments, parce que ces noms portent la réalité cachée du système :

- le **Singini** comme point de départ — dans la tradition Kongo, un vortex ;
- les **directions énergétiques** : Pakù, Ndongù, Pelé, Kètè ;
- les **Kisimba / Bisimba**, qui sont aussi des Simbi, des esprits ;
- le **Zita**, union d'un Kisimba et de son support, et les **Mazita** qui en naissent.

Chaque terme est donné avec son sens ordinaire **et** son sens initiatique, puisque c'est là que réside le vrai contenu du Kilolaka.

### Ce dont j'ai besoin de vous avant d'écrire

Ces termes ne figurent nulle part dans le site ni dans le corpus : je ne les inventerai pas et je ne les déduirai pas. Il me faut de vous, en clair :

1. le nom exact et la définition du **Singini** ;
2. les quatre **directions énergétiques** (Pakù, Ndongù, Pelé, Kètè) : à quoi chacune correspond dans le tracé et dans le sens ;
3. **Kisimba / Bisimba** : ce qu'ils désignent, et le lien avec le Simbi ;
4. **Zita / Mazita** : la définition de l'union que vous décrivez ;
5. tout autre nom d'élément du Mandombe qui doit apparaître (le nom des sept formes, du support, du tracé, etc.).

Vous pouvez me les dicter comme vous venez de le faire : je les reprends mot pour mot, sans reformuler.

## Le texte d'ouverture

Court, en français et en anglais :

- Dans la tradition Kongo, la matière naît du son : ce sont les ondes qui la font apparaître et prendre forme.
- Le Kilolaka est la description, par les anciens Kongo, de la manière dont la matière se manifeste — ce qui se passe au moment exact où elle prend forme.
- Chaque son porte une étape de cette manifestation ; sous le sens courant d'un mot se tient donc toujours un sens profond.
- Le Kilolaka est l'art de décoder ce sens. C'est une cymatique graphique : le glyphe donne à voir ce que l'onde fait à la matière.

Le nom Kilolaka est décomposé en ouverture : Ki, Lo, La, Ka.

## Le corps de l'annexe : jamais un élément seul

Aucune entrée ne présente un élément nu (pas de « MV », pas de « N »). Chaque glyphe est présenté **complet, avec son Kisimba**, c'est-à-dire prononcé et tapable : Mvi, Mvu, Mve, Mvo, Mva, Mvio, Mvue, Mvui, Mvua.

Pour chaque famille : la ligne d'en-tête donne le sens racine, puis chaque glyphe formé occupe sa propre ligne :

```text
[glyphe Mandombe doré]   Mvi   FR — multiplication de la possession intérieure   EN — inner multiplication of possession
```

Les familles couvertes sont celles de la page Kilolaka du site : B, D, F, G, MB, MF, ND, NG, N, S, V, T, NT, NS, MV, K, L, M, P, MP, NK, NL, N'K, W, R, Z, Y, NY, NZ, MW, SH, DJ, TSH, J — environ 370 glyphes. Seules les combinaisons réellement disponibles sont listées ; aucune n'est inventée.

Les sens français sont repris tels quels de la page Kilolaka. L'anglais traduit ces mêmes sens avec un vocabulaire constant d'un bout à l'autre.

## Placement

Après l'annexe des conjugaisons, en fin d'ouvrage, avec son entrée dans la table des matières.

## Détails techniques

- Données extraites du tableau `GROUPS` de `public/kilolaka_grille.html` vers `scripts/kilolaka-annex.json`, avec la colonne anglaise ajoutée.
- Nouveau script `scripts/build-dictionary-odt-v30.py`, dérivé de la v28/v29 : corpus v29 intégral + section annexe. Le coréen n'est pas touché à cette étape.
- Les glyphes passent par `scripts/mandombe_typing.py` ; audit HarfBuzz bloquant, aucun résidu latin toléré. Toute suite non composable est signalée, jamais remplacée.
- Sortie ODT + PDF LibreOffice, contrôle visuel des pages de l'annexe avant livraison.
