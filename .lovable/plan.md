

# Changer la voix de Mbuta Matondo et renforcer les interdictions

## Résumé

Trois modifications :
1. Remplacer la voice ID par `Gz9w9RNGNUZjVYbvzXY7` sur tout le site (TTS Lari + fallback)
2. Renforcer l'interdiction du Kituba dans le prompt de Mbuta Matondo
3. Supprimer l'utilisation de "mwana" comme terme d'adresse — le remplacer par "nlongoki" (élève)

## Étapes

### 1. Mettre à jour la voice ID par défaut (`supabase/functions/elevenlabs-tts-lari/index.ts`)
- Changer le fallback de `rfRMgjypJCXUzWdJfLMs` → `Gz9w9RNGNUZjVYbvzXY7` (ligne 8)

### 2. Mettre à jour la voice ID dans `elevenlabs-add-samples` (`supabase/functions/elevenlabs-add-samples/index.ts`)
- Changer le fallback de `rfRMgjypJCXUzWdJfLMs` → `Gz9w9RNGNUZjVYbvzXY7`

### 3. Mettre à jour le secret `LARI_VOICE_ID`
- Mettre à jour le secret pour pointer vers `Gz9w9RNGNUZjVYbvzXY7`

### 4. Réécrire le SYSTEM_PROMPT de Mbuta Matondo (`supabase/functions/mbuta-matondo/index.ts`)

Modifications dans le prompt :
- **Remplacer "mwana"** comme terme d'adresse par **"nlongoki"** (élève). "Mwana" reste autorisé comme vocabulaire dans les leçons, mais Mbuta Matondo ne doit JAMAIS s'adresser aux élèves par "mwana" ou "muana"
- **Renforcer l'interdiction du Kituba** : ajouter une section explicite avec les formes interdites (copiée du traducteur) — "mai" pour eau, "ndenge nini" pour comment, etc.
- Changer les exemples de style : "Mbote nlongoki!" au lieu de "Mbote mwana!"
- Ajouter la règle : "Ne JAMAIS appeler l'élève 'mwana' ou 'muana'. Utiliser 'nlongoki' (élève) ou le prénom si connu."

### 5. Déployer les edge functions modifiées
- Redéployer `elevenlabs-tts-lari`, `elevenlabs-add-samples`, `mbuta-matondo`

## Fichiers modifiés

| Fichier | Action |
|---------|--------|
| `supabase/functions/elevenlabs-tts-lari/index.ts` | Voice ID → Gz9w9RNGNUZjVYbvzXY7 |
| `supabase/functions/elevenlabs-add-samples/index.ts` | Voice ID → Gz9w9RNGNUZjVYbvzXY7 |
| `supabase/functions/mbuta-matondo/index.ts` | Interdiction mwana + Kituba renforcée |

