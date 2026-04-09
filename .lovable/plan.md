

# Ajouter des exercices de discrimination Mandombe sur les nouvelles entrées

## Contexte

Les deux leçons (`pa-pe-pi-po-pu-vocabulaire` et `spiritualite-cosmologie-kongo`) ont déjà chacune 1 exercice `mandombe-recognition` (8 items chacun), mais aucun ne couvre les ~19 entrées récemment ajoutées (Furi, Mfuri, Mpena, Pema, Bumpembe, Nga mpemba, etc.).

## Plan

Ajouter **2 nouveaux exercices `mandombe-recognition`** (un par leçon), ciblant exclusivement les nouvelles entrées.

### Leçon Pa-Pe-Pi-Po-Pu — 1 exercice (8 items)

| Glyphe | Réponse | Distracteurs | Mode |
|--------|---------|-------------|------|
| Furi | Furi | Mfuri, Pema, Peno | glyph-to-latin |
| Mfuri | Mfuri | Furi, Mpena, Hehi | glyph-to-latin |
| Mpena | Mpena | Pena, Pema, Bumpamba | glyph-to-latin |
| Nkoko tuvi | Nkoko tuvi | Nkenge samba, Lumbumbu, Minduli | glyph-to-latin |
| Pema | Pema | Pena, Peno, Furi | latin-to-glyph |
| Lumbumbu | Lumbumbu | Nkoko tuvi, Nkenge samba, Minduli | latin-to-glyph |
| Bumpamba | Bumpamba | Mpamba, Bumpembe, Mpena | latin-to-glyph |
| Nkenge samba | Nkenge samba | Nkoko tuvi, Lumbumbu, Furi | latin-to-glyph |

### Leçon Cosmologie Kongo — 1 exercice (6 items)

| Glyphe | Réponse | Distracteurs | Mode |
|--------|---------|-------------|------|
| Bumpembe | Bumpembe | Mpemba, Mpembe, Bumpamba | glyph-to-latin |
| Nga mpemba | Nga mpemba | Mpemba, Kalunga, Fuombombo | glyph-to-latin |
| Mpemba (kaolin) | Mpemba | Bumpembe, Nga mpemba, Mbingi | glyph-to-latin |
| Bumpembe | Bumpembe | Bumpamba, Mpembe, Mpemba | latin-to-glyph |
| Nga mpemba | Nga mpemba | Mpemba, Fuanikisa, Kibula | latin-to-glyph |
| Mpemba (droit) | Mpemba | Bumpembe, Kalunga, Fuila | latin-to-glyph |

## Détail technique
- Insertion avant la fermeture `]` des tableaux `exercises` de chaque leçon (lignes ~24053 et ~24205)
- Format identique aux exercices existants, avec `as const` sur `type` et `mode`
- Distracteurs tirés du vocabulaire de la même leçon pour maximiser la discrimination

## Fichier modifié
- `src/data/lessons.ts`

