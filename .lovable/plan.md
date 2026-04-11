

# Humaniser la voix TTS avec clonage + réglages optimisés

## Contexte

Le fichier uploadé est un résultat d'Instant Voice Clone ElevenLabs (voix féminine Lari) avec les paramètres : speed=100, stability=50, similarity_boost=75. Tu veux utiliser cet échantillon pour cloner une voix ET appliquer ces réglages au TTS.

## Rappel : problème précédent

Le clonage avait échoué car la clé API ElevenLabs n'avait pas la permission `create_instant_voice_clone` (nécessite un plan Starter ou supérieur). Il faudra d'abord vérifier si la clé actuelle a les permissions.

## Plan

### Étape 1 : Tester le clonage avec le fichier uploadé
- Copier le MP3 uploadé vers `/tmp/`
- Appeler l'edge function `elevenlabs-clone-voice` avec ce fichier + les 2 MP3 natifs précédents
- Si le clonage échoue encore → informer l'utilisateur des permissions nécessaires

### Étape 2 : Ajuster les voice settings du TTS
Mettre à jour `elevenlabs-tts-lari/index.ts` avec les paramètres du fichier :
- `stability: 0.5` (au lieu de 0.65)
- `similarity_boost: 0.75` (au lieu de 0.8)
- `speed: 1.0`
- `style: 0.3` (légèrement plus expressif)

### Étape 3 : Si clonage réussi, stocker le voice_id
- Sauvegarder le `voice_id` cloné comme secret du projet
- Mettre à jour `DEFAULT_VOICE_ID` dans l'edge function pour utiliser la voix clonée

### Étape 4 : Tester la synthèse avec quelques mots
- Appeler le TTS avec "mboka", "ntangu", "lungolobi" pour vérifier la qualité

## Fichiers modifiés
1. **Modifié** : `supabase/functions/elevenlabs-tts-lari/index.ts` — nouveaux voice settings
2. **Potentiellement** : ajout d'un secret `LARI_VOICE_ID` si le clonage réussit

