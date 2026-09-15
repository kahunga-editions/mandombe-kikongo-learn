# Ajouter « pouvoir se battre » aux conjugaisons

## Ce qui sera ajouté

Deux séries sous le verbe **Lenda** (pouvoir), reprises exactement telles que vous les avez données, sans rien compléter ni harmoniser :

**Présent — pouvoir se battre**
- Ndendi nuana = Je peux me battre.
- Lendi nuana = Tu peux te battre.
- Lendi nuana = Il peut se battre.
- tu lendi nuana = Nous pouvons nous battre.
- lu lendi nuana = Vous pouvez vous battre.
- ba lendi nuana = Ils peuvent se battre.

**Passé — pouvoir se battre**
- na lendi nuana = Je pouvais me battre.
- wa lendi nuana = Tu pouvais te battre.
- wa lendi nuana = Il pouvait se battre.
- ta lendi nuana = Nous pouvions nous battre. (variante notée : tua lendi nuana)
- lua lendi nuana = Vous pouviez vous battre.
- ba lendi nuana = Ils/Elles pouvaient se battre.

Chaque ligne aura sa phrase complète en Mandombe avec la forme verbale (**Ndendi**, **Lendi**, **lendi**) mise en valeur, sa translittération latine avec le bouton audio, et sa traduction française puis anglaise.

## Recherche

Les lignes seront trouvables en tapant « se battre », « nuana », « je peux me battre », « Ndendi nuana », « pouvais me battre », etc.

## Vérification

- Recherches ci-dessus testées sur ordinateur et sur mobile.
- Contrôle visuel : pas de chevauchement entre Mandombe et translittération, audio fonctionnel.

## Hors périmètre

- Aucune forme ajoutée par analogie, aucune autre conjugaison modifiée.
- Aucun document ODT/PDF généré.

## Détails techniques

- Ajout des deux blocs `tense(...)` dans le verbe Lenda de `scripts/build_survival_verbs.py`, puis régénération de `src/data/survivalVerbs.ts`.
- Mise à jour de `.lovable/memory/grammar/zonza-verbes-de-survie.md` avec les formes attestées.
