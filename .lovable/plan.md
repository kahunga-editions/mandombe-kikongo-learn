# Page Conjugaisons — traductions par ligne + Mandombe qui ne déborde plus

## Problème

Sur `/conjugations`, chaque ligne montre le pronom (« Je », « Tu »…), le Mandombe et la forme latine, mais **jamais la traduction**. Et le texte Mandombe déborde sur les écritures latines voisines.

## Corrections

1. **Traduction par ligne.** Les lignes des tables (`rows` dans `ConjugationTable`, `src/data/lessons.ts`) n'ont pas de glose. Ajout d'une glose FR + EN par ligne, construite mécaniquement à partir de données déjà présentes (personne + sens du verbe + temps) — aucune invention lexicale :
   - Présent : « Je remercie. · I thank. »
   - Passé : « J'ai remercié. · I thanked. »
   - Futur : « Je remercierai. · I will thank. »
   Les séries de personnes (`conjugationSeries.ts`) ont déjà `fr`/`en` — elles sont affichées telles quelles.
   Affichage dans `src/pages/Conjugations.tsx` : sous la forme latine, la glose française (ou anglaise selon la langue de l'interface).

2. **Mandombe sans débordement.** Les lignes Mandombe débordent latéralement sur le latin. Dans `Conjugations.tsx` : le bloc Mandombe passe sur sa propre ligne (`block`, `w-full`, `break-words`, `line-height` généreux déjà prévu par la règle `.font-mandombe`), et la transcription latine sur une ligne séparée en dessous — plus de juxtaposition latérale.

## Aperçu d'une ligne

```text
Je
[mandombe]  ntondele
ntondele
Je remercie. · I thank.
```

## Détails techniques

- `src/data/lessons.ts` : extension du type `ConjugationTable.rows` avec `fr?: string; en?: string`.
- Génération des gloses par script de transformation (personne × temps × sens), vérifié sur les tables existantes ; les gloses mécaniques sont marquées pour que vous puissiez les corriger au fil de l'eau.
- `src/pages/Conjugations.tsx` : affichage de la glose + reprise de la mise en page Mandombe/latin.
- Les 9 langues : seuls FR et EN sont générés ; les autres langues retombent sur l'anglais (comportement existant du site).
- Aucune donnée du dictionnaire n'est touchée ; aucun document régénéré.
