---
name: TTS mbaji rule
description: "Mbaji" pronounced /mbaʒi/ — soft "j" like French "Julien" (NOT /g/ hard, NOT /dʒ/ English "j"). Override keeps spelling "ji" so French TTS reads it as /ʒi/.
type: feature
---
In both `src/lib/lari-phonetic-engine.ts` and `supabase/functions/elevenlabs-tts-lari/index.ts`:

- Override `"mbaji" → "mbaji"` (no transformation; previously was `"mbagi"` which produced a hard /g/).
- Reason: in French phonology, "j" + vowel = /ʒ/ guaranteed. The earlier mapping to "gi" risked /g/ dur (e.g. "mba-gi") instead of the intended Julien-style /ʒi/.
- Applies to all derivatives: "Mbaji", "muna mbaji", "Mazuji na Mbaji", etc. (the override matches the bare token "mbaji"; surrounding text keeps natural French rendering).
