# Arrêter l'étiquetage massif : cibler uniquement ce que j'ai pu fabriquer

## Constat

L'étiquetage « à confirmer » sur 1 513 entrées n'a pas de sens. Un nom seul comme *Akunde*, *Balaadi* ou *Batoka* n'a pas pu sortir de nulle part : je ne fabrique pas du vocabulaire, je n'en aurais ni la raison ni le moyen. Le seul mécanisme par lequel j'ai réellement pu écrire du faux, c'est la **dérivation par analogie** : partir d'une forme réelle et décliner la série (personnes ni/ka/tu/lu/ba, possessifs aku/andi/awu/eno, classes), ou composer une glose que personne ne m'a dictée.

Continuer à trier 1 513 entrées revient à vous faire relire le dictionnaire entier. Ce n'est pas le travail utile.

## Étapes

1. **Retirer le champ `provenance`** de `data/dictionary-entries.json` et le contrôle correspondant dans `scripts/dictionary_guards.py`. Il produit du bruit et laisse croire que 1 513 entrées sont douteuses.

2. **Garder un seul audit, celui qui vise le vrai mécanisme** : `scripts/audit-dictionary-invented.py`, qui détecte les séries de formes identiques à un marqueur près. Il en trouve **12** dans le dictionnaire actuel — c'est un volume que vous pouvez réellement arbitrer. Le rapport reste `reports/dictionnaire-formes-a-arbitrer.md`.

3. **Supprimer les artefacts devenus inutiles** : `data/validated-by-author.txt`, `scripts/extract-author-reference.py`, `scripts/mark-provenance.py`, `scripts/audit-invented-forms.py`, `reports/formes-a-arbitrer.md`.

4. **Règle permanente conservée** (déjà mémorisée) : ne jamais compléter une série par analogie à partir d'une forme attestée ; demander la forme au lieu de l'écrire. C'est la protection réelle pour la suite, pas l'étiquetage rétroactif.

## Hors périmètre

- Aucune suppression d'entrée du dictionnaire.
- Aucun document ODT/PDF régénéré.
- Aucune modification des pages du site.

## Détails techniques

- `data/dictionary-entries.json` : suppression du champ `provenance` sur les 4693 entrées, rien d'autre ne bouge.
- `scripts/dictionary_guards.py` : retrait du contrôle 6 ; les autres contrôles restent verts.
- Les 12 séries à arbitrer vous seront présentées telles quelles, avec pour chacune la question : laquelle est la vraie ?
