

# Ajouter ~30 entrées au dictionnaire — `src/data/lessons.ts`

## Analyse des doublons

Après vérification exhaustive, voici le bilan :

**Déjà présents (à enrichir avec les notes/sens manquants) :**
- `Ntangu` (l.5484) — ajouter note tradition Kongo (entité féminine, le temps, l'ère)
- `Jiku|Majiku` (l.4845) — changer "Un foyer" → "L'âtre, endroit où l'on fait le feu ; frissonnant, frissonné"
- `Jimbakana` (l.4846) — enrichir avec "perdre, omettre"
- `Jimi|Majimi` (l.4853) — ajouter "enceinte" au sens
- `Jibula` (l.4856) — déjà correct
- `Jitisa` (l.4886) — déjà correct
- `Nzanda` (l.14773) — ajouter "abondance" + note prononciation /njanda/
- `Noka` (l.17071) — déjà complet
- `Baka` (l.1734) — déjà complet
- `Bika` (l.18237) — déjà complet (saluer)
- `Nzita` (l.4887) — déjà complet
- `Kibula, tshibula, bula|bibula` (l.24328) — déjà correct

**Nouvelles entrées (~22) à ajouter :**

| Lari | Français | English |
|------|----------|---------|
| Kizidi, tshizidi\|bizidi | Image, égregore, vidéo | Image, egregore, video |
| Nua | Boire | To drink |
| Nzaya | La connaissance | Knowledge |
| Nzayilu | Connaissance | Knowledge, knowing |
| Mama Ntoto | La planète terre (tradition Kongo) | Planet Earth (Kongo tradition) |
| Makuku Ma Tatu | Les 3 piliers de la tradition Kongo | The 3 pillars of Kongo tradition |
| Pusu | Membrane | Membrane |
| Kiseliya, tshiseliya\|biseliya | Cellule | Cell |
| Kala (sens 3) | Revenir, être de retour (/a:/ long) | To return, to come back |
| Yela (sens 3) | Fleurir | To bloom, to blossom |
| Bela | Haïr | To hate |
| Tshibula tsha lala | Écorce d'orange | Orange peel |
| Jikumuna | Enfièvrer | To make feverish |
| Jikumuka | Avoir la fièvre, frissonner | To have a fever, to shiver |
| Jibika | Fermer | To close |
| Jibu | Ferment, fermé, ouvrant, ouvert | Leaven, closed, opening, open |
| Jibuku\|bijibuku | Plèvre, membrane entourant les poumons | Pleura, membrane surrounding the lungs |
| Jibama | Être fermé, se fermer | To be closed, to close |
| Jibuka | Être ouvert, s'ouvrir | To be open, to open |
| Jimbakasa | Dissimuler, perdre | To conceal, to lose |
| Jitu | Respectant, respecté | Respecting, respected |
| Nzitu | Personne respectable | Respectable person |
| Bujitu | Politesse, respect | Politeness, respect |
| Zita\|mazita | Importance, poids | Importance, weight |
| Jita\|majita | Importance, poids | Importance, weight |
| Zitama | Avoir de l'importance, être respecté | To be important, to be respected |

## Plan d'implémentation

### 1. Enrichir les entrées existantes (6 modifications)
- **Ligne 5484** (`Ntangu`) : enrichir le `french` avec le sens tradition + ajouter `note`
- **Ligne 4845** (`Jiku|Majiku`) : mettre à jour french/english avec les nouveaux sens (âtre + frissonnant)
- **Ligne 4846** (`Jimbakana`) : ajouter "perdre, omettre" au french/english
- **Ligne 4853** (`Jimi|Majimi`) : ajouter "enceinte" 
- **Ligne 14773** (`Nzanda`) : ajouter note prononciation /njanda/ + "abondance"

### 2. Ajouter les nouvelles entrées
- **Entrées J-** (Jikumuna, Jikumuka, Jibika, Jibu, Jibuku, Jibama, Jibuka, Jimbakasa, Jitu, Jita) → dans la leçon Z-/J- verbs (après ligne 4886)
- **Entrées tradition** (Mama Ntoto, Makuku Ma Tatu, Nzitu, Bujitu) → dans la leçon cosmologie/tradition Kongo (id: `spiritualite-cosmologie-kongo`)
- **Entrées générales** (Kizidi, Nua, Nzaya, Nzayilu, Pusu, Kiseliya, Kala, Yela, Bela, Tshibula tsha lala, Zita, Zitama) → dans les leçons thématiques appropriées

### Fichier modifié
Un seul fichier : `src/data/lessons.ts`

