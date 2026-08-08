# Dictionnaire v13 — trois index de recherche

## Ce que j'ai compris

Le v12 que vous avez corrigé sert de référence visuelle (Mandombe d'abord, en grand et en doré/brun, puis la forme latine en gras, puis les sens). La v13 garde exactement cette esthétique, mais devient un dictionnaire à **trois entrées** :

1. **Kikongo Lari → Français → English** (index actuel, conservé)
2. **Français → Kikongo Lari → English**
3. **English → Kikongo Lari → Français**

Dans les trois sections, le **Mandombe apparaît toujours** (en tête de la forme Lari) avec sa **translittération latine**. Seul l'ordre de classement et la langue de tête changent.

## Corrections demandées, en plus

- **Pas de doublons dans une même entrée** : quand le français et l'anglais sont identiques (ex. « They've taught me. · They've taught me. »), ou quand un sens est répété dans la liste des sens fusionnés, on n'affiche la valeur qu'une fois.
- **Ponctuation** : si le sens est une phrase (contient un verbe / plusieurs mots avec ponctuation finale attendue), majuscule initiale + point final. Si c'est un simple mot ou syntagme, pas de majuscule ajoutée, pas de point. Même règle pour le Lari, le français et l'anglais.
- **Notes culturelles bilingues** : chaque note s'affiche en français puis en anglais (`FR — … / EN — …`). Les notes qui n'ont pas encore de version anglaise seront traduites par lot, comme cela a été fait pour les sens anglais manquants.
- **Avant-propos / pages liminaires** : je reprends votre version corrigée du v12 (le texte anglais que vous avez ajouté) et j'ajoute le mode d'emploi des trois index en FR et EN.
- **Couverture ODT** : le cadre de couverture occupe la **page entière** (bord à bord, sans marges), le Mandombe en premier.

## Structure du livre v13

```text
Couverture pleine page (Mandombe d'abord)
Avant-propos (FR) / Foreword (EN)
Prononciation · Pronunciation
Mode d'emploi des trois index · How to use the three indexes
I.   Lari – Français – English      (index principal, mise en page v12)
II.  Français – Lari – English      (compact : 3 colonnes, corps réduit)
III. English – Lari – Français      (compact : 3 colonnes, corps réduit)
Annexe — Conjugaisons
Index thématique · À propos
```

Les sections II et III sont générées à partir du même corpus : chaque sens français (ou anglais) devient une vedette, les sens multiples séparés par « ; » sont éclatés, et les vedettes identiques regroupent leurs équivalents Lari (Mandombe + latin) sur une même entrée, sans répétition.

## Détails techniques

- Mise à jour de `scripts/build-dictionary-odt.py` :
  - fonctions `dedupe_senses()` et `normalize_sentence()` appliquées à tous les champs ;
  - construction des index inverses FR et EN à partir de `clean` ;
  - rendu d'entrée réutilisable, paramétré par la langue de tête ;
  - index II et III en 3 colonnes, corps ~7,5 pt / Mandombe ~12 pt, interligne serré ;
  - couverture pleine page (page layout dédié à marges nulles + frame 15,24 × 22,86 cm) ;
  - notes rendues sur deux lignes FR/EN (les notes ne sont reprises que dans l'index I pour économiser des pages).
- Nouveau cache `notes-en.json` alimenté par un script de traduction par lot (même approche que `translate-book-english.py`) pour les notes sans version anglaise.
- Génération de l'ODT puis conversion PDF ; les deux fichiers seront déposés dans `/mnt/documents/` avec un lien de téléchargement dans le chat.

## Contrainte KDP : 75 à 550 pages

Après génération, je compte les pages du PDF. Cible : rester sous 550.
Leviers appliqués dans l'ordre si nécessaire : illustrations de lettres uniquement dans l'index I ; corps des index II/III réduit encore d'un cran ; regroupement des vedettes proches sur une même ligne. Je vous indique le nombre de pages final et, si la limite reste dépassée, je propose une découpe en deux tomes plutôt que de sacrifier la lisibilité.

