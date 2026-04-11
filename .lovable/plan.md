

# Ajouter audio sur le texte Mandombe (histoire) et les conjugaisons

## Résumé
Ajouter un bouton speaker sur le texte Mandombe dans chaque panneau de l'histoire, et un bouton speaker sur chaque ligne de conjugaison dans les leçons.

## Changements

### 1. StoryPreview — Speaker sur le bloc Mandombe
**Fichier**: `src/components/StoryPreview.tsx`
- Ajouter un `MandombeSpeaker` dans le bloc Mandombe (la zone dorée avec `font-mandombe`), à côté du texte
- Le `lariText` sera le texte Lari correspondant (car le TTS fonctionne avec le Lari latin, pas le script Mandombe)
- Le speaker existant sur la ligne "Lari:" reste en place — l'utilisateur aura donc deux points d'écoute : un sur le Mandombe, un sur le latin

### 2. LessonDetail — Speaker sur les conjugaisons
**Fichier**: `src/pages/LessonDetail.tsx`
- Importer `MandombeSpeaker`
- Dans chaque ligne de conjugaison (`conj.rows`), ajouter un `MandombeSpeaker` avec `lariText={row.lari}` à côté du texte Lari
- Petit icône discret aligné avec le texte

## Fichiers modifiés
- `src/components/StoryPreview.tsx` — speaker dans le bloc Mandombe
- `src/pages/LessonDetail.tsx` — speaker sur chaque ligne de conjugaison

