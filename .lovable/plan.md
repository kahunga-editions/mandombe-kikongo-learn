# Retirer l'en-tête de classe dans « Le verbe être »

## Objectif
Dans la section « Le verbe être dans tous ses états » de la page Conjugaisons, retirer le haut de chaque carte : le grand mot en Mandombe (ex. « yandi ») et la ligne latine « yandi — il / elle ». Ces éléments ne font pas sens hors du tableau cliquable d'origine.

## Changement
- Fichier : `src/pages/Conjugations.tsx` (section verbeBaData).
- Supprimer le bloc d'en-tête de carte : `font-mandombe` avec `cleanMandombe(e.classe)` et la ligne `e.classe — e.classe_fr`.
- Chaque carte ne contient plus que les trois temps (présent forme courte, présent, passé) avec : phrase entière en Mandombe, translittération latine, bouton audio, traduction.

Aucune autre section touchée. Aucune donnée modifiée.
