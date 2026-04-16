

# Fix: "j" standalone = fricative /ʒ/, mais "nj" = affriquée /ndʒ/

## Règle clarifiée

| Contexte | Phonème | Exemple | Override correct |
|----------|---------|---------|-----------------|
| **j** seul (pas de n avant) | /ʒ/ fricative (comme "je" en français) | jibula, mbaji | Pas de "d" ajouté |
| **nj** (n + j) | /ndʒ/ affriquée prénasalisée | njijiri | ndjîdjiri ✓ |

## Ce qui est CORRECT (ne pas toucher)

- Règle regex `nj → ndj` (ligne 111 dans `lari-phonetic-engine.ts`, ligne 108 dans `elevenlabs-tts-lari`) — **garder**
- `"njijiri": "ndjîdjiri"` — **garder**
- `"ngiena": "ndjena"` — **garder**
- `"ngiele": "ndjele"` — **garder**
- `'ndj'` et `'dj'` dans PRENASALIZED — **garder**

## Ce qui doit être corrigé

Seuls les overrides avec un "j" standalone (sans "n" devant) qui ajoutent un "d" parasite :

| Fichier | Override actuel | Correction |
|---------|----------------|------------|
| `elevenlabs-tts-lari/index.ts` ligne 33 | `"jimbakane": "djimbakané"` | `"jimbakane": "jimbakané"` |
| `elevenlabs-tts-lari/index.ts` ligne 64 | `"jima": "djima"` | Supprimer (le j français est déjà /ʒ/) |
| `src/lib/lari-phonetic-engine.ts` ligne 148 | `"jima": "djima"` | Supprimer |

## Mise à jour mémoire

`mem://audio/moteur-phonetique-lari` : documenter la règle "j seul = /ʒ/, nj = /ndʒ/".

## Fichiers modifiés

| Fichier | Action |
|---|---|
| `supabase/functions/elevenlabs-tts-lari/index.ts` | Corriger `jimbakane`, supprimer override `jima` |
| `src/lib/lari-phonetic-engine.ts` | Supprimer override `jima` |
| `mem://audio/moteur-phonetique-lari` | Ajouter règle j/nj |

