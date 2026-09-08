# « Tu seras » : le résultat existe, mais il est invisible

## Ce que j'ai vérifié

En tapant « tu seras » sur la page Conjugaisons, la ligne **mbo ba — Tu seras.** est bien trouvée et affichée (vérifié à l'écran). Le problème est ailleurs : la grande section « Le verbe être dans tous ses états » reste affichée en entier, quoi qu'on tape. Elle occupe plusieurs écrans. Le résultat cherché se retrouve donc très loin plus bas, et on a l'impression que la recherche ne fait rien.

## Correction

1. **La recherche filtre toute la page.** Quand on tape quelque chose, la section « Le verbe être dans tous ses états » ne montre plus que les cases dont la phrase, la translittération ou la traduction correspondent — et disparaît entièrement si rien ne correspond.

2. **Le résultat vient tout de suite sous la barre de recherche.** Dès qu'une recherche est en cours, la page affiche d'abord les tableaux trouvés, puis descend automatiquement sur la zone de résultats, pour qu'on voie la réponse sans faire défiler.

3. **Un repère clair.** Sous la barre de recherche, une petite ligne indique le nombre de résultats (« 3 résultats pour “tu seras” ») et, s'il n'y en a aucun, le message « Aucune conjugaison trouvée » apparaît immédiatement au même endroit plutôt qu'en bas de page.

## Ce qui ne change pas

- Aucune donnée linguistique créée ni modifiée.
- Sans recherche en cours, la page reste exactement comme aujourd'hui.
- Aucun document (ODT/PDF) régénéré.

## Détail technique

- `src/pages/Conjugations.tsx` : filtrage de `verbeBaData` par la même fonction `norm`, ordre d'affichage conditionné à `query`, `scrollIntoView` sur la section des résultats, compteur et message vide déplacés sous la barre de recherche.
- Vérification : `bunx tsgo --noEmit -p tsconfig.app.json`, journal de build, puis capture Playwright de `/conjugations` avec la recherche « tu seras ».
