

# Corriger l'erreur de build + Ajouter la conjugaison du verbe "BA=" (être)

## Problème de build

4 blocs `mandombe-recognition` sont insérés **en dehors** du tableau `exercises`, juste après la fermeture `],` du tableau `vocabulary`. Ils flottent entre `vocabulary` et `exercises`, ce qui casse la syntaxe TypeScript.

**Lignes concernées** : 12698-12713, 18227-18242, 18402-18417, 18453-18468

**Correction** : Pour chaque bloc, le déplacer à l'intérieur du `exercises: []` qui suit (transformer `exercises: []` en `exercises: [{ ... le bloc ... }]`), et supprimer le bloc de son emplacement incorrect.

## Ajout du contenu "BA=" — Le verbe être en Kilari

Le fichier HTML uploadé contient un tableau interactif de conjugaison du verbe "être" (BA=) en Kilari avec 15 classes nominales × 3 temps (Présent contracté, Présent plein, Passé), avec exemples (kifuani) et rendus Mandombe.

### Ce qui sera créé

1. **Nouvelle page `/verbe-ba`** — `src/pages/VerbeBa.tsx`
   - Tableau de conjugaison interactif reproduisant le contenu HTML
   - 15 lignes (yandi, bantu, lumbembemba, tumbembemba, mapapa, buishi, binzu, papa, kinzu, mbua sg, mbua pl, milumba, kulu, huma)
   - 3 colonnes de temps avec glyphes Mandombe cliquables
   - Modal avec détails : pronom, forme latine, traduction, kifuani (phrase Mandombe + transcription + traduction française)
   - Légende couleur : Présent contracté (doré), Présent plein (vert), Passé (bleu)

2. **Route ajoutée** dans `src/App.tsx` — `/verbe-ba`

3. **Lien de navigation** dans le Navbar ou la page Lessons pour accéder à cette conjugaison

### Données extraites du HTML (15 entrées)

Chaque entrée contient : classe nominale, forme contractée/pleine/passée, traductions, et exemples kifuani en Mandombe + Latin + Français.

## Fichiers modifiés

- `src/data/lessons.ts` — correction des 4 blocs mal placés
- `src/pages/VerbeBa.tsx` — nouvelle page de conjugaison interactive
- `src/App.tsx` — ajout de la route `/verbe-ba`

