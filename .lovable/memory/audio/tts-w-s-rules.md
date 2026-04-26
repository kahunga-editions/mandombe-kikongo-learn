---
name: TTS w and s rules
description: Global phonetic rules forcing /w/ as in English "win" (never /v/) and /s/ always voiceless (never /z/) in Lari TTS.
type: feature
---
Two global rules in src/lib/lari-phonetic-engine.ts ELEVENLABS_RULES apply to ALL Lari TTS site-wide (chat, translator, lessons):

1. /w/ → "ou" diphthong, never French /v/:
   - wa→oua, we→ouè, wi→oui, wo→ouo, wu→ouou
   - Applied at word start (\b) AND intervocalic ([aeiou]w_)

2. /s/ → always voiceless /s/, never voiced /z/:
   - Intervocalic s doubled: VsV → VssV (mosi→mossi, kasa→kassa)
