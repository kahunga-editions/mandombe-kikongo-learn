

# Ajouter l'audio TTS partout + adoucir la voix

## Résumé
Intégrer le composant `MandombeSpeaker` dans l'histoire (StoryPreview) et le Kilolaka, et adoucir les réglages de la voix clonée.

## Changements

### 1. Adoucir la voix clonée
**Fichier**: `supabase/functions/elevenlabs-tts-lari/index.ts`
- Augmenter `stability` de 0.5 → 0.65 (plus douce, moins variable)
- Réduire `style` de 0.3 → 0.15 (moins d'exagération)
- Réduire `speed` de 0.92 → 0.88 (légèrement plus lent = plus doux)
- Désactiver `use_speaker_boost` (moins agressif)

### 2. Ajouter audio à l'histoire (StoryPreview)
**Fichier**: `src/components/StoryPreview.tsx`
- Importer `MandombeSpeaker`
- Dans le composant `ComicPanel`, ajouter un petit icône speaker à côté du texte Lari
- Le `lariText` sera la phrase Lari complète du panneau

### 3. Ajouter audio au Kilolaka
**Fichier**: `src/components/KilolakaPreview.tsx`
- Importer `MandombeSpeaker`
- Pour chaque syllabe/morphème (Ki, Lo, La, Ka, Bi, Bu, etc.), ajouter un petit icône speaker au-dessus du glyphe Mandombe
- Idem pour les séries F, D, G dans la section premium

### 4. Vérifier le vocabulaire des leçons
Le `MandombeSpeaker` est **déjà** présent sur le vocabulaire de toutes les leçons (ligne 147 de LessonDetail.tsx). Aucun changement nécessaire ici.

## Fichiers modifiés
- `supabase/functions/elevenlabs-tts-lari/index.ts` — voice settings plus doux
- `src/components/StoryPreview.tsx` — ajouter MandombeSpeaker sur chaque panneau
- `src/components/KilolakaPreview.tsx` — ajouter MandombeSpeaker sur chaque glyphe

