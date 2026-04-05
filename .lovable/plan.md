

# Plan : Retirer l'animation, garder le guide

## Ce qui change

Supprimer le bouton "Animer" et toute la logique d'animation (playAnimation, état isAnimating, animRef, etc.) tout en conservant :
- Le guide transparent du glyphe Mandombe (ghost glyph)
- Le dessin libre (freehand drawing)
- Le bouton Guide (afficher/masquer)
- Le bouton Effacer

## Fichier modifié

**`src/components/GlyphTracingCanvas.tsx`**

1. Retirer les imports `Play` de lucide-react
2. Supprimer les fonctions inutilisées : `ease`, `CANONICAL_STROKES`, `canonicalToPixelPath`, `buildFallbackStrokePath`, `drawSmoothPath`, `drawStrokeNumber`, `renderGlyph`, `getGlyphBBox`, `drawTip`, `drawSingini`
3. Supprimer les états `isAnimating`, `animRef`, `canonicalKey`, `hasCanonical`
4. Supprimer la fonction `playAnimation` et le `useEffect` de cleanup d'animation
5. Retirer les conditions `if (isAnimating)` dans `startDraw` et `draw`
6. Supprimer le bouton "Animer" du JSX
7. Supprimer le badge "✓ Tracé canonique" et le hint "Singini → point d'entrée"
8. Garder intact : `drawBg` (avec le ghost glyph), freehand drawing, boutons Guide et Effacer

Le composant passe de ~550 lignes à ~120 lignes.

