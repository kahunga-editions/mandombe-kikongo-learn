# Audit de provenance : atteste vs invente

## Probleme

Le dictionnaire (`data/dictionary-entries.json`, 4 693 entrees) et les lecons (`src/data/lessons.ts`) melangent formes du corpus Jacquot et declinaisons inventees par analogie, sans marqueur d'origine. Impossible aujourd'hui de repondre avec certitude a « qu'as-tu invente ? ».

## Solution : verification mecanique contre la source

Le texte integral de la these de Jacquot (277 pages, `/mnt/user-uploads/12138.pdf`) est extractible. On en fait le texte de reference.

### Etapes

1. **Extraire le corpus de reference** : script `scripts/extract-corpus-reference.py` — texte complet du PDF, normalise (minuscules, sans ponctuation ni accents), stocke dans `reports/corpus-reference.txt`. C'est un rapport de travail, pas un document publie.

2. **Etiqueter chaque entree du dictionnaire** : script `scripts/mark-provenance.py` — pour chaque entree de `data/dictionary-entries.json`, verifier si la forme lari (et chaque exemple de phrase) apparait telle quelle dans le texte de reference. Ajouter un champ `attested: true/false` dans le JSON. Les formes validees explicitement par l'auteure dans les conversations (Kue ba?, Ama, kimfinia, etc.) sont marquees `attested: "auteur"` via une liste maintenue dans `data/validated-by-author.txt`.

3. **Meme traitement pour les lecons** : etiqueter les phrases d'exemple et questions d'exercice de `src/data/lessons.ts` (rapport separe, pas de modification du fichier).

4. **Produire la liste d'arbitrage** : `reports/formes-non-attestees.md` — toutes les entrees/exemples non attestes, groupes par serie (ni/ka/tu/lu/ba), prets pour l'arbitrage de l'auteure : valider ou supprimer. Rien n'est supprime sans arbitrage explicite.

5. **Bloquer pour l'avenir** : ajouter a `scripts/dictionary_guards.py` un controle qui refuse toute nouvelle entree `attested: false` non validee par l'auteure. Regle memorisee : ne jamais completer une serie a partir d'une seule forme attestee ; demander la forme a l'auteure au lieu de l'ecrire.

### Hors perimetre

- Aucun document ODT/PDF du livre n'est regenere (l'auteure corrige manuellement).
- Aucune suppression de contenu sans arbitrage explicite de l'auteure.

### Details techniques

- Extraction PDF : `pypdf`. Normalisation : NFKC, casse, ponctuation.
- Correspondance : forme entiere (phrase) puis repli sur le mot-vedette seul ; les deux niveaux sont rapportes separement.
- Fichiers touches : 2 nouveaux scripts, 1 champ ajoute au JSON, 1 garde-fou ajoute, 3 rapports dans `reports/`. Aucun fichier de l'interface du site n'est modifie.
