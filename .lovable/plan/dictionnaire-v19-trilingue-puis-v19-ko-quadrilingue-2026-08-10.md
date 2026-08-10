# Dictionnaire — v19 trilingue puis v19-KO quadrilingue

## Objectif

Deux livraisons successives, à partir du même corpus nettoyé :

1. **v19 trilingue** (Lari · Français · English) — la version relue jusqu'à la page 22, avec tous les défauts corrigés automatiquement dans tout le document, pas seulement là où ils ont été repérés.
2. **v19-KO quadrilingue** (Lari · Français · English · 한국어) — même contenu, plus le coréen et un quatrième index.

La v19 trilingue est produite et vérifiée d'abord ; le coréen n'est lancé qu'ensuite, sur la base déjà propre.

## 1. Corrections de corpus à intégrer

- `babantu` → `ba bantu` (deux mots) = « être humains · to be humans », note « ba 'être' + bantu 'humains' ». Corrigé dans `src/data/lessons.ts`, `supabase/functions/_shared/lessons-corpus.ts` et `dictionary.json`, puis sorti de la liste des affixes de dérivation.
- `bamindele` → `ba mindele` (deux mots) : la forme agglutinée n'existe pas. Deux emplois distincts, `ba` = connectif « de » (ex. « bala ba mindele » = les enfants des Blancs) et `ba` = être (« ba mindele » = être blancs). `mindele` reste « les Blancs », `mundele` le singulier.
- `Batata mbote zawu.` = « Bonjour à leurs parents. · Hello to their parents. »
- `Beno ngatu lu zonzesa mababa.` — faute de frappe corrigée, phrase avec majuscule initiale et point final.
- `bimenina` = « les végétaux · plants » — toujours en un seul mot ; toute forme séparée est corrigée.
- Reprise des correctifs déjà validés : `mbaji` = demain (jamais « voisin »), `jimbakane` = perdu (chemin), `mundele/mindele`, `humunu`, `tina` (avoir peur de), `mumvuka`, `muhangu`, `tekela`, `ba bo / ba wu bo`, suppression de `mbuma` = fruit, `nkelele` = pintade, `ngongolo` = mille-pattes, `munienge`/`djelo`.
- Chaque correction est appliquée aux quatre sources en même temps : corpus des leçons, dictionnaire hors-ligne, traducteur, corpus Mbuta Matondo — puis exportée vers le livre.
- Nouvelles règles dans `scripts/lari-variant-rules.json` pour bloquer le retour des formes agglutinées ou disjointes fautives.

## 2. Nettoyage automatique du texte du livre

Ces défauts ont été relevés dans la relecture ; ils sont traités par des passes systématiques sur tout le document, pas entrée par entrée.

- **Gloses incomplètes** : toute entrée dont il manque le français ou l'anglais est complétée (ex. « Ba tu tariri. » sans français, « Ba ndongese. » sans séparateur). Aucune entrée ne sort avec une seule langue.
- **Séparateurs** : plus aucun `|` résiduel (ex. « Belesa| · bukisa »), uniquement le point médian `·`.
- **Ponctuation** : majuscule initiale et point final pour chaque phrase dans les trois langues et pour le bloc Mandombe ; pas de double point final (« A beto na andi.. »), pas d'espace avant `?` ou `!` en anglais.
- **Casse** : les mots à l'intérieur d'une glose ne prennent pas de majuscule parasite (« Bakala Di Moshi » → « Bakala di moshi ») ; seuls les noms propres la gardent.
- **Doublons** : fusion des variantes qui ne diffèrent que par la casse, la ponctuation finale ou un espace (« Ba Kubama Lue ? » / « Ba kubama luena ? », « Bala ba tomene sala. » en double).
- **Gloses anglaises sans article** : « the jaw » → « jaw ». L'article n'est conservé que dans une phrase réelle (« The child is eating. ») ou une locution figée. Le français garde ses articles, porteurs du genre.
- **Mandombe** : jamais de lettre latine, de chiffre ni de ponctuation dans le bloc Mandombe ; le Mandombe reste toujours en premier, en doré.
- Un rapport de nettoyage listant chaque catégorie et le nombre de corrections est produit avant la génération, pour contrôle.

## 3. Les index

v19 trilingue :

```text
Index I    Lari      -> Mandombe · Lari · FR · EN   (2 colonnes, entrées complètes + notes)
Index II   Français  -> Mandombe · Lari · EN        (3 colonnes, compact)
Index III  English   -> Mandombe · Lari · FR        (3 colonnes, compact)
```

v19-KO ajoute le coréen dans chaque entrée de l'index I et un quatrième index :

```text
Index IV   한국어  -> Mandombe · Lari · FR · EN   (3 colonnes, compact, tri par jamo)
```

Les index II à IV ne reprennent que les mots et expressions courtes ; les phrases complètes restent dans l'index I.

## 4. Mise en forme conservée

- Couverture, page de titre, avant-propos, prononciation et annexes entièrement bilingues (et trilingues dans la version coréenne).
- « Mbamou » en français, « Mbamu » en anglais.
- Section prononciation avec exemples en Mandombe doré.
- Annexe conjugaisons avec la phrase entière traduite (FR · EN, + KO), pas seulement le pronom. Pas d'index thématique.
- Illustrations de lettres Mandombe dorées sur fond marron, sans lettre latine flottante.

## 5. Production

1. Appliquer les corrections de corpus, puis `scripts/sync-corpus.ts` et `scripts/sync-dictionary-offline.ts`.
2. `scripts/export-book-data.ts` — régénérer `dico.json` et `conjugaisons.json`.
3. Passe de nettoyage (section 2) + rapport.
4. Compléter les traductions manquantes : anglais (`translate-book-english.py`), notes (`translate-notes-english.py`), conjugaisons (`translate-conjugations.py`).
5. `scripts/build-dictionary-odt-v19.py` — ODT + PDF trilingues, QA visuelle (couverture, une page par index, deux pages d'annexe, et relecture ciblée des lettres A et B qui ont servi de témoin).
6. Ensuite seulement : coréen (`translate-book-korean.py` étendu aux notes et conjugaisons), quatrième index, styles `Noto Sans CJK KR`, ODT + PDF v19-KO.

## Détails techniques

- Le nettoyage est implémenté comme un module partagé appelé par le générateur, pour que les deux versions reçoivent exactement les mêmes règles.
- Le tri de l'index IV utilise l'ordre des jamos initiaux (ㄱ ㄴ ㄷ …) calculé depuis le point de code hangul, avec regroupement par consonne initiale comme les lettres A–Z.
- Contrainte KDP : la v18 fait 511 pages sur 550. La fusion des doublons devrait en libérer quelques-unes ; le quatrième index en ajoute 45 à 60. Si la version coréenne dépasse la limite, je resserre d'abord les index II–IV (corps réduit, interligne 0.68 cm) ; si cela ne suffit pas, je reviens vers vous avant de scinder en deux volumes.
