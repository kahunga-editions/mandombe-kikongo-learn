

# Ajouter la voix et l'écoute en temps réel à Mbuta Matondo

## Résumé
Donner à Mbuta Matondo la capacité de **parler** (TTS avec la voix clonée Lari) et **écouter** (Speech-to-Text en temps réel) l'utilisateur, créant une expérience de conversation vocale immersive.

## Architecture

```text
┌─────────────────────────────────────┐
│       MbutaMatondoChat.tsx          │
│                                     │
│  [🎤 Micro]  [textarea]  [Send]    │
│                                     │
│  Assistant bubble + 🔊 bouton TTS  │
└──────┬──────────────┬───────────────┘
       │              │
  STT (micro)    TTS (réponse)
       │              │
       ▼              ▼
  Edge Function   Edge Function
  elevenlabs-     elevenlabs-
  stt             tts-lari
  (batch)         (voix clonée)
```

## Étapes

### 1. Créer l'edge function `elevenlabs-stt` (Speech-to-Text)
- Fichier : `supabase/functions/elevenlabs-stt/index.ts`
- Reçoit un fichier audio (FormData) depuis le navigateur
- Appelle l'API ElevenLabs batch STT (`scribe_v2`) avec `language_code: "fra"`
- Retourne le texte transcrit en JSON
- Le secret `ELEVENLABS_API_KEY` est déjà configuré

### 2. Ajouter un bouton TTS sur chaque réponse de Mbuta Matondo
- Dans `MbutaMatondoChat.tsx`, ajouter un bouton `Volume2` sur chaque bulle assistant
- Au clic, appeler `elevenlabs-tts-lari` avec le contenu texte (en strippant le Markdown)
- Utiliser la voix clonée existante (`LARI_VOICE_ID = rfRMgjypJCXUzWdJfLMs`)
- Cache audio en mémoire pour éviter les appels répétés

### 3. Ajouter un bouton microphone pour dicter les messages
- Dans la zone de saisie, ajouter un bouton `Mic` à côté du bouton Send
- Au clic : enregistrer l'audio du micro via `MediaRecorder` API
- Au relâchement / stop : envoyer le blob audio à `elevenlabs-stt`
- Injecter le texte transcrit dans le champ de saisie
- Feedback visuel : animation pulsante rouge pendant l'enregistrement

### 4. Option "lecture automatique" des réponses
- Ajouter un toggle `autoSpeak` dans le header du chat
- Quand activé, chaque nouvelle réponse complète est automatiquement lue via TTS
- Désactivé par défaut

### 5. Traductions UI
- Ajouter dans `LanguageContext.tsx` les clés : `mbuta.speak`, `mbuta.listening`, `mbuta.autoSpeak`, `mbuta.recordHint` (FR/EN/PT)

## Fichiers créés/modifiés

| Fichier | Action |
|---------|--------|
| `supabase/functions/elevenlabs-stt/index.ts` | Créer — transcription audio |
| `src/components/MbutaMatondoChat.tsx` | Modifier — boutons TTS + micro + auto-speak |
| `src/contexts/LanguageContext.tsx` | Modifier — nouvelles traductions |

## Détails techniques
- STT utilise le modèle `scribe_v2` d'ElevenLabs (batch, pas realtime) — plus simple et suffisant pour des messages courts
- TTS réutilise l'infrastructure `elevenlabs-tts-lari` existante avec la voix clonée
- L'enregistrement micro utilise `MediaRecorder` natif du navigateur (pas de dépendance supplémentaire)
- Le format d'enregistrement sera `audio/webm` (supporté par tous les navigateurs modernes et par ElevenLabs)

