

## Increase Mandombe Font Size in Exercise Components

Bump the Mandombe script text in all three exercise components while keeping it visually secondary to the Latin text.

### Changes

**1. `src/components/exercises/MultipleChoice.tsx`**
- `questionMandombe`: increase from `text-xl` to `text-3xl`

**2. `src/components/exercises/FillInBlank.tsx`**
- `sentenceMandombe`: increase from `text-xl` to `text-3xl`

**3. `src/components/exercises/MatchingExercise.tsx`**
- Left-column Mandombe labels: increase from `text-xs` to `text-lg`

All Mandombe text retains its subdued `text-primary/40` color so it stays decorative and doesn't compete with the Latin exercise text.

