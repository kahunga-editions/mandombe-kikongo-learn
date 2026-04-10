

# Fix Mandombe glyphs in Kilolaka grid

## Problem
The Mandombe glyphs don't render because:
1. **Wrong font path**: The HTML references `./masono_mandombe-webfont.ttf` but the font lives at `/fonts/masono_mandombe-webfont.ttf`
2. **Glyph text needs proper casing**: The consonant group headers and syllable text should use the same casing pattern as the rest of the app (e.g., `Ki`, `Lo`, `Bi` — capitalized first letter)

## Fix — `public/kilolaka_grille.html`

### 1. Fix `@font-face` src (line 10)
Change `url('./masono_mandombe-webfont.ttf')` → `url('/fonts/masono_mandombe-webfont.ttf')`

### 2. Fix syllable casing (line 407)
Change `const syllable = cons.toLowerCase() + v;` to keep the consonant as-is (already uppercase) and just append the vowel: `const syllable = cons + v;`
This produces `Bi`, `Bu`, `MBi`, `NDu`, etc. — matching the font's internal Latin-to-glyph mapping.

### 3. Increase glyph font size for legibility
Bump `.glyph` from `1.6rem` to `2.2rem` and add `line-height: 2` and `overflow: visible` per the project's typography conventions.

No other files need changes.

