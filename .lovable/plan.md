

# Remplacer "Yandi kuvanda ti" par "Ho ka zakale, te"

## Changement dans `src/data/lessons.ts` (ligne 29786)

Remplacer :
```typescript
{ lari: "Yandi kuvanda ti", mandombe: "Yandi Kuvanda Ti", french: "Il s'est assis — immobile", english: "He sat down — completely still" }
```

Par :
```typescript
{ lari: "Ho ka zakale, te", mandombe: "Ho Ka Zakale, Te", french: "Il s'est assis — immobile", english: "He sat down — completely still" }
```

- Graphie Mandombe : `Te` (voyelle simple, pas de doublement)
- Traduction inchangée

## Override TTS pour "te" → voyelle longue

Ajouter dans **deux fichiers** l'override pour que le TTS prononce /teee/ (voyelle longue) :

**`src/lib/lari-phonetic-engine.ts`** — `PHONETIC_OVERRIDES` :
```
"te": "teeee"
```

**`supabase/functions/elevenlabs-tts-lari/index.ts`** — `PHONETIC_OVERRIDES` :
```
"te": "teeee"
```

## Fichiers modifiés
- `src/data/lessons.ts` — 1 ligne
- `src/lib/lari-phonetic-engine.ts` — 1 override ajouté
- `supabase/functions/elevenlabs-tts-lari/index.ts` — 1 override ajouté

