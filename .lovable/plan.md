# Retirer les formes que j'ai fabriquées, et poser une règle qui m'en empêche

Aucun nouveau document (pas d'ODT/PDF). Corrections des données en ligne uniquement.

## Ce qui s'est passé

Dans la leçon sur « Kue », une seule forme était attestée : **Kue kotela (ka)?**. À partir d'elle j'ai décliné toute une série par analogie — Kue ka?, Kue ba?, Kue lu?, puis Nzo mikanda aku / andi / eno / awu kue ye(na)? — avec des sens et des versions portugaises. Cette série s'est propagée dans le dictionnaire en ligne et dans le traducteur. C'est une invention, pas du corpus.

## 1. Suppression des formes fabriquées

Retirées de `data/dictionary-entries.json`, `src/data/lessons.ts` (lignes 12859-12866 et 12991-12995, plus le distracteur d'exercice ligne 18072) et `supabase/functions/translate-lari/index.ts` (lignes 3700-3706) :

- Kue ka? (« Où va-t-elle à l'école ? »)
- Kue lu? (« Où allez-vous à l'école ? »)
- Nzo mikanda aku kue ye(na)?
- Nzo mikanda eno kue ye(na)?

## 2. Formes attestées, entrées avec vos sens exacts

- **Kue ba kotela ka ?** — mot à mot « Où entrent-elles ? » ; sous-entendu, selon le contexte, « Où vont-elles à l'école ? » / word for word "Where do they enter?"; implied, depending on context, "Where do they go to school?"
- **Nzo mikanda awu kue ye** — « Où vont-elles à l'école ? » ; mot à mot « Leur école, où est-elle ? »
- **Nzo mikanda andi kue ye** — « Où est son école ? » = « Où va-t-elle à l'école ? »
- **Kue ba?** et **Kue ba ka?** — « Où habites-tu ? » (le faux sens scolaire de « Kue ba? » est remplacé)

Ces sens sont saisis tels quels, y compris les notes mot à mot, dans le dictionnaire (`data/dictionary-entries.json`), dans la leçon et dans le traducteur.

## 3. Une règle permanente contre l'invention

Création d'une skill `.agents/skills/lari-corpus-only/` (soumise ensuite à activation) qui impose, à chaque fois qu'un contenu Lari est ajouté ou modifié :

- Ne jamais compléter un paradigme par analogie (personnes, pluriels, temps, classes nominales) — chaque forme doit exister telle quelle dans le corpus fourni.
- Ne jamais traduire une forme dont le sens n'est pas attesté ; en cas de doute, demander plutôt qu'écrire.
- Ne jamais dériver le portugais, l'anglais ou les autres langues d'une forme non attestée.
- Rappeler explicitement que le dictionnaire est public et utilisé par des apprenants : une forme inventée est une faute grave, pas un brouillon.
- Procédure : avant tout ajout, chercher la forme dans le corpus ; si absente, la signaler à l'autrice au lieu de la créer.

Le même rappel est ajouté à la mémoire projet (`.lovable/memory/constraints/source-material.md`).

## 4. Contrôles

- `python3 scripts/dictionary_guards.py` → doit rester vert.
- Recherche « Kue » dans le dictionnaire en ligne et dans le traducteur pour vérifier que seules les formes attestées apparaissent.
- Aucun ODT/PDF régénéré.
