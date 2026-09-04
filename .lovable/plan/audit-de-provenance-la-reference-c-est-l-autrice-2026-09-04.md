# Audit de provenance : la reference, c'est l'autrice

## Principe

Jacquot n'est PAS la source de reference. Ce qui fait foi : ce que l'autrice a dicte, fourni (documents, captures, textes colles) et corrige au fil des conversations. On reconstruit cette reference, puis on etiquete chaque entree du dictionnaire selon qu'elle y est rattachee ou non.

## Etapes

1. **Reconstituer la reference de l'autrice** : rassembler dans `data/validated-by-author.txt` tout le contenu lari qu'elle a fourni ou valide explicitement :
   - ses corrections et dictées dans l'historique des conversations (recherche dans l'historique du chat) ;
   - les textes des documents qu'elle a deposes ;
   - les validations recentes (Kue ba?, Kue ba ka?, Ama, kimfinia, bimfinia, kozia, nkia, mbira, jimbakane, tekela, humunu, mumvuka/mimvuka, etc.).

2. **Etiqueter le dictionnaire** : script qui ajoute a chaque entree de `data/dictionary-entries.json` un champ `provenance` : `"autrice"` si la forme est rattachee a la reference, `"a-confirmer"` sinon. Aucune entree n'est supprimee.

3. **Liste d'arbitrage** : `reports/formes-a-arbitrer.md` est regenere a partir du champ `provenance` — uniquement les entrees `a-confirmer`, groupees par serie (ni/ka/tu/lu/ba, aku/andi/awu/eno), pour que l'autrice statue : valider ou supprimer. C'est un rapport de travail, pas un document publie.

4. **Regle permanente** (deja memorisee, a renforcer) : ne jamais completer une serie par analogie a partir d'une forme attestee ; demander la forme a l'autrice au lieu de l'ecrire. Ajouter a `scripts/dictionary_guards.py` un controle qui bloque toute nouvelle entree sans `provenance: "autrice"`.

## Hors perimetre

- Aucun document ODT/PDF n'est regenere ; l'autrice corrige le livre manuellement.
- Aucune suppression sans arbitrage explicite.
- Aucune modification des pages du site.

## Details techniques

- Fichiers touches : `data/validated-by-author.txt` (nouveau), `data/dictionary-entries.json` (champ ajoute), un nouveau script `scripts/mark-provenance.py`, `scripts/dictionary_guards.py` (un controle), `reports/formes-a-arbitrer.md` (regenere).
- L'historique des conversations est interroge par l'outil de recherche de chat pour extraire les dictées et corrections de l'autrice.
