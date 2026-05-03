---
name: TTS djuna rule
description: "Djuna" (fatigue) pronounced /dzuna/ — affricate /dz/ + French "ou". Override "djuna → dzouna" in both phonetic engines.
type: feature
---
In `src/lib/lari-phonetic-engine.ts` and `supabase/functions/elevenlabs-tts-lari/index.ts`:

- `djuna → dzouna` (and capital `Djuna`, conjugated `djunidi`, `djunini`)
- Reason: ElevenLabs FR was reading "dj" as English /dʒ/ (jungle); the target Lari sound is /dz/ (affricate dental).
