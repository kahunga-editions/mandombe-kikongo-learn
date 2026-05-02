---
name: TTS sh rule
description: Global rule mapping "sh" + vowel to French "ch" (/ʃ/) in Lari TTS, never English /tʃ/. Preserves "tsh" cluster (= /tʃ/ intended). Applies to shama (aller), shemi (je vais).
type: feature
---
Global phonetic rule in BOTH `src/lib/lari-phonetic-engine.ts` and `supabase/functions/elevenlabs-tts-lari/index.ts`:

- Pattern: `(^|[^t])sh([aeiouAEIOU])` → `$1ch$2`
- Reason: ElevenLabs (FR mode) sometimes reads "sh" as English /tʃ/ (church). French "ch" guarantees /ʃ/ (chat).
- Negative lookbehind via `[^t]` so the cluster `tsh` (= /tʃ/ wanted, e.g. tshibuka) is preserved.
- Word overrides also added: `shama → chama` (/ʃama/, infinitive "to go"), `shemi → chémi` (/ʃɛmi/, "I am going").

Orthography rule for the corpus: write `sh` (never `ch`) for the /ʃ/ phoneme — the TTS engine handles the conversion.
