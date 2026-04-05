

# Plan : Corriger le build + préparer le traçage canonique

## Priorité 1 — Corriger le build cassé

### 1. Supprimer le HTML collé dans `lessons.ts`
Le fichier `src/data/lessons.ts` contient du HTML brut (`<!DOCTYPE html>`) à partir de la ligne 16640. Ce bloc doit être entièrement supprimé et le tableau `lessons` correctement fermé avec `];`.

### 2. Corriger les imports des fonctions backend
Les fichiers `supabase/functions/check-subscription/index.ts`, `create-checkout/index.ts` et `customer-portal/index.ts` importent `npm:@supabase/supabase-js@2.57.2` qui ne se résout pas. Remplacer par l'import standard Deno : `import { createClient } from "https://esm.sh/@supabase/supabase-js@2"`.

## Priorité 2 — Traçage canonique des glyphes

### 3. Ajouter un système de stroke maps dans `GlyphTracingCanvas.tsx`
- Créer un dictionnaire `CANONICAL_STROKES: Record<string, Stroke[]>` où chaque `Stroke` est une liste ordonnée de points `{x, y}` normalisés (0-1) avec des indicateurs de levée de plume
- Si le glyphe a une entrée canonique, utiliser ces segments pour l'animation
- Sinon, utiliser l'algorithme automatique actuel comme fallback
- Intégrer les deux premiers glyphes documentés par tes photos (NTSHI et NSHMU) comme premiers exemples

### 4. Modifier l'animation pour suivre les segments canoniques
- Animer segment par segment dans l'ordre numéroté
- Marquer le Singini au début
- Lever le "stylo" entre les segments non connectés
- Utiliser des courbes de Bézier pour les arcs (fréquents en Mandombe)

## Détails techniques

Fichiers modifiés :
- `src/data/lessons.ts` — suppression HTML, fermeture tableau
- `supabase/functions/check-subscription/index.ts` — fix import
- `supabase/functions/create-checkout/index.ts` — fix import  
- `supabase/functions/customer-portal/index.ts` — fix import
- `src/components/GlyphTracingCanvas.tsx` — ajout stroke maps + animation par segments

Résultat attendu :
- Build qui passe
- Toutes les leçons accessibles
- Traçage canonique fonctionnel pour les glyphes documentés
- Fallback automatique pour les autres

