# Bunkunzu : corriger le Mandombe qui ne suit pas la translittération

## Ce qui se passe

Ce n'est pas un problème d'affichage de la police : dans la v25, l'entrée porte deux
orthographes différentes.

```text
Mandombe : Bunkunju      <- écrit avec « ju »
Lari     : Bunkunzu      <- écrit avec « zu »
```

La faute vient du corpus source (`src/data/lessons.ts`), où le champ `mandombe` a été
saisi avec l'ancienne graphie en « j ». Le document ne fait que recopier ce champ, donc
le glyphe rendu est bien celui de « ju » et non celui de « zu ».

Un audit du document v25 montre 13 entrées touchées par ce même écart z / j :

```text
Bunkunju / Bunkunzu          Budjabu / Budzabu        Budjakata / Budzakata
Budjoki / Budzoki            Budjulu / Budzulu        Djuna / Dzuna
Djuneno / Dzuneno            Kwa djuna / Kwa dzuna    Nzeka wa djuna. / Njeka wa dzuna.
Njo mikanda / Nzo mikanda    Njo mikanda makalaka yi dukisa.
Njo ja bilongo. / Nzo za bilongo.                     Babonso ba kwija. / Babonso ba kwiza.
```

## Ce que je propose

1. Aligner le Mandombe sur la translittération latine pour ces 13 entrées, partout où
   elles apparaissent (leçons, dictionnaire en ligne, traducteur, corpus Mbuta Matondo).
2. Ajouter la règle correspondante au jeu de règles de variantes déjà existant, pour que
   « nju / dju » ne puisse plus réapparaître face à un « nzu / dzu » latin.
3. Ajouter un contrôle QA : toute nouvelle entrée dont le champ Mandombe diffère de la
   translittération autrement que par les transformations autorisées (accents, y -> i,
   ia -> iya, tshio -> kio, apostrophes) est signalée.
4. Régénérer les documents à partir de la v25 corrigée :
   - `dictionnaire-lari-v26.odt` (trilingue)
   - `dictionnaire-lari-ko-vol1-v3.odt` et `-vol2-v3.odt` (version coréenne, deux tomes)
5. Contrôle visuel des pages concernées en PDF avant livraison.

## Détails techniques

- Correction directe dans le XML `content.xml` du v25 pour les spans `MandT` / `MandS`,
  puis relance de `scripts/build-dictionary-odt-v26-ko.py` et de
  `scripts/rebuild-index-iv-en.py` pour la chaîne coréenne — aucune reconstruction
  complète, les acquis validés (ponctuation Mandombe, gloses EN, index) sont préservés.
- Corpus : `src/data/lessons.ts`, `supabase/functions/_shared/dictionary.json`,
  `supabase/functions/_shared/lessons-corpus.ts`,
  `supabase/functions/_shared/mbuta-corpus-v2.json`,
  `supabase/functions/translate-lari/index.ts`.
- Règles : `scripts/lari-variant-rules.json` + contrôle dans `scripts/qa-dictionary-core.ts`.
