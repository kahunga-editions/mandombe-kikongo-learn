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
