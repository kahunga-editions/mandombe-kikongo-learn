

# Mettre à jour la clé ElevenLabs et ajouter les échantillons audio

## Étapes

### 1. Mettre à jour le secret ELEVENLABS_API_KEY
- Demander à l'utilisateur de saisir la nouvelle clé API via le connecteur ElevenLabs (puisque le secret est géré par un connector)

### 2. Copier les 4 fichiers audio uploadés dans le sandbox
- Copier les 4 MP3 depuis `user-uploads://` vers `/tmp/`

### 3. Envoyer les échantillons à la voix clonée
- Appeler l'edge function `elevenlabs-add-samples` avec les 4 fichiers via curl
- Voice ID cible : `rfRMgjypJCXUzWdJfLMs`

### 4. Vérifier les logs
- Consulter les logs de l'edge function pour confirmer le succès

## Note importante
Le secret `ELEVENLABS_API_KEY` est géré par un connector — il faudra le reconnecter via les Connectors pour mettre à jour la clé.

