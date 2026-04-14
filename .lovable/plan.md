

# Corrections linguistiques : Brazza → Mfua + mono → NA/NI (marqueurs de personne)

## Correction fondamentale sur `mono`

L'utilisateur corrige une erreur linguistique importante : en Kikongo Lari parlé moderne, on n'utilise **pas** `me`/`meno` systématiquement à la place de `mono`. Le pronom indépendant de 1re personne est rarement employé. À la place, on utilise des **marqueurs préverbaux** :
- **NA** → passé (1re sg) : "Mazuji ku Mfua **NA** yele"
- **NI** → futur (1re sg) : "Mbaji ku zandu **NI** kwenda"

Cela signifie qu'il ne faut PAS faire un remplacement aveugle `mono → me`. Chaque occurrence de `mono` dans une phrase doit être analysée selon le contexte temporel.

## Changements prévus

### 1. `src/data/lessons.ts` — Brazza/Brazzaville → Mfua (~64 occurrences)
- Remplacer toutes les occurrences de `Brazza`, `Brazzaville` par `Mfua` dans les champs `lari`, `mandombe`, `french`, `english`, `portuguese`, et les textes d'exercices

### 2. `src/data/lessons.ts` — mono → NA ou NI selon le contexte (~125 occurrences)
Analyse contextuelle pour chaque phrase :
- **Contexte passé** (mazuji, mazono, verbes au passé) : `mono` → `NA`
  - Ex : "Mazuji ku Mfua **NA** yele" (j'étais)
- **Contexte futur** (mbaji, intention) : `mono` → `NI`
  - Ex : "Mbaji ku zandu **NI** kwenda" (j'irai)
- **Contexte présent/progressif** : `mono` → `NI` (marqueur présent 1sg)
- **Entrées de vocabulaire** (pronoms isolés) : garder `Me / Meno` comme forme emphatique/indépendante, mais ajouter une note pédagogique expliquant que NA/NI sont les formes courantes à l'oral
- **Distracteurs d'exercices** : remplacer `"Mono"` par `"Meno"` (forme emphatique)

### 3. `src/data/lessons.ts` — Leçon pronoms (ligne ~25336)
- Modifier l'entrée `"Me / Mono"` → `"Me / Meno"` 
- Ajouter une explication pédagogique dans la section syntax : "En Lari moderne parlé, on utilise rarement le pronom indépendant. Les marqueurs NA (passé) et NI (futur/présent) remplacent le pronom sujet à la 1re personne du singulier."

### 4. Exercices — Mise à jour des questions et réponses
- Toutes les phrases citées dans les questions/réponses (`"Mazuji ku Brazza mono yele"`) → `"Mazuji ku Mfua NA yele"`
- Explication des exercices mise à jour pour refléter NA/NI

## Scope
- 1 fichier modifié : `src/data/lessons.ts`
- Pas de migration, pas de nouveau composant
- Travail principalement de recherche-remplacement contextuel

