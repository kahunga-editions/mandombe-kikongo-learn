

# Extraire les pages 101-150 du corpus Jacquot & créer des leçons

## Contenu attendu (pages 101-150)
Les 100 premières pages couvrent phonologie complète + début grammaire (inventaire des monèmes, morphologie §4.1-4.5). Les pages 101-150 devraient couvrir :
- Suite de la morphologie (classes nominales détaillées, conjugaison)
- Début de la syntaxe (syntagmes nominaux/verbaux)

## Étapes

### 1. Découper le PDF (pages 101-150)
- Copier `user-uploads://12138-3.pdf` → `/tmp/jacquot.pdf`
- Script Python avec `pypdf` pour extraire pages 101-150 → `/tmp/jacquot_p101_150.pdf`

### 2. Parser le PDF découpé
- Utiliser `document--parse_document` sur `/tmp/jacquot_p101_150.pdf`

### 3. Sauvegarder le contenu extrait
- Écrire le texte brut dans `/mnt/documents/jacquot_pages_101_150.md`

### 4. Créer 2-3 leçons dans `src/data/lessons.ts`
Consignes strictes :
- Titres dérivés du corpus (pas d'invention)
- Graphie sans voyelles doubles dans `mandombe:`
- Voyelles doubles conservées dans `lari:` et `ipa:`
- Crédit "Jacquot & Lumwamu" partout
- Explications simplifiées pour débutants
- Exercices : `multiple-choice`, `fill-in-blank`, `matching`, `mandombe-recognition`

Sujets probables (à confirmer après extraction) :
- **Classes nominales** (préfixes singulier/pluriel, accords)
- **Conjugaison verbale** (aspect, mode, temps)
- **Syntagmes** (nominal ou verbal)

### 5. TTS overrides si nécessaire
Ajouter dans `src/lib/lari-phonetic-engine.ts` et `supabase/functions/elevenlabs-tts-lari/index.ts`

## Fichiers modifiés
- `src/data/lessons.ts` — ajout de 2-3 leçons
- `src/lib/lari-phonetic-engine.ts` — overrides TTS si nécessaire
- `supabase/functions/elevenlabs-tts-lari/index.ts` — overrides TTS si nécessaire

## Artefact produit
- `/mnt/documents/jacquot_pages_101_150.md` — texte brut extrait

