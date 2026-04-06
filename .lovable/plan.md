

# Rendre les glyphes et textes visibles dans le tableau BA=

## Problème

Les couleurs actuelles (`text-amber-300`, `text-emerald-300`, `text-blue-300`) sont quasi invisibles sur fond clair. Les fonds des boutons (`bg-amber-500/30`) sont aussi trop transparents.

## Corrections

### Fichier : `src/components/VerbeBaSection.tsx`

**Couleurs des boutons (tenseColors)** — utiliser des teintes foncées visibles sur fond clair :
- Contracté : `bg-amber-100 text-amber-800 border-amber-400 hover:bg-amber-200` (dark: `dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-500`)
- Plein : `bg-emerald-100 text-emerald-800 border-emerald-400 hover:bg-emerald-200` (dark: `dark:bg-emerald-900/40 dark:text-emerald-300`)
- Passé : `bg-blue-100 text-blue-800 border-blue-400 hover:bg-blue-200` (dark: `dark:bg-blue-900/40 dark:text-blue-300`)

**Badges (tenseBadgeColors)** — même logique foncée.

**En-têtes de colonnes** — `text-amber-400` → `text-amber-700 dark:text-amber-400`, idem vert/bleu.

**Légende (dots)** — `bg-amber-400` → `bg-amber-600 dark:bg-amber-400`, etc.

