

# Idéophones : retirer les voyelles doubles + ajuster TTS

## Changements dans `src/data/lessons.ts`

### Graphie (champs `lari` et `mandombe`)
Retirer les voyelles doubles partout dans la leçon idéophones :

| Avant | Après (lari) | Après (mandombe) |
|-------|-------------|-------------------|
| piii | pi | Pi |
| fyuu | fyu | Fyu |
| nyee | nye | Nye |
| tii | ti | Ti |
| waa | wa | Wa |
| tsiii | nsi | Nsi |

Note : `tsiii` → `nsi` en graphie, mais prononcé /tsii/ (voir TTS ci-dessous).

Ces remplacements s'appliquent dans :
- `vocabulary` (6 entrées, lignes 29741-29748)
- `syntax` explanations et examples (lignes 29762-29789)
- `exercises` : questions, options, pairs, distractors, blanks (lignes 29794-29843)

### TTS (prononciations longues)

Ajouter des overrides dans **deux fichiers** pour que le moteur TTS prononce les voyelles longues :

**`src/lib/lari-phonetic-engine.ts`** — `PHONETIC_OVERRIDES` :
```
"pi": "pii",
"fyu": "fyuu",
"nye": "nyee",
"ti": "tii",
"wa": "waa",
"nsi": "tsii"   // graphie nsi, prononciation /tsii/
```

**`supabase/functions/elevenlabs-tts-lari/index.ts`** — `PHONETIC_OVERRIDES` :
```
"pi": "pii",
"fyu": "fyuu",
"nye": "nyee",
"ti": "tii",
"wa": "waa",
"nsi": "tsii"
```

## Fichiers modifiés
- `src/data/lessons.ts` — ~40 occurrences à mettre à jour
- `src/lib/lari-phonetic-engine.ts` — 6 overrides ajoutés
- `supabase/functions/elevenlabs-tts-lari/index.ts` — 6 overrides ajoutés

