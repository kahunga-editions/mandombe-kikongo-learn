---
name: taper-le-mandombe
description: Règles de saisie du Mandombe pour les champs mandombe, dictionnaire, leçons, traducteur, export du livre et illustrations de glyphes. S'active dès qu'il faut encoder un mot en Mandombe.
---

# Skill : taper le Mandombe

Le Mandombe est **l'écriture du Kikongo Lari**, comme le hangeul est l'écriture du coréen. Le champ `mandombe` contient **le même mot** que le champ Lari.

## Principe unique

**Ne jamais inventer de règle.** Des variations de sons existent en Lari (`nzila` / `njila`, `zimi` / `jimi`), mais elles ne sont pas systématiques : rien ne permet de deviner quel mot les admet. Donc aucune substitution de son n'est faite, jamais, même quand un rendu paraît raté.

Un cas observé une fois n'est pas une règle. Ne généraliser aucun exemple.

## Sources autorisées

1. le dictionnaire de Nzo Mikanda — pour les équivalences quand elles sont attestées
2. `references/glyphes-kilolaka.md` — inventaire des glyphes existants, extrait de la page Kilolaka du site
3. les corrections validées par l'utilisateur, listées plus bas

Aucune autre base. Pas de déduction phonétique personnelle.

## Cas de saisie validés un par un

Ce sont des cas nommés, pas des règles générales. Ne rien en extrapoler.

- jamais deux voyelles identiques à la suite : `Iyaa` → `Iya`, `Laadi` → `Ladi`
- `tshio` → `kio`, `tshie` → `kie` (ex. `Tshioni` → `Kioni`)
- `ia` final de mot long → `iya` en Mandombe seulement (`tilapia` → `tilapiya`)
- `bendji` se tape `benji` en Mandombe (`mbendji` → `mbenji`, `tu bendji` → `tu benji`, etc.) ; la translittération latine reste `bendji` / `mbendji`. Cas nommé, non généralisable au groupe `ndj`.
- apostrophe retirée dans le cas `nl` : `n'lemvo` → `nlemvo`
- **règle du N majuscule** : un mot en `N'` + consonne se tape tel quel avec un **N majuscule** : `N'kila`, `N'kento`, `N'kumba`, `N'kelo`, `N'kalu`, `N'kolo`, `N'kama`, `N'ti`, `N'tima`, `N'tekolo`. `Ntshila` est la prononciation, jamais la saisie.
- `nua` se tape tel quel
- `kua` se tape `k-u-a` : le glyphe existe. Ne jamais taper `kuwa`.
- `y` après consonne → `i` (`fyu` → `fiu`, `kya` → `kia`) ; le `y` initial est conservé (`ya`, `yandi`)
- noms propres avec majuscule : `Paul` → `Paulo`
- ponctuation : elle fait partie du bloc Mandombe et se compose avec la police Mandombe, jamais en latin noir
- cartes d'illustration de mots : uniquement le mot en Mandombe et sa translittération, aucune traduction

## Conduite quand une suite ne se tape pas

1. ne substituer aucune consonne, aucune voyelle
2. lister les mots concernés dans un rapport
3. demander à l'utilisateur et attendre sa réponse

Le silence n'est jamais comblé par une invention.

## Interdits

- ne jamais substituer un son pour contourner un défaut de rendu (`nj` ≠ `nz`, `dz` ≠ `dj`, `z` ≠ `j`)
- ne jamais construire une table de remappage de sons
- ne jamais laisser une lettre latine résiduelle dans un rendu Mandombe
- ne jamais exporter en DOCX un document contenant du Mandombe (ODT et PDF uniquement)

## Lexique de contrôle (corrections validées, à ne pas reproduire à l'envers)

Cette liste s'allonge à chaque correction de l'utilisateur ; elle ne se généralise pas.

- `Bunkunju` n'existe pas — la racine est `Nkunzu` (cru), `Bunkunzu` (ce qui est cru)
- `Kue` = où
- `Lowa` = les êtres du Soleil
- `Lupungunzala` = libellule
- `Tshioni` = grippe aviaire
- `Bunutnu` n'existe pas
- `Tueri` = « nous étions », du verbe `ba` = être

## Procédure de vérification

Avant toute modification d'un champ `mandombe` :

1. vérifier l'existence de la suite dans `references/glyphes-kilolaka.md`
2. lancer `scripts/audit-mandombe-latin.ts`
3. rendre les mots suspects via une sonde Chromium avec `masono_mandombe-webfont.ttf`
4. soumettre le rapport à l'utilisateur avant de changer quoi que ce soit

## Références techniques

- `references/glyphes-kilolaka.md` — inventaire des glyphes disponibles
- `src/lib/mandombeText.ts` — fonction `cleanMandombe`, seule couche de transformation autorisée
- `scripts/audit-mandombe-latin.ts` — contrôle contre les caractères non alphabétiques
