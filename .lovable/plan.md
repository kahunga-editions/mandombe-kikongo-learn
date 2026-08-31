# Fiabiliser le dictionnaire sans nouvelle série de versions

## Cause confirmée

Le corpus distingue bien **Bote = bon/bonne** et **Mbote = bonjour**. L'erreur n'a pas été trouvée dans le corpus : elle a été créée par le générateur du livre.

La fusion automatique rapproche des entrées selon des ressemblances orthographiques ou des mots communs dans les gloses, puis répète ces rapprochements jusqu'à un « point fixe ». Elle a fusionné **Bote** avec une entrée contenant **Mbote**, puis propagé l'association dans les index. La v30, construite depuis la v29, en hérite.

## Changement de méthode

1. **Gel immédiat des versions automatiques**
   - Aucune v31, v32, etc. ne sera produite par succession de corrections ponctuelles.
   - L'export du livre reste bloqué tant que les fusions automatiques peuvent inventer une relation.
   - L'auteur n'aura qu'un lot consolidé à relire, plus une série interminable d'artefacts.

2. **Retirer l'inférence linguistique du générateur**
   - Supprimer les fusions fondées sur ressemblance, préfixe, mot commun ou transitivité.
   - N'autoriser qu'une relation explicitement attestée dans les données validées par l'auteur.
   - En cas de doute : conserver les entrées séparées et les lister dans un rapport ; ne jamais trancher automatiquement.

3. **Audit intégral hors livre**
   - Rejouer toutes les fusions v27–v29 contre les entrées sources du corpus Nzo Mikanda.
   - Produire un rapport trié en trois catégories : relation attestée, conflit à arbitrer, relation non attestée à supprimer.
   - Corriger en particulier **Bote — bon/bonne** et **Mbote — bonjour** comme deux entrées indépendantes.
   - Ne pas modifier les phrases attestées où *bote* signifie « bon/bien » ni celles où *Mbote* est une salutation.

4. **QA bloquante anti-invention**
   - Refuser toute entrée dont le couple exact `forme Lari ↔ sens` a changé sans relation attestée.
   - Refuser l'utilisation d'une traduction générée comme preuve d'une fusion.
   - Ajouter un test permanent : **Bote ≠ Mbote** et **Mbote seul ne signifie pas bon/bonne**.
   - Faire échouer l'export complet si une fusion automatique ou une glose non sourcée demeure.

5. **Une seule reconstruction finale**
   - Reconstruire le livre FR/EN depuis les entrées attestées, sans reprendre les fusions corrompues de la v29.
   - Contrôler **Bote** et **Mbote** dans l'entrée principale et dans les trois index, en ODT et PDF.
   - Livrer un unique document corrigé accompagné du rapport d'audit et de la courte liste des cas nécessitant l'arbitrage de l'auteur.

## Règle définitive

Le système reste un **lecteur de corpus sans compétence linguistique propre** : absence de preuve = absence de relation. Il peut signaler un rapprochement suspect, mais jamais le publier comme équivalence.
