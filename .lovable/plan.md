

# Correction prononciation "g" dur devant e/i/y dans le TTS Lari

## Problème
En français, "g" devant "e", "i", "y" donne un son doux /ʒ/ (comme "girafe"). En Lari, le "g" est toujours dur /g/ (comme "gare"). Le TTS français prononce donc mal "mpangi", "nge", etc.

## Solution
Ajouter une règle dans `convertWord()` de `supabase/functions/elevenlabs-tts-lari/index.ts` : quand "g" est suivi de "e", "i" ou "y", insérer un "u" entre les deux pour forcer le g dur en orthographe française.

**Important** : cela ne change que le texte envoyé au TTS (le texte affiché à l'utilisateur reste inchangé). La fonction `lariToFrenchPhonetic()` est justement faite pour ça — réécrire la prononciation pour le moteur TTS français.

Exemples de transformation interne :
- `mpangi` → `mpangui` (prononcé /mpangi/)
- `nge` → `ngué` (le "é" est déjà géré par la règle existante)

## Fichier modifié
- `supabase/functions/elevenlabs-tts-lari/index.ts` — ajout d'un bloc dans `convertWord()`, avant le bloc "j" → "z" (vers ligne 94) :

```typescript
// "g" + [eiy] → "gu" + [eiy] (force hard /g/ in French TTS)
if (lower[i] === "g" && i + 1 < lower.length && "eiy".includes(lower[i + 1])) {
  result += "gu";
  i++;
  continue;
}
```

La voyelle suivante (e, i, y) sera traitée au prochain tour de boucle par les règles existantes (ex: "e" → "é", "i" reste "i", etc.).

