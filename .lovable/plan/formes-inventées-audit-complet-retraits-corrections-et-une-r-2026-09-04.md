# Formes inventées : audit complet, retraits, corrections, et une règle qui m'en empêche

Aucun nouveau document (pas d'ODT/PDF). Corrections des données en ligne uniquement.

## Ce qui s'est passé

Dans la leçon sur « Kue », une seule forme était attestée : **Kue kotela (ka)?**. À partir d'elle j'ai décliné une série par analogie — Kue ka?, Kue lu? — avec des sens scolaires et des versions portugaises inventées, propagés ensuite dans le dictionnaire en ligne et le traducteur.

**Kue na dingi = « C'est silencieux »** : je ne peux pas la rattacher au corpus. Elle apparaît uniquement dans une leçon d'états et d'émotions que j'ai composée (vocabulaire, exemple de syntaxe, exercice d'association), à côté de « Kwa dzuna » et « Tsha lembo mpashi ». Elle n'est pas dans le corpus source. Elle est donc suspecte au même titre que Kue ka? / Kue lu?, et fait partie de l'audit ci-dessous.

## 1. Audit : la liste de toutes les formes suspectes

Production d'un rapport `reports/formes-a-arbitrer.md`, à votre lecture, listant chaque forme Lari des données en ligne (`data/dictionary-entries.json`, `src/data/lessons.ts`, corpus du traducteur) qui **n'est pas retrouvée dans la source de référence**, avec pour chacune : la forme, son sens actuel, l'endroit exact où elle apparaît, et la forme attestée voisine dont elle a pu être dérivée.

Priorité de tri du rapport :
1. Séries de paradigme (mêmes mots avec pronom/personne changés) — c'est le mécanisme fautif ;
2. Phrases entières absentes du corpus ;
3. Mots isolés absents du corpus.

Rien n'est supprimé sur la base de cet audit sans votre arbitrage : le rapport vous est remis, vous tranchez, puis j'applique.

## 2. Retraits déjà arbitrés

Retirées de `data/dictionary-entries.json`, `src/data/lessons.ts` (lignes 12861, 12992, 12863, 12994, plus le distracteur d'exercice ligne 18072) et `supabase/functions/translate-lari/index.ts` (lignes 3700, 3702) :

- **Kue ka?** (« Où va-t-elle à l'école ? »)
- **Kue lu?** (« Où allez-vous à l'école ? »)

## 3. Formes attestées — conservées, avec vos sens exacts

Corrigées dans `data/dictionary-entries.json`, `src/data/lessons.ts` et `supabase/functions/translate-lari/index.ts` :

- **Kue ba?** = Où habites-tu ? / Where do you live? (le faux sens scolaire est remplacé)
- **Kue ba ka?** = Où habites-tu ? / Where do you live? (les deux formes sont bonnes, toutes deux conservées)
- **Kue ba kotela ka ?** = mot à mot « Où entrent-elles ? » ; sous-entendu, selon le contexte, « Où vont-elles à l'école ? »
- **Nzo mikanda aku kue ye(na)?** = Où est ton école ?
- **Nzo mikanda andi kue ye(na)?** = Où est son école ? = Où va-t-elle à l'école ?
- **Nzo mikanda eno kue ye(na)?** = Où est votre école ?
- **Nzo mikanda awu kue ye(na)?** = Où vont-elles à l'école ? ; mot à mot « Leur école, où est-elle ? »

## 4. Une règle permanente contre l'invention

Création d'une skill `.agents/skills/lari-corpus-only/` (soumise ensuite à activation) qui impose, à chaque ajout ou modification de contenu Lari :

- Ne jamais compléter un paradigme par analogie (personnes, pluriels, temps, classes nominales) — chaque forme doit exister telle quelle dans le corpus fourni.
- Ne jamais traduire une forme dont le sens n'est pas attesté ; en cas de doute, demander plutôt qu'écrire.
- Ne jamais dériver le portugais, l'anglais ou les autres langues d'une forme non attestée.
- Le dictionnaire est public et utilisé par des apprenants : une forme inventée est une faute grave, pas un brouillon.
- Procédure : avant tout ajout, chercher la forme dans le corpus ; si absente, la signaler à l'autrice au lieu de la créer.

Le même rappel est ajouté à la mémoire projet (`.lovable/memory/constraints/source-material.md`).

## 5. Contrôles

- `python3 scripts/dictionary_guards.py` → doit rester vert.
- Recherche « Kue » dans le dictionnaire en ligne et dans le traducteur pour vérifier que seules les formes attestées apparaissent, avec les bons sens.
- Aucun ODT/PDF régénéré.
