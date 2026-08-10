# Dictionnaire v19 — quadrilingue (Lari · Français · English · 한국어)

## Objectif

Une seule version v19 qui remplace à la fois la v18 et l'ancienne version coréenne : quatre index de recherche, le coréen partout, et toutes les corrections validées depuis la v13.

## 1. Corrections de corpus à intégrer

- `babantu` → `ba bantu` (deux mots) = « être humains · to be human », note « ba 'être' + bantu 'humains' ». Corrigé dans `src/data/lessons.ts`, `supabase/functions/_shared/lessons-corpus.ts` et `dictionary.json`, puis sorti de la liste des affixes de dérivation.
- `bamindele` → `ba mindele` (deux mots) : la forme agglutinée n'existe pas. Deux emplois distincts, `ba` = connectif « de » (ex. « bala ba mindele » = les enfants des Blancs) et `ba` = être (« ba mindele » = être blancs). `mindele` reste « les Blancs », `mundele` le singulier. Correction dans le corpus, le dictionnaire, le traducteur et le prompt de Mbuta Matondo.
- `Batata mbote zawu.` = « Bonjour à leurs parents. · Hello to their parents. » — corrigé dans le dictionnaire, le corpus des leçons, le traducteur et le corpus Mbuta Matondo, avec majuscule initiale et point final dans les trois langues.
- `Beno ngatu lu zonzesa mababa.` = phrase avec majuscule initiale et point final. La faute de frappe originale est corrigée dans le corpus, le dictionnaire, le traducteur et le corpus Mbuta Matondo.
- `bimenina` = « les végétaux · plants (vegetation) » — toujours en un seul mot. Toute forme séparée (`bi menina`) est corrigée partout : corpus des leçons, dictionnaire, traducteur, corpus Mbuta Matondo et livre.
- Reprise des correctifs déjà validés : `mbaji` = demain (jamais « voisin »), `jimbakane` = perdu (chemin), `mundele/mindele`, `humunu`, `tina` (avoir peur de), `mumvuka`, `muhangu`, `tekela`, `ba bo / ba wu bo`, suppression de `mbuma` = fruit, `nkelele` = pintade, `ngongolo` = mille-pattes, `munienge`/`djelo`.
- Ajout d'une règle dans `scripts/lari-variant-rules.json` signalant toute forme agglutinée `babantu` / `bamindele` pour éviter leur réapparition.
- Passage de `scripts/fix-lari-variants.ts` puis de l'audit des gloses pour vérifier qu'aucune de ces erreurs ne subsiste dans les données exportées.

## 2. Règles de mise en forme conservées

- Mandombe toujours en premier, doré, sans lettres latines parasites (`cleanMandombe`).
- Majuscule initiale et point final pour chaque phrase, y compris le bloc Mandombe ; pas de majuscule après un point-virgule.
- Couverture, page de titre, avant-propos et annexes entièrement bilingues — plus une ligne coréenne sur la couverture et le titre.
- « Mbamou » en français, « Mbamu » en anglais.
- Annexe conjugaisons avec la phrase entière traduite (FR · EN, + KO), pas seulement le pronom. Pas d'index thématique.
- Gloses anglaises sans article : on retire le `the` / `a` / `an` initial des sens anglais (« the jaw » → « jaw »), pour ne pas répéter deux fois le même mot dans l'index anglais et dans l'entrée. L'article est conservé uniquement quand il fait partie d'une vraie phrase (ex. « The child is eating. ») ou d'une locution figée. Le français garde ses articles, qui portent le genre.

## 3. Les quatre index

```text
Index I    Lari      -> Mandombe · Lari · FR · EN · KO   (2 colonnes, entrées complètes + notes)
Index II   Français  -> Mandombe · Lari · EN · KO        (3 colonnes, compact, mots et locutions)
Index III  English   -> Mandombe · Lari · FR · KO        (3 colonnes, compact)
Index IV   한국어     -> Mandombe · Lari · FR · EN        (3 colonnes, compact, tri par jamo coréen)
```

Le coréen apparaît dans chaque entrée de l'index I ; les index II à IV restent des index de recherche lexicale (les phrases longues ne figurent que dans l'index I).

## 4. Production

1. `scripts/export-book-data.ts` — régénérer `dico.json` et `conjugaisons.json` depuis le corpus corrigé.
2. Reconstituer les caches de traduction perdus : anglais manquant (`translate-book-english.py`), notes anglaises (`translate-notes-english.py`), gloses de conjugaison (`translate-conjugations.py`), puis coréen (`translate-book-korean.py`, étendu pour couvrir aussi les notes et les conjugaisons).
3. `scripts/build-dictionary-odt-v19.py` — copie de la v14 étendue : quatrième index, styles coréens (`Noto Sans CJK KR`), tri hangul, couverture trilingue.
4. Régénérer les 22 illustrations de lettres Mandombe dorées.
5. Conversion ODT → PDF via `soffice`, QA visuelle (couverture, une page par index, deux pages d'annexe).

## Détails techniques

- Le tri de l'index IV utilisera l'ordre des jamos initiaux (ㄱ ㄴ ㄷ …) calculé à partir du point de code hangul, avec un regroupement par consonne initiale comme les lettres A–Z des autres index.
- Contrainte KDP : la v18 fait 511 pages sur 550 maximum. Un quatrième index ajoute environ 45 à 60 pages. Si le tirage dépasse la limite, je resserre d'abord les index II–IV (corps réduit, interligne 0.68 cm, 4 colonnes pour l'index IV) ; si cela ne suffit pas, je propose de scinder en deux volumes plutôt que de retirer du contenu, et je reviens vers vous avant de trancher.
- Le coréen ajouté à chaque entrée de l'index I augmente aussi le volume : je mesurerai le nombre de pages après un premier tirage d'essai avant la version finale.
