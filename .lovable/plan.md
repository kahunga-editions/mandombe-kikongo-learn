

# Corriger la prononciation de 'j' → /ʒ/ (pas /dʒ/)

## Problème

En Lari (Kikongo), le 'j' se prononce /ʒ/ (comme en français : « jour »), pas /dʒ/ (comme en anglais « judge »). Actuellement, 'j' n'est pas mappé dans le G2P — il est ignoré ou mal interprété par le TTS.

## Changements dans `src/lib/g2p.ts`

1. **IPA_MAP** : ajouter `j: "ʒ"` (fricative post-alvéolaire voisée)
2. **BANTU_MAP** : ajouter `j: "j"` — le Lingala prononce 'j' comme /ʒ/ nativement, donc on le passe tel quel au TTS avec `language_code: "ln"`

Note : le `y` reste mappé à `"j"` en IPA (semi-voyelle /j/), ce qui est correct.

## Fichier modifié
- `src/lib/g2p.ts` — ajout de 'j' dans IPA_MAP et BANTU_MAP

