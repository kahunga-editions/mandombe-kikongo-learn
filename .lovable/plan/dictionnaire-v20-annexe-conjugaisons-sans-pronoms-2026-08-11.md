# Dictionnaire v20 — annexe conjugaisons sans pronoms

## Problème

Dans l'annexe des conjugaisons, chaque ligne affiche l'étiquette de personne ("Ils/Elles · They") entre la forme Kikongo et la traduction. Résultat illisible :

```text
[mandombe]. Ka bena ko.   Ils/Elles · They   Ils/Elles ne sont pas. · They are not.
```

## Correction

Supprimer complètement l'étiquette de personne de la ligne. Ordre définitif et unique :

1. Mandombe (doré, en premier)
2. Transcription latine (Kikongo Lari)
3. Glose française
4. Glose anglaise

```text
[mandombe]. Ka bena ko.   Ils/Elles ne sont pas. · They are not.
```

## Aperçu d'une page (annexe conjugaisons)

```text
──────────────────────────────────────────────────────────────
ANNEXE · CONJUGAISONS
APPENDIX · CONJUGATIONS

[mandombe]  Kuena — être · to be
Présent négatif · Negative present

[mandombe]. Kuena…ko.       Tu n'es pas. · You are not.
[mandombe]. Kena…ko.        Il/Elle n'est pas. · He/She is not.
[mandombe]. Ka tuena ko.    Nous ne sommes pas. · We are not.
[mandombe]. Ka luena ko.    Vous n'êtes pas. · You are not.
[mandombe]. Ka bena ko.     Ils/Elles ne sont pas. · They are not.
──────────────────────────────────────────────────────────────
```

Plus aucun pronom isolé au milieu de la ligne.

## Détails techniques

- `scripts/build-dictionary-odt-v19.py` : retirer le bloc qui ajoute `PersonT` (lignes ~829-832). La clé `person` reste utilisée uniquement pour retrouver la glose dans le cache (`conj_gloss`), pas pour l'affichage.
- Le style `PersonT` devient inutilisé dans l'annexe ; il est conservé s'il sert ailleurs, sinon supprimé.
- Vérifier qu'une ligne sans glose en cache n'apparaisse pas vide : si `g_fr` et `g_en` manquent, la ligne garde Mandombe + latin seuls (aucun pronom en remplacement).
- Toutes les règles déjà en place sont conservées : majuscule initiale et point final (y compris pour le Mandombe), Mandombe en premier, pas d'articles anglais parasites, casse normalisée.
- Régénération ODT + PDF (trilingue FR/EN), puis contrôle visuel de deux pages de l'annexe avant livraison.
- Une fois validée, la même correction est reportée sur la version quadrilingue avec coréen.
