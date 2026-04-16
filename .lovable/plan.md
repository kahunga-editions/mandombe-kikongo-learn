

# Fix STT: supprimer le forçage `language_code: "fra"`

## Problème

Le STT ElevenLabs est codé en dur sur `language_code: "fra"` (ligne 30). Quand l'apprenant parle en Kikongo Lari, le moteur force une interprétation française — d'ou "But", "Bon, t'es bon" au lieu de "Mbote", "Mbote nlongoki".

Kikongo Lari n'est pas dans les langues ISO 639 supportées par ElevenLabs. La meilleure stratégie est de **supprimer le `language_code`** pour laisser l'auto-détection. Scribe v2 en mode auto-detect captera les phonèmes réels sans les forcer dans le moule français.

## Modification

### `supabase/functions/elevenlabs-stt/index.ts`

- **Supprimer** la ligne `apiFormData.append("language_code", "fra");`
- Laisser ElevenLabs en auto-detect (pas de `language_code` = détection automatique)
- Le résultat sera une transcription phonétique approximative que Mbuta Matondo pourra interpréter via le prompt Gemini

Redéployer `elevenlabs-stt`.

## Fichier modifié

| Fichier | Action |
|---|---|
| `supabase/functions/elevenlabs-stt/index.ts` | Supprimer `language_code: "fra"` |

