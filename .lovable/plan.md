# Dictionnaire : supprimer la fusion automatique et reconstruire depuis une source propre

## Ce qui s'est réellement passé

**1. Les homographes sont écrasés par une règle non demandée.**
Le rapport de génération porte `fusion BA + Ba · maba -> BA, maba`. Le script fusionne deux entrées dès qu'une forme est incluse dans l'autre (`ba` ⊆ `ba, maba`), **sans jamais comparer les sens**. `Ba` (être, exister) et `Ba, maba` (palmier) sont donc devenus une seule entrée. Même mécanisme pour `Bote` (bon/bonne) rapproché de `Mbote` (bonjour), et pour `Banda`. Personne n'a demandé cette fusion : elle a été introduite par le générateur.

**2. Les erreurs connues sont masquées, pas corrigées.**
`scripts/mandombe_graphies.py` contient `"b.awu" → "bawu"`, mais cette table ne répare que le champ Mandombe. Le Lari garde `B.awu diela ye nawu` dans la v29.

**3. Chaque version repart de la précédente.**
`v30` est construite depuis l'ODT `v29`, `v28` depuis `v26`. Le script relit un document déjà transformé et réapplique fusions, nettoyages et majuscules sur du texte déjà traité : de nouvelles erreurs apparaissent à chaque passage.

## Correction

1. **Supprimer la fusion automatique**
   - Retirer les fusions par inclusion de forme, ressemblance, préfixe, mot commun dans les gloses et transitivité.
   - **Un homographe n'est jamais fusionné.** Deux entrées de même graphie et de sens différents restent deux entrées distinctes.
   - Une entrée ne peut regrouper singulier et pluriel que si l'auteur l'a explicitement attesté pour ce mot précis.
   - Tout rapprochement possible est signalé dans un rapport ; il n'est jamais appliqué automatiquement.

2. **Rétablir les entrées corrompues**
   - `Ba` = être, exister — entrée autonome.
   - `Ba, maba` = palmier, palmiers — entrée autonome.
   - `Bote` = bon/bonne et `Mbote` = bonjour — deux entrées autonomes.
   - Revoir `Banda / mabanda` et tous les groupes issus des fusions v27–v29 selon la même règle.

3. **Corriger le texte, pas seulement l'affichage**
   - Toute graphie corrigée s'applique au Lari **et** au Mandombe.
   - Réparer `B.awu` dans le champ Lari et rechercher toutes les formes du même type (point interne, lettre orpheline).

4. **Une seule source de vérité**
   - Reconstruire le livre depuis les données validées du corpus et la liste des arbitrages de l'auteur.
   - Interdire définitivement d'utiliser un ODT généré comme source de la version suivante.

5. **Contrôles bloquants avant toute génération**
   - Aucune entrée ne peut recevoir un sens venant d'une autre entrée.
   - Aucun mot latin avec point interne ou divergence Lari/Mandombe.
   - Tests permanents : `Ba` (être) ≠ `Ba, maba` (palmier), `Bote` ≠ `Mbote`.
   - Si un contrôle échoue, aucun document n'est produit : un rapport est remis à la place.

6. **Une seule reconstruction, vérifiée avant livraison**
   - Contrôle page par page de l'ODT et du PDF avant remise.
   - Livraison d'un document unique, du rapport d'audit, et de la liste courte des cas qui exigent réellement votre arbitrage.

## Engagement

Le générateur n'a aucune compétence linguistique propre : il ne regroupe rien, ne déduit rien, ne comble aucun silence. Deux mots ne sont réunis que si vous l'avez dit. Sinon, ils restent séparés et le cas vous est signalé.
