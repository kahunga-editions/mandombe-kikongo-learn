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

### Solution retenue pour la version coréenne

Compacter la mise en page pour repasser sous 828 pages, sans rien retirer du contenu :

1. Index IV (한국어 → Kikongo Lari → français) passé en interligne serré, même densité que les index II/III.
2. Marges intérieures ajustées au minimum KDP autorisé pour cette pagination (19 mm de reliure).
3. Corps des gloses coréennes à 8,5 pt (Noto Sans CJK KR reste parfaitement lisible à cette taille).

Objectif visé : ~790–810 pages. Si le compactage ne suffit pas, repli : passer la version coréenne au format 17,78 × 25,4 cm (7×10"), ce qui fait tomber la pagination d'environ 15 %.

## 2. Couverture coréenne

Nouvelle couverture dédiée, générée par `scripts/generate-letter-illustrations.py` (fonction `cover_portrait`), respectant la charte : doré sur fond marron, **Mandombe toujours en premier**.

- Titre Mandombe : Buku dia Binsono
- Sous-titre : Dictionnaire Kikongo Lari – Mandombe
- Ligne des langues : `Français · English · 한국어`
- Mention explicite : `4개 언어 사전 · Quatre index de recherche`
- Marque : glyphe Mandombe **Nzo Mikanda** + `Nzo Mikanda` + `www.nzomikanda.com`

## 3. Avant-propos en coréen

L'avant-propos actuel est bilingue (FR + EN). Pour l'édition coréenne, il sera **trilingue** : le bloc coréen est ajouté après le bloc anglais, section par section, dans le même ordre :

- Présentation de l'ouvrage et du corpus Jacquot & Lumwamu
- Comment utiliser les quatre index
- Écriture Mandombe et rôle du site nzomikanda.com
- Prononciation (les exemples restent en Mandombe doré, seules les explications sont traduites)

La traduction passe par le même pipeline que les gloses (`scripts/translate-book-korean.py`, cache réutilisé), puis relecture manuelle des titres de section.

## 4. Détails techniques

- Nouveau script `scripts/build-dictionary-odt-v26-ko.py`, dérivé de `build-dictionary-odt-v25.py` : il part du **même v24 validé** (aucune régression sur les sens corrigés, la ponctuation Mandombe et la casse `EN —`).
- Ajout de styles compacts `KoEntryTight` / `IndexTight` et d'un `<style:page-layout>` aux marges KDP.
- Comptage de pages vérifié par conversion LibreOffice headless en interne (aucun PDF livré, conformément à votre demande).

## 5. Livrables

- `dictionnaire-lari-v25-ko-v2.odt` — couverture coréenne, avant-propos coréen, pagination ≤ 828.
- Un rapport court : pagination finale, conformité KDP, contrôles de non-régression (Bieri, Bele mpimpa, `EN —`, ponctuation Mandombe).
- La version trilingue v25 reste inchangée (déjà conforme).
