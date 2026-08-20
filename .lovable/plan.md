# Correction du Mandombe : aucune invention, aucune lettre latine

## Principe

Le Mandombe est **l'écriture du Kikongo Lari**, rien d'autre. Comme le hangeul pour le coréen : ce n'est pas une langue ni une variante, c'est le même mot, écrit avec l'autre écriture. Le champ `mandombe` contient donc exactement le mot Lari.

Les seuls ajustements admis servent à obtenir le bon glyphe avec la police, jamais à changer le mot :

- jamais deux voyelles identiques à la suite (`Iyaa` → `Iya`)
- `tshio` → `kio`, `tshie` → `kie`
- `ia` final long → `iya`
- pas d'apostrophe, sauf `N'kila` : on tape `N'kila` avec un N majuscule, ce qui donne le bon glyphe (surtout pas `Ntshila`, qui n'est que la prononciation)
- `y` de la translittération → `i` (`fyu` → `fiu`)
- noms propres avec majuscule (`Paul` → `Paulo`)

Aucun remplacement de son n'est autorisé. `nj` ≠ `nz`, `dz` ≠ `dj`. La table de remappage phonétique proposée précédemment est abandonnée.

## Ce qui est corrigé

1. **Bunkunzu** — `Bunkunju` n'existe pas. La racine est `Nkunzu` (cru) et `Bunkunzu` (ce qui est cru). Les 2 occurrences fautives dans `src/data/lessons.ts` (dont un exercice) sont corrigées en `Bunkunzu`.

2. **Audit des divergences** — pour chaque entrée du corpus, le champ `mandombe` doit être le mot Lari lui-même. Toute lettre différente est une faute de saisie et est corrigée sur le mot réel (`Njo` → `Nzo`, etc.), pas par substitution phonétique.

3. **Lettres latines résiduelles** — pour les suites que la police ne ligature pas, je ne substitue rien et je n'invente rien. Je produis un rapport listant chaque mot concerné avec son rendu, et je te le soumets. Rien n'est modifié sans ta validation mot par mot.

4. **N'kila mulemvo** — la graphie `N'kila` est rétablie là où elle a été remplacée par `Ntshila`.

## Garde-fous

- Règle ajoutée dans `scripts/lari-variant-rules.json` : interdiction de toute substitution de consonne entre le mot Lari et son écriture Mandombe.
- Contrôle QA dans `scripts/qa-dictionary-core.ts` : échec si un champ `mandombe` diverge du mot Lari au-delà des ajustements de saisie listés plus haut.

## Régénération

Une fois le corpus corrigé et le rapport de résidus validé par toi :

- `dictionnaire-lari-v26.odt` (trilingue)
- volumes coréens v3 (Vol. I / Vol. II)

Format ODT uniquement.

## Détails techniques

- Source des entrées : l'ODT v20 corrigé manuellement + `src/data/lessons.ts`.
- `cleanMandombe` (`src/lib/mandombeText.ts`) reste la seule couche de transformation ; aucune règle phonétique n'y est ajoutée, et l'exception `N'kila` y est prise en compte.
- Le rapport de résidus latins est généré par sonde de rendu Chromium sur la police `masono_mandombe-webfont.ttf`, en HTML + Markdown.
