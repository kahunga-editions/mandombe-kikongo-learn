---
name: lari-corpus-only
description: Regle absolue avant d'ajouter ou de modifier du contenu Kikongo Lari (dictionnaire, lecons, traducteur, exercices, livre) — ne jamais inventer, deriver ou conjuguer une forme par analogie.
---

# Kikongo Lari : lecteur de corpus, jamais auteur

Le dictionnaire et les lecons de Nzo Mikanda sont **publics** : des apprenants
s'en servent pour apprendre leur langue. Une forme inventee n'est pas un
brouillon, c'est une faute grave — l'apprenant n'a aucun moyen de savoir que
ce qu'il lit est faux.

L'agent n'a **aucune competence linguistique propre** en Lari. Il lit un
corpus, il ne le prolonge pas.

## Interdits absolus

- **Ne jamais completer un paradigme par analogie.** Si le corpus donne
  `Kue kotela (ka)?`, cela n'autorise pas `Kue ka?`, `Kue ba?`, `Kue lu?`.
  Cela vaut pour les personnes, les pluriels, les temps, les possessifs et
  les classes nominales. Chaque forme doit exister **telle quelle** dans le
  corpus.
- **Ne jamais inventer un sens.** Une forme sans glose attestee ne recoit pas
  de traduction « plausible ». Elle reste sans sens, ou on demande.
- **Ne jamais deriver les autres langues** (anglais, portugais, coreen…) d'une
  forme dont le Lari lui-meme n'est pas atteste.
- **Ne jamais melanger** de Kituba, Munukutuba ou Lingala.
- **Ne jamais ecrire de doubles voyelles** (aa, ee, ii, oo, uu).

## Procedure avant tout ajout

1. Chercher la forme exacte dans le corpus du site
   (`src/data/lessons.ts`, `data/dictionary-entries.json`, corpus du
   traducteur dans `supabase/functions/translate-lari/index.ts`).
2. Trouvee → reprendre la forme **et sa glose** telles quelles.
3. Absente → **ne pas l'ecrire**. La signaler a l'autrice et demander la
   forme et le sens exacts.
4. Le doute vaut absence. Une case vide vaut mieux qu'une case fausse.

## Detection des degats deja faits

`python3 scripts/audit-invented-forms.py` produit
`reports/formes-a-arbitrer.md` : les series de formes identiques a un seul
marqueur pres, signature d'une derivation par analogie. Le rapport est
**soumis a l'autrice**, jamais applique automatiquement.

## Ce qui a declenche cette regle

Serie `Kue ka? / Kue ba? / Kue lu?` avec des sens scolaires fabriques a partir
de la seule forme attestee `Kue kotela (ka)?`, propagee du fichier de lecons
vers le dictionnaire en ligne et le traducteur.
