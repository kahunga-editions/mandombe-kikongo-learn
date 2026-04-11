

# Ajouter des échantillons de prosodie à la voix clonée

## Contexte
Les 4 fichiers audio uploadés sont des exemples de locuteurs natifs Lari — pas liés aux leçons, mais destinés à enrichir la voix clonée (`rfRMgjypJCXUzWdJfLMs`) avec une meilleure prosodie et intonation.

## Solution
Utiliser l'API ElevenLabs **Edit Voice** (`POST /v1/voices/{voice_id}/edit`) pour ajouter ces échantillons audio à la voix existante. Cela permettra au modèle d'apprendre la prosodie naturelle du Lari à partir de ces enregistrements supplémentaires.

## Plan technique

### 1. Créer une edge function `elevenlabs-add-samples`
- Endpoint : `POST /v1/voices/{voice_id}/edit`
- Reçoit des fichiers audio en multipart form data
- Ajoute les fichiers comme échantillons supplémentaires à la voix clonée existante
- Utilise le voice ID `rfRMgjypJCXUzWdJfLMs` par défaut

### 2. Appeler la fonction avec les 4 fichiers uploadés
- Copier les fichiers uploadés dans le sandbox
- Envoyer les 4 MP3 via curl à l'edge function
- Vérifier que les échantillons sont bien ajoutés

## Fichiers créés/modifiés
- `supabase/functions/elevenlabs-add-samples/index.ts` — nouvelle edge function

