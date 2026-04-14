

# Synchronisation automatique : corrections du traducteur → dictionnaire

## Objectif
Quand un admin corrige ou ajoute une traduction via le traducteur (table `translation_corrections`), ces entrées apparaissent automatiquement dans le dictionnaire "Buku dia Binsono", sans intervention manuelle.

## Approche
Le dictionnaire est actuellement construit uniquement à partir des données statiques (`src/data/lessons.ts`). On va le compléter en chargeant aussi les entrées de `translation_corrections` au montage du composant, puis les fusionner avec les entrées statiques (dédupliquées par clé Lari).

## Modifications

### 1. `src/pages/Dictionary.tsx` (~30 lignes)
- Au montage, requête Supabase : `SELECT * FROM translation_corrections WHERE target_lang = 'lari'`
- Aussi charger les corrections inverses : `SELECT * FROM translation_corrections WHERE source_lang = 'lari'`
- Mapper chaque correction vers le format `DictionaryEntry` :
  - Pour `target_lang = 'lari'` : `lari = corrected_translation`, `mandombe = corrected_mandombe`, traduction = `source_text`
  - Pour `source_lang = 'lari'` : `lari = source_text`, `mandombe = corrected_mandombe`, traduction = `corrected_translation`
  - `category` = "Traducteur" (catégorie dédiée pour les distinguer)
- Fusionner avec `buildDictionary()`, en évitant les doublons (même clé Lari)
- Mettre à jour l'alphabet et les filtres dynamiquement

### 2. RLS
Aucun changement nécessaire — la policy "Authenticated can read corrections" permet déjà la lecture. Pour les utilisateurs non connectés, on ajoutera une policy `anon` en lecture seule si nécessaire, ou on gérera gracieusement un résultat vide.

## Portée
- 1 fichier modifié : `src/pages/Dictionary.tsx`
- 0 migration, 0 nouvelle dépendance

