# Dictionnaire v21 — construit à partir de votre version corrigée

La v20 que vous avez envoyée devient la **source de vérité**. Je n'y réinjecte rien depuis l'ancien corpus : je la lis, je la nettoie légèrement, je réorganise les index, je refais la partie d'ouverture.

## 1. Extraction

Lecture de `content.xml` de `dictionnaire-lari-v20.odt` et reconstruction d'un jeu de données propre :
`mandombe | lari (translittération) | français | anglais | note`, plus l'annexe conjugaisons et les illustrations de lettres (réutilisées telles quelles, sans regénération).

## 2. Nouveaux index

- **Index I** — Kikongo Lari → Français → English (inchangé)
- **Index II** — Français → English → Kikongo Lari
- **Index III** — English → Français → Kikongo Lari

Dans chaque index : tri alphabétique strict commençant par A ; tout ce qui ne commence pas par une lettre (chiffres, symboles, formes marginales) est regroupé à la fin sous une rubrique « Autres · Other ». Le Mandombe et la translittération latine restent toujours affichés, même quand la clé de tri est le français ou l'anglais.

Exemple de rendu (Index II) :

```text
   bonjour
   ᛒ Mbote        (Mandombe, brun doré, grand)
   Mbote          (translittération latine, gras)
   hello
```

Exemple de rendu (Index I) :

```text
   ᛒ Mbote
   Mbote
   bonjour · hello
```

## 3. Ouverture du livre (partie refaite)

- Couverture et page de titre : Mandombe d'abord, puis latin, bilingue FR/EN.
- Avant-propos et « Mode d'emploi » réécrits pour décrire les trois nouveaux index (FR→EN→Lari, EN→FR→Lari).
- Section Prononciation : les longueurs de voyelle écrites entre barres obliques — « le /i/ est long », « le /a/ est long » — jamais `; i: ;`. Chaque règle a sa version anglaise en face.

## 4. Nettoyage automatique appliqué au texte extrait

- Suppression des étymologies entre parenthèses avec renvoi de section (`n- 'circonstanciel' + tete 'un' (§5.5.2.1)`) : elles disparaissent des notes.
- Point final obligatoire à la fin de chaque phrase, y compris la ligne Mandombe.
- Pas de majuscule après un point-virgule en français ; `L'addition. ; S'il vous plaît.` devient `L'addition., s'il vous plaît.`
- Suppression des gloses redondantes qui ne diffèrent que par l'article : `Cheveux ; les cheveux` → `cheveux` ; `La joie ; joie ; contentement` → `joie ; contentement`. Idem côté anglais.
- Nettoyage des points-virgules orphelins en fin de glose (`Lapin ;` → `lapin`) et des gloses coupées sur deux lignes (`le fin fonds de` / `la forêt`).
- Correction de la coquille `Prononcer ; ntshntshe` → `nkenke se prononce /ntʃentʃe/`.

## 5. Corrections de sens (livre + site)

Appliquées dans le livre **et** dans le dictionnaire en ligne, le traducteur et le corpus Mbuta Matondo :

- **Mfinda** = le coin le plus isolé de la forêt (jamais « village isolé dans la forêt »).
- **Mulumba / Milumba** = un lapin / des lapins (jamais « palmeraie »).
- **Ngulu** = cochon, uniquement.
- **Ngu / Nguri / Ngudi** = la mère.
- **Nua** = boire ; **munua** = la bouche ; **minua** = les bouches.

## 6. Mandombe — surcharges au cas par cas

Liste fermée, aucune règle générale n'en est déduite. La translittération latine et la prononciation restent inchangées ; seul le champ Mandombe est modifié :

| Latin | Mandombe | Note affichée |
|---|---|---|
| Ntshangu | Nkangu | — |
| Ntsari | Nsari | — |
| Ntsha | Nka | — |
| Ntsamina | Nsamina | — |
| Nsieti | Nsiyeti | — |
| Ndjokele | Nzokele | se prononce /ndʒokele/ |
| Ntshana | Nkana | se prononce /ntʃana/ |
| Nkenke | Nkenke | se prononce /ntʃentʃe/ |
| N'songi | Nsongi | apostrophe gardée en latin |
| N'samu | Musamu ou Nsamu (N majuscule) | translittération et prononciation : n'samu |
| N'mvu | Mumvu | translittération et prononciation : n'mvu |
| N'kunga | Nkunga (N majuscule) | — |
| N'kento | Nkento (N majuscule) | — |
| nji / nje | nzi / nze | — |

## Détails techniques

- Nouveau script `scripts/build-dictionary-odt-v21.py` : parseur ODT → structures internes, puis génération ODT/PDF avec la police Masono Mandombe et Liberation Serif.
- Nouveau module `scripts/book_clean_v21.py` (extension de `book_clean.py`) pour la ponctuation, les doublons de gloses et le retrait des renvois `§`.
- Table des surcharges Mandombe dans `scripts/mandombe-overrides.json`, réutilisable par `src/lib/mandombeText.ts` sans changer les règles générales.
- Objectif de pagination : rester sous les 550 pages de la limite KDP ; contrôle visuel de 3 pages (index I, index II, annexe) avant livraison du ODT et du PDF.
- Les corrections de sens sont propagées à `supabase/functions/_shared/dictionary.json`, `src/data/lessons.ts`, `supabase/functions/translate-lari/index.ts` et le corpus Mbuta.
