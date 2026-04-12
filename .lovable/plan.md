

# Voix coréenne dédiée pour le TTS

## Changement
Ajouter un routage spécifique pour le coréen (`ko`) dans `elevenlabs-tts-general/index.ts`, utilisant la voix `KlstlYt9VVf3zgie2Oht` au lieu de Sarah.

## Détail technique

**Fichier** : `supabase/functions/elevenlabs-tts-general/index.ts`

- Ajouter une constante `KOREAN_VOICE_ID = "KlstlYt9VVf3zgie2Oht"`
- Modifier la sélection de voix : Lingala → Mbilia, Coréen → voix dédiée, autres → Sarah
- Le modèle reste `eleven_multilingual_v2` pour le coréen (comme les autres langues non-Lingala)

```text
lang === "ln"  → Mbilia + eleven_v3
lang === "ko"  → KlstlYt9VVf3zgie2Oht + eleven_multilingual_v2
autres         → Sarah + eleven_multilingual_v2
```

Un seul fichier modifié, ~3 lignes changées.

