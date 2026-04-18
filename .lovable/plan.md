

Le user demande de lancer `bun run scripts/sync-corpus.ts` pour vérifier que la sync fonctionne end-to-end. C'est une exécution simple, pas une modification de code. Je suis en mode read-only donc je dois passer en mode default pour exécuter la commande.

## Plan

1. Exécuter `bun run scripts/sync-corpus.ts`
2. Vérifier la sortie attendue : `✓ Corpus régénéré : 177 leçons, 3307 entrées de vocab, 1054 exercices`
3. Confirmer que `supabase/functions/_shared/lessons-corpus.ts` a bien été régénéré (taille / premières lignes)
4. Si écarts (nombre de leçons différent, erreur de parsing), les rapporter

Aucune modification permanente du code n'est faite — c'est un test de la chaîne de synchronisation existante.

