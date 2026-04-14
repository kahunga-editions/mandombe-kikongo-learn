

# Extraire les pages 51-100 du corpus Jacquot (thèse Laadi)

## Contenu couvert par les 50 premières pages
Pages 1-50 du PDF = pages de thèse 1 à 46. Couvre : avant-propos, introduction, et toute la **Première Partie — Phonologie** (Chapitre I : Les unités distinctives), jusqu'au tableau du système consonantique (section 1.44.3).

Les pages 51-100 contiendront vraisemblablement :
- Fin de la phonologie (prosodie, tons, structure syllabique)
- Début de la **Deuxième Partie — Morphologie** (classes nominales)

## Etapes

### 1. Découper le PDF (pages 51-100)
- Copier `user-uploads://12138-3.pdf` vers `/tmp/jacquot.pdf`
- Script Python avec `pypdf` pour extraire les pages 51 à 100 dans `/tmp/jacquot_p51_100.pdf`

### 2. Parser le PDF découpé
- Utiliser `document--parse_document` sur `/tmp/jacquot_p51_100.pdf`

### 3. Sauvegarder le contenu extrait
- Écrire le texte brut dans `/mnt/documents/jacquot_pages_51_100.md` pour référence

### 4. Créer 2-3 leçons dans `src/data/lessons.ts`
En respectant les consignes :
- Titres dérivés strictement du corpus (pas d'invention)
- Graphie sans voyelles doubles dans `mandombe:`
- Voyelles doubles conservées dans `lari:` et `ipa:`
- Overrides TTS si nécessaire
- Explications simplifiées pour débutants
- Crédit "Jacquot & Lumwamu" partout
- Exercices : `multiple-choice`, `fill-in-blank`, `matching`, `mandombe-recognition`

Sujets probables (à confirmer après extraction) :
- **Prosodie et tons** (suite phonologie)
- **Structure syllabique**
- **Classes nominales** (début morphologie)

## Fichiers modifiés
- `src/data/lessons.ts` — ajout de 2-3 leçons
- `src/lib/lari-phonetic-engine.ts` — overrides TTS si nécessaire
- `supabase/functions/elevenlabs-tts-lari/index.ts` — overrides TTS si nécessaire

## Artefact produit
- `/mnt/documents/jacquot_pages_51_100.md` — texte brut extrait pour référence

