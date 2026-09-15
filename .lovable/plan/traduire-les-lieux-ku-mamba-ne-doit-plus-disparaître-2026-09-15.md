# Traduire les lieux : « ku mamba » ne doit plus disparaître

## Le problème

Pour la phrase **Njele yilulu ku mamba**, le traducteur rend « J'ai mis du temps » et laisse tomber **ku mamba = à la rivière**.

Deux causes vérifiées dans le corpus du traducteur :

1. La phrase existe seulement sous la forme **Ngiele yilulu ku mamba** (1re personne). La variante **Njele** n'y figure pas, alors qu'elle est bien employée dans les leçons. Le traducteur ne reconnaît donc pas la phrase entière et n'en rend qu'une partie.
2. Aucune consigne n'oblige le traducteur à rendre les compléments de lieu. Rien ne l'empêche d'abandonner un morceau de phrase silencieusement.

## Ce qui sera fait

1. **Ajouter la variante Njele** aux phrases de « mettre du temps » :
   - `Njele yilulu ku mamba. = J'ai mis du temps à la rivière.`
   placée à côté de la forme `Ngiele` existante, qui reste inchangée.

2. **Ajouter une règle sur les lieux** dans les consignes du traducteur :
   - un complément de lieu introduit par **ku**, **mu** ou **ha** doit toujours apparaître dans la traduction ;
   - `ku mamba` = à la rivière, `mu mamba` = dans l'eau / dans la rivière, `ha mamba` = au bord de la rivière ;
   - si un mot de lieu n'est pas attesté, il s'écrit `[?mot?]` au lieu d'être supprimé ;
   - interdiction générale de laisser tomber une portion de la phrase source sans la marquer.

3. **Vérifier** après coup en traduisant `Njele yilulu ku mamba` et `Ngiele yilulu ku mamba` : les deux doivent donner « J'ai mis du temps à la rivière ».

## Hors périmètre

Aucune autre forme lari n'est modifiée, aucune substitution de son, aucun changement dans le dictionnaire, les leçons ou les conjugaisons, aucun export ODT/PDF.

## Détail technique

- Fichier : `supabase/functions/translate-lari/index.ts` — ajout d'une ligne de corpus près de la ligne 4080 et d'une section « RÈGLE — COMPLÉMENTS DE LIEU (ku / mu / ha) » dans `SYSTEM_PROMPT`.
- Redéploiement de la fonction `translate-lari`, puis test réel des deux phrases.
