# Skill « taper le Mandombe »

Créer une skill permanente qui contient les règles de saisie du Mandombe, pour qu'aucune session future ne réinvente des graphies ni ne propose de substitutions phonétiques.

## Principe que la skill grave en dur

Le Mandombe est **l'écriture du Kikongo Lari**, comme le hangeul est l'écriture du coréen. Le champ `mandombe` contient le mot Lari lui-même, jamais un mot différent. Aucun remplacement de son n'est jamais autorisé : `nj` ≠ `nz`, `dz` ≠ `dj`, `z` ≠ `j`.

Si un mot semble mal rendu, la cause est soit une faute de saisie dans le corpus, soit une règle de frappe de la police — jamais une raison de changer le mot.

## Contenu de la skill

**1. Règles de frappe validées** (ajustements de saisie uniquement, le mot reste identique)

- jamais deux voyelles identiques à la suite : `Iyaa` → `Iya`, `Laadi` → `Ladi`
- `tshio` → `kio`, `tshie` → `kie` (ex. `Tshioni` → `Kioni`)
- `ia` final de mot long → `iya` en Mandombe seulement (`tilapia` → `tilapiya`)
- pas d'apostrophe : `n'lemvo` → `nlemvo`
- exception : `N'kila` se tape tel quel avec un **N majuscule**, ce qui donne le bon glyphe. `Ntshila` n'est que la prononciation et ne doit jamais être saisi
- `y` après consonne → `i` (`fyu` → `fiu`, `kya` → `kia`) ; le `y` initial est conservé (`ya`, `yandi`)
- noms propres avec majuscule ; `Paul` → `Paulo`
- ponctuation : elle fait partie du bloc Mandombe et se compose avec la police Mandombe, jamais en latin noir

**2. Interdits explicites**

- ne jamais substituer une consonne pour contourner un défaut de ligature
- ne jamais inventer une graphie : si une suite ne se tape pas, produire un rapport et demander, sans rien modifier
- ne jamais laisser une lettre latine résiduelle dans un rendu Mandombe
- ne jamais exporter en DOCX un document contenant du Mandombe (ODT et PDF uniquement)

**3. Lexique de contrôle** (erreurs déjà commises, à ne pas reproduire)

`Bunkunju` n'existe pas — la racine est `Nkunzu` (cru), `Bunkunzu` (ce qui est cru). `Kue` = où. `Lowa` = les êtres du Soleil. `Lupungunzala` = libellule. `Tshioni` = grippe aviaire. `Bunutnu` et `Tueri` = quatre n'existent pas.

**4. Procédure de vérification**

Avant toute modification d'un champ `mandombe` : lancer `scripts/audit-mandombe-latin.ts`, puis rendre les mots suspects via une sonde Chromium avec `masono_mandombe-webfont.ttf`, et soumettre le rapport avant de changer quoi que ce soit.

## Détails techniques

- Skill écrite dans `.agents/skills/taper-le-mandombe/SKILL.md`, puis activée.
- Description de déclenchement ciblée : champs `mandombe`, dictionnaire, leçons, traducteur, export du livre, illustrations de glyphes.
- La skill référence `src/lib/mandombeText.ts` (`cleanMandombe`) comme unique couche de transformation, et `scripts/audit-mandombe-latin.ts` comme contrôle.
- Aucune modification du corpus dans cette étape : la skill est purement de la connaissance.
