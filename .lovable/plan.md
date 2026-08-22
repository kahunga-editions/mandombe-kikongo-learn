# Annexe Kilolaka dans le dictionnaire (v30)

Ajouter au livre une annexe complète consacrée au Kilolaka : le sens de chaque glyphe Mandombe, précédé d'une introduction qui explique ce qu'est réellement le Kilolaka.

## Le texte d'ouverture de l'annexe

Un texte court, en français, anglais et coréen, qui pose ceci :

- Dans la tradition Kongo, la matière naît du son : ce sont les ondes sonores qui la font apparaître et prendre forme.
- Le Kilolaka est la description, par les anciens Kongo, de la manière dont la matière se manifeste — ce qui se passe au moment où elle prend forme.
- Chaque son porte donc une étape de cette manifestation, et chaque mot garde ce sens profond en dessous de son sens courant.
- Le Kilolaka est l'art de décoder ce sens : une cymatique graphique, où le glyphe donne à voir ce que l'onde fait à la matière.

Le nom Kilolaka lui-même est décomposé en ouverture : Ki (énergie intérieure, la vibration d'origine), Lo (connaissance profonde ascensionnelle), La (connaissance profonde manifestée), Ka (énergie manifestée, la vibration devenue forme).

## Le contenu de l'annexe

Tous les glyphes tapables en Mandombe, regroupés par consonne, exactement comme sur la page Kilolaka du site : B, D, F, G, MB, MF, ND, NG, N, S, V, T, NT, NS, MV, K, L, M, P, MP, NK, NL, N'K, W, R, Z, Y, NY, NZ, MW, SH, DJ, TSH, J — soit environ 370 syllabes.

Pour chaque consonne : son sens racine, puis la liste de ses syllabes. Pour chaque syllabe, sur une ligne :

```text
[glyphe Mandombe doré]   Bi   FR — être intérieur   EN — inner being   KO — 내면의 존재
```

Seules les voyelles réellement disponibles pour chaque consonne sont listées (par exemple NL et NY n'ont que i, u, e, o, a) — aucune combinaison n'est inventée.

## Les significations

Les sens français sont repris tels quels de la page Kilolaka du site, sans reformulation. L'anglais et le coréen sont produits par traduction de ces mêmes sens, avec le même vocabulaire d'un bout à l'autre (intérieur / inner / 내면, manifesté / manifested / 발현된, ascensionnel, qui engendre, qui reçoit), pour que la lecture reste régulière sur 370 lignes.

## Où elle se place

Après l'annexe des conjugaisons, en fin d'ouvrage, avec son entrée dans la table des matières. L'annexe est identique dans les trois éditions : trilingue FR/EN et quadrilingue coréenne (avec la colonne KO uniquement dans cette dernière).

## Détails techniques

- Source des données : le tableau `GROUPS` de `public/kilolaka_grille.html` (consonne, sens racine, voyelles disponibles, sens par voyelle) — extrait vers `scripts/kilolaka-annex.json` avec les colonnes EN et KO ajoutées.
- Nouveau script `scripts/build-dictionary-odt-v30.py`, dérivé de la v28/v29, qui reprend l'intégralité du corpus v29 et lui ajoute la section annexe.
- Les glyphes passent par `scripts/mandombe_typing.py` (règles de saisie déjà validées) ; audit HarfBuzz bloquant : aucun résidu latin toléré dans les blocs Mandombe. Toute syllabe non composable est signalée, jamais remplacée.
- Sortie : ODT + PDF LibreOffice pour la version trilingue et pour la version coréenne, contrôle visuel des pages de l'annexe avant livraison.
