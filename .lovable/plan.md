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

## 2. Règle du « ia » — ce que je retiens (validé par l'auteur)

**Règle : si le glyphe existe en Mandombe, on le tape tel quel.** Le `ia` final se tape donc tel quel : `nkia` (« qui »), `kozia`, `kimfinia`, `bimfinia`. Jamais `nkiya`.

**Les seuls cas où on tape IYA** : les glyphes JIA, WIA, PIA, RIA et HIA n'existent pas dans la police. Dans ces cinq cas **uniquement**, on tape `iya` pour ne pas laisser de lettres latines au milieu du Mandombe (ex. `tilapia` → `tilapiya`, car PIA n'existe pas). Aucune autre suite ne reçoit `iya`.

Corrections :
- `scripts/mandombe_graphies.py` : les lignes `nkia → nkiya`, `ntshia → nkiya`, `ntshiya → nkiya` deviennent `nkia` (la saisie est `nkia` ; `Ntshia`/`ntshiya` ne sont pas des saisies).
- `scripts/mandombe_typing.py` et `src/lib/mandombeText.ts` : remplacer l'exception « tilapia » par la règle exacte des cinq suites non tapables `(jia|wia|pia|ria|hia) → iya`, minuscules et majuscules.
- Contrôle : passer au shaper (HarfBuzz sur la police du site) toutes les occurrences de `iya` restantes dans le corpus et les couches de saisie ; remettre à leur graphie réelle celles qui ne relèvent pas des cinq cas, et te soumettre la liste avant modification.

## 3. Ama en un seul mot

L'entrée du dictionnaire est `A ma` (fr « ma chère »). Elle devient **`Ama`**, en un seul mot, dans `data/dictionary-entries.json`, avec la même correction partout où la forme séparée apparaît (leçons, corpus, traducteur).

## 4. Mémoire

Ajout de la règle dans la base d'apprentissage Mandombe (`.lovable/memory/grammar/orthography-mandombe-y-double-vowels.md`) :
- si le glyphe existe, on le tape — `iya` n'est jamais un repli ;
- `iya` uniquement pour JIA, WIA, PIA, RIA, HIA, glyphes absents de la police ;
- `nkia` se tape `nkia` ;
- `Ama` s'écrit en un seul mot.

## Détails techniques
- Affichage : `src/index.css`, `src/pages/Dictionary.tsx`, `src/pages/Translator.tsx`.
- Saisie : `scripts/mandombe_graphies.py` (retrait de `nkia → nkiya`), `scripts/mandombe_typing.py`, `src/lib/mandombeText.ts`.
- Données : `data/dictionary-entries.json` (`A ma` → `Ama`).
- Garde-fous : `scripts/dictionary_guards.py` reste vert avant toute clôture.
- **Aucune nouvelle version ODT/PDF du livre ne sera générée.**
