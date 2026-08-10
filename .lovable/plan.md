# Correction : mbaji = demain (pas « voisin »)

## Ce qui s'est passé

Dans la section « Prononciation · Pronunciation » ajoutée en v15, l'exemple illustrant la règle du « j » porte une glose inventée : `Mbaji = voisin · neighbour`. Ce sens n'existe nulle part dans le corpus. Partout ailleurs (dictionnaire en ligne, leçons, corpus Mbuta, traducteur), `mbaji` est correctement traduit par **demain · tomorrow**. L'erreur est isolée à cette seule ligne du script du livre.

## Correction

- Dans `scripts/build-dictionary-odt-v14.py`, remplacer la glose de l'exemple `Mbaji` par **demain · tomorrow** (prononciation `/mbaʒi/` inchangée, la règle phonétique reste valable).
- Vérifier au passage les autres exemples de la même section (Zaba, Ngolo, Bujitu, Jimbakane, Moshi, Nzila, Nsoneka, Nkima, Djunu) : chaque glose doit être reprise telle quelle du corpus, aucune reformulation.
- Regénérer ODT + PDF (v16) et contrôler visuellement les pages de la section Prononciation.

## Garde-fou

Ajouter au script d'audit existant une vérification : tout mot cité en exemple dans les sections rédigées à la main du livre doit avoir sa glose identique à celle du dictionnaire ; toute divergence est signalée dans le rapport. Cela empêche qu'une glose écrite à la main s'écarte du corpus à l'avenir.

## Détails techniques

- Fichier : `scripts/build-dictionary-odt-v14.py`, ligne 459 (tuple d'exemple de la règle « j »).
- Contrôle croisé des gloses contre `supabase/functions/_shared/dictionary.json`.
- Extension de `scripts/audit-mandombe-latin.ts` (ou nouveau `scripts/audit-book-glosses.ts`) pour le garde-fou.
