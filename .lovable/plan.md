

# Corriger le "te" idéophone : portée TTS + traduction

## Problème
L'override `"te": "teeee"` s'applique à TOUS les "te" du corpus, alors que "te" n'est un idéophone (voyelle longue) que dans ce contexte précis. En lari courant, "te" est un mot normal (conjonction, etc.) qui ne doit pas être allongé.

De plus, la traduction française est inexacte : "te" ici signifie "jusqu'àààà" (il est resté là indéfiniment), pas "immobile".

## Changements

### 1. Retirer l'override global `"te": "teeee"`
Dans les deux fichiers :
- `src/lib/lari-phonetic-engine.ts` (ligne 158) — supprimer `"te": "teeee"`
- `supabase/functions/elevenlabs-tts-lari/index.ts` (ligne 75) — supprimer `"te": "teeee"`

### 2. Écrire la forme longue directement dans la phrase du corpus
Dans `src/data/lessons.ts` (ligne 29786), mettre la voyelle longue dans le champ `lari:` uniquement pour cette phrase :

```
lari: "Ho ka zakale, teeee"
mandombe: "Ho Ka Zakale, Te"
```

Ainsi le TTS reçoit "teeee" uniquement pour cette phrase. Le Mandombe reste avec la graphie courte.

### 3. Corriger la traduction
```
french: "Il est resté là, jusqu'àààà (indéfiniment)"
english: "He stayed there, on and on and on"
```

## Fichiers modifiés
- `src/data/lessons.ts` — 1 ligne (phrase + traduction)
- `src/lib/lari-phonetic-engine.ts` — retirer 1 ligne
- `supabase/functions/elevenlabs-tts-lari/index.ts` — retirer 1 ligne

