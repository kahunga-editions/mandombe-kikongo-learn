

## Analysis

### Crossword (Exercise 10)
The crossword data is actually correct in terms of intersections. The real problem is:
- **gridSize is 8** but the words only span columns 0-5 and rows 0-4, so there are many unnecessary black/dark empty cells (`bg-earth-deep`) filling the grid — these are the "cadres noirs" (black frames).
- Fix: reduce `gridSize` to 6 (words span 6 columns max and 5 rows).

### Word Search (Exercise 11)  
- **fillerLetters** is only 12 characters long for a 10×10 grid (needs 100). Cells beyond index 11 all show "X". This makes the puzzle trivially easy and broken.
- Fix: provide a full 100-character filler string with realistic random Kikongo consonants/vowels.

### "Cadres noirs" (black frames)
Two things to fix:
1. **Crossword**: inactive cells use `bg-earth-deep` (dark/black). Reduce grid size so there are fewer empty cells. Also change the inactive cell color to something more neutral/transparent.
2. **Outer border** on the crossword grid (`border border-border`) adds a heavy frame — remove it.

## Changes

### 1. `src/components/exercises/CrosswordPuzzle.tsx`
- Line 152: Remove `border border-border` from the outer grid container.
- Line 167: Change inactive cell from `bg-earth-deep` to a transparent/lighter style (e.g., `bg-transparent`).

### 2. `src/data/lessons.ts`
- Line 8686: Change crossword `gridSize` from 8 to 6.
- Line 8709: Replace the 12-char `fillerLetters` with a proper 100-character string that fills the entire 10×10 grid with plausible letters.

