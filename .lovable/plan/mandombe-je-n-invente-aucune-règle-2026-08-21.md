# Mandombe : je n'invente aucune règle

## Ce que tu m'as dit

Les variations de sons existent bien en Lari (`nzila` / `njila`, `zimi` / `jimi`), mais elles ne sont pas systématiques. Je n'ai aucun moyen de savoir quel mot les admet. Donc je ne fais **aucune** substitution de son, jamais, même quand un rendu me paraît raté.

Les sources de vérité existent déjà :

- le dictionnaire de Nzo Mikanda, qui contient les équivalences quand elles sont attestées
- la partie **Kilolaka** du site, où tous les glyphes Mandombe disponibles sont déjà écrits
- toutes les corrections que tu m'as données au fil des versions

Si une suite n'est pas écrivable (`ntshila`) alors qu'une autre l'est (`nkila`), c'est la forme écrivable attestée qui est utilisée — pas une forme que j'aurais déduite.

## Ce que je change dans la skill « taper le Mandombe »

1. **Supprimer toute règle généralisante que j'avais écrite** : plus de table de remappage de sons, plus de « tel groupe devient tel autre ». Il ne reste que les cas nommés que tu as validés un par un (`tshio` → `kio`, `kua`, `nua`, la règle du N majuscule, pas de voyelle doublée, `y` → `i` après consonne).

2. **Nommer les sources autorisées** : dictionnaire Nzo Mikanda pour les équivalences, page Kilolaka pour l'inventaire des glyphes existants. Aucune autre base.

3. **Conduite quand une suite ne se tape pas** : je ne substitue rien. Je liste les mots concernés et je te demande. Le silence n'est jamais comblé par une invention.

## Inventaire des glyphes

Extraire depuis la page Kilolaka la liste complète des syllabes disponibles, et la déposer comme fichier de référence consultable avant toute saisie Mandombe. Ce fichier sert à répondre à une seule question : « cette suite existe-t-elle ? » — jamais à décider par quoi la remplacer.

## Détails techniques

- `.agents/skills/taper-le-mandombe/SKILL.md` : réécriture des sections « Règles de saisie » et « Interdits », plus une section « Sources autorisées ».
- Inventaire des syllabes extrait de `src/pages/MandombeScript.tsx` / `KilolakaPreview` vers `.agents/skills/taper-le-mandombe/references/glyphes-kilolaka.md`.
- Le lexique de contrôle de la skill reste la liste des corrections que tu as validées ; il s'allonge à chaque correction, il ne se généralise pas.
