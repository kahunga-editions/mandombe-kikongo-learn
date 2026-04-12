

# Audio pour chaque langue de traduction

## Résumé
Ajouter un bouton audio à côté de chaque texte traduit (FR, EN, PT, ES, IT, LN, EL, KO) dans les leçons et le dictionnaire, en utilisant ElevenLabs avec une voix standard multilingue.

## Approche technique

### 1. Nouvelle edge function `elevenlabs-tts-general` 
- Accepte `{ text, lang }` (code langue : fr, en, pt, es, it, ln, el, ko)
- Mappe chaque code vers le `language_code` ElevenLabs correspondant (fr, en, pt, es, it, fr, el, ko — Lingala n'est pas supporté nativement, on utilisera `fr` comme fallback)
- Utilise une voix standard multilingue (ex: Sarah `EXAVITQu4vr4xnSDxMaL`) avec le modèle `eleven_multilingual_v2`
- Retourne le base64 audio comme l'edge function Lari existante

### 2. Nouveau composant `TranslationSpeaker.tsx`
- Props : `text: string`, `lang: string`, `className?: string`
- Même logique que `MandombeSpeaker` (cache en mémoire, loading state, bouton Volume2)
- Appelle `elevenlabs-tts-general` au lieu de `elevenlabs-tts-lari`
- Pas de tooltip IPA (réservé au Lari)

### 3. Intégration dans `LessonDetail.tsx`
- **Vocabulaire** : ajouter `<TranslationSpeaker>` à côté du texte traduit (flag + traduction)
- **Syntaxe** : idem pour chaque exemple traduit
- **Conjugaisons** : idem pour les significations
- **Phrases clés** : idem

### 4. Intégration dans `Dictionary.tsx`
- Ajouter `<TranslationSpeaker>` à côté de la traduction affichée

### 5. Intégration dans les exercices
- `MultipleChoice`, `FillInBlank` : ajouter l'audio à côté du texte Lingala quand le mode comparatif est activé

## Mapping des langues ElevenLabs
| App | ElevenLabs `language_code` |
|-----|---------------------------|
| fr  | fr |
| en  | en |
| pt  | pt |
| es  | es |
| it  | it |
| ln  | fr (fallback) |
| el  | el |
| ko  | ko |

## Fichiers modifiés
- `supabase/functions/elevenlabs-tts-general/index.ts` (nouveau)
- `src/components/TranslationSpeaker.tsx` (nouveau)
- `src/pages/LessonDetail.tsx`
- `src/pages/Dictionary.tsx`
- `src/components/exercises/MultipleChoice.tsx`
- `src/components/exercises/FillInBlank.tsx`

