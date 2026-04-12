

# Nouvelles leçons : Expressions quotidiennes et quantités

## Résumé
Créer deux nouvelles leçons à partir du matériel fourni, avec vocabulaire, conjugaisons, phrases, exercices, overrides phonétiques TTS, et intégration automatique au dictionnaire/traducteur.

## Principe strict
- Tous les textes Lari proviennent exclusivement du contenu fourni
- Aucun titre, phrase ou mot Lari inventé
- Utiliser `na` (jamais `ye`) conformément aux contraintes existantes

## Nouvelles leçons

### Leçon 1 — "Zingi na ndambu" (Quantités et négation)
- **id**: `zingi-na-ndambu`
- **titleLari**: `Zingi na ndambu`
- **titleFr**: `Quantités et négation`
- **level**: `intermediate`
- **icon**: `📊`

**Vocabulaire** (~15 entrées) :
zingi, ndambu, fioti, manga, nduku, loso, dia (manger), nua (boire), kani, ninja, hehe, ka (mais), tala (si), ze

**Conjugaisons** (3 tables) :
1. "Manga za jingi ze..." — possession avec ze + pronoms (nani, naku, nandi, neto, neno, nawu)
2. "Ka...na nduku za zingi ko" — négation aux 6 personnes (ka njena, kuena, kena, ka tuena, ka luena, ka bena)
3. "Ndambu loso...didi" — passé composé "manger un peu de riz" aux 6 personnes (ndidi, didi, ka didi, tu didi, lu didi, ba didi)

**Phrases** (~12) :
Toutes les phrases fournies sur les mangues, le riz, la négation, présent et passé de "dia"

**Exercices** (5) :
1. Multiple choice — identifier les traductions des quantités
2. Fill-in-blank — compléter les pronoms possessifs (nani/naku/nandi...)
3. Matching — expressions Lari ↔ traductions françaises
4. Multiple choice — négation (ka...ko)
5. Mandombe recognition — reconnaître zingi, ndambu, manga, loso

### Leçon 2 — "Zeba na djoka" (Se promener et courir)
- **id**: `zeba-na-djoka`
- **titleLari**: `Zeba na djoka`
- **titleFr**: `Se promener et courir`
- **level**: `intermediate`
- **icon**: `🏃`

**Vocabulaire** (~20 entrées) :
zeba, djoka, bandumuna, balumuna, vikuna, ntinu, shika/sika, nsaki, nguri ya, nkati ka, toma, nsadisi, nkanda, moko, waya, buishi, tsha/kia, yila, malaki, matanga, ntsha/ntshangu, ni mu bungu

**Conjugaisons** (2 tables) :
1. "Waya" — vouloir au passé (ngueyi, weyi, ka weyi, tu weyi, lu weyi, ba weyi)
2. "Moko ni ta sukula" — se laver les mains (présent)

**Phrases** (~15) :
Toutes les phrases fournies : muini we ku, tala nsayi, wa nguri ya, nsadisi nkanda, moko ni ta sukula, mankondi nzololo dia, ku nsaba ngueyi kuenda, buishi bu tshele, dia na nua

**Exercices** (5) :
1. Multiple choice — identifier les synonymes (bandumuna/balumuna/vikuna)
2. Fill-in-blank — compléter les conjugaisons de waya
3. Matching — expressions Lari ↔ traductions françaises
4. Multiple choice — questions culturelles (malaki vs matanga)
5. Mandombe recognition — reconnaître zeba, djoka, nsaki, buishi

## Overrides phonétiques TTS

Ajout dans `supabase/functions/elevenlabs-tts-lari/index.ts` :
```typescript
// Specific word overrides (before regex rules)
"ntinu": "ntînou",           // /i:/ long
"djoka": "djôka",
"zeba": "zéba",
"bandumuna": "bandoumouna",
"balumuna": "baloumouna",
"vikuna": "vikouna",
"nsaki": "nsakhi",
"ntshangu": "ntchangou",
"ngueyi": "ngéyi",
"weyi": "wéyi",              // /e:/ long
"buishi": "bouishi",
"fioti": "fioti",
"kani": "kâni",              // /a:/ long
"matanga": "matanga",
"malaki": "malakhi",
```

Approche : ajouter un dictionnaire `PHONETIC_OVERRIDES` en amont des règles regex pour les mots avec indications phonétiques spécifiques (voyelles longues, accents).

## Fichiers modifiés

1. **`src/data/lessons.ts`** — ajout des 2 nouvelles leçons (~600 lignes)
2. **`supabase/functions/elevenlabs-tts-lari/index.ts`** — ajout des overrides phonétiques spécifiques + redéploiement

## Impact automatique
- **Dictionnaire** : ~35 nouvelles entrées vocabulaire + ~27 phrases apparaîtront automatiquement
- **Traducteur** : enrichi par les nouvelles entrées du corpus
- **Audio** : fonctionne via MandombeSpeaker (TTS Lari) + TranslationSpeaker (autres langues)

