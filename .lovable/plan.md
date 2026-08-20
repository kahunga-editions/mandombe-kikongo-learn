# Mandombe : ne corriger que ce qui n'est pas typable

## Test réalisé avant toute modification

Les 13 entrées ont été rendues avec la vraie police Mandombe (moteur de rendu du site),
graphie actuelle à gauche, graphie latine à droite. Résultat :

```text
nz  -> se tape entièrement en Mandombe        (Nzo, Bunkunzu : glyphes purs)
nj  -> laisse un « n » latin parasite         (Njo, Bunkunju : n + jo)
dz  -> laisse un « d » latin parasite         (Budzabu : d + zabu)
dj  -> se tape entièrement en Mandombe        (Budjabu, Djuna : glyphes purs)
z / j entre voyelles -> les deux se tapent    (kwiza / kwija : glyphes purs)
```

## Règle appliquée

On change le Mandombe **uniquement** quand la graphie actuelle ne peut pas être tapée
(lettre latine résiduelle). Quand elle se tape, on la garde telle quelle.

### À corriger (le « nj » actuel laisse un n latin)

```text
Bunkunju            -> Bunkunzu
Njo mikanda         -> Nzo mikanda
Njo ja bilongo      -> Nzo za bilongo
Njo mikanda makalaka yi dukisa -> Nzo mikanda makalaka yi dukisa
Njeka wa djuna      -> Nzeka wa djuna   (seul le Nj initial change)
Babonso ba kwija    -> Babonso ba kwiza (les deux se tapent, on suit le latin)
```

### À ne PAS toucher (dz intypable, dj correct)

```text
Budjabu  Budjakata  Budjoki  Budjulu  Djuna  Djuneno  Kwa djuna  wa djuna
```

## Ce que je fais ensuite

1. Appliquer ces 6 corrections dans le corpus (leçons, dictionnaire en ligne, traducteur,
   corpus Mbuta Matondo) et dans le XML de la v25.
2. Ajouter la règle « nj initial -> nz » aux règles de variantes, en excluant
   explicitement `dj`, qui reste la seule graphie typable pour le son /dz/.
3. Ajouter un contrôle QA : signaler toute valeur Mandombe contenant une lettre latine
   résiduelle après rendu (n, d, f isolés), au lieu de comparer bêtement au latin.
4. Régénérer `dictionnaire-lari-v26.odt` (trilingue) puis
   `dictionnaire-lari-ko-vol1-v3.odt` / `-vol2-v3.odt`, sans reconstruction complète.
5. Contrôle visuel des pages concernées avant livraison.

## Détails techniques

- Rendu de contrôle via Chromium + `public/fonts/masono_mandombe-webfont.ttf` (les
  ligatures Mandombe passent par OpenType, un rendu PIL ne les déclenche pas).
- Fichiers : `src/data/lessons.ts`, `supabase/functions/_shared/dictionary.json`,
  `supabase/functions/_shared/lessons-corpus.ts`,
  `supabase/functions/_shared/mbuta-corpus-v2.json`,
  `supabase/functions/translate-lari/index.ts`.
- Règles : `scripts/lari-variant-rules.json`, contrôle dans `scripts/qa-dictionary-core.ts`.
- Chaîne ODT : correction des spans `MandT` / `MandS` du `content.xml` v25, puis
  `scripts/rebuild-index-iv-en.py` et `scripts/build-dictionary-odt-v26-ko.py`.
