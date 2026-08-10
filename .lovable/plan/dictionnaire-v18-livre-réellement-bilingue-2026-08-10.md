# Dictionnaire v18 — livre réellement bilingue

Quatre corrections dans `scripts/build-dictionary-odt-v14.py` (+ `scripts/export-book-data.ts`), puis régénération ODT/PDF en v18.

## 1. Couverture et page de titre bilingues

Aujourd'hui la page de titre est uniquement en français :

```text
Dictionnaire Kikongo Lari – Français – English
4748 entrées · Écriture Mandombe
Trois index de recherche : Lari · Français · English
```

Nouveau rendu :

```text
Dictionnaire Kikongo Lari – Français – English
Kikongo Lari – French – English Dictionary
4748 entrées · Écriture Mandombe
4748 entries · Mandombe script
Trois index de recherche : Lari · Français · English
Three search indexes: Lari · French · English
```

Même traitement pour la 4e de couverture et toute ligne encore monolingue (avant-propos, titres d'index, mentions « À propos »). L'image de couverture est vérifiée : si elle porte du texte français seul, elle est régénérée avec la ligne anglaise sous la ligne française, le Mandombe restant en premier.

## 2. Annexe Conjugaisons : traduire les phrases, pas seulement les pronoms

Actuellement chaque ligne n'affiche que la forme Lari et le pronom (« bilongo ni kue nue  Je · I »). Nouveau rendu :

```text
𛃏𛂷𛃕   bilongo ni kue nue   Je · I — Je prends des médicaments. · I take medicine.
```

La glose de chaque ligne est construite à partir du corpus Nzo Mikanda : le sens du verbe (`meaning.fr` / `meaning.en` des tableaux de `lessons.ts`) est fléchi selon la personne et le temps du tableau, en français et en anglais. Aucune forme Lari n'est inventée ; seules les gloses FR/EN sont produites. Quand une phrase identique existe déjà dans `dictionary.json`, c'est la glose du corpus qui est reprise telle quelle, en priorité.

## 3. Mbamou · Mbamu

Le nom de la région s'écrit **Mbamou** dans le texte français et **Mbamu** dans le texte anglais. Correction dans l'avant-propos et partout dans le livre.

## 4. Ponctuation

- Toute phrase (y compris nominale) commence par une majuscule et se termine par un point, dans les trois index, les notes et l'annexe.
- La règle s'applique aussi au bloc Mandombe : majuscule initiale et point final (le point est ajouté après le bloc de glyphes, la police Mandombe n'ayant pas de signe propre).
- Pas de majuscule après un point-virgule : « Fille ; fils adoptive » reste en minuscule après le `;`.

## Technique

- `scripts/export-book-data.ts` : exporter les gloses de lignes de conjugaison (personne + temps + sens FR/EN) pour que le générateur n'ait pas à les recalculer.
- `scripts/build-dictionary-odt-v14.py` :
  - page de titre et 4e de couverture bilingues ;
  - rendu des lignes d'annexe avec la glose FR · EN ;
  - `normalize_sentence` : majuscule + point systématiques, blocage de la capitalisation après `;`, application au champ Mandombe ;
  - remplacement `Mbamou` (FR) / `Mbamu` (EN).
- Régénération ODT + PDF en **v18**, QA visuelle (page de titre, pages d'annexe conjugaisons, entrées avec `;`) et exécution de `scripts/audit-book-glosses.ts`.

## Vérification

Contrôle du nombre de pages après ajout des gloses de conjugaison (limite KDP 550 pages).
