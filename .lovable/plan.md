# Correction de « babantu » → « ba bantu »

## Le problème

L'entrée est écrite en un seul mot et glosée « les humains (générique) · humankind », avec une note de dérivation « ba- 'générique' + bantu ». C'est faux : il s'agit de deux mots, `ba` (être) + `bantu` (humains), donc « être humains · to be human(s) ».

Emplacements :

- `src/data/lessons.ts:29016` — leçon « Dérivation nominale »
- `supabase/functions/_shared/lessons-corpus.ts:19141` — copie backend du corpus
- `supabase/functions/_shared/dictionary.json:19858` — dictionnaire partagé (traducteur, Mbuta Matondo, dictionnaire en ligne, livre)

## Correction

1. Remplacer dans les trois fichiers :
   - lari : `ba bantu`
   - mandombe : `Ba bantu` (deux mots, glyphes séparés)
   - français : `être humains`
   - anglais : `to be human`
   - note : supprimer la note de dérivation « ba- 'générique' + bantu » et la remplacer par « ba 'être' + bantu 'humains' ».
2. Comme l'entrée n'est plus un exemple de dérivation nominale, la déplacer hors de la liste des affixes de cette leçon (la garder au dictionnaire, pas comme illustration du préfixe ba-).
3. Rechercher toute autre occurrence de `babantu` (caches de traduction du livre, corpus Mbuta Matondo) et l'aligner.
4. Relancer l'audit des gloses et le QA dictionnaire pour vérifier l'absence de doublon `ba bantu` / `babantu`.

Le livre ODT/PDF sera mis à jour à la prochaine génération de version.
