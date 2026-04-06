

# Correction : "Dzuna" en Lari, "Djuna" en Mandombe

## Règle linguistique

- **Prononciation Kikongo Lari** : /dzuna/ → champs `lari` doivent utiliser **"Dzuna"**
- **Écriture Mandombe** : → champs `mandombe` gardent **"Djuna"**

Actuellement, tout a été uniformisé en "Djuna" partout. Il faut rétablir "Dzuna" dans les champs Lari uniquement.

## Modifications dans `src/data/lessons.ts`

### 1. Champs `lari` et `sentence` : "Djuna"/"djuna" → "Dzuna"/"dzuna"
Environ 25 occurrences à corriger :
- Vocabulaire : `lari: "Djuna"` → `lari: "Dzuna"`
- Phrases : `lari: "Djuna ngatu wa lembo..."` → `lari: "Dzuna ngatu wa lembo..."`
- Exercices fill-in-blank : `blank: "djuna"` → `blank: "dzuna"`
- Distracteurs en contexte Lari : "Djuna" → "Dzuna"
- Matching `left` en contexte Lari : "Djuna" → "Dzuna", "Kwa djuna" → "Kwa dzuna"

### 2. Champs `mandombe` : restent "Djuna"/"djuna" (déjà correct)

### 3. Titres de leçon
La leçon `sa-mayela-djuna-lungu` : les titres `title`, `titleFr`, `titlePt`, `titleLari` → "Sa mayela, Dzuna, Lungu". Le `titleMandombe` reste "Sa mayela, Djuna, Lungu".

### 4. Note de prononciation
Mettre à jour la note existante : `"Se prononce /dzuna/, s'écrit djuna en Mandombe"`

### 5. Distracteurs dans les exercices mandombe-recognition
Les distracteurs qui apparaissent dans un contexte Mandombe (mode `latin-to-glyph`) gardent "Djuna". Ceux dans un contexte non-Mandombe → "Dzuna".

## Fichier modifié
- `src/data/lessons.ts` — ~30 remplacements ciblés

