# Pourquoi « tu seras » ne donne rien dans les Conjugaisons

## Ce qui se passe réellement

La forme existe bien dans les données : « mbo ba — Tu seras. » fait partie du tableau du futur du verbe être (`src/data/lessons.ts`, lignes 548-562), aux côtés de « mbo ni ba » (je serai), « mbo ka ba » (il/elle sera), « mbo tu ba », « mbo lu ba », « mbo ba ba ». Il existe aussi un tableau du passé par personne : mbele, bele, ka bele, tu bele, lu bele, ba bele.

Mais la page Conjugaisons écarte **tous** les tableaux du verbe être (`src/pages/Conjugations.tsx`, ligne 111), sur la base d'une affirmation fausse écrite dans le code — « le verbe être ne se conjugue pas par personne ». Résultat : rien du verbe être n'apparaît dans les tableaux, et la recherche ne trouve rien.

Correction de fond : le verbe être **se conjugue par personne**. C'est à la 3e personne du singulier et à la 3e personne du pluriel que l'accord se fait par classe de nom, parce qu'on parle alors de choses, d'animaux, de personnes selon leur classe.

## Correction proposée

1. **Afficher le verbe être comme les autres verbes.** Supprimer l'exclusion : la carte « Ba — Être » apparaît avec ses tableaux par personne (passé, futur, et présent lorsqu'il est donné par personne), avec Mandombe, translittération, audio et traduction pour chaque ligne. Taper « tu seras », « je serai » ou « nous étions » donnera la ligne correspondante.

2. **Retirer l'affirmation fausse.** Le commentaire du code et le texte d'introduction de la section « Le verbe être dans tous ses états » sont réécrits : le verbe être se conjugue par personne ; aux 3es personnes (singulier et pluriel), la forme s'accorde avec la classe du nom.

3. **Articuler les deux blocs.** La section du haut reste dédiée à l'accord par classe aux 3es personnes ; les tableaux par personne complètent la page en dessous, sans doublon inutile.

## Ce qui ne change pas

- Aucune donnée linguistique n'est créée ni modifiée : tout vient déjà de `src/data/lessons.ts`.
- Les phrases et l'affichage de « Le verbe être dans tous ses états » restent tels quels, seul le texte d'introduction est corrigé.
- Aucun document (ODT/PDF) n'est régénéré.

## Détail technique

- `src/pages/Conjugations.tsx` : suppression du filtre ligne 111 qui exclut les tableaux `verb === "Ba"` / sens « Être », et réécriture du paragraphe d'introduction de la section « Le verbe être dans tous ses états ».
- Vérification : `tsgo`, journal de build, puis capture Playwright de `/conjugations` avec la recherche « tu seras ».
