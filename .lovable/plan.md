

# Intégration du moteur phonétique Lari v2

## Résumé
Remplacer le système actuel (g2p.ts côté client + convertWord/PHONETIC_OVERRIDES côté edge function) par le nouveau moteur phonétique unifié qui gère syllabification, TTS ElevenLabs, et prétraitement Mandombe — le tout basé sur les règles de Jacquot et l'analyse acoustique de Denis Malanda.

## Architecture actuelle vs nouvelle

**Avant** : 2 systèmes séparés et incomplets
- `src/lib/g2p.ts` — tokenisation + IPA (client) — utilisé uniquement pour le tooltip IPA dans MandombeSpeaker
- `supabase/functions/elevenlabs-tts-lari/index.ts` — convertWord() + PHONETIC_OVERRIDES (serveur) — règles ad hoc

**Après** : 1 moteur unifié, 2 copies (client + serveur)
- `src/lib/lari-phonetic-engine.ts` — version TypeScript du moteur (client) — pour IPA, syllabification, prétraitement Mandombe
- Edge function — même logique `preprocessForElevenLabs()` (serveur) — remplace convertWord() et PHONETIC_OVERRIDES

## Fichiers modifiés

### 1. `src/lib/lari-phonetic-engine.ts` (NOUVEAU)
Conversion TypeScript du moteur fourni :
- `syllabify(word)` — découpage syllabique
- `preprocessForElevenLabs(text)` — règles TTS (nj→ndj, g dur, ŋ vélaire via n')
- `preprocessForMandombe(text)` — nj→n+ZWJ+dj, espaces ponctuation
- `processLariText(text)` — tout-en-un

### 2. `src/lib/g2p.ts` (MODIFIÉ)
- Conserver `tokenise()`, `IPA_MAP`, `phonemesToIpa()`, `lariToIpa()` pour les tooltips IPA
- Supprimer `BANTU_MAP`, `phonemesToBantu()`, `lariToBantu()` (remplacés par le nouveau moteur)
- Ajouter les nouveaux phonèmes manquants : `nj`, `ndj`, `dj`, `gn`, `mf`, `mv`, `mw`, `bf`, `nl`, `ny` dans MULTI_GRAPHS et IPA_MAP

### 3. `supabase/functions/elevenlabs-tts-lari/index.ts` (MODIFIÉ)
- Remplacer `PHONETIC_OVERRIDES` + `convertWord()` + `buildText()` par la logique de `preprocessForElevenLabs()` portée en Deno
- Les règles regex du moteur v2 remplacent toutes les transformations manuelles
- Conserver la structure de l'edge function (CORS, appel ElevenLabs, fallback model)

### 4. `src/components/MandombeSpeaker.tsx` (MODIFIÉ)
- Importer `processLariText` depuis le nouveau moteur
- Utiliser `processLariText(lariText)` pour obtenir `{ tts, syllables }` 
- Afficher les syllabes dans le tooltip (en plus de l'IPA existant)
- Le texte envoyé au TTS reste `lariText` (l'edge function fait le preprocessing côté serveur)

### 5. `src/components/LingalaMandombe.tsx` (MODIFIÉ)
- Importer `preprocessForMandombe` depuis le nouveau moteur
- Appliquer `preprocessForMandombe()` au texte Lingala avant le rendu en police Mandombe (gestion nj→n+ZWJ+dj, espaces ponctuation)

## Règles phonétiques clés intégrées

| Règle | Exemple | Résultat TTS |
|-------|---------|-------------|
| nj → ndj | njila | ndjila |
| ngi → nghi | mpangi | mpan-ghi |
| nge → nghe | nge | nghe |
| gi initial → guî | giese | guîese |
| n'ki → nkhi | n'kisi | nkhisi |
| n'gi → nghi | n'giela | nghiela |

## Ce qui ne change PAS
- L'API ElevenLabs (voix, modèle, paramètres) reste identique
- Le composant `TranslationSpeaker` (langues non-Lari) reste inchangé
- Les données dans `lessons.ts` restent inchangées
- Le flow utilisateur reste identique (clic → audio)

## Portée
- 5 fichiers (1 nouveau, 4 modifiés)
- Aucune modification de base de données
- Redéploiement de l'edge function nécessaire

