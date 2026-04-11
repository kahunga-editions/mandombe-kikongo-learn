

# Améliorer la prononciation Lari via le G2P de Jacquot

## Problème
La voix clonée (`rfRMgjypJCXUzWdJfLMs`) a le bon timbre Lari, mais ElevenLabs ne connaît pas l'orthographe Lari. Il interprète "Mbaji kua" avec ses propres règles (probablement anglaises), produisant un /dʒ/ au lieu de /ʒ/, un /kwɑ/ au lieu de /ku-a/, etc.

## Solution
Créer une fonction `lariToFrenchPhonetic()` dans le G2P qui convertit le texte Lari en orthographe **française** — car le français partage les mêmes conventions que le Lari pour les sons critiques :
- `j` = /ʒ/ (identique en français)
- `u` → `ou` (le /u/ Lari = "ou" français)
- `kua` → `kou-a` (hiatus explicite, pas de glide /w/)
- `e` reste `é` (jamais muet)
- `s` reste `s` (jamais /z/)

Puis envoyer ce texte respelled au TTS avec `language_code: "fr"` — le modèle français prononcera correctement les phonèmes puisqu'ils correspondent à l'orthographe française.

## Plan technique

### 1. Ajouter `lariToFrenchPhonetic()` dans `src/lib/g2p.ts`
Nouvelle map `FRENCH_MAP` basée sur les règles de Jacquot :
```
j → j (français = /ʒ/ ✓)
u → ou (français /u/ = Lari /u/)
e → é (empêche le e muet français)
s → ss (entre voyelles, empêche /z/)
mb → mb, nd → nd, nk → nk... (les prénasales restent)
kua → kou-a (tiret pour forcer le hiatus)
```

### 2. Mettre à jour l'edge function TTS
- Appliquer `lariToFrenchPhonetic()` côté serveur (ou recevoir le texte transformé du client)
- Ajouter `language_code: "fr"` pour que le modèle utilise les règles phonétiques françaises
- Corriger le message de log (enlever "lang: ln")

### 3. Mettre à jour `MandombeSpeaker.tsx`
- Importer et utiliser `lariToFrenchPhonetic()` pour transformer le texte avant envoi
- Continuer d'afficher le texte Lari original + IPA dans le tooltip

### 4. Créer la transformation côté serveur (edge function)
Comme alternative plus propre : faire la transformation dans l'edge function elle-même pour ne pas exposer la logique au client. Le client envoie le texte Lari brut, l'edge function le transforme avant d'appeler ElevenLabs.

## Exemples de transformations attendues

| Lari original | French phonetic | Son visé |
|---|---|---|
| Mbote | Mboté | /ᵐbote/ ✓ |
| Mbaji kua | Mbaji kou-a | /ᵐbaʒi ku.a/ ✓ |
| Nkokela kua | Nkokéla kou-a | /ᵑkokela ku.a/ ✓ |
| Nsiku | Ntsikou | /ⁿtsiku/ ✓ |

## Fichiers modifiés
1. **`src/lib/g2p.ts`** — ajouter `FRENCH_MAP` et `lariToFrenchPhonetic()`
2. **`supabase/functions/elevenlabs-tts-lari/index.ts`** — appliquer la transformation + `language_code: "fr"`
3. **`src/components/MandombeSpeaker.tsx`** — envoyer le texte transformé (ou le brut si la transformation est côté serveur)

## Approche choisie : transformation côté serveur
La transformation se fera dans l'edge function pour centraliser la logique. Le client continue d'envoyer le texte Lari brut. Cela permet de corriger la prononciation sans redéployer le frontend.

