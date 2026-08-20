# Version coréenne : couverture, avant-propos et conformité Amazon KDP

## 1. Limite de pages Amazon KDP — point bloquant

Règles KDP pour un livre broché (paperback), encre noire :

| Papier | Pages min | Pages max |
| --- | --- | --- |
| Blanc | 24 | **828** |
| Crème | 24 | 776 |
| Couleur premium | 24 | 828 |
| Relié (hardcover) | 75 | 550 |

État actuel :

- `dictionnaire-lari-v25.odt` (trilingue) : **517 pages** → publiable tel quel.
- `dictionnaire-lari-v25-ko.odt` (quadrilingue) : **839 pages** → **refusé par KDP** (11 pages de trop).

### Solution retenue : deux volumes, aucune compaction

La mise en page reste **exactement** celle de la v25 coréenne (mêmes tailles, mêmes marges, même lisibilité). Le contenu est simplement scindé en deux tomes :

- **Volume I** — pages de titre + avant-propos (FR · EN · 한국어) + Prononciation + **Index I** (Kikongo Lari → français → anglais → 한국어).
- **Volume II** — page de titre + rappel court d'utilisation + **Index II** (français), **Index III** (anglais), **Index IV** (한국어) + annexe des conjugaisons.

Chaque tome vise ~420–450 pages, largement sous la limite de 828. La coupure tombe sur une frontière d'index, donc aucun index n'est coupé en deux.


## 2. Couverture coréenne

Nouvelle couverture dédiée, générée par `scripts/generate-letter-illustrations.py` (fonction `cover_portrait`), respectant la charte : doré sur fond marron, **Mandombe toujours en premier**.

- Titre Mandombe : Buku dia Binsono
- Sous-titre : Dictionnaire Kikongo Lari – Mandombe
- Ligne des langues : `Français · English · 한국어`
- Mention explicite : `4개 언어 사전 · Quatre index de recherche`
- Marque : glyphe Mandombe **Nzo Mikanda** + `Nzo Mikanda` + `www.nzomikanda.com`
- Mention du tome, en bas du titre : `제1권 · Volume I` et `제2권 · Volume II`

## 3. Avant-propos en coréen

L'avant-propos actuel est bilingue (FR + EN). Pour l'édition coréenne, il sera **trilingue** : le bloc coréen est ajouté après le bloc anglais, section par section, dans le même ordre :

- Présentation de l'ouvrage et du corpus Jacquot & Lumwamu
- Comment utiliser les quatre index (avec renvoi au tome où se trouve chaque index)
- Écriture Mandombe et rôle du site nzomikanda.com
- Prononciation (les exemples restent en Mandombe doré, seules les explications sont traduites)

L'avant-propos complet figure dans le Volume I ; le Volume II reprend une version courte (présentation + mode d'emploi des index) pour qu'il reste utilisable seul.

La traduction passe par le même pipeline que les gloses (`scripts/translate-book-korean.py`, cache réutilisé), puis relecture manuelle des titres de section.

## 4. Détails techniques

- Nouveau script `scripts/build-dictionary-odt-v26-ko.py`, dérivé de `build-dictionary-odt-v25.py` : il part du **même v24 validé** (aucune régression sur les sens corrigés, la ponctuation Mandombe et la casse `EN —`).
- Le script produit deux ODT en découpant le `content.xml` à la frontière du chapitre « Index II », styles et déclarations de polices (HapaxMandombe, Noto Sans CJK KR) dupliqués à l'identique dans les deux fichiers.
- Aucune modification de style, de taille de police ou de marge.
- Pagination de chaque tome vérifiée par conversion LibreOffice headless en interne (aucun PDF livré, conformément à votre demande).

## 5. Livrables

- `dictionnaire-lari-ko-vol1.odt` — avant-propos trilingue, Prononciation, Index I.
- `dictionnaire-lari-ko-vol2.odt` — Index II, III, IV et annexe des conjugaisons.
- Un rapport court : pagination de chaque tome, conformité KDP, contrôles de non-régression (Bieri, Bele mpimpa, `EN —`, ponctuation Mandombe).
- La version trilingue v25 reste inchangée (517 pages, déjà conforme).
