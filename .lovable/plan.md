

# Leçons complètes à partir de "Verbes de survie 1"

## Contenu du PDF

Le PDF contient **14 verbes** conjugués chacun aux **3 temps** (présent progressif, passé composé, futur avec "mbo"). 7 verbes existent déjà dans la leçon `survival-verbs` mais avec 1 seul temps. Il faut :

1. **Enrichir** la leçon existante `survival-verbs` avec les conjugaisons passé + futur manquantes
2. **Créer 3 nouvelles leçons** pour les 7 nouveaux verbes

## Verbes existants à enrichir (leçon `survival-verbs`)

Ajouter les conjugaisons manquantes (passé + futur) pour : Ba, Sa, Dia, Nua, Lenda, Bonga, Zaba.

| Verbe | Passé | Futur |
|-------|-------|-------|
| Ba | mbele, bele, ka bele, tu bele, lu bele, ba bele | mbo ni ba, mbo ba, mbo ka ba, mbo tu ba, mbo lu ba, mbo ba ba |
| Sa | ntshiri, shiri, shiri, tu shiri, lu shiri, ba shiri | mbo ni sa, mbo sa, mbo ka sa, mbo tu sa, mbo lu sa, mbo ba sa |
| Dia | ndidi, didi, didi, tu didi, lu didi, ba didi | mbo ni dia, mbo dia, mbo ka dia, mbo tu dia, mbo lu dia, mbo ba dia |
| Nua | nuini×3, tu nuini, lu nuini, ba nuini | mbo ni nua, mbo nua, mbo ka nua, mbo tu nua, mbo lu nua, mbo ba nua |
| Lenda | na lendi, wa lendi×2, tua lendi, lua lendi, ba lendi | mbo ni lenda, mbo lenda, mbo ka lenda, mbo tu lenda, mbo lu lenda, mbo ba lenda |
| Bonga (présent manquant) | — déjà en passé — | mbo ni bonga ... mbo ba bonga |
| Zaba | na zebi, wa zebi×2, tua zebi, lua zebi, ba zebi | mbo ni zaba ... mbo ba zaba |

Ajouter aussi le **présent** de Bonga : ni ta bonga, ta bonga, ka ta bonga, tu ta bonga, lu ta bonga, ba ta bonga.

## 3 nouvelles leçons

### Leçon 1 : `survival-verbs-2` — Kwiza, Banza, Futa
**Titre** : "Kwiza, Banza, Futa" (pas de titre inventé en Lari)

- **Kwiza** (venir) : présent (mwizu ni ta kwiza...), passé (njijiri, wijiri, wi:jiri, tuijiri, luijiri, bi:jiri), futur (mbo ni kuiza...)
- **Banza** (penser) : présent (ni ta banza...), passé (mbendji, bendji...), futur (mbo ni ba:nza...)
- **Futa** (payer) : présent (ni ta futa...), passé (mfutiri, futiri...), futur (mbo ni futa...)
- **Vocabulaire** : 3 entrées (kwiza, banza, futa)
- **Exercices** : 3 multiple-choice, 2 matching, 1 fill-in-blank, 1 mandombe-recognition (8 items)

### Leçon 2 : `survival-verbs-3` — Wa, Mona, Zola
**Titre** : "Wa, Mona, Zola"

- **Wa** (sentir/entendre) : "nsunga ni ta wa" (sentir une odeur), "tshioji ni ta mona" (sentir le froid), "tiya ni ta mona" (sentir la chaleur), passé (tiya mwini...)
- **Mona** (voir) : présent (ni ta mona...), passé (muini...), futur (mbo ni mona...)
- **Zola** (aimer/vouloir) : présent (nzololo, zololo...), passé (na zolo, wa zolo...), futur (mbo ni zolo...)
- **Vocabulaire** : nsunga (odeur), tshioji (froid), tiya (chaleur), nsatu (faim), mona (voir), zola (aimer/vouloir)
- **Syntaxe** : bloc montrant les 3 usages de "sentir" (odeur, froid, chaleur, faim)
- **Exercices** : 3 multiple-choice, 2 matching, 1 fill-in-blank, 1 mandombe-recognition (8 items)

### Leçon 3 : `survival-verbs-4` — Hana musua, Sala
**Titre** : "Hana musua, Sala"

- **Hana musua** (permettre) : présent (musua ni ta hana...), passé (musua ngeni, musua heni...), futur (mbo ni hana musua...)
- **Sala** (travailler) : présent (ni ta sala...), passé (nsaridi, saridi...), futur non présent dans le PDF (les 50 pages s'arrêtent après le passé)
- **Vocabulaire** : hana (donner), musua (permission), sala (travailler/fabriquer)
- **Exercices** : 3 multiple-choice, 2 matching, 1 fill-in-blank, 1 mandombe-recognition (8 items)

### Structure de chaque exercice mandombe-recognition

8 items par leçon, mode `glyph-to-latin`, 3 distracteurs par item choisis parmi les autres verbes du curriculum.

## Détails techniques

- **Fichier modifié** : `src/data/lessons.ts`
- **Ajouts à `survival-verbs`** : ~14 nouvelles entrées `conjugations` (passé/futur pour 7 verbes) + présent de bonga
- **3 nouvelles leçons** : ~300 lignes chacune (conjugaisons + vocabulaire + exercices)
- **Volume total** : ~1000 lignes ajoutées

