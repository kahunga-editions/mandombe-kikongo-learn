# Dictionnaire v22 — ponctuation Mandombe fidèle et validation exhaustive

La v22 repart du **dictionnaire v20 corrigé manuellement** comme source de vérité, puis réapplique l'ensemble des corrections validées pour la v21. Aucune ancienne donnée lexicale n'est réinjectée.

## Correction principale

Conserver la ponctuation de chaque entrée Mandombe au lieu de la supprimer pendant le nettoyage :

- une question garde `?` en Mandombe, en translittération, en français et en anglais ;
- une phrase déclarative garde ou reçoit `.` ;
- un `!` dans la source Mandombe devient un point simple `.` conformément à votre directive ;
- une entrée lexicale qui n'est pas une phrase ne reçoit pas artificiellement de ponctuation ;
- la ponctuation est rendue avec la ligne Mandombe, sans lettre latine parasite.

Exemple attendu :

```text
Abue tele?    [rendu avec la police Mandombe, point d'interrogation inclus]
Abue tele?
Qu'as-tu dit? · What did you say?
```

## Reconstruction fidèle

- Réextraire les champs Mandombe, Kikongo Lari, français, anglais et notes depuis la v20 corrigée.
- Préserver les signes terminaux au moment de l'extraction et lors de l'application des surcharges Mandombe.
- Réappliquer toutes les corrections lexicales, sémantiques, typographiques et Mandombe validées dans la v21, sans modifier leur sens.
- Conserver les trois index dans l'ordre validé : Lari → FR → EN, FR → EN → Lari, EN → FR → Lari.
- Appliquer la même logique de ponctuation dans l'annexe des conjugaisons.

## Contrôles avant livraison

- Produire un rapport comparant, pour chaque phrase, la ponctuation finale Mandombe et latine.
- Bloquer la génération s'il reste une question latine en `?` dont la ligne Mandombe n'a pas `?`.
- Bloquer la génération si une phrase déclarative Mandombe n'a pas son point final, ou si un `!` subsiste en Mandombe.
- Vérifier spécifiquement `Abue tele?` et toutes les entrées interrogatives.
- Vérifier que les surcharges Mandombe n'effacent plus la ponctuation.
- Convertir le document en PDF et inspecter visuellement **toutes les pages**, notamment les trois index et l'annexe, pour détecter ponctuation absente, caractères latins parasites, pages blanches, débordements ou ordre incorrect.

## Livrables

- `dictionnaire-lari-v22.odt`, éditable.
- `dictionnaire-lari-v22.pdf`, prêt pour contrôle et impression.
- Rapport de validation de la ponctuation et des entrées contrôlées.

## Détails techniques

Le défaut confirmé se trouve dans le générateur v21 : `clean_mandombe` supprime tous les caractères autres que les lettres et espaces, puis le rendu n'ajoute qu'un point générique via `mperiod`. La v22 séparera le texte Mandombe nettoyé de son signe terminal normalisé (`?` conservé, `!` converti en `.`, `.` conservé), afin que les surcharges orthographiques ne puissent plus détruire la ponctuation.