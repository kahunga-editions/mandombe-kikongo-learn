# Correction du Mandombe : aucune invention, aucune lettre latine

## Principe (règle déjà donnée, appliquée strictement)

Le champ `mandombe` est **le même mot que le Lari**. Il ne peut différer que par les transformations déjà validées :

- jamais deux voyelles identiques à la suite (`Iyaa` → `Iya`)
- `tshio` → `kio`, `tshie` → `kie`
- `ia` final long → `iya` (en Mandombe seulement)
- pas d'apostrophe (`n'lemvo` → `nlemvo`)
- `y` de la translittération → `i` en Mandombe (`fyu` → `fiu`)
- `N'kila mulemvo` → `Ntshila mulemvo`
- noms propres avec majuscule (`Paul` → `Paulo`)

Aucun remplacement de son n'est autorisé. `nj` ≠ `nz`, `dz` ≠ `dj`. La table de remappage phonétique proposée précédemment est abandonnée.

## Ce qui est corrigé

1. **Bunkunzu** — le mot du dictionnaire est `Bunkunzu`. Le champ Mandombe contient `Bunkunju` (2 occurrences dans `src/data/lessons.ts`, dont un exercice). Correction en `Bunkunzu`.

2. **Audit z/j et autres divergences** — pour chaque entrée du corpus, comparer le champ `mandombe` au Lari après application des seules transformations autorisées ci-dessus. Toute divergence non autorisée (lettre changée, son substitué) est ramenée sur le Lari. Les 13 entrées repérées (`Budjabu`, `Njo`, `Nzeka`, etc.) sont traitées par cette règle : le Mandombe suit le Lari, pas l'inverse.

3. **Lettres latines résiduelles** — pour les suites que la police ne ligature pas, je ne substitue rien. Je produis un rapport listant chaque mot concerné avec son rendu, et je te le soumets avant toute modification. Rien n'est changé sans ta validation mot par mot.

## Garde-fous

- Règle ajoutée dans `scripts/lari-variant-rules.json` : interdiction de toute substitution de consonne entre Lari et Mandombe.
- Contrôle QA dans `scripts/qa-dictionary-core.ts` : échec si un champ `mandombe` diverge du Lari au-delà des transformations autorisées.

## Régénération

Une fois le corpus corrigé et le rapport de résidus validé par toi :
- `dictionnaire-lari-v26.odt` (trilingue)
- volumes coréens v3 (Vol. I / Vol. II)

Format ODT uniquement, comme demandé.

## Détails techniques

- Source des entrées : l'ODT v20 corrigé manuellement + `src/data/lessons.ts`.
- `cleanMandombe` (`src/lib/mandombeText.ts`) reste la seule couche de transformation ; aucune règle phonétique n'y est ajoutée.
- Le rapport de résidus latins est généré par sonde de rendu Chromium sur la police `masono_mandombe-webfont.ttf`, en HTML + Markdown.
