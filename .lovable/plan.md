

# Fix build errors + Remove non-Lari ideophones (gbaa, kpoo)

## 1. Fix TS1005 build errors — smart quotes

All errors are caused by Unicode curly quotes (`'` U+2018, `'` U+2019) inside string literals. TypeScript treats these as identifiers, not string delimiters. Lines affected: 28383, 28489, 28591, 28593, 28614, 28619-28620, 28636, 28682.

**Fix**: Global find-and-replace of all `'` and `'` with straight `'` across `src/data/lessons.ts`.

## 2. Remove gbaa and kpoo from ideophones lesson

These are not authentic Kikongo Lari sounds. All references must be removed from:

- **Vocabulary** (lines 29742, 29744): Remove the two vocab entries for `gbaa` and `kpoo`
- **Syntax explanations** (lines 29762-29764): Remove `gbaa` from category descriptions, replace with remaining valid ideophones
- **Example sentences** (line 29766): Remove `"Yandi bwila gbaa!"` 
- **Example sentences** (line 29786): Remove `"Nti kubuka kpoo!"`
- **Matching exercise** (line 29810): Remove the `gbaa` pair
- **Mandombe recognition** (line 29840): Remove the `gbaa` item, update distractors that reference `kpoo`

The remaining valid ideophones (piii, fyuu, nyee, tii, waa, tsiii) stay.

## Files modified
- `src/data/lessons.ts` — smart quote fix (global) + remove gbaa/kpoo (~15 line edits)

