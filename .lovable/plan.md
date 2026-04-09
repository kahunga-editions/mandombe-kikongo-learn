

# Ajouter des exercices Shi-/Ti-/Ju- et Sa- sur les nouvelles entrées

## Fichier modifié
- `src/data/lessons.ts`

---

## Leçon `pa-pe-pi-po-pu-vocabulaire` — 1 exercice mandombe-recognition (8 items Shi-/Ti-/Ju-)

Insertion avant `],` de fermeture des exercises (ligne 24220).

| Glyphe | Réponse | Distracteurs | Mode |
|--------|---------|-------------|------|
| Shimbila | Shimbila | Shimbalala, Shimbilika, Timbula | glyph-to-latin |
| Timbula | Timbula | Timba, Tita, Shimbila | glyph-to-latin |
| Njundu | Njundu | Junda, Jundu, Jundika | glyph-to-latin |
| Shekema | Shekema | Shingika, Shimbalali, Sekozola | glyph-to-latin |
| Jundama | Jundama | Junda, Jundika, Njundu | latin-to-glyph |
| Shimbalala | Shimbalala | Shimbalali, Shimbila, Simbika | latin-to-glyph |
| Lusinga | Lusinga | Lunjungu, Lumbumbu, Lusaki | latin-to-glyph |
| Shingama | Shingama | Shingika, Shingana, Shingu | latin-to-glyph |

---

## Leçon `sa-dictionary-extended` — 5 exercices (MC, FIB, Matching, Mandombe-recognition)

Insertion avant `],` de fermeture des exercises (ligne 16968).

**1 Multiple-choice :**
"Que signifie 'Nsakusu' ?" → Panier tressé / **Soufflet de forge** / Battement de mains / Feuille de tabac séchée (correct: 1)

**1 Multiple-choice :**
"Que provoque 'Sansamasa' ?" → Apaiser / Intercéder / **Faire peur, surprendre** / Contaminer (correct: 2)

**1 Fill-in-blank :**
"______ = intercéder" → `Sambilila` (indice: lié à 'sambila' = prier)

**1 Matching (6 paires) :**
Sakusa↔Souffler avec un soufflet, Sansamana↔Avoir peur, Sambulika↔Se répandre par contagion, Nsabila↔Panier tressé, Lusambuari↔Soixante-dix, Sakalala↔Être agréable

**1 Mandombe-recognition (8 items) :**

| Glyphe | Réponse | Distracteurs | Mode |
|--------|---------|-------------|------|
| Sakusa | Sakusa | Sakula, Sakuka, Nsakusu | glyph-to-latin |
| Sansamasa | Sansamasa | Sansamana, Sansalakani, Sambilila | glyph-to-latin |
| Sambilila | Sambilila | Sambulila, Sambulika, Sakana | glyph-to-latin |
| Nsabila | Nsabila | Nsakusu, Nsaki, Nsamu | glyph-to-latin |
| Sakalasa | Sakalasa | Sakalala, Sakilika, Sakana | latin-to-glyph |
| Lusampasampa | Lusampasampa | Lusambuari, Lusaki, Lusinga | latin-to-glyph |
| Saki-masaki | Saki-masaki | Lusaki, Masakila, Saku | latin-to-glyph |
| Lusambuari | Lusambuari | Lusampasampa, Lusanu, Lusala | latin-to-glyph |

---

## Détail technique
- Tous les exercices trilingues (FR/EN/PT) avec `as const` sur les types
- Distracteurs tirés du vocabulaire de la même leçon
- Insertion avant les fermetures `]` des tableaux exercises existants

