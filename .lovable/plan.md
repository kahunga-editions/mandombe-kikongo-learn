# Dictionnaire v27 — corrections signalées sur la v26

Correctif dérivé de la v26 (aucune reconstruction de la chaîne). Quatre chantiers, tous nommés par toi.

## 1. Gloses inventées ou tronquées

- `Abe yandi ni na?` — la glose « qui est-il vient-il au juste ? » et son pendant anglais « who is he and where does he come from exactly? » sont supprimées. Reste : « Qui est-il au juste ? · Who is he exactly? ». L'entrée doublon `Abe yandi ni na Ambo yandi ni na?` est fusionnée avec elle.
- `A Ma / A ma` — entrée supprimée. Un seul mot : **Ama = ma chère, maat · my dear, maat**. (« lama » venait d'une erreur de ma part sur la dictée, je ne l'ajoute pas.)
- `Badi bari (l). Égume).` — la lettre volée est rendue : **Badi, bari (un légume) — amarante · Amaranth (a vegetable)**.
- Balayage du même défaut ailleurs : toute glose commençant par une minuscule orpheline (`gume`, `erme`, `es gens`…) ou dont la première lettre traîne dans le champ voisin est listée dans un rapport et réparée. Aucune glose n'est réécrite au sens : je répare la casse, je n'invente pas.

## 2. Notes toujours bilingues

95 notes de la v26 n'existent qu'en français ou qu'en anglais (« Voix active ; avec un /a/ long… », « Biaji = millions », « Kanda is the matrilineal clan… »). Chacune est portée au format unique :

```text
Prononcé /baaka/ · EN — Pronounced /baaka/.
Voix active, avec un /a/ long sur la dernière syllabe. · EN — Active voice, with a long /a/ on the last syllable.
```

Les notes héritées mal découpées (points-virgules parasites, « Le ; e ; de ndeko est long ») sont recomposées en phrase propre, puis traduites. Zéro note monolingue à l'arrivée : contrôle bloquant avant génération.

## 3. Format standard des variantes

Règle appliquée partout, virgules et barre composées **en Mandombe** dans le bloc Mandombe :

```text
Baka, tshibaka, kibaka | bibaka
mur(s) · wall(s)
```

- variantes du singulier séparées par des virgules (le point médian actuel disparaît) ;
- barre droite `|` entre le groupe singulier et la forme plurielle ;
- glose marquée `(s)` en français et en anglais dès qu'une forme plurielle figure dans l'entrée.

Le pluriel n'est marqué que lorsqu'il est déjà attesté dans l'entrée (champ pluriel, note « pluriel : … », ou couple de classes déjà enregistré). Aucune forme plurielle n'est déduite. Les entrées où le statut singulier/pluriel est indécidable sont listées dans le rapport et laissées en virgules simples, sans barre, en attente de ton arbitrage.

## 4. Contrôles avant livraison

- audit HarfBuzz : 0 résidu latin dans les champs Mandombe, virgule et barre comprises ;
- 0 note monolingue, 0 glose amputée ;
- rapport de relecture : entrées modifiées, entrées fusionnées, entrées en attente d'arbitrage.

## Détails techniques

- Nouveau script `scripts/build-dictionary-odt-v27.py`, entrée = `dictionnaire-lari-v26.odt`, sortie = `dictionnaire-lari-v27.odt` + `reports/dictionnaire-v27.txt`.
- Les trois index (Lari, français, anglais) sont reconstruits après correction pour que les entrées fusionnées et les gloses réparées y remontent correctement.
- Traduction des notes manquantes via le modèle du gateway, cantonnée à la traduction : aucun contenu nouveau, aucune reformulation du sens.
- La virgule et la barre sont insérées dans le segment de style `MandT` afin d'être rendues par la police Mandombe, comme la ponctuation déjà validée en v23.
- Seule la version trilingue est produite ; la version coréenne sera reconstruite sur la v27 une fois validée.
