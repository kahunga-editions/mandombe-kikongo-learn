# Dictionnaire : reconstruire une bonne fois depuis la source, pas depuis une version fausse

## Ce qui s'est réellement passé

**1. Repartir d'une version fausse propage les fautes.**
`v30` est construite depuis l'ODT `v29`, `v28` depuis `v26`. Le script relit un document déjà transformé et réapplique fusions, nettoyages et majuscules sur du texte déjà traité. Les fautes survivent, de nouvelles apparaissent, et le compteur de versions monte sans jamais converger. Cette méthode s'arrête ici.

**2. Vos consignes ont été imprimées comme du contenu.**
Le livre porte `Ba mindele — Les choses qui appartiennent aux Blancs (deux mots).` La mention « (deux mots) » était une instruction pour moi. Elle n'apprend rien au lecteur, qui voit l'espace.

**3. Les homographes ont été fusionnés par une règle non demandée.**
Le rapport porte `fusion BA + Ba · maba -> BA, maba` : le script fusionne dès qu'une forme est incluse dans une autre, **sans comparer les sens**. `Ba` (être) a absorbé `Ba, maba` (palmier). Même mécanisme pour `Bote` / `Mbote` et `Banda`.

**4. Les erreurs connues sont masquées, pas corrigées.**
`scripts/mandombe_graphies.py` répare `"b.awu" → "bawu"` uniquement dans le champ Mandombe ; le Lari garde `B.awu`.

## Correction

1. **Source unique, reconstruction unique**
   - Reconstruire depuis les données validées du corpus et la liste de vos arbitrages.
   - Interdire définitivement d'utiliser un ODT généré comme source d'une version suivante.
   - Vos corrections deviennent des entrées de données, jamais des retouches de document.

2. **Séparer vos consignes du contenu du livre**
   - Retirer `(deux mots)` de l'entrée `Ba mindele` et toutes les mentions du même genre.
   - Une instruction de saisie ne s'imprime jamais : elle vit dans les règles du générateur.
   - Ne conserver comme note publiée que ce qui aide réellement le lecteur — prononciation, sens, usage.

3. **Supprimer la fusion automatique**
   - Retirer les fusions par inclusion de forme, ressemblance, préfixe, mot commun ou transitivité.
   - **Un homographe n'est jamais fusionné** : `Ba` (être) et `Ba, maba` (palmier) restent séparés, comme `Bote` et `Mbote`.
   - Singulier et pluriel ne sont réunis que si vous l'avez attesté pour ce mot précis.
   - Tout rapprochement possible est signalé, jamais appliqué.

4. **Corriger le texte, pas l'affichage**
   - Toute graphie corrigée s'applique au Lari **et** au Mandombe.
   - Réparer `B.awu` dans le champ Lari et tous les cas du même type.

5. **Contrôles bloquants**
   - Aucune entrée ne reçoit un sens venant d'une autre.
   - Aucune note de travail dans le texte publié ; aucun mot latin avec point interne ; aucune divergence Lari/Mandombe.
   - Tests permanents : `Ba` (être) ≠ `Ba, maba` (palmier), `Bote` ≠ `Mbote`.
   - Si un contrôle échoue, aucun document n'est produit — vous recevez un rapport, pas une version de plus.

6. **Vérification avant remise**
   - Contrôle page par page de l'ODT et du PDF.
   - Livraison d'un document unique, du rapport d'audit, et de la liste courte des cas qui exigent votre arbitrage.

## Engagement

Plus de chaîne de versions. Le générateur ne regroupe rien, ne déduit rien, n'imprime aucune note qui vous était destinée. Deux mots ne sont réunis que si vous l'avez dit ; sinon ils restent séparés et le cas vous est signalé.
