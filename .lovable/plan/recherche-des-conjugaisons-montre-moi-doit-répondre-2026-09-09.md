# Recherche des conjugaisons : « montre-moi » doit répondre

## Ce que j'ai vérifié

- **nsongela** existe bien dans le dictionnaire (« montre-moi ») et dans le vocabulaire d'une leçon, mais **il n'apparaît dans aucune donnée de conjugaison**. La page Conjugaisons ne peut donc rien trouver : c'est la vraie cause du « rien ne se passe ».
- La recherche compare les mots après avoir enlevé les accents et les espaces en trop, mais **pas les tirets, tirets bas et apostrophes**. Ainsi « montre _moi » ou « montre moi » ne correspond pas à « montre-moi », même quand la forme sera présente.

## Corrections

### 1. Ajouter nsongela aux conjugaisons

Créer une entrée d'impératif pour **songa** (montrer), sur le même modèle que l'impératif de *landa* déjà en place :

- **Nsongela.** — Montre-moi. / Show me.

Une seule forme, celle qui est attestée. Aucune autre personne ne sera ajoutée par analogie tant qu'elle n'est pas fournie.

### 2. Rendre la recherche tolérante

Avant la comparaison, remplacer tirets, tirets bas, apostrophes et points par des espaces, des deux côtés (ce qui est tapé et ce qui est cherché). « montre moi », « montre-moi » et « montre _moi » donneront alors le même résultat.

### 3. Ce que voit la personne

Comme aujourd'hui pour les autres formes : dès la saisie, la ligne apparaît directement sous le champ, avec la forme en Mandombe en grand, la translittération, la traduction et l'écoute — sans avoir à parcourir un tableau.

## Détails techniques

- `src/data/conjugationSeries.ts` : nouvelle série `Songa · impératif` avec une ligne `Nsongela.`
- `src/pages/Conjugations.tsx` : élargir `norm()` pour neutraliser `-`, `_`, `'`, `’`, `.` et réduire les espaces multiples.

## Vérification

- Taper « montre-moi », « montre moi » et « nsongela » : la même carte apparaît à chaque fois.
- Vérifier une recherche existante (« écorché », « tu serai ») pour s'assurer qu'elle fonctionne toujours, puis contrôler le journal de compilation et une capture d'écran.
