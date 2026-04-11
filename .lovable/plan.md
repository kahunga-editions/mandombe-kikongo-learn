

# Utiliser les enregistrements Lari pour cloner une voix native

## Contexte

Tu as fourni un enregistrement audio en Lari (`Voice_1.1_...mp3`). Au lieu de forcer le modèle à "deviner" le Lari via le Lingala ou le Zulu, on va **cloner ta voix** avec ElevenLabs pour obtenir une voix qui parle réellement Lari. L'edge function `elevenlabs-clone-voice` existe déjà dans le projet.

## Plan

### 1. Cloner la voix avec l'enregistrement fourni
- Copier le fichier audio uploadé et l'envoyer à l'edge function `elevenlabs-clone-voice` qui appelle l'API ElevenLabs `/v1/voices/add`
- Récupérer le `voice_id` généré par ElevenLabs

### 2. Configurer le nouveau voice ID
- Stocker le `voice_id` cloné en tant que secret `LARI_VOICE_ID` pour que l'edge function TTS l'utilise automatiquement

### 3. Mettre à jour l'edge function TTS
- Retirer `language_code: "ln"` — plus besoin de forcer le Lingala puisque la voix clonée EST en Lari
- Garder le modèle `eleven_v3` pour la qualité
- Le G2P continue de fournir le texte phonétique, la voix clonée s'occupera de la prononciation correcte du /ʒ/, des prénasales, etc.

### 4. Tester
- Tester avec "mbote", "mbaji kua", "nkokela" pour vérifier que la voix clonée prononce correctement

## Fichiers modifiés
1. **`supabase/functions/elevenlabs-tts-lari/index.ts`** — retirer `language_code: "ln"`
2. **Secret `LARI_VOICE_ID`** — nouveau voice ID cloné

## Note
Si tu as d'autres enregistrements Lari, on pourra les ajouter pour améliorer la qualité du clonage (ElevenLabs accepte plusieurs fichiers).

