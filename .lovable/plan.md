# Dictionnaire v13 — trois index de recherche

## Ce que j'ai compris

Le v12 que vous avez corrigé sert de référence visuelle (Mandombe d'abord, en grand et en doré/brun, puis la forme latine en gras, puis les sens). La v13 garde exactement cette esthétique, mais devient un dictionnaire à **trois entrées** :

1. **Kikongo Lari → Français → English** (index actuel, conservé)
2. **Français → Kikongo Lari → English**
3. **English → Français → Kikongo Lari**

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
I.   Lari – Français – English      (~4 700 entrées)
II.  Français – Lari – English
III. English – Français – Lari
Annexe — Conjugaisons
Index thématique · À propos
```

Les sections II et III sont générées à partir du même corpus : chaque sens français (ou anglais) devient une vedette, les sens multiples séparés par « ; » sont éclatés, et les vedettes identiques regroupent leurs équivalents Lari (Mandombe + latin) sur une même entrée, sans répétition.

## Détails techniques

- Mise à jour de `scripts/build-dictionary-odt.py` :
  - fonctions `dedupe_senses()` et `normalize_sentence()` appliquées à tous les champs ;
  - construction des index inverses FR et EN à partir de `clean` ;
  - rendu d'entrée réutilisable, paramétré par la langue de tête ;
  - couverture pleine page (page layout dédié à marges nulles + frame 15,24 × 22,86 cm) ;
  - notes rendues sur deux lignes FR/EN.
- Nouveau cache `notes-en.json` alimenté par un script de traduction par lot (même approche que `translate-book-english.py`) pour les notes sans version anglaise.
- Génération de l'ODT puis conversion PDF ; les deux fichiers seront déposés dans `/mnt/documents/` avec un lien de téléchargement dans le chat.

## Volume attendu

Environ trois fois le corps du dictionnaire actuel : ~700 à 800 pages. Si c'est trop pour l'impression KDP, je peux produire les index II et III en corps plus petit (3 colonnes, forme abrégée) — dites-le-moi et j'ajuste.
