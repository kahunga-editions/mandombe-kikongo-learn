# Réduire la liste « à confirmer » à ce qui mérite arbitrage

## Constat

1 513 entrées étiquetées « a-confirmer » : le filtre actuel est trop strict. Il exige que la forme exacte (ou son premier mot) apparaisse dans les documents de l'autrice. Résultat : 1 119 mots seuls et 394 expressions sont signalés alors que la plupart sont du lari ordinaire simplement absent des textes fournis.

## Étapes

1. **Assouplir le rattachement** dans `scripts/mark-provenance.py` :
   - un mot seul est rattaché si son **radical** (mot sans préfixe de classe mu/mi/ma/ki/bi/di/lu/ka/tu/bu/n) apparaît dans la référence — test fait : 163 mots supplémentaires se rattachent ainsi ;
   - une expression est rattachée si **tous ses mots pleins** (hors marqueurs grammaticaux ni/ka/tu/lu/ba/na/ye/ze…) sont attestés individuellement dans la référence ;
   - les entrées « singulier · pluriel » sont rattachées si l'une des deux formes est attestée.

2. **Régénérer** `reports/formes-a-arbitrer.md` : la liste ne contiendra plus que les vraies inconnues — formes dont ni la forme ni le radical ne se rattachent à ce que l'autrice a fourni. C'est cette liste courte qu'elle arbitrera (valider ou supprimer).

3. **Règle inchangée** : rien n'est supprimé sans arbitrage explicite ; aucun document ODT/PDF n'est régénéré ; les entrées rattachées restent étiquetées « autrice ».

## Hors périmètre

- Aucune modification des pages du site.
- Aucune suppression d'entrée dans cette passe.

## Détails techniques

- Fichier touché : `scripts/mark-provenance.py` (fonction de rattachement), puis ré-exécution pour mettre à jour `data/dictionary-entries.json` (champ `provenance`) et `reports/formes-a-arbitrer.md`.
- `scripts/dictionary_guards.py` doit rester vert après ré-exécution.
