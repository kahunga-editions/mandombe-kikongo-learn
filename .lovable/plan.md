

# Essai du caractère ŋ (eng) dans le texte TTS Lari

## Idée
Remplacer "ng" par le caractère Unicode **ŋ** (U+014B) dans le texte envoyé au moteur TTS, pour voir si ElevenLabs le reconnaît comme le son nasal vélaire /ŋ/ et prononce correctement le "g" dur qui suit.

Exemple : `mpangi` → `mpaŋgi` envoyé au moteur.

## Changements — `supabase/functions/elevenlabs-tts-lari/index.ts`

1. **Remplacer `IPA_OVERRIDES` par `PHONETIC_OVERRIDES`** — un dictionnaire mot → réécriture avec ŋ :
```typescript
const PHONETIC_OVERRIDES: Record<string, string> = {
  "mpangi": "mpaŋgi",
  "nge": "ŋgé",
  "ngiele": "ŋgiélé",
};
```

2. **Supprimer tout le SSML** — plus de `<speak>`, `<phoneme>`, ni `text_type: "ssml"` :
   - La fonction `buildSsml()` devient `buildText()` et retourne du texte brut
   - Le payload ElevenLabs envoie `text` au lieu de SSML
   - Supprimer `text_type: "ssml"` du body

3. **Logique de `buildText()`** :
   - Pour chaque mot, chercher dans `PHONETIC_OVERRIDES` (case-insensitive)
   - Si trouvé → utiliser l'override directement (court-circuite `convertWord()`)
   - Sinon → passer par `convertWord()` comme avant
   - Retourner le tout en texte brut

4. **Garder `convertWord()` tel quel** — les règles existantes (u→ou, e→é, ns→nts, etc.) restent pour les mots non overridés.

## Pourquoi ça pourrait marcher
- ElevenLabs v3 est multilingue et reconnaît potentiellement les caractères IPA/Unicode courants
- Le ŋ est un caractère standard (pas une balise XML) donc le moteur ne peut pas le "lire littéralement" comme il faisait avec `<phoneme>`
- Si le moteur ne reconnaît pas ŋ, il le sautera simplement — on verra dans les logs et l'audio

## Test après déploiement
Appeler l'edge function avec "Mpangi" et vérifier :
- Dans les logs : le texte envoyé contient `mpaŋgi`
- Dans l'audio : le G dur est audible, pas de "mpa-ni" ni "mpa-ngou-i"

## Fichier modifié
- `supabase/functions/elevenlabs-tts-lari/index.ts`

## Portée
- 1 seul fichier
- aucun changement UI
- approche expérimentale — si ŋ ne marche pas, on reviendra à une autre stratégie

