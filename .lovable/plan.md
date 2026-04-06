

# Correction orthographique : "njele" → "ngiele" dans les champs Mandombe

## Règle

Le mot se prononce /njele/ et s'écrit **njele** en Lari, mais en écriture Mandombe il s'écrit **ngiele**. Il faut donc corriger uniquement les champs `mandombe` qui contiennent "njele" → "ngiele", tout en laissant les champs `lari` inchangés.

## Occurrences trouvées (~42 dans `src/data/lessons.ts`)

Les corrections touchent plusieurs leçons :

1. **Phrases** (champs `mandombe`) : partout où `mandombe: "...njele..."` apparaît, remplacer par `"...ngiele..."`. Les champs `lari`, `french`, `english`, `portuguese` restent intacts.

2. **Conjugaisons** (champs `mandombe` dans les tableaux `rows`) : même logique — `mandombe: "Njele yilulu ku mamba"` → `mandombe: "Ngiele yilulu ku mamba"`, etc.

3. **Exercices** (champs `mandombe` dans les items d'exercice + `left`/`right` des matching qui affichent du Mandombe) : remplacer "njele" par "ngiele" dans les champs qui servent au rendu Mandombe.

4. **Distracteurs** : certains distracteurs contiennent "Njele" — corriger aussi en "Ngiele".

**Note** : les ~10 occurrences existantes de "ngiele" (déjà correctes) ne sont pas touchées.

## Fichier modifié

- `src/data/lessons.ts` — remplacement ciblé de "njele"/"Njele" par "ngiele"/"Ngiele" dans tous les champs `mandombe` uniquement (~40 remplacements)

