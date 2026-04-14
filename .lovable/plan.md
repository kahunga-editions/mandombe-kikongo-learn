

# Intégration de la grammaire Jacquot dans les leçons — avec audio Lari

## Constat
Le composant `LessonDetail.tsx` intègre **déjà** `MandombeSpeaker` à chaque occurrence de texte Lari :
- **Vocabulaire** (ligne 167) : bouton audio à côté de chaque mot
- **Syntaxe** (ligne 232) : bouton audio pour chaque exemple
- **Conjugaisons** (ligne 284) : bouton audio par ligne du tableau
- **Phrases clés** (ligne 313) : bouton audio pour chaque phrase Bambuka

Donc : **aucune modification de composant n'est nécessaire**. Dès qu'une leçon contient un champ `lari`, le son est automatiquement disponible via la voix clonée ElevenLabs (edge function `elevenlabs-tts-lari`).

## Plan révisé

### Étape 1 — Extraction du corpus (script Python temporaire)
- Découper le PDF de 277 pages en 6 parties de ~50 pages
- Parser chaque partie, consolider dans un fichier texte de travail
- Cataloguer tous les exemples attestés : phonèmes, classes nominales, paradigmes verbaux, syntaxe

### Étape 2 — Création des leçons dans `src/data/lessons.ts`
Ajouter 8-10 nouvelles leçons (3 niveaux), chacune avec :
- `vocabulary` : chaque entrée a un champ `lari` → **audio automatique** via MandombeSpeaker
- `syntax` : exemples avec `lari` → **audio automatique**
- `conjugations` : tableaux avec `lari` par ligne → **audio automatique**
- `phrases` : phrases complètes avec `lari` → **audio automatique**
- `exercises` : QCM, appariement, trous, reconnaissance Mandombe
- Champ `mandombe` rempli pour chaque entrée (Title Case)

**Niveaux :**
- Débutant : phonologie, classes nominales 1/2, 3/4, 9/10, phrases S+O+V
- Intermédiaire : système verbal, extensions, toutes les classes, négation
- Avancé : syntaxe complexe, idéophones, morphophonologie

### Étape 3 — Vérification audio
- Chaque mot/phrase Lari des leçons sera prononçable via le moteur phonétique existant (`lari-phonetic-engine.ts` → `preprocessForElevenLabs`)
- Les mots nécessitant des overrides phonétiques spécifiques seront ajoutés au dictionnaire `PHONETIC_OVERRIDES` dans `lari-phonetic-engine.ts`

## Fichiers modifiés
- `src/data/lessons.ts` — ajout des nouvelles leçons
- `src/lib/lari-phonetic-engine.ts` — ajout éventuel d'overrides phonétiques pour les nouveaux mots du corpus
- Scripts temporaires Python pour l'extraction (non versionnés)

## Ce qui ne change PAS
- `LessonDetail.tsx` — gère déjà l'audio pour chaque occurrence Lari
- `MandombeSpeaker.tsx` — fonctionne tel quel
- Edge functions TTS — aucune modification
- Aucune migration de base de données

