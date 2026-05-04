---
name: TTS Zingi Rule
description: Force hard-G pronunciation for "zingi" family (mbote za zingi). Override applied in elevenlabs-tts-lari.
type: feature
---
"zingi" se prononce /zin-ghi/ (G dur), pas /zinji/.

Overrides ajoutés dans `supabase/functions/elevenlabs-tts-lari/index.ts` (avant la règle générale `ngi → nghi`) :
- `zingi` → `zin-ghi`
- `nzingi` → `nzin-ghi`
- `bizingi` → `bi-zin-ghi`

Cas typique : « Mbote za zingi » (bonne santé / longue vie).
