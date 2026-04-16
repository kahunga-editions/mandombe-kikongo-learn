

# Système dual Mbuta Matondo + Théo avec balises `<lari>` / `<theo>`

## Résumé

Trois changements majeurs : (1) le prompt impose les balises `<lari>`/`<theo>` pour chaque réponse, (2) le chat rend visuellement les deux personnages avec couleurs distinctes, (3) le TTS séquentiel avec verrou `isPlaying` envoie chaque segment à la bonne voix.

## Modifications

### 1. `supabase/functions/mbuta-matondo/index.ts` — Prompt dual-character

Remplacer le SYSTEM_PROMPT pour intégrer :

- **Format obligatoire** : chaque réponse doit contenir au moins un bloc `<lari>` et un bloc `<theo>`. Jamais de texte hors balises.
- **Mbuta Matondo** (`<lari>`) : LECTEUR DE CORPUS, Kikongo Lari attesté uniquement, Mandombe via `[mandombe]`
- **Théo** (`<theo>`) : assistant francophone, max 2 phrases, traduit/encourage/contextualise, jamais de Lari
- Corpus existant conservé tel quel (salutations, verbes, phrases, interdictions)
- **"Nkumbu ani"** = forme vernaculaire correcte (remplacer "Nkumbu ame" ligne 78)
- Possessifs attestés : ani (mon), aku (ton), andi (son) — les deux formes sont valides
- Prompt Théo intégré dans le même SYSTEM_PROMPT (section dédiée)

Exemple de sortie attendue :
```
<lari>[mandombe]Mbote[/mandombe] nlongoki! Kolele?</lari>
<theo>Mbuta Matondo te salue et te demande comment tu vas. Essaie de répondre !</theo>
```

### 2. `supabase/functions/elevenlabs-tts-general/index.ts` — Voix française

- Remplacer `SARAH_VOICE_ID = "EXAVITQu4vr4xnSDxMaL"` par `"R89ZQJowZAEgiPNyC3dQ"`
- Renommer la constante en `FRENCH_VOICE_ID`
- Utiliser cette voix pour le français et toutes les langues non-Lingala/non-Korean

### 3. `src/components/MbutaMatondoChat.tsx` — Rendu visuel + TTS dual-voice

**Rendu visuel** :
- Parser les balises `<lari>...</lari>` et `<theo>...</theo>` dans les messages assistant
- `<lari>` → fond doré/warm (`bg-gold/10 border-gold/30`), icône GraduationCap dorée, rendu Mandombe actif
- `<theo>` → fond bleu clair (`bg-blue-500/10 border-blue-400/30`), label "Théo" en bleu, texte français simple
- Fallback : si pas de balises (ancien format), rendre comme avant

**TTS dual-voice avec verrou `isPlaying`** :
- Ajouter `isPlayingRef = useRef(false)` — verrou global
- `handleSpeak()` : si `isPlayingRef.current === true`, return immédiatement (bloquer chevauchement)
- Parser le contenu en segments ordonnés :
  ```typescript
  const segments = parseDualSegments(content);
  // → [{ text: "Mbote nlongoki! Kolele?", type: "lari" },
  //    { text: "Il te salue...", type: "theo" }]
  ```
- Pour chaque segment séquentiellement :
  - `type === "lari"` → `elevenlabs-tts-lari` (voix Gz9w9RNGNUZjVYbvzXY7, overrides phonétiques)
  - `type === "theo"` → `elevenlabs-tts-general` avec `lang: "fr"` (voix R89ZQJowZAEgiPNyC3dQ)
  - Attendre `audio.onended` avant de jouer le segment suivant
- À la fin de la séquence ou en cas d'erreur : `isPlayingRef.current = false`
- Bouton "Stop" : met `isPlayingRef.current = false`, pause l'audio en cours

**`stripMarkdown()` adapté** : retirer les balises `<lari>`/`<theo>` et `[mandombe]` avant extraction du texte brut pour chaque segment.

### 4. Mémoire projet

- `mem://features/ai-teacher` — Dual-character (Mbuta Matondo + Théo), balises obligatoires, "nkumbu ani" valide, voix française R89ZQJ
- `mem://constraints/source-material` — Voix française globale R89ZQJowZAEgiPNyC3dQ

## Fichiers modifiés

| Fichier | Action |
|---|---|
| `supabase/functions/mbuta-matondo/index.ts` | Prompt dual-character avec balises `<lari>`/`<theo>` |
| `supabase/functions/elevenlabs-tts-general/index.ts` | Voix française → R89ZQJowZAEgiPNyC3dQ |
| `src/components/MbutaMatondoChat.tsx` | Rendu doré/bleu + TTS séquentiel avec verrou isPlaying |
| `mem://features/ai-teacher` | Mise à jour |
| `mem://constraints/source-material` | Mise à jour |

