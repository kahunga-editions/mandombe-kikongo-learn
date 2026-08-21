# Règle « glyphes existants » : ne jamais insérer de semi-voyelle de liaison

## Ce que tu as demandé (message vocal)

Il ne faut pas inventer de suites de lettres en Mandombe. La police contient déjà tous les glyphes : il faut taper la suite réelle du mot Lari et le glyphe apparaît. Exemple : `kua` se tape `k-u-a` et donne le glyphe `kua`. Dans la v25 il a été tapé `k-u-w-a`, ce qui est faux.

## Ce que je vais faire

1. **Ajouter la règle à la skill « taper le Mandombe »**
   - Nouvelle règle explicite : taper uniquement les glyphes existants, jamais de `w` ou `y` de liaison ajouté entre deux voyelles.
   - Exemple canonique : `kua` (jamais `kuwa`), aligné sur la règle `nua` déjà présente.
   - Ajout à la liste des interdits : « ne jamais insérer une semi-voyelle de transition qui n'est pas dans le mot Lari ».

2. **Mettre à jour la mémoire projet** (orthographe Mandombe) avec la même règle, pour qu'elle s'applique hors skill.

3. **Audit du corpus** (lecture seule d'abord) : recenser toutes les occurrences de `uwa`, `uwe`, `uwi`, `uwo`, `iya` parasites et autres semi-voyelles ajoutées dans les champs `mandombe`, dans `dictionary.json`, `lessons.ts`, corpus Mbuta, et dans le cache utilisé pour le livre. Je te présente la liste avant toute correction.
   - Réserve connue : `ia` final de mot long → `iya` reste valide (règle déjà validée, ex. `tilapiya`). L'audit ne touche pas à ce cas.

4. **Correction** des occurrences validées, puis régénération des documents ODT concernés seulement quand tu le demandes (pas de nouvelle version automatique).

## Détails techniques

- Skill : `.agents/skills/taper-le-mandombe/SKILL.md` (sections « Règles de saisie autorisées » et « Interdits explicites »), réappliquée ensuite pour activation.
- Mémoire : `mem://grammar/orthography-mandombe-rules`.
- Audit : script de recherche sur les champs `mandombe` uniquement, rapport Markdown listant mot Lari / Mandombe tapé / correction proposée.
