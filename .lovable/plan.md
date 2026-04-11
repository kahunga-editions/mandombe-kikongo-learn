

# Mettre à jour la clé ElevenLabs et envoyer les échantillons

## Problème actuel
Le flux de reconnexion du connecteur ElevenLabs ne fonctionne pas correctement. L'utilisateur a sa nouvelle clé API avec la permission "Voices Write" et souhaite la fournir directement.

## Solution alternative
Puisque le secret `ELEVENLABS_API_KEY` est géré par un connecteur, on ne peut pas le remplacer via l'outil `add_secret`. Mais on peut contourner cela en stockant la nouvelle clé sous un **nom différent** (ex: `ELEVENLABS_VOICES_KEY`) et modifier l'edge function `elevenlabs-add-samples` pour utiliser ce nouveau secret.

## Étapes

### 1. Demander la clé API à l'utilisateur
- Utiliser l'outil `add_secret` pour créer un nouveau secret `ELEVENLABS_VOICES_KEY` avec la clé qui a la permission Voices Write

### 2. Modifier l'edge function `elevenlabs-add-samples`
- Changer la variable d'environnement utilisée : `ELEVENLABS_VOICES_KEY` au lieu de `ELEVENLABS_API_KEY`

### 3. Déployer et envoyer les 4 échantillons audio
- Copier les 4 MP3 uploadés dans `/tmp/`
- Appeler l'edge function via curl avec les 4 fichiers
- Voice ID cible : `rfRMgjypJCXUzWdJfLMs`

### 4. Vérifier le succès
- Consulter les logs pour confirmer que les échantillons ont été ajoutés

## Fichiers modifiés
- `supabase/functions/elevenlabs-add-samples/index.ts` — utiliser le nouveau secret

