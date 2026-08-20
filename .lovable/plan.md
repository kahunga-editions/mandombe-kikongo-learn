# Correction globale de `eN —` dans le dictionnaire

## Correction

1. Modifier le nettoyage des notes bilingues pour préserver strictement les étiquettes `FR —` et `EN —` en majuscules.
2. Empêcher la règle « pas de majuscule après un point-virgule » de modifier les sigles et étiquettes de langue.
3. Régénérer l'ODT et le PDF depuis la source v20 corrigée et vérifiée par son empreinte, sans toucher aux sens ni à la ponctuation Mandombe validée.

## Contrôles bloquants

- Rechercher `eN`, `fR` et toute autre casse mixte équivalente dans tout le document : résultat attendu, zéro occurrence.
- Vérifier les 208 occurrences actuellement touchées, notamment la note de `Bala` : `Pluriel de muana ; EN — Plural of muana`.
- Vérifier que les minuscules normales après un point-virgule restent inchangées.
- Contrôler que `Bieri`, `Bele mpimpa` et la ponctuation Mandombe conservent les corrections validées.
- Inspecter visuellement toutes les pages du PDF avant livraison.

## Livrables

- Nouvelle version ODT et PDF corrigée.
- Rapport indiquant le nombre d'occurrences avant/après et le résultat des contrôles de casse.
