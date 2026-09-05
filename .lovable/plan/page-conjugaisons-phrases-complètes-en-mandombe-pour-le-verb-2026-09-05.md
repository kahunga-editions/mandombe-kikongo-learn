# Page Conjugaisons — phrases complètes en Mandombe pour le verbe être

## Ce que vous voyez aujourd'hui

Dans la section « Le verbe être dans tous ses états » de la page Conjugaisons, chaque case n'affiche en Mandombe que la petite forme isolée (« we », « wena », « weri »…). La phrase complète — « Yandi wa toma we. », « Yandi ha zandu ke. » — n'apparaît qu'en lettres latines, en petit, en dessous. C'est l'inverse de ce qu'il faut : c'est la phrase entière qui doit être écrite en Mandombe, comme dans le tableau de la page d'accueil quand on clique sur une forme.

## Correction

1. **Phrase entière en Mandombe.** Pour chaque classe et chaque temps (contracté, présent, passé), afficher la phrase d'exemple complète en Mandombe (« Yandi wa toma we. », « Yandi ha zandu ke. », « Bantu ba toma be. »…), avec en dessous la transcription latine, la traduction française et le bouton d'écoute qui lit la phrase entière. Les données existent déjà dans `src/data/verbeBa.ts` (champs `c_kil` / `f_kil` / `p_kil`) — aucune donnée à créer, c'est uniquement l'affichage qui change dans `src/pages/Conjugations.tsx`.

2. **Forme isolée en regard.** La petite forme (« we », « wena », « weri ») reste visible en clair à côté de l'étiquette du temps, pour qu'on identifie la forme du verbe dans la phrase.

3. **Chevauchement Mandombe / latin.** Ajouter l'espacement vertical nécessaire entre chaque ligne Mandombe et la ligne latine qui la suit (les phrases entières sont plus longues que les formes isolées, donc plus exposées au débordement). Vérification par capture d'écran de la page après correction.

## Ce qui ne change pas

- Aucune donnée du dictionnaire n'est touchée, aucun document (ODT/PDF) n'est régénéré.
- Les autres sections de la page (tables des leçons, séries ni / tu / ka / lu / ba) restent telles quelles.
