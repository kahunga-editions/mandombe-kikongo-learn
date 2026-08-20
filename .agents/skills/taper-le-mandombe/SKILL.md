---
name: taper-le-mandombe
description: Règles de saisie du Mandombe pour les champs mandombe, dictionnaire, leçons, traducteur, export du livre et illustrations de glyphes. S'active dès qu'il faut encoder un mot en Mandombe.
---

# Skill : taper le Mandombe

Le Mandombe est **l'écriture du Kikongo Lari**, comme le hangeul est l'écriture du coréen. Le champ `mandombe` contient **le même mot** que le champ Lari. Aucun remplacement de son n'est jamais autorisé : `nj` ≠ `nz`, `dz` ≠ `dj`, `z` ≠ `j`.

Si un rendu semble mal passé, la cause est une faute de saisie dans le corpus ou une règle de frappe de la police, jamais une raison de changer le mot.

## Règles de saisie autorisées (le mot reste identique)

- jamais deux voyelles identiques à la suite : `Iyaa` → `Iya`, `Laadi` → `Ladi`
- `tshio` → `kio`, `tshie` → `kie` (ex. `Tshioni` → `Kioni`)
- `ia` final de mot long → `iya` en Mandombe seulement (`tilapia` → `tilapiya`)
- apostrophe retirée dans le cas `nl` : `n'lemvo` → `nlemvo` (l'apostrophe note la parenté avec `mulemvo`)
- **règle du N majuscule** : un mot en `N'` + consonne se tape tel quel avec un **N majuscule** : `N'kila`, `N'kento`, `N'kumba`, `N'kelo`, `N'kalu`, `N'kolo`, `N'kama`, `N'ti`, `N'tima`, `N'tekolo`. L'apostrophe note un son guttural très doux. `Ntshila` est la prononciation, jamais la saisie.
- `nua` se tape normalement en Mandombe et se rend correctement (ne pas le transformer)
- `y` après consonne → `i` (`fyu` → `fiu`, `kya` → `kia`) ; le `y` initial est conservé (`ya`, `yandi`)
- noms propres avec majuscule : `Paul` → `Paulo`
- ponctuation : elle fait partie du bloc Mandombe et se compose avec la police Mandombe, jamais en latin noir

## Interdits explicites

- ne jamais substituer une consonne pour contourner un défaut de ligature
- ne jamais inventer une graphie : si une suite ne se tape pas, produire un rapport et demander
- ne jamais laisser une lettre latine résiduelle dans un rendu Mandombe
- ne jamais exporter en DOCX un document contenant du Mandombe (ODT et PDF uniquement)

## Lexique de contrôle (erreurs à ne pas reproduire)

- `Bunkunju` n'existe pas — la racine est `Nkunzu` (cru), `Bunkunzu` (ce qui est cru)
- `Kue` = où
- `Lowa` = les êtres du Soleil
- `Lupungunzala` = libellule
- `Tshioni` = grippe aviaire
- `Bunutnu` n'existe pas
- `Tueri` = « nous étions », du verbe `ba` = être

## Procédure de vérification

Avant toute modification d'un champ `mandombe` :

1. Lancer `scripts/audit-mandombe-latin.ts`
2. Rendre les mots suspects via une sonde Chromium avec `masono_mandombe-webfont.ttf`
3. Soumettre le rapport à l'utilisateur avant de changer quoi que ce soit

## Références techniques

- `src/lib/mandombeText.ts` — fonction `cleanMandombe`, seule couche de transformation autorisée
- `scripts/audit-mandombe-latin.ts` — contrôle de base contre les caractères non alphabétiques
