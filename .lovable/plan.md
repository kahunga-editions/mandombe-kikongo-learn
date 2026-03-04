

## Plan

### 1. Add "Nsatu mamba" conjugation to the vocabulary
In the "Nsatu na Lemina" lesson (`src/data/lessons.ts`, around line 3702), add 6 new vocabulary entries after the existing "Mpuina" conjugation block:

- `Nsatu mamba ye nani` — J'ai envie de boire de l'eau / I want to drink water
- `Nsatu mamba ye naku` — Tu as envie de boire de l'eau
- `Nsatu mamba ye nandi` — Il/elle/on a envie de boire de l'eau
- `Nsatu mamba ye neto` — Nous avons envie de boire de l'eau
- `Nsatu mamba ye neno` — Vous avez envie de boire de l'eau
- `Nsatu mamba ye nawu` — Ils/elles ont envie de boire de l'eau

### 2. Correct "Dikondi" → "Dinkondi" and "Makondi" → "Mankondi"
Fix all occurrences in `src/data/lessons.ts`:
- **Line 3670**: `Dikondi` → `Dinkondi` (vocabulary entry)
- **Line 3671**: `Makondi` → `Mankondi` (vocabulary entry)
- **Line 3741**: `Dikondi` → `Dinkondi` (matching exercise 5)
- **Line 3787**: `Dikondi / Makondi` → `Dinkondi / Mankondi` (multiple-choice option)

### Files to modify
- `src/data/lessons.ts` — add vocabulary entries + correct banana spelling

