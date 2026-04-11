

# Corriger la prononciation du "j" Lari dans le TTS

## Problème
"Mbaji kua" sonne mal — le modèle TTS ne prononce pas le `j` comme /ʒ/. En Lari, `j` = /ʒ/ (comme le français "jour"), et les locuteurs alternent souvent entre `j` et `z` pour ce son.

## Solution
Dans la fonction `convertWord()` de l'edge function, remplacer `j` par `j` français explicitement — ou mieux, par `ge`/`gi` selon la voyelle suivante, car en français :
- `j` devant `i` = /ʒi/ ✓ (déjà bon)
- `j` devant `a` = /ʒa/ ✓ (déjà bon)

Cependant, si le modèle ElevenLabs avec la voix clonée ne respecte pas le `j` français, on peut forcer en utilisant `z` comme l'utilisateur le suggère — car en français `z` = /z/, pas /ʒ/... mais avec la voix clonée Lari, le `z` pourrait mieux déclencher le /ʒ/ natif.

**Approche retenue** : ajouter une règle `j` → `j` (garder tel quel pour le français, c'est déjà /ʒ/) mais aussi tester avec `z` comme fallback. On va d'abord tester les deux variantes via curl pour voir laquelle sonne mieux, puis appliquer la meilleure.

## Plan

### 1. Tester les deux prononciations
- Appeler l'edge function avec "Mbaji kou-a" (actuel) vs "Mbazi kou-a" pour comparer
- Vérifier dans les logs quelle transformation est appliquée

### 2. Mettre à jour la règle dans l'edge function
- Dans `convertWord()`, ajouter une règle : `j` → `z` (puisque les locuteurs Lari alternent et que `z` pourrait mieux fonctionner avec le modèle)
- Alternative : essayer `j` → `ge` devant voyelle si `z` ne donne pas /ʒ/

### 3. Redéployer et valider
- Tester avec "Mbaji kua", "Nkokela kua", "Mbote" pour confirmer

## Fichier modifié
- `supabase/functions/elevenlabs-tts-lari/index.ts` — ajouter règle `j` → `z` dans `convertWord()`

