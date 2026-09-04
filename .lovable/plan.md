# Correction « Kue ba ? » dans le dictionnaire en ligne et le traducteur

Aucun nouveau document (pas d'ODT/PDF). Corrections de données uniquement.

## Constat (vérifié dans le code)

- `data/dictionary-entries.json` : « Kue ba? » existe mais porte une glose fausse (« Où vont-elles à l'école ? »). « Kue ba ka? » existe déjà avec la bonne glose (« Où habites-tu ? »).
- `supabase/functions/translate-lari/index.ts` ligne 3701 : « Kue ba? = Où vont-elles ? » — fausse ; aucune ligne pour « Kue ba ka? ».
- `src/data/lessons.ts` lignes 12862 et 12993 : deux occurrences de « Kue ba? » avec la glose « Où vont-elles… ».

## Modifications

1. **Base du dictionnaire** (`data/dictionary-entries.json`)
   - Entrée « Kue ba? » : glose corrigée en « Où habites-tu ? » / « Where do you live? », avec note « On peut aussi dire : Kue ba ka? · EN — One can also say: Kue ba ka? »
   - Entrée « Kue ba ka? » : glose inchangée, ajout de la note symétrique « Variante de : Kue ba? · EN — Variant of: Kue ba? »

2. **Traducteur** (`supabase/functions/translate-lari/index.ts`)
   - Ligne 3701 : « Kue ba? = Où vont-elles ? » → « Kue ba? = Où habites-tu ? »
   - Ajout de la ligne « Kue ba ka? = Où habites-tu ? » juste à côté

3. **Leçons** (`src/data/lessons.ts`, lignes 12862 et 12993)
   - Les deux occurrences « Kue ba? = Où vont-elles (à l'école) ? » sont fausses selon la même règle ; je propose de les corriger en « Où habites-tu ? » (et d'ajouter la variante « Kue ba ka? » si la ligne est dans un tableau de conjugaisons interrogatives).

4. **Mémoire**
   - Ajout dans la mémoire grammaire : « Kue ba? / Kue ba ka? = Où habites-tu ? (ba = habiter, ka enclitique locative) ».

## Contrôles

- `python3 scripts/dictionary_guards.py` → doit rester vert.
- Vérification visuelle Playwright : chercher « Kue ba » dans le dictionnaire en ligne et tester « Kue ba? » dans le traducteur.
- Aucun ODT/PDF régénéré.
