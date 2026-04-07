

# Recadrer le premier panneau — visages visibles

## Probleme

Le panneau 1 utilise `object-cover` avec une hauteur fixe (`h-56 md:h-72`), ce qui coupe le haut de l'image et mange les visages de Nsayi et Sunda.

## Solution

Dans `src/components/StoryPreview.tsx`, ligne 265 : changer `object-cover` en `object-contain` pour le layout "wide" du premier panneau, et augmenter la hauteur pour laisser l'image respirer. Alternativement, ajouter `object-top` pour que le recadrage preserve le haut de l'image (les visages).

Approche retenue : ajouter `object-top` a la classe de l'image quand le layout est "wide". Cela garde `object-cover` (pas de bandes vides) mais ancre l'image en haut, preservant les visages.

## Modification

Fichier : `src/components/StoryPreview.tsx`, ligne 265

```
// Avant
className={`w-full object-cover ${isWide ? "h-56 md:h-72" : "h-56 md:h-full"}`}

// Apres
className={`w-full object-cover ${isWide ? "h-64 md:h-80 object-top" : "h-56 md:h-full"}`}
```

Cela :
- Augmente legerement la hauteur (h-56→h-64, h-72→h-80) pour montrer plus de l'image
- Ajoute `object-top` en mode wide pour ancrer l'image en haut et preserver les visages

## Fichier modifie
- `src/components/StoryPreview.tsx` — 1 ligne

