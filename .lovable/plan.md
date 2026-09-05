# Intégrer la note culturelle Kongo sur la parenté

## Objectif
Ajouter dans la leçon existante **« Les termes de parenté »** une note culturelle qui rappelle que, dans la tradition Kongo, le pouvoir appartient au clan (matrilignage) et non aux pères individuellement, sans modifier les traductions de `tata` / `mama`.

## Contenu exact à intégrer
- Formulation demandée : « Dans la tradition Kongo, il n'y a pas de patriarches, car les pères ne font pas partie de la famille. »
- Précision fournie : le pouvoir n'appartient pas aux pères, il appartient au clan, pas aux individus.
- Conséquence : les traductions `tata = père` et `mama = mère` restent inchangées ; on ajoute seulement un encadré culturel.

## Implémentation

### 1. Extension du schéma de leçon
Dans `src/data/lessons.ts`, ajouter au type `Lesson` les champs optionnels :
- `culturalNote?: string`
- `culturalNoteFr?: string`
- `culturalNoteEn?: string`
- `culturalNotePt?: string`

### 2. Remplissage dans la leçon « termes-de-parente »
Ajouter la note culturelle dans la leçon `id: "termes-de-parente"` :
- `culturalNoteFr` : formulation exacte ci-dessus, plus la précision sur le clan.
- `culturalNoteEn` : traduction fidèle pour les autres langues.
- `culturalNotePt` : traduction portugaise.

### 3. Affichage dans la page de leçon
Dans `src/pages/LessonDetail.tsx` :
- Afficher `culturalNote*` sous le titre/description de la leçon, avant le vocabulaire.
- Utiliser un encart visuel distinct (bordure latérale, fond accentué) pour le différencier du contenu linguistique.
- Respecter la langue active via `useLanguage`.

### 4. Mémoire projet
Créer ou mettre à jour `mem://culture/parente-kongo` avec la règle :
- La famille kongo se pense par le matrilignage (`kanda`).
- `tata` et `mama` désignent bien le père et la mère comme parents, mais l'autorité/pouvoir clanique ne passe pas par la figure paternelle individuelle.
- Ne jamais présenter la société Kongo comme patriarcale.

### 5. Vérification
- `bunx tsgo --noEmit -p tsconfig.app.json`
- Aperçu visuel de la leçon « Les termes de parenté »
- Vérifier que la note apparaît correctement en FR, EN, PT et qu'elle ne perturbe pas les exercices.

## Hors scope
- Aucune modification des traductions `tata`, `mama`, `bataata`, etc.
- Aucune création de nouvelle leçon.
- Aucune régénération de document ODT/PDF.
