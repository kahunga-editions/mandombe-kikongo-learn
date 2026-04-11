

# Configurer la voix Lari clonée et nettoyer le TTS

## Contexte
L'utilisateur fournit le voice ID `rfRMgjypJCXUzWdJfLMs` d'une voix Lari clonée sur ElevenLabs. Il faut maintenant configurer le système pour l'utiliser et retirer toutes les approximations Lingala.

## Plan

### 1. Stocker le voice ID comme secret
- Ajouter/mettre à jour le secret `LARI_VOICE_ID` avec la valeur `rfRMgjypJCXUzWdJfLMs`

### 2. Mettre à jour l'edge function TTS (`supabase/functions/elevenlabs-tts-lari/index.ts`)
- Retirer `language_code: "ln"` du body envoyé à ElevenLabs (la voix clonée EST en Lari)
- Retirer aussi le `language_code` du fallback v2
- Garder le modèle `eleven_v3` et les voice settings actuels

### 3. Mettre à jour le client (`src/components/MandombeSpeaker.tsx`)
- Envoyer `lariText` directement au TTS au lieu de `lariToBantu(lariText)`
- Garder `lariToIpa()` pour le tooltip IPA uniquement

### 4. Tester
- Appeler la fonction TTS avec "mbote", "mbaji kua" pour valider la prononciation native

## Fichiers modifiés
- `supabase/functions/elevenlabs-tts-lari/index.ts`
- `src/components/MandombeSpeaker.tsx`
- Secret `LARI_VOICE_ID`

