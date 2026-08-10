# Origine de « babantu » et suppression

## D'où vient l'entrée

L'entrée existe à trois endroits :

- `src/data/lessons.ts:29016` — leçon « Dérivation nominale » (affixes de dérivation, notes renvoyant à des paragraphes §3.7.x)
- `supabase/functions/_shared/lessons-corpus.ts:19141` — copie du corpus pour les fonctions backend
- `supabase/functions/_shared/dictionary.json:19858` — dictionnaire partagé (traducteur, Mbuta Matondo, dictionnaire en ligne, livre ODT/PDF)

Elle est glosée « les humains (générique) · humankind » avec la note « ba- 'générique' + bantu (§3.7.5) ». C'est une forme construite par règle morphologique (préfixe ba- appliqué à un pluriel déjà formé), pas une forme relevée dans le corpus Nzo Mikanda. Cela viole la règle du lecteur de corpus : aucune forme ne doit être fabriquée par analogie.

## Correction proposée

1. Supprimer l'entrée `babantu` des trois fichiers ci-dessus.
2. Vérifier les caches de traduction du livre (`en`/notes/coréen) et retirer les clés correspondantes s'il y en a.
3. Relancer l'audit des gloses (`scripts/audit-book-glosses.ts`) et le QA dictionnaire pour confirmer qu'aucune référence ne subsiste.
4. Rechercher dans la même leçon les autres formes issues d'une construction par règle plutôt que d'une attestation (notes en §3.7.x) et les signaler dans un rapport, sans les supprimer sans votre validation.

Aucune régénération de l'ODT/PDF n'est incluse ici ; à faire à la prochaine version du livre si vous le souhaitez.
