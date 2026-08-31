# Stopper les significations inventées dans le dictionnaire

## Cause confirmée

Le corpus distingue bien **Bote = bon/bonne** et **Mbote = bonjour**. L'erreur n'a pas été trouvée dans le corpus : elle a été créée par le générateur du livre.

La fusion automatique de la v28 rapproche des entrées lorsqu'elles partagent une forme ou des mots de traduction, puis répète ces rapprochements jusqu'à un « point fixe ». Elle a fusionné **Bote** avec une entrée contenant **Mbote**, puis propagé cette association dans les index. La v30 étant construite depuis la v29, elle hérite de cette corruption.

## Corrections

1. **Supprimer l'inférence linguistique du générateur**
   - Retirer toute fusion fondée sur la ressemblance orthographique, un préfixe, un mot commun dans les gloses ou une fusion transitive.
   - N'autoriser une fusion singulier/pluriel ou variante que si le lien est explicitement attesté dans les données validées par l'auteur.
   - En cas de doute, conserver deux entrées séparées et signaler le cas ; ne jamais choisir automatiquement.

2. **Réparer Bote / Mbote partout**
   - Conserver deux entrées indépendantes : **Bote — bon/bonne** et **Mbote — bonjour**.
   - Corriger les index Kikongo Lari, français et anglais ainsi que les données intermédiaires contaminées.
   - Ne pas modifier les phrases attestées où *bote* signifie « bon/bien » ni celles où *Mbote* est une salutation.

3. **Auditer toutes les anciennes fusions automatiques**
   - Rejouer la liste des fusions v27–v29 sans les accepter comme vérité.
   - Comparer chaque groupe aux entrées sources du corpus Nzo Mikanda.
   - Produire un rapport séparant : fusion explicitement attestée, conflit, et relation absente du corpus.
   - Bloquer la génération tant qu'un conflit non arbitré demeure.

4. **Ajouter une QA bloquante anti-invention**
   - Vérifier qu'aucune forme Lari n'acquiert une traduction provenant d'une autre entrée sans relation attestée.
   - Ajouter un test de non-régression explicite pour **Bote ≠ Mbote**.
   - Faire échouer l'export si une fusion modifie le couple exact `forme Lari ↔ sens attesté`.
   - Interdire aux traductions générées automatiquement de servir de preuve pour fusionner des entrées.

5. **Régénérer et contrôler le livre**
   - Reconstruire la version FR/EN corrigée depuis les entrées attestées, sans reprendre les fusions corrompues de la v29.
   - Vérifier dans l'ODT et le PDF les trois index et l'entrée principale de **Bote** et **Mbote**.
   - Fournir le rapport d'audit avec les documents corrigés.

## Règle définitive

Le système reste un **lecteur de corpus sans compétence linguistique propre** : absence de preuve = absence de relation. Il peut détecter et signaler un rapprochement, mais jamais le publier comme équivalence.
