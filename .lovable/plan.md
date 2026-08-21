# Dictionnaire v28 — finir la fusion des entrées doubles

Dans la v27, `Bakala` est déjà une entrée unique : `Bakala | babakala — Homme(s) ; mâle(s) ; mari(s) ; époux ; garçon(s) · Man/men ; male(s) ; husband(s) ; boy(s)`. L'ancienne entrée séparée au singulier a disparu.

Il reste malgré tout des doublons que la v27 n'a pas vus : quand les variantes étaient déjà écrites avec des virgules dans le corpus, elles ont été lues comme une seule forme. Résultat :

```text
Baka, tshibaka, kibaka | bibaka   Mur(s) · Wall(s)
Kibaka, tshibaka, baka.           Mur. ; le mur.
```

Deux entrées pour le même mur. Même cas pour `Batamasa, namika, bamika, namatasa` / `Namika`, `Baku, bakama` / `Bakama`, `Batila, vuaza, sangasa` / `Vuaza`, entre autres.

## Ce que fait la v28

1. **Lire les listes de formes écrites avec des virgules** comme des formes séparées, au même titre que celles écrites avec le point médian. Une liste n'est reconnue que si chaque segment est un mot seul : une phrase avec virgule reste une phrase.
2. **Refaire la fusion jusqu'à épuisement** avec ces formes-là. Une entrée dont toutes les formes sont déjà portées par une autre entrée, et dont le sens recoupe le sien, disparaît dans l'entrée unique.
3. **Reformater** chaque entrée fusionnée au standard : `singulier, variante, variante | pluriel`, virgules et barre en Mandombe, glose marquée `(s)` quand un pluriel figure dans l'entrée.
4. **Ne pas toucher aux homonymes** : `Baka` (obtenir, gagner, tailler) et `Baka` (mur) gardent chacun leur entrée, leurs sens n'ont rien à voir. Idem pour toute paire dont les sens sont disjoints ; la liste complète de ces paires part dans le rapport pour ton arbitrage.
5. **Ne pas toucher aux exemples de la partie Prononciation** (`Zaba /zaaba/`, `Mbaji /mbaʒi/`…) : ce sont des exemples, pas des entrées d'index.

## Contrôles

- plus aucune forme portée par deux entrées de l'index, hors homonymes signalés ;
- audit HarfBuzz inchangé : aucun résidu latin, hors `Mundzula | mindzula` qui attend ta graphie ;
- rapport listant chaque fusion faite et chaque paire laissée en attente.

## Détails techniques

- `scripts/build-dictionary-odt-v28.py`, dérivé du v27, source = `dictionnaire-lari-v26.odt` (la chaîne reste rejouable depuis ta version corrigée), sortie = `dictionnaire-lari-v28.odt` + `reports/dictionnaire-v28.txt`.
- `parse_forms` accepte `·` et `,` ; le découpage par virgule n'est retenu que si tous les segments sont des mots isolés sans espace interne.
- La boucle de fusion tourne jusqu'à point fixe, le test de recoupement des sens reste celui de la v27 (mots pleins communs entre les gloses FR et EN).
- Les index II et III sont remis à jour avec les formes fusionnées, comme en v27.
