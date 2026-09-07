# Pourquoi « tu seras » ne donne rien dans les Conjugaisons

## Ce qui se passe réellement

La forme existe bien dans les données : « mbo ba — Tu seras. » fait partie du tableau du futur du verbe être (`src/data/lessons.ts`, lignes 548-562), aux côtés de « mbo ni ba » (je serai), « mbo ka ba » (il/elle sera), etc. Il existe aussi un tableau du passé par personne : mbele, bele, ka bele, tu bele, lu bele, ba bele.

Mais la page Conjugaisons écarte volontairement **tous** les tableaux du verbe être (`src/pages/Conjugations.tsx`, ligne 111), au motif que « le verbe être ne se conjugue pas par personne » et qu'il a sa propre section en haut de page (accord par classe nominale). Résultat : le passé et le futur du verbe être, qui eux se conjuguent bel et bien par personne, n'apparaissent nulle part sur la page — donc la recherche ne trouve rien.

La recherche elle-même fonctionne maintenant sur les traductions (corrigée juste avant) ; c'est bien le contenu qui manque, pas le moteur de recherche.

## Correction proposée

1. **Ne plus tout écarter.** Sur la page Conjugaisons, ne masquer que le présent du verbe être (celui qui est déjà couvert par « Le verbe être dans tous ses états »), et afficher le **passé** et le **futur** du verbe être comme des tableaux normaux par personne.

2. **Placement.** Ces deux tableaux apparaîtront dans une carte « Ba — Être » avec les deux colonnes Passé et Futur, comme les autres verbes, avec le Mandombe, la translittération, l'audio et la traduction de chaque ligne.

3. **Cohérence avec la section du haut.** Une courte phrase précisera que le présent du verbe être s'accorde avec la classe du nom (voir la section en haut de page), tandis que le passé et le futur se conjuguent par personne.

Après ça, taper « tu seras », « je serai » ou « nous étions » affichera la ligne correspondante.

## Ce qui ne change pas

- Aucune donnée linguistique n'est créée ni modifiée : tout vient déjà de `src/data/lessons.ts`.
- La section « Le verbe être dans tous ses états » reste telle quelle.
- Aucun document (ODT/PDF) n'est régénéré.

## Détail technique

- `src/pages/Conjugations.tsx` : remplacer le filtre ligne 111 (qui exclut tout tableau `verb === "Ba"` dont le sens est « Être ») par un filtre qui n'exclut que `tense === "Present"` pour ce verbe.
- Vérification : `tsgo`, journal de build, puis capture Playwright de `/conjugations` avec la recherche « tu seras ».
