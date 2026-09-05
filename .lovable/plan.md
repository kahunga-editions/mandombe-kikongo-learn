# Plan : page Conjugaisons — formes courtes/pleines et mise en valeur des formes verbales

## Objectif
Améliorer la page `/conjugations` pour que :
1. La forme courte et la forme pleine du présent du verbe être soient présentées ensemble.
2. La forme verbale (le verbe conjugué) ressorte visuellement dans chaque phrase Mandombe, grâce à un surlignage doré doux choisi par l'autrice.

## État actuel vérifié
- `src/data/verbeBa.ts` contient déjà les trois formes par classe : `c` (courte), `f` (pleine), `p` (passé), avec les phrases Mandombe correspondantes (`c_kil`, `f_kil`, `p_kil`).
- `src/pages/Conjugations.tsx` affiche actuellement ces trois formes comme trois blocs distincts : « Présent (forme courte) », « Présent », « Passé ».
- Les phrases Mandombe sont affichées en doré sur fond crème, sans distinction visuelle du verbe conjugué à l'intérieur de la phrase.

## Choix visuel retenu
**Surlignage doré doux** : la forme verbale est entourée d'un fond miel très clair (`#f9ebc8`) légèrement flouté, et le glyphe du verbe passe en brun-doré foncé (`#8b6508`) en gras. Le reste de la phrase Mandombe conserve la couleur dorée existante.

## Changements prévus

### 1. Regroupement court / plein pour le verbe être
- Dans la section « Le verbe être dans tous ses états », présenter pour chaque classe nominale un seul encart « Présent » contenant :
  - la phrase Mandombe en forme courte ;
  - juste en dessous, la mention « forme pleine : » suivie de la phrase Mandombe en forme pleine ;
  - les translittérations et traductions associées à chacune.
- Conserver le passé dans un bloc séparé en dessous.

### 2. Mise en valeur des formes verbales
- Repérer la portion de la phrase Mandombe qui correspond à la forme verbale conjuguée (donnée actuellement dans `c_kil`, `f_kil`, `p_kil` et dans les séries régulières).
- L'entourer d'un `<span>` avec :
  - un fond miel clair arrondi et légèrement flouté en arrière-plan ;
  - le texte du verbe en brun-doré foncé et en gras ;
  - suffisamment d'espacement pour ne pas créer de chevauchement avec les glyphes voisins.
- Appliquer ce traitement à toutes les cartes de conjugaison, y compris les sé autres que le verbe être.

### 3. Ajustements d'espacement
- Augmenter légèrement le `line-height` et l'interligne entre Mandombe, latin et traduction pour éviter tout chevauchement après l'ajout du surlignage.
- Utiliser `break-words` si nécessaire pour les longues phrases.

## Fichiers concernés
- `src/pages/Conjugations.tsx` : restructuration de l'affichage du verbe être et ajout du surlignage des formes verbales.
- `src/data/conjugationSeries.ts` : vérification / enrichissement si nécessaire pour indiquer quel segment de chaque phrase est la forme verbale.
- `src/data/verbeBa.ts` : aucune modification des données prévue, uniquement consommation.

## Livrable
La page `/conjugations` présente :
- pour le verbe être, la forme courte et la forme pleine du présent regroupées dans le même encart, avec le passé en dessous ;
- dans chaque carte, le verbe conjugué mis en évidence par un surlignage doré doux, lisible et sans chevauchement.
