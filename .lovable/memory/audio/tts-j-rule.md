---
name: TTS j rule
description: Lari "j + voyelle" se prononce /ʒ/ (Julien français), jamais /y/ semi-voyelle ni /dʒ/ anglais. Tiret avant ji/ju isolés + overrides mots fréquents (bujitu).
type: feature
---
Règle dans `supabase/functions/elevenlabs-tts-lari/index.ts` :

- Override : `bujitu → bou-ji-tou`, `bujidi → bou-ji-di` (respect / a respecté)
- Règle générale (après `nj → ndj`) : insère un tiret devant `ji`/`ju` isolés sauf après `d` (dj = /dʒ/ voulu) ou `n` (nj prénasalisé déjà géré).
- Régressions à protéger : `mbaji` (override mot complet), `djuna`, `ndjeka`, `mpangi`.

Cause : `eleven_v3` en mode FR glissait sur `ji` comme /yi/ semi-voyelle. Le tiret force la syllabation `bou-ji-tou` lue /buʒitu/.
