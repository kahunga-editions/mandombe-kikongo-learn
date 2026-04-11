

# Passer au modèle Eleven v3 avec voix Zulu

## Contexte

ElevenLabs a lancé **Eleven v3 (alpha)** -- le modèle le plus expressif, supportant 70+ langues dont le Zulu. Le Zulu est une langue bantoue avec des phonèmes proches du Lari (prénasales mb, nd, ng, structure CV). Utiliser une voix Zulu avec v3 devrait produire une prononciation beaucoup plus naturelle.

## Changements

### 1. Mettre à jour l'edge function TTS (`supabase/functions/elevenlabs-tts-lari/index.ts`)

- Changer `model_id` de `"eleven_multilingual_v2"` vers `"eleven_v3"`
- Garder les voice settings humanisés (stability: 0.5, similarity: 0.75, style: 0.3)
- Ajouter le paramètre `language: "zu"` (code ISO Zulu) pour forcer le modèle à utiliser la phonologie Zulu
- Ralentir légèrement (`speed: 0.92`) pour articuler les prénasales

### 2. Améliorer le BANTU_MAP dans `src/lib/g2p.ts` pour le Zulu

Le Zulu partage les prénasales avec le Lari mais a quelques différences orthographiques. Adapter le mapping :
- `u` reste `u` (le Zulu prononce /u/ correctement, pas /y/)
- `e` reste `e` (le Zulu a les mêmes voyelles ouvertes)
- `ns` → `nts` (spirantisation Jacquot, compatible Zulu)
- `sh` → `sh` (OK en Zulu)
- Les prénasales `mb`, `nd`, `ng`, `nk` sont identiques en Zulu

### 3. Ajouter des audio tags v3 pour plus d'expressivité

Le modèle v3 supporte des tags inline comme `[speaks slowly]`, `[calmly]`. On peut les utiliser dans le texte envoyé pour guider la prosodie :
- Préfixer les mots isolés (dictionnaire) avec un tag de clarté
- Pour les phrases, laisser le modèle gérer naturellement

### 4. Tester avec quelques mots via curl

Appeler l'edge function avec "mbote", "nkokela", "lungolobi" pour comparer v2 vs v3.

## Note importante

Le modèle v3 est en alpha et peut nécessiter un plan ElevenLabs spécifique. Si l'API retourne une erreur de permissions, on reviendra à v2 avec les améliorations G2P Zulu.

## Fichiers modifiés

1. **`supabase/functions/elevenlabs-tts-lari/index.ts`** -- model v3, language Zulu, audio tags
2. **`src/lib/g2p.ts`** -- BANTU_MAP optimisé pour Zulu, règles contextuelles Jacquot

