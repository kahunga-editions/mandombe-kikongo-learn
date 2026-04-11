

# Corriger la prononciation des hiatus voyelle-voyelle (Bio ≠ Bayo)

## Problème
Le moteur TTS français interprète "Bio" comme /bjo/ ou /bajo/ en insérant un glide /j/ entre les voyelles i et o. En Lari, chaque voyelle est prononcée distinctement : /bi-o/, pas /bjo/.

## Cause
La fonction `lariToFrenchPhonetic` ne gère que le hiatus "kua" → "kou-a". Les séquences comme "io", "ia", "iu", "ie" (après consonne) ne sont pas traitées, ce qui laisse le TTS français fusionner les voyelles avec un glide.

## Solution
Dans `supabase/functions/elevenlabs-tts-lari/index.ts`, ajouter une règle dans `convertWord()` pour insérer un tiret entre deux voyelles consécutives quand la première est "i" ou "u" (les plus sujettes aux glides en français). Cela forcera le moteur TTS à prononcer chaque voyelle séparément.

Exemples de transformations :
- "Bio" → "Bi-o"
- "Bia" → "Bi-a"  
- "Biu" → "Biou" (u→ou déjà géré, mais le hiatus aussi)
- "Dio" → "Di-o"
- "Dia" → "Di-a"

La règle existante "kua" → "kou-a" sera généralisée par ce mécanisme.

## Fichier modifié
- `supabase/functions/elevenlabs-tts-lari/index.ts` — ajouter séparation des hiatus voyelle-voyelle

