---
name: TTS rule — moshi
description: "moshi" (and graphie "mosi") se prononcent /ʃ/ comme « chat » en français — override → "mochi" pour ElevenLabs
type: feature
---
- Mot : `moshi` / `mosi` (ex. *moshi mosi* = un, un seul).
- Son cible : /ʃ/ (français « chat »), pas /s/ ni /tʃ/.
- Implémentation : `PHONETIC_OVERRIDES` dans `src/lib/lari-phonetic-engine.ts` mappe `mosi` et `moshi` → `mochi` avant ElevenLabs. La règle générale `sh → ch` couvre les autres occurrences.
