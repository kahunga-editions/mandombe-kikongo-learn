

# Cloner la voix Lari avec la clé API mise à jour

## Contexte
La clé ElevenLabs a été mise à jour. On peut maintenant retenter le clonage de la voix Lari avec l'enregistrement audio fourni (`Voice_1.1_...mp3`).

## Plan

### 1. Cloner la voix
- Copier le fichier audio uploadé vers le sandbox
- Envoyer le fichier à l'edge function `elevenlabs-clone-voice` existante
- Récupérer le `voice_id` généré

### 2. Configurer le voice ID
- Stocker le nouveau `voice_id` comme secret `LARI_VOICE_ID`

### 3. Mettre à jour la fonction TTS
- **Retirer `language_code: "ln"`** — la voix clonée EST en Lari, pas besoin de forcer le Lingala
- Garder le modèle `eleven_v3` pour la qualité
- La voix clonée gère nativement la prononciation du /ʒ/, des prénasales, des hiatus voyelliques

### 4. Tester
- Appeler la fonction TTS avec "mbote", "mbaji kua", "nkokela" pour valider la prononciation

## Fichier modifié
- **`supabase/functions/elevenlabs-tts-lari/index.ts`** — retirer `language_code: "ln"`

