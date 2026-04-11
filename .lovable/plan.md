

# Tester le Voice Cloning ElevenLabs avec les échantillons Lari

## Contexte

Tu as fourni 2 fichiers MP3 natifs ("lungolobi") et 2 vidéos. L'objectif est de cloner une voix Lari via ElevenLabs pour ensuite générer de la synthèse vocale sur les mots du dictionnaire.

## Prérequis

1. **Connecter ElevenLabs** — Le connecteur ElevenLabs est disponible mais pas encore lié au projet. Je vais le connecter pour obtenir la clé API automatiquement.

2. **Préparer les échantillons audio** — Les 2 MP3 seront utilisés comme échantillons pour le cloning. Les vidéos pourront être converties en audio si besoin de plus d'échantillons.

## Plan d'implémentation

### Étape 1 : Connecter ElevenLabs
Utiliser le connecteur ElevenLabs pour lier une clé API au projet.

### Étape 2 : Créer une edge function `elevenlabs-clone-voice`
- Accepte des fichiers audio en upload
- Appelle l'API ElevenLabs `POST /v1/voices/add` pour créer une voix clonée ("Lari Native Speaker")
- Retourne le `voice_id` de la voix clonée

### Étape 3 : Créer une edge function `elevenlabs-tts-lari`
- Accepte un mot/phrase Lari en entrée
- Utilise la voix clonée + modèle `eleven_multilingual_v2` pour générer l'audio
- Retourne le MP3

### Étape 4 : Tester le cloning via un script
- Uploader les 2 MP3 vers l'API ElevenLabs pour créer la voix clonée
- Tester la synthèse avec quelques mots Lari (ex: "mboka", "ntangu", "lungolobi")
- Évaluer la qualité avant d'intégrer dans l'app

### Étape 5 (si qualité OK) : Intégrer dans l'app
- Ajouter un composant `MandombeSpeaker` qui appelle `elevenlabs-tts-lari` au clic
- Intégrer dans le dictionnaire et les leçons

## Détails techniques

- L'API de cloning ElevenLabs supporte l'**Instant Voice Cloning** avec aussi peu que 1 minute d'audio
- Le modèle `eleven_multilingual_v2` supporte 29 langues — même si le Lari n'est pas officiellement listé, les phonèmes proches du français/portugais devraient donner des résultats exploitables
- Les 2 MP3 seront envoyés via `multipart/form-data` à l'endpoint `/v1/voices/add`
- Le `voice_id` sera stocké comme secret pour être réutilisé par la TTS

## Limites connues

- La qualité dépendra fortement des échantillons (clarté, bruit de fond, variété phonétique)
- Le Lari n'étant pas un langue supportée nativement, certaines prononciations pourraient être approximatives
- C'est un test expérimental — on évaluera la qualité avant de décider de l'intégration

