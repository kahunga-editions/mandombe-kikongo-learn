# Scripts utilitaires

## `sync-corpus.ts`

Régénère `supabase/functions/_shared/lessons-corpus.ts` depuis `src/data/lessons.ts`.
À lancer après toute modification du fichier de leçons côté client.

```bash
bun run scripts/sync-corpus.ts
# ou
npx tsx scripts/sync-corpus.ts
```

Sortie attendue :
```
✓ Corpus régénéré : 177 leçons, 3307 entrées de vocab, 1054 exercices
```

> 💡 Le fichier `package.json` est géré automatiquement par Lovable et ne peut pas être modifié à la main pour ajouter un alias `npm run sync:corpus`. Utiliser la commande complète ci-dessus.

## `fix-lari-variants.ts` + `fix-book-variants.py`

Recherche et corrige automatiquement les variantes erronées connues
(ex : `Mankondi nzololo dia` mal traduit, `bv` → `v`, `mbuma`/fruit, `nkelele`/`ngongolo`).

Les règles sont centralisées dans **`scripts/lari-variant-rules.json`** :
- `phraseRules` : pour une phrase Lari donnée, remplace les traductions fautives (fr/en/pt) par la bonne.
- `textRules` : regex globales, soit correctives (`replacement`), soit de simple signalement (`reportOnly`),
  avec `skipIfLineContains` pour ignorer les distracteurs d'exercices.

```bash
bun run scripts/fix-lari-variants.ts             # rapport seul (dry-run)
bun run scripts/fix-lari-variants.ts --fix       # applique aux sources
bun run scripts/fix-lari-variants.ts --fix --book # + patch l'ODT et régénère le PDF KDP
python3 scripts/fix-book-variants.py --check     # vérifie seulement le livre
```

Fichiers couverts : `src/data/lessons.ts`, `supabase/functions/_shared/lessons-corpus.ts`,
`dictionary.json`, `offline-fallback.ts`, `translate-lari`, `mbuta-matondo`,
plus `/mnt/documents/Buku-dia-Binsono-*.odt|.pdf`.

> Pour ajouter une correction : éditer `lari-variant-rules.json`, puis relancer avec `--fix`.
