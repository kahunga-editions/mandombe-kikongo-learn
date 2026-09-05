# Plan : lier forme courte et forme pleine du verbe être

## Objectif
Sur la page `/conjugations`, dans la section « Le verbe être dans tous ses états », faire apparaître la forme pleine à côté de la forme courte, au lieu de les présenter dans deux blocs séparés.

## État actuel vérifié
- `src/data/verbeBa.ts` contient déjà les trois formes par classe : `c` (courte), `f` (pleine), `p` (passé), avec les phrases Mandombe correspondantes (`c_kil`, `f_kil`, `p_kil`).
- `src/pages/Conjugations.tsx` affiche actuellement ces trois formes comme trois éléments de liste distincts, intitulés « Présent (forme courte) », « Présent », « Passé ».

## Changements prévus
1. **Regrouper présent court + présent plein** dans une seule ligne/case par classe, en gardant le passé à part.
   - Afficher la phrase Mandombe de la forme courte.
   - Juste en dessous ou à côté, indiquer « forme pleine : » suivie de la phrase Mandombe de la forme pleine.
   - Conserver la translittération latine et la traduction pour chacune.
2. **Conserver le passé** comme un bloc séparé, car la consigne ne concerne que la relation courte/pleine.
3. **Ajuster légèrement les libellés** pour que le lecteur comprenne immédiatement que la deuxde ligne est la forme pleine associée.
4. **Vérifier visuellement** que le Mandombe ne déborde pas sur le latin après le regroupement (espacement, `break-words`, `line-height`).

## Fichiers concernés
- `src/pages/Conjugations.tsx` (modification de l'affichage du tableau `verbeBaData`).
- Aucune modification de `src/data/verbeBa.ts` ni des autres données n'est nécessaire.

## Livrable
La page `/conjugations` présente pour chaque classe nominale la forme courte et la forme pleine du présent côte à côte ou dans le même encart, avec le passé en dessous.