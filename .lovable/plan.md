

# Ajouter des boutons audio sur la grille Kilolaka + affiner la voix

## Résumé
Ajouter un petit bouton speaker (🔊) dans chaque cellule de la grille Kilolaka (`public/kilolaka_grille.html`) pour prononcer chaque syllabe via l'edge function TTS. Affiner les paramètres de la voix clonée pour plus de douceur et de naturel.

## Changements

### 1. Affiner la voix clonée
**Fichier**: `supabase/functions/elevenlabs-tts-lari/index.ts`
- Augmenter `stability` de 0.65 → 0.72 (plus stable, moins de variation)
- Réduire `style` de 0.15 → 0.10 (encore moins d'exagération)
- Réduire `speed` de 0.88 → 0.85 (plus posé)
- Appliquer les mêmes valeurs au fallback `eleven_multilingual_v2`

### 2. Ajouter les boutons audio à la grille HTML
**Fichier**: `public/kilolaka_grille.html`

La grille est un fichier HTML autonome chargé dans un iframe. L'approche :

- **CSS** : Ajouter un style pour un petit bouton speaker (`.speak-btn`) positionné en haut à droite de chaque cellule — petit, discret, gold sur fond transparent
- **JavaScript** : 
  - Ajouter une fonction `speakSyllable(text, btn)` qui appelle directement l'edge function `elevenlabs-tts-lari` via fetch, avec le Supabase URL et anon key en dur (c'est une clé publique, sécuritaire)
  - Cache audio en mémoire pour éviter les appels répétés
  - Animation de chargement (spinner) et de lecture (pulse)
- **Dans `buildGrid()`** : Insérer un bouton speaker dans chaque cellule avec `onclick="speakSyllable('${cons}${v}', this)"` — le texte envoyé est la syllabe en Lari latin (ex: "Bi", "Nda", "Shi")

### Structure d'une cellule modifiée
```text
┌─────────────────┐
│            🔊   │  ← bouton speaker (petit, coin haut droit)
│     Glyphe      │  ← font Mandombe
│    [meaning]    │  ← affiché au clic
└─────────────────┘
```

## Fichiers modifiés
- `supabase/functions/elevenlabs-tts-lari/index.ts` — paramètres voix plus doux
- `public/kilolaka_grille.html` — boutons audio sur chaque glyphe + logique TTS

