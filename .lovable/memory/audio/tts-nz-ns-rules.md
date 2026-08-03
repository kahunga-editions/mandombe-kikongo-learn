---
name: TTS nz / ns rules
description: nz et ns ne sont PAS des règles systématiques — prononciation mot par mot (nzila /nzila/ ou /ndjila/, nsoneka /tsoneka/)
type: feature
---
- `nz` : `nzila` peut se prononcer /nzila/ **ou** /ndjila/ — les deux sont admis. Ce n'est PAS
  vrai pour tous les mots : d'autres mots en `nz` gardent /nz/.
- `ns` : `nsoneka` (écrire) se prononce /tsoneka/, mais ailleurs `ns` se prononce souvent /ns/.
- Conséquence : ne JAMAIS ajouter de règle globale nz→ndj ou ns→ts dans le moteur phonétique
  ni dans `elevenlabs-tts-lari`. Uniquement des overrides mot par mot.
- Le livre (ODT/PDF) documente ces deux nuances dans la section « Prononciation ».
