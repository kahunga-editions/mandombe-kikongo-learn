

# Mettre à jour la clé ElevenLabs et envoyer les échantillons

## Problème
La clé API ElevenLabs stockée dans le projet est l'ancienne, sans permission "Voices Write". La nouvelle clé créée par l'utilisateur n'est pas encore configurée.

## Solution

### 1. Reconnecter le connecteur ElevenLabs
- Utiliser l'outil de reconnexion pour que l'utilisateur puisse saisir sa nouvelle clé API avec la permission Voices
- Cela mettra à jour le secret `ELEVENLABS_API_KEY` automatiquement

### 2. Envoyer les 4 échantillons audio
- Copier les 4 MP3 uploadés dans `/tmp/`
- Appeler l'edge function `elevenlabs-add-samples` via curl avec les 4 fichiers
- Voice ID cible : `rfRMgjypJCXUzWdJfLMs`

### 3. Vérifier le succès
- Consulter les logs de l'edge function pour confirmer que les échantillons ont été ajoutés

