# Dictionnaire v24 — repartir de VOTRE v20 corrigée

## Ce qui s'est passé (vérifié)

Deux fichiers portent le même nom `dictionnaire-lari-v20.odt` :

- celui que **vous avez corrigé à la main** et déposé (empreinte `43b129…`) ;
- celui **généré automatiquement** le 11 août et resté dans les documents du projet (empreinte `ddd7ab…`).

Les versions v21, v22 et v23 ont été construites à partir du **second**. Vos corrections manuelles n'ont donc jamais été reprises. Exemple contrôlé sur `Bieri` :

```text
votre fichier   : Bieri — c'était (ça dépend du contexte) · it was (depending on the context)
fichier utilisé : Bieri — Trois · Three
```

Idem pour `Bele mpimpa` (votre version : « la nuit dernière » seulement ; version utilisée : « la nuit dernière ; la nuit (il fait nuit) »).

Autre constat : dans votre fichier, les corrections ont été faites dans l'Index I, mais les Index II et III contiennent encore les anciennes valeurs (`trois → Bieri`, `three → Bieri`).

## Ce que fait la v24

1. **Source unique** : votre ODT corrigé, identifié par son empreinte, pas par son nom. Le script refuse de démarrer si l'empreinte ne correspond pas.
2. **Index I = vérité** : les Index II et III sont entièrement **reconstruits à partir de l'Index I corrigé**, jamais relus depuis les anciens index. Les entrées fantômes comme `trois → Bieri` disparaissent d'elles-mêmes.
3. **Ponctuation Mandombe** : on garde le comportement validé en v23 — le `?` ou le `.` est composé dans le même segment Mandombe, en brun doré. `!` devient `.`.
4. **Corrections déjà validées** : on réapplique uniquement celles qui ne touchent pas au sens (nettoyage typographique, majuscule/point final, retrait des articles anglais en tête de glose, retrait des renvois `§`, surcharges Mandombe listées en v21). Aucune glose de votre fichier n'est réécrite.
5. **Propagation au site** : les sens corrigés dans votre fichier (`Bieri`, `Bele mpimpa`, etc.) sont comparés au dictionnaire en ligne ; les divergences sont listées dans un rapport et alignées sur votre version.

## Contrôles avant livraison

- Rapport de différences entre votre v20 et la v24 : toute glose modifiée est listée avec avant/après, pour que vous puissiez vérifier qu'aucun sens n'a bougé.
- Recherche bloquante des cas déjà signalés : `Bieri`, `Bele mpimpa`, `Belesa`, `Mpua nani`, `Mbaji`, `Mfinda`, `Mulumba`, `Ngulu`, `Bunutnu` (doit être absent).
- Contrôle que les Index II et III ne contiennent aucune entrée absente de l'Index I.
- Contrôle ponctuation identique à la v23 (signe terminal dans le span Mandombe).
- Inspection visuelle du PDF page par page.

## Livrables

- `dictionnaire-lari-v24.odt` et `dictionnaire-lari-v24.pdf`
- `dictionnaire-lari-v24-rapport.txt` : source utilisée + empreinte, liste des gloses modifiées, contrôles ponctuation et index.

## Détails techniques

- Nouveau `scripts/extract-odt-v24.py` : extraction de l'Index I et de l'annexe conjugaisons depuis l'ODT utilisateur, avec conservation des signes terminaux et vérification SHA-256 de la source.
- Nouveau `scripts/build-dictionary-odt-v24.py` dérivé de `build-dictionary-odt-v23.py` : `mandombe_span` conservé, index II/III générés par projection de l'index I.
- Le nettoyage réutilise `scripts/book_clean_v21.py` mais **sans** réécriture sémantique.
- Les corrections de sens sont ensuite répercutées dans `supabase/functions/_shared/dictionary.json` et `supabase/functions/translate-lari/index.ts` uniquement pour les entrées listées dans le rapport.
