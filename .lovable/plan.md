# Dictionnaire v17 — livre entièrement bilingue

Quatre corrections sur le générateur du livre (`scripts/build-dictionary-odt-v14.py` + `scripts/export-book-data.ts`), puis régénération ODT/PDF.

## 1. Annexe Conjugaisons entièrement bilingue

Aujourd'hui l'annexe n'affiche que le pronom français (Je, Tu, Il/Elle…), le temps en français (« Passé ») et le sens du verbe en français uniquement.

Nouveau rendu par tableau :

```text
𛃏𛂷𛃕   Nua — boire · to drink
Passé · Past
  𛃏𛃕𛂷   nuini    Je · I
  ...
```

- Titre du verbe : sens FR **et** EN (le champ `meaning` des leçons contient déjà `fr` et `en` — les deux seront exportés par `export-book-data.ts`, qui aujourd'hui n'en garde qu'un).
- Temps : table de correspondance FR → EN (Présent · Present, Passé · Past, Futur · Future, Impératif · Imperative, Progressif · Progressive, Habituel · Habitual, Parfait · Perfect…).
- Personnes : table FR → EN (Je · I, Tu · You, Il/Elle · He/She, Nous · We, Vous · You (pl.), Ils/Elles · They).
- Aucune forme Lari n'est inventée : seules les étiquettes grammaticales et les sens FR/EN sont traduits.

## 2. Suppression de l'index thématique

La section « Index thématique » (simple liste des modules) est supprimée. La place libérée profite à l'annexe des conjugaisons, qui passe en tête d'annexes juste avant « À propos · About ».

## 3. Le « f » parasite

Dans « Muna hata — Fille ; fils adoptive ; f », le « f » est un fragment de sens résiduel issu de la découpe des sens du corpus. Correction : lors du nettoyage, tout sens réduit à une seule lettre (ou à une abréviation vide de contenu type `f`, `m`, `pl`, seule et isolée) est supprimé, dans les trois index. Un contrôle listera les entrées concernées avant régénération.

## 4. Majuscule + point final pour toutes les phrases

`normalize_sentence` ne met aujourd'hui majuscule et point que sur ce que `is_sentence()` reconnaît comme phrase (au moins 4 mots, etc.). Les phrases nominales courtes (ex. « bonne idée », « grain de sel ») restent donc en minuscule et sans point.

Nouvelle règle : dès que l'entrée Lari est une phrase (ou que la glose contient un verbe/plusieurs mots), la glose FR et EN commence par une majuscule et se termine par un point — y compris pour les phrases nominales. Les entrées lexicales d'un seul mot (vedettes de dictionnaire) gardent le traitement actuel, pour ne pas transformer chaque mot isolé en fausse phrase.

## Technique

- `scripts/export-book-data.ts` : exporter `meaningFr` / `meaningEn` pour les conjugaisons (au lieu du seul `meaning`).
- `scripts/build-dictionary-odt-v14.py` :
  - dictionnaires `TENSE_EN` et `PERSON_EN` ; rendu bilingue dans le bloc `ANNEXE : CONJUGAISONS` ;
  - suppression du bloc `Index thématique` ;
  - filtre des sens d'une seule lettre dans `dedupe_senses` / `split_senses` ;
  - `is_sentence` assouplie pour les phrases nominales.
- Régénération ODT + PDF en **v17**, puis QA visuelle (annexe conjugaisons, entrée « Muna hata », pages d'index) et exécution de `scripts/audit-book-glosses.ts`.

## Vérification

Contrôle du nombre de pages (limite KDP 550) après suppression de l'index thématique et ajout des traductions anglaises dans l'annexe.
