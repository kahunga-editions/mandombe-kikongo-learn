

# Page Admin — Gestion des corrections de traduction

## Objectif
Créer une page `/admin/corrections` accessible uniquement aux admins, listant toutes les corrections sauvegardées avec possibilité de les modifier ou supprimer.

## Modifications

### 1. Nouvelle page `src/pages/AdminCorrections.tsx`
- Tableau affichant : source_text, source_lang → target_lang, corrected_translation, corrected_mandombe, notes, date
- Bouton supprimer par ligne (avec confirmation via AlertDialog)
- Bouton éditer inline (bascule les cellules en inputs éditables, sauvegarde via upsert)
- Barre de recherche pour filtrer par texte source
- Protection : si `!isAdmin`, redirection vers `/`
- Utilise les composants UI existants (Table, Button, Input, AlertDialog)

### 2. Route dans `src/App.tsx`
- Ajouter `<Route path="/admin/corrections" element={<AdminCorrections />} />`

### 3. Lien dans `src/components/Navbar.tsx`
- Ajouter un lien "Corrections" visible uniquement pour les admins, à côté du badge Admin

### 4. RLS
- La table `translation_corrections` a déjà les bonnes policies : admins full CRUD, authenticated read-only. Aucune migration nécessaire.

## Portée
- 1 fichier créé : `src/pages/AdminCorrections.tsx`
- 2 fichiers modifiés : `src/App.tsx` (1 ligne), `src/components/Navbar.tsx` (~3 lignes)

