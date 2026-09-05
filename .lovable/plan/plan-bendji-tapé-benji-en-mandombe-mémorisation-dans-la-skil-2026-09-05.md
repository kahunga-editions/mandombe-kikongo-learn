# Plan : « bendji » tapé « benji » en Mandombe + mémorisation dans la skill

## Règle validée par l'utilisateur
En Mandombe, « bendji » se tape **benji** (et « mbendji » se tape **mbenji**). La translittération latine reste inchangée : « bendji », « mbendji ». C'est un cas de saisie nommé, pas une règle générale sur « ndj ».

## Changements prévus

### 1. Données — `src/data/lessons.ts` (table « Passé composé », lignes ~21294-21299)
Pour chaque ligne, seul le champ `mandombe` change ; les champs `lari`, `fr`, `en` restent tels quels :
- `mandombe: "mbendji"` → `"mbenji"`
- `mandombe: "bendji"` → `"benji"`
- `mandombe: "tu bendji"` → `"tu benji"`
- `mandombe: "lu bendji"` → `"lu benji"`
- `mandombe: "ba bendji"` → `"ba benji"`

### 2. Exercice de reconnaissance — `src/data/lessons.ts` (ligne ~21429)
L'exercice « glyph-to-latin » affiche le glyphe `mbendji` : son champ `mandombe` passe à `"mbenji"`, la réponse latine `lari: "mbendji"` reste inchangée (c'est la translittération).

### 3. Hors scope (vérifié, aucun changement)
- Les autres occurrences de « bendji » dans `lessons.ts` (options d'exercices, appariements) sont des chaînes **latines** : elles ne changent pas.
- `supabase/functions/translate-lari/index.ts` et `lessons-corpus.ts` : chaînes latines uniquement, inchangées.
- `src/data/conjugationSeries.ts` : ne contient pas « bendji ».

### 4. Mémorisation — mise à jour de la skill « taper le Mandombe »
Ajout dans la section « Cas de saisie validés un par un » de `.agents/skills/taper-le-mandombe/SKILL.md` :
- `bendji` → `benji` en Mandombe (le groupe `ndj` se tape `nj`), translittération latine inchangée. Cas nommé, non généralisable.
Puis application de la skill mise à jour pour qu'elle soit active.

### 5. Vérifications
- `tsgo` + lecture de `/tmp/observability/build-errors.log` (build OK attendu).
- Capture Playwright de la page `/conjugations` : la carte « Passé composé » doit montrer les glyphes « benji » avec la translittération « bendji » en dessous, et le surlignage doré doit toujours englober les glyphes (le surlignage cible le dernier mot — « benji » — et fonctionne avec la nouvelle chaîne).
- Vérifier que la page d'exercices de la leçon concernée affiche bien le glyphe « mbenji » pour la réponse « mbendji ».

## Livrable
Sur la page Conjugaisons, le passé composé de « penser » s'écrit « mbenji / benji » en Mandombe avec la translittération « mbendji / bendji » inchangée ; la règle est mémorisée dans la skill de saisie Mandombe pour toutes les sessions futures.
