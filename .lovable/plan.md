

# Tester avec le Lingala (code langue `ln`)

## Contexte

Le Lingala est une langue bantoue plus proche du Kikongo-Lari que le Zulu géographiquement et phonologiquement. ElevenLabs v3 supporte le Lingala (`ln`). Tester avec ce code langue pourrait produire une meilleure prononciation des phonèmes Lari.

## Changements

### 1. Edge function (`supabase/functions/elevenlabs-tts-lari/index.ts`)
- Ajouter `language_code: "ln"` (Lingala) dans le body de la requête v3
- Mettre à jour le log pour indiquer `lang: ln`
- Garder le fallback v2 sans language_code (v2 ne le supporte pas de la même façon)

### 2. Déployer et tester
- Déployer la fonction mise à jour
- Tester avec quelques mots Lari ("mbote", "nkokela") via curl pour vérifier la qualité
- Comparer avec le résultat précédent en Zulu

### 3. G2P (`src/lib/g2p.ts`)
- Ajuster le `BANTU_MAP` si nécessaire pour le Lingala (le Lingala partage davantage de phonèmes avec le Lari que le Zulu, donc moins d'adaptations devraient être nécessaires)

## Fichiers modifiés
1. **`supabase/functions/elevenlabs-tts-lari/index.ts`** — `language_code: "ln"`

