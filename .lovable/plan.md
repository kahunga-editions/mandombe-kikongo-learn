# Simplifier la page Conjugaisons

## Résultat attendu

Au premier affichage, la page reprendra exactement l'esprit de la capture : titre Mandombe, titre « Conjugaisons », courte introduction, champ de recherche et choix de traduction. Aucun tableau ni aucune phrase ne sera visible tant que rien n'est recherché.

## Modifications

1. **Première vue épurée**
   - Masquer les tableaux du verbe être, les règles, les groupes de verbes et les séries de personnes au chargement.
   - Garder seulement l'en-tête et la zone de recherche montrés sur la capture.

2. **Résultats limités aux conjugaisons**
   - Après une recherche, afficher uniquement les formes provenant des véritables tableaux de conjugaison déjà présents dans le corpus.
   - Retirer entièrement de cette page la rubrique « Formes du traducteur » et ne plus injecter dans les résultats les phrases mémorisées par le traducteur.
   - Exclure les tableaux marqués comme expressions ou phrases construites ; ne conserver que les formes classées comme conjugaisons, sans inventer ni raccourcir de texte lari.
   - La connexion interne avec le traducteur restera disponible pour son fonctionnement, mais elle ne sera plus exposée à l'apprenant sur cette page.

3. **Mandombe sans chevauchement**
   - Uniformiser le rendu Mandombe des résultats avec une taille adaptée aux écrans mobiles et aux textes longs.
   - Donner à chaque ligne une hauteur et un espacement stables avant la translittération latine.
   - Corriger le surlignage de la forme verbale pour qu'il n'augmente pas artificiellement la hauteur ou ne déborde pas sur la ligne suivante.

## Vérification

- Ouvrir la page sur ordinateur et mobile : avant saisie, seule la zone visible sur la capture doit apparaître.
- Rechercher plusieurs verbes et temps courts/longs : seules leurs conjugaisons doivent apparaître.
- Confirmer l'absence de « validé », « expert », « traducteur » et de phrases provenant des corrections du traducteur.
- Contrôler visuellement que chaque ligne Mandombe reste séparée de sa translittération latine, sans débordement horizontal ni vertical.

## Détails techniques

- La modification sera limitée à la présentation et au filtrage de `Conjugations` ; aucune donnée linguistique ni correction du traducteur ne sera supprimée.
- Le chargement des formes du traducteur sera retiré de cette page, afin que la séparation soit structurelle et pas seulement cosmétique.
