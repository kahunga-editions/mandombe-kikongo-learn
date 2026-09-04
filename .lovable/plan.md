# Mandombe : superposition à l'écran, règle du « ia », et Ama

## 1. Ce que je comprends de la superposition (les deux captures)

Les glyphes Mandombe débordent sous leur ligne et chevauchent le texte latin :
- **Dictionnaire** : la translittération latine (« a ma ») passe par-dessus le bas des glyphes dorés.
- **Traducteur** : la ponctuation latine (les points) se retrouve au milieu des glyphes dans le cadre de sortie.

Cause : l'encre de la police Masono Mandombe descend bien sous la ligne de base, alors que la règle globale `.font-mandombe` ne réserve qu'un `line-height: 1.8` avec `0.25em` de marge, et que le dictionnaire écrase encore cet espace avec `leading-[1.5]` sur des glyphes en `text-4xl`/`text-5xl`.

Correction :
- `src/index.css`, `.font-mandombe` : hauteur de ligne plus généreuse (~2) et respiration verticale suffisante pour toute taille.
- `src/pages/Dictionary.tsx` : retirer `leading-[1.5]`, mettre le bloc Mandombe sur sa propre ligne, augmenter la marge du titre latin.
- `src/pages/Translator.tsx` : même traitement sur le bloc de sortie Mandombe, et passage par `cleanMandombe` pour qu'aucune ponctuation latine ne reste au milieu des glyphes.
- Vérification par captures (dictionnaire entrée courte et longue, traducteur), en desktop et en largeur mobile.

## 2. Revue de la règle « ia » — ce que je retiens

**Règle unique : si le glyphe existe en Mandombe, on le tape tel quel. On ne passe jamais par `iya`.**

`iya` n'est pas une graphie de repli à appliquer « au cas où ». C'est une invention à supprimer partout où elle n'est pas la frappe réelle du mot.

Cas concrets :
- `nkia` (« qui ») se tape **nkia**, avec ses glyphes. Jamais `nkiya`.
- `kozia`, `kimfinia`, `bimfinia` se tapent tels quels (déjà corrigé).
- `Ntshia` / `ntshiya` ne sont pas des saisies : la saisie est `nkia`.

Défaut encore présent dans le code : `scripts/mandombe_graphies.py` mappe `nkia → nkiya`, `ntshia → nkiya`, `ntshiya → nkiya`. Ces trois lignes deviennent `nkia`.

`tilapia → tilapiya` est le seul cas où l'auteur a nommé une graphie différente ; je vérifie cette suite au shaper (HarfBuzz sur `masono_mandombe-webfont.ttf`) avant de la garder, et je te soumets le résultat au lieu de trancher seul.

Contrôle systématique : passer au shaper toutes les occurrences de `iya` restantes dans les couches de saisie et le corpus, lister celles où la suite sans `y` se compose correctement, et les remettre à leur graphie réelle.

## 3. Ama en un seul mot

L'entrée du dictionnaire est `A ma` (fr « ma chère »). Elle devient **`Ama`**, en un seul mot, dans `data/dictionary-entries.json`, avec la même correction partout où la forme séparée apparaît (leçons, corpus, traducteur).

## 4. Mémoire

Ajout de la règle dans la base d'apprentissage Mandombe (`.lovable/memory/grammar/orthography-mandombe-y-double-vowels.md` et la skill de saisie) :
- si le glyphe existe, on le tape — `iya` n'est jamais un repli ;
- `nkia` se tape `nkia` ;
- `Ama` s'écrit en un seul mot.

## Détails techniques
- Affichage : `src/index.css`, `src/pages/Dictionary.tsx`, `src/pages/Translator.tsx`.
- Saisie : `scripts/mandombe_graphies.py` (retrait de `nkia → nkiya`), `scripts/mandombe_typing.py`, `src/lib/mandombeText.ts`.
- Données : `data/dictionary-entries.json` (`A ma` → `Ama`).
- Garde-fous : `scripts/dictionary_guards.py` reste vert avant toute clôture.
- **Aucune nouvelle version ODT/PDF du livre ne sera générée.**
