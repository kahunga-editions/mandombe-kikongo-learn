

# Intégrer le prompt "LECTEUR DE CORPUS" + filtrage TTS

## Constat

Le Voice ID `Gz9w9RNGNUZjVYbvzXY7` est **déjà** celui configuré par défaut dans le code TTS — la voix est correcte. Le vrai problème est le prompt qui dit "ZERO français", forçant l'IA à inventer du faux Lari pour tout expliquer.

## Modifications

### 1. `supabase/functions/mbuta-matondo/index.ts` — Remplacement complet du SYSTEM_PROMPT

Remplacer le prompt actuel par le prompt fourni par l'utilisateur, avec les principes suivants :

- **LECTEUR DE CORPUS** : l'IA n'a aucune compétence linguistique, elle ne fait que lire ce qui est dans le corpus
- **Deux registres** : français autorisé à l'écrit (support visuel, traductions entre parenthèses), Kikongo Lari attesté uniquement à l'oral/TTS
- **Zéro invention** : pas de conjugaison par analogie, pas de phrases construites par règles
- **Quand il ne sait pas** : répondre en français "(ce mot n'est pas encore dans mes leçons)" et proposer l'équivalent attesté le plus proche
- Le corpus injecté reprend les salutations, vocabulaire, phrases, verbes, structures grammaticales déjà présents dans le prompt actuel (qui viennent de `lessons.ts`)
- Conservation des règles Mandombe, emojis medium-dark (🧑🏾), et interdictions Kituba/Lingala

### 2. `src/components/MbutaMatondoChat.tsx` — Filtrer le français du TTS

Modifier `stripMarkdown()` pour retirer les parenthèses françaises avant envoi au TTS :
- Supprimer tout contenu entre parenthèses : `(traduction française)` → supprimé
- Le TTS ne lira que les parties Kikongo Lari

```typescript
// Ajout dans stripMarkdown :
.replace(/\([^)]*\)/g, '')  // retire les parenthèses (français)
```

### 3. Mémoire projet

Mettre à jour `mem://features/ai-teacher` et `mem://constraints/source-material` avec la nouvelle stratégie "LECTEUR DE CORPUS".

## Fichiers modifiés

| Fichier | Action |
|---|---|
| `supabase/functions/mbuta-matondo/index.ts` | Prompt remplacé par "LECTEUR DE CORPUS" strict |
| `src/components/MbutaMatondoChat.tsx` | `stripMarkdown()` filtre les parenthèses françaises |
| `mem://features/ai-teacher` | Mise à jour stratégie |
| `mem://constraints/source-material` | Mise à jour |

