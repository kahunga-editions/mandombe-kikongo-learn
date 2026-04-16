

# Fix: prononciation de "nge" dans le TTS Lari

## Problème

L'override mot-par-mot `"nge": "ngue"` (ligne 76 de `elevenlabs-tts-lari/index.ts`) force ElevenLabs à prononcer "ngu-e" en deux syllabes — ce qui ne ressemble pas au Lari.

La règle regex existante `nge → nghe` (ligne 115) fait déjà le travail correctement : le "h" après le "g" force le G dur sans ajouter de voyelle parasite.

## Solution

Supprimer l'override `"nge": "ngue"` des deux fichiers où il apparaît :

| Fichier | Action |
|---|---|
| `supabase/functions/elevenlabs-tts-lari/index.ts` | Supprimer ligne 76 : `"nge": "ngue"` |
| `src/lib/lari-phonetic-engine.ts` | Vérifier et supprimer si le même override existe |

La règle regex `nge → nghe` continuera à s'appliquer automatiquement et produira le G dur correct (comme dans "ngo").

Redéployer `elevenlabs-tts-lari`.

