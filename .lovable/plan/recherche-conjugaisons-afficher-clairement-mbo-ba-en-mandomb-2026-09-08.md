# Recherche Conjugaisons — afficher clairement « mbo ba » en Mandombe

## Résultat attendu

Quand on tape **« tu seras »**, une réponse claire apparaît immédiatement sous la recherche :

1. **mbo ba écrit en Mandombe**, en grand ;
2. **mbo ba** en translittération latine ;
3. **Tu seras.** en traduction française ;
4. le bouton d'écoute de la forme.

## Ce que j'ai vérifié

- La donnée existe déjà dans la conjugaison du verbe **Ba** : `mbo ba` / `Tu seras.`.
- La recherche trouve déjà cette table, mais son résultat est placé très loin sous toute la section « Le verbe être dans tous ses états ». À l'écran, rien ne semble donc se passer.
- La ligne trouvée possède déjà un champ Mandombe et peut être rendue avec la police Mandombe, sans créer ni transformer de donnée linguistique.

## Correction

### 1. Résultat immédiat et isolé

Dès qu'un texte est saisi, masquer les grandes sections non pertinentes et afficher les lignes correspondantes directement sous la barre de recherche. Pour « tu seras », seule la ligne utile est mise au premier plan, sans obliger à parcourir toute la carte du verbe être.

### 2. Trois niveaux de lecture très distincts

Chaque résultat de recherche présente :

- la forme en Mandombe, grande et dorée ;
- la translittération latine en dessous ;
- la traduction dans la langue choisie, clairement visible ;
- le temps, la personne et le verbe comme contexte secondaire.

Le Mandombe conserve son espacement vertical propre afin de ne jamais chevaucher le latin.

### 3. Recherche précise par traduction

La recherche examine le verbe, le temps, la personne, la translittération et la traduction de chaque ligne. Elle ne se contente pas d'afficher toute une table parce qu'une seule ligne correspond.

### 4. État sans résultat

Si aucune ligne ne correspond, afficher immédiatement « Aucune conjugaison trouvée » sous le champ.

## Ce qui ne change pas

- Sans recherche, la page reste organisée comme aujourd'hui.
- Aucune forme linguistique n'est inventée ou modifiée.
- Aucun document ODT/PDF n'est régénéré.

## Vérification

- Rechercher exactement « tu seras » et confirmer visuellement la présence immédiate de **mbo ba en Mandombe**, de `mbo ba` en latin et de `Tu seras.`.
- Vérifier l'absence de chevauchement et le fonctionnement de l'écoute.
- Contrôler aussi une recherche en kikongo et une recherche sans résultat.
- Vérifier le typage, le journal de compilation et la page avec une capture d'écran.