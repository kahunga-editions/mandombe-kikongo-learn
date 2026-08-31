# Les 23 entrées : résolues depuis Nzo Mikanda, pas depuis moi

Vous avez raison : le sens de ces entrées est déjà sur le site. Je ne vous demande plus rien et je ne devine rien — je vais les remplir en lisant les données du site lui-même.

## Ce que j'ai vérifié

Sur les 23 entrées en attente, la quasi-totalité a déjà un sens attesté dans les données du site :

- `Belesa` = « Ce qui rend malade », `Buzitu` = « le respect », `Bupipilipi` = « Le silence », `Busumbu` = « Le danger », `Kinkuezi` = « L'alliance », `Kalu` = « Train, bus », `Funi` = « Anus », `Bisambanu` = « Six », `Bikonko bitatu` = « Triangle », `Bimoko` = « Discussions (pluriel) », `Buaku-maku` = « un wagon », `Buyele` / `Diela` = « Intelligent », `Hata` = « village », `Kinkala` = nom de ville, `Kimvuka` = « association » — présents dans le dictionnaire du site.
- `Bembe · mabembe` = « Pigeon(s) », `Sakalale?` = « Tu vas mieux ? », `Diambu dia kambakana` (de `Kambakana` = « se mettre en travers »), `Ni ta mona` = « je sens / je perçois », `Funda na nkama nsambuadi na nsambuadi` = « 1707 » — présents dans le corpus du traducteur et des leçons.

Le blocage n'était donc pas un sens manquant : c'était un côté manquant (le français ou l'anglais vide) que le contrôle signalait comme incomplet.

## Ce que je fais

1. **Résolution par source, dans cet ordre** : dictionnaire canonique → dictionnaire du site → corpus du traducteur → corpus des leçons. La première source qui donne un sens attesté gagne ; on ne mélange pas.
2. **Compléter uniquement le côté vide** : si le français existe et l'anglais manque, je traduis le français attesté vers l'anglais (et inversement). Aucun sens nouveau n'est créé, aucune reformulation du sens Lari.
3. **Ce qui reste sans source** (`Diambu dia shilalala.`, `Nzololo na suba.` si rien n'est trouvé au terme des quatre sources) : l'entrée n'est pas publiée et reste dans le rapport. Pas d'invention, pas de sens plausible.
4. **Rapport de traçabilité** : chaque entrée résolue est listée avec la source exacte qui a fourni son sens, pour que vous puissiez contrôler ligne par ligne.

## Génération

Une seule régénération du dictionnaire après résolution — pas de v32, v33 successives. Le livre repart de `data/dictionary-entries.json` mis à jour et passe les mêmes garde-fous bloquants (pas de point interne, pas de résidu latin dans le Mandombe, pas de fusion d'homographes).

## Détails techniques

- Nouveau `scripts/resolve_pending_senses.py` : lit `reports/dictionnaire-controles.txt`, cherche chaque lemme dans `supabase/functions/_shared/dictionary.json`, `supabase/functions/translate-lari/index.ts` et `supabase/functions/_shared/lessons-corpus.ts`, écrit les sens dans `data/dictionary-entries.json` et produit `reports/arbitrage-sources.txt` (entrée → source → sens).
- Correspondance des lemmes insensible à la casse, à la ponctuation finale et au séparateur de pluriel `·`.
- Rebuild via `scripts/build_dictionary_book.py` inchangé (source JSON uniquement, jamais un ODT généré).
