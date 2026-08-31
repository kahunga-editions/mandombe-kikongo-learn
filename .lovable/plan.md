# Arrêter la dérive du dictionnaire : source unique et fin des retouches en chaîne

## Les deux causes, vérifiées dans le code

**1. Les erreurs sont masquées, pas corrigées.**
`scripts/mandombe_graphies.py` contient déjà `"b.awu" → "bawu"`. Cette table ne répare que le champ **Mandombe**. Le champ Lari n'est jamais nettoyé. Résultat dans la v29 : Mandombe `Bawu diela ye nawu` à côté du Lari `B.awu diela ye nawu`. La faute était connue et laissée visible.

**2. Chaque version repart de la version précédente.**
`v30` est construite depuis l'ODT `v29`, `v28` depuis `v26`. Le script relit un document déjà transformé, puis réapplique fusions, nettoyage de gloses et mises en majuscule sur du texte déjà traité. Chaque passage peut abîmer des entrées correctes : c'est pourquoi de nouvelles erreurs apparaissent à chaque version au lieu de disparaître.

## Correction de fond

1. **Une seule source de vérité**
   - Le livre est reconstruit depuis les données validées du corpus, plus la liste des arbitrages de l'auteur.
   - Interdire définitivement de prendre un ODT généré comme source d'une version suivante.
   - Les corrections de l'auteur sont enregistrées comme entrées de données, jamais comme retouches de document.

2. **Corriger le texte, pas seulement l'affichage**
   - Toute graphie corrigée s'applique au Lari **et** au Mandombe, jamais à un seul des deux.
   - Réparer `B.awu` → `bawu` dans le champ Lari et rechercher tous les cas de même forme (lettre isolée suivie d'un point à l'intérieur d'un mot).
   - Une correction connue ne doit plus pouvoir rester visible dans une colonne.

3. **Supprimer l'inférence linguistique**
   - Retirer les fusions fondées sur ressemblance, préfixe, mot commun dans les gloses ou transitivité — la cause de `Bote` fusionné avec `Mbote`.
   - Rétablir **Bote = bon/bonne** et **Mbote = bonjour** comme deux entrées indépendantes.
   - Un doute produit un signalement, jamais une décision.

4. **Contrôles bloquants avant toute génération**
   - Refuser un mot latin contenant un point interne, une lettre orpheline ou un résidu de découpe.
   - Refuser toute divergence entre le Lari et le Mandombe d'une même entrée.
   - Refuser tout couple `forme ↔ sens` modifié sans arbitrage attesté ; test permanent `Bote ≠ Mbote`.
   - Si un contrôle échoue, aucun document n'est produit : un rapport est remis à la place.

5. **Une seule reconstruction, contrôlée avant livraison**
   - Reconstruire le livre FR/EN depuis la source propre, sans réutiliser la v29.
   - Vérifier page par page l'ODT et le PDF avant de vous les remettre.
   - Livrer un document unique, le rapport d'audit, et la courte liste des cas qui exigent réellement votre arbitrage.

## Engagement

Fin des versions successives : plus aucun document n'est publié tant que les contrôles ne passent pas. Le système reste un lecteur de corpus — absence de preuve = absence de relation — et il ne vous soumet plus la relecture d'erreurs qu'il pouvait détecter lui-même.
