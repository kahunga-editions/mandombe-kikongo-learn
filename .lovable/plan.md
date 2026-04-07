

# Tableau d'accord des nombres (Ntalu) — avec buatu

## Correction demandée

Dans la classe **bu**, remplacer **buwa (champignon)** par **buatu (pirogue)**, pluriel **matu**.

## Données du tableau

| Classe | Exemple | 1 | 2 | 3 | 4 | 5 | 35 |
|--------|---------|---|---|---|---|---|---|
| mu/ba | muntu/bantu | mu moshi | bole | ba tatu | ba ya | ba tanu | makumatatu na ba tanu |
| mu/mi | mulele/milele | — | miole | mi tatu | mi ya | mi tanu | makumatatu na mi tanu |
| di/ma | ba/maba | di moshi | mole | ma tatu | ma ya | ma tanu | makumatatu na ma tanu |
| ki/bi | kifulu/bifulu | ki moshi | biole | bi tatu | bi ya | bi tanu | makumatatu na bi tanu |
| n' | ngo | moshi | zole | tatu | ya | tanu | makumatatu na tanu |
| lu/tu | lumbembemba/tumpungunzala | lu moshi | tuole | tu tatu | tu ya | tu tanu | makumatatu na tu tanu |
| **bu** | **buatu (pirogue) / matu** | bu moshi | — | — | — | — | — |
| ku | koko (main) | ku moshi | — | — | — | — | — |

## Architecture

- **Creer** `src/components/NtaluSection.tsx` (~200 lignes), calque de `VerbeBaSection.tsx`
  - Tableau avec colonnes : Classe nominale | 1 | 2 | 3 | 4 | 5 | 35
  - Cellules Mandombe cliquables → Dialog affichant le kifuani (exemple)
  - Cellules vides pour bu et ku (seulement singulier)
  - Palette de couleurs distincte du verbe BA
- **Modifier** `src/pages/Index.tsx` — import + placement apres `<VerbeBaSection />`

## Fichiers

- `src/components/NtaluSection.tsx` (nouveau)
- `src/pages/Index.tsx` (ajout import + composant)

