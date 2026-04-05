

# Intégrer le tableau BA= dans la section Apprendre + corrections visuelles

## Changements

### 1. Déplacer le contenu BA= dans la page principale
- Extraire le tableau de conjugaison de `VerbeBa.tsx` en un composant autonome `src/components/VerbeBaSection.tsx` (sans Navbar/Footer, avec un `id="verbe-ba"`)
- L'ajouter dans `src/pages/Index.tsx` après `<LearningPaths />` (ou après `<VocabularyPreview />`)
- Supprimer la route `/verbe-ba` de `src/App.tsx`
- Supprimer le lien "BA=" du `Navbar.tsx`
- Supprimer `src/pages/VerbeBa.tsx`

### 2. Agrandir les glyphes Mandombe
- Boutons de conjugaison : `text-xl` → `text-3xl`
- Colonne pronom/substantif : `text-lg` → `text-2xl`
- Modal : `text-3xl` → `text-4xl`

### 3. Couleurs plus foncées (plus visibles)
- Présent contracté : `text-gold` → `text-amber-400`, border/bg plus opaques
- Présent plein : `text-emerald-400` → `text-emerald-300`
- Passé : `text-blue-400` → `text-blue-300`
- Fonds des boutons : opacité de `/20` → `/30`

### 4. Espacement pronom / substantif
- Ajouter `mb-3` entre le Mandombe et le texte latin dans la colonne pronom/substantif (actuellement aucun margin)

## Fichiers modifiés
- `src/components/VerbeBaSection.tsx` — nouveau composant (contenu extrait)
- `src/pages/Index.tsx` — import + ajout du composant
- `src/App.tsx` — suppression route `/verbe-ba`
- `src/components/Navbar.tsx` — suppression lien "BA="
- `src/pages/VerbeBa.tsx` — suppression

