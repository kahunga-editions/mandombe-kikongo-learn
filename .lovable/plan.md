

# Audio Lingala avec voix Mbilia et ElevenLabs v3

## Problème
L'edge function `elevenlabs-tts-general` utilise le modèle `eleven_multilingual_v2` qui ne supporte pas le Lingala nativement (fallback `fr`). ElevenLabs v3 supporte le Lingala (`lin`) parmi 70+ langues.

## Approche

### Étape 1 : Trouver le voice_id de "Mbilia"
- Créer une edge function temporaire `list-voices` qui appelle `GET https://api.elevenlabs.io/v2/voices?search=Mbilia` avec l'API key du projet
- Appeler cette fonction pour récupérer le `voice_id` exact
- Supprimer la fonction après

### Étape 2 : Mettre à jour `elevenlabs-tts-general`
- Quand `lang === "ln"` : utiliser la voix **Mbilia** (voice_id trouvé à l'étape 1) + modèle `eleven_v3` + `language_code: "lin"`
- Pour les autres langues : garder la voix Sarah + modèle `eleven_multilingual_v2` (inchangé)

### Étape 3 : Stocker le voice_id Mbilia
- Ajouter le voice_id comme secret `MBILIA_VOICE_ID` pour le rendre configurable, ou le coder en dur si stable

### Fichiers modifiés
- `supabase/functions/elevenlabs-tts-general/index.ts` — logique conditionnelle voix/modèle pour Lingala
- Edge function temporaire pour lookup (créée puis supprimée)

### Détail technique
```text
lang === "ln"
  → voice: Mbilia (voice_id from account)
  → model: eleven_v3
  → language_code: "lin"

lang !== "ln"
  → voice: Sarah (EXAVITQu4vr4xnSDxMaL)
  → model: eleven_multilingual_v2
  → language_code: mapping existant
```

