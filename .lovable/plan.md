# Passé négatif de zaba : afficher « ne savais pas » et « ne connaissais pas »

## Contexte

Les six formes lari demandées (`ka na zaba a ko` … `ka ba zaba a ko`) sont déjà dans les
conjugaisons : c'est le passé négatif du verbe **Zaba** (« savoir, connaître »), ajouté
précédemment avec les libellés français « ne connaissais pas ». Le choix validé : une seule
carte Passé négatif affichant les **deux libellés** (« ne savais pas / ne connaissais pas »),
puisque zaba couvre les deux sens.

## Modification

1. `scripts/build_survival_verbs.py` — dans le bloc Zaba, tense « Passé négatif » :
   remplacer les six libellés `frv` « ne connaissais pas… » par les libellés combinés :
   - je : `ne savais pas / ne connaissais pas`
   - tu : `ne savais pas / ne connaissais pas`
   - il/elle : `ne savait pas / ne connaissait pas`
   - nous : `ne savions pas / ne connaissions pas`
   - vous : `ne saviez pas / ne connaissiez pas`
   - ils/elles : `ne savaient pas / ne connaissaient pas`

   Rien d'autre ne change : formes lari, règle « ka + particule du pronom + verbe + a ko »,
   anglais (« did not know »), Mandombe et audio restent identiques.

2. Régénérer `src/data/survivalVerbs.ts` avec le script (fichier généré, jamais édité à la main).

## Hors périmètre

- Aucun changement sur les autres temps de zaba (présent, passé, futur).
- Aucune génération de document ODT/PDF.
- Aucune modification du dictionnaire ou des leçons.

## Vérification

- Recherche « savais » et « connaissais » sur la page Conjugaisons : la carte Passé négatif
  de Zaba répond aux deux, avec les deux libellés visibles sur chaque personne.
- Vérifier le log de build (aucune erreur).
