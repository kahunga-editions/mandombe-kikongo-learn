# Zéro lettre latine dans le Mandombe

## Test réalisé avant toute modification

Chaque groupe de lettres a été rendu avec la vraie police Mandombe (moteur du site,
ligatures OpenType). Résultat mesuré :

```text
Se tapent proprement (100 % glyphes) :
  nz  dj  ns  nt  nk  ng  nd  mb  mp  mv  mf  sh  tsh  ki  ni  ny
  bw  kw  mw  nw  sw  tw  zw  ch  b d f g h j k l m n p r s t v w y z

Laissent une lettre latine visible :
  nj -> n     dz -> d     ndz -> nd   ndj -> n    nsh -> n
  ts -> t     ky -> k     kp -> k     nzw -> n    fy -> f
  ph -> p     th -> t     c -> c      q -> q      x -> flèche
```

## Règle appliquée

Aucune lettre latine résiduelle nulle part. Chaque graphie non typable est remplacée par
la graphie typable qui rend le même son :

```text
nj  -> nz        (Njo -> Nzo, Bunkunju -> Bunkunzu)
dz  -> dj        (Budzabu -> Budjabu, Dzuna -> Djuna)
ndz -> ndj? non typable non plus -> nz ou dj selon le mot
nsh -> nsh non typable -> ns + sh scindé, ou nk selon le mot
ts  -> tsh       (tsa -> tsha)
ky  -> ki        fy -> fi        kp -> k       c -> k
ph  -> p         th -> t         q -> kw       x -> ks
```

Les 13 entrées de l'audit initial se répartissent ainsi : les six formes en `Nj`
(Bunkunju, Njo mikanda, Njo ja bilongo, Njo mikanda makalaka yi dukisa, Njeka, kwija)
passent en `Nz` ; les formes en `dj` (Budjabu, Budjakata, Budjoki, Budjulu, Djuna,
Djuneno, Kwa djuna) restent telles quelles car elles se tapent déjà proprement — c'est
`dz` qui est intypable, pas `dj`.

## Ce que je fais

1. Audit automatique de **tous** les champs Mandombe (leçons, dictionnaire, traducteur,
   corpus Mbuta Matondo, et tous les spans Mandombe du document v25) : rendu headless
   avec la police, détection pixel/glyphe de toute lettre latine restante.
2. Correction de chaque cas détecté selon la table ci-dessus ; les cas ambigus
   (`ndz`, `nsh`) me sont listés mot par mot pour validation avant application.
3. Ajout d'un contrôle QA bloquant : toute valeur Mandombe contenant un groupe non
   typable est refusée à l'écriture.
4. Régénération de `dictionnaire-lari-v26.odt` (trilingue) puis
   `dictionnaire-lari-ko-vol1-v3.odt` / `-vol2-v3.odt`, sans reconstruction complète.
5. Contrôle visuel final : zéro lettre latine dans les pages Mandombe.

## Détails techniques

- Sonde de rendu : Chromium + `public/fonts/masono_mandombe-webfont.ttf` ; un groupe est
  déclaré typable si aucun glyphe latin n'apparaît dans le rendu.
- Fichiers corpus : `src/data/lessons.ts`,
  `supabase/functions/_shared/dictionary.json`,
  `supabase/functions/_shared/lessons-corpus.ts`,
  `supabase/functions/_shared/mbuta-corpus-v2.json`,
  `supabase/functions/translate-lari/index.ts`.
- Règles et QA : `scripts/lari-variant-rules.json`, `scripts/qa-dictionary-core.ts`,
  fonction `cleanMandombe` côté site.
- Chaîne ODT : correction des spans `MandT` / `MandS` du `content.xml` v25, puis
  `scripts/rebuild-index-iv-en.py` et `scripts/build-dictionary-odt-v26-ko.py`.
