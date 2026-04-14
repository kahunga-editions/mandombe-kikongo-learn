

# Rendre les notes éditables par l'admin dans le traducteur

## Objectif
Permettre à l'admin d'éditer aussi le champ "notes" (l'analyse linguistique) en mode édition, en plus de la traduction déjà éditable. Les notes corrigées seront sauvegardées avec le reste de la correction.

## Modifications

### 1. `src/pages/Translator.tsx` (~10 lignes modifiées)
- Dans le bloc "Notes" (lignes 367-374), basculer entre un `<p>` en lecture et un `<Textarea>` en mode édition (quand `isEditing && isAdmin`)
- Le `Textarea` met à jour `result.notes` via `setResult`
- La fonction `saveCorrection` envoie déjà `result.notes` dans le body — aucun changement nécessaire côté sauvegarde

### 2. Aucun autre fichier modifié
- L'edge function `translate-lari` accepte déjà le champ `notes` dans la correction
- La table `translation_corrections` a déjà la colonne `notes`

## Portée
- 1 fichier modifié : `src/pages/Translator.tsx` (~10 lignes)

