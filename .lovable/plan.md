

# Expand Nsayi Story with PDF Content and Mandombe Speech Bubbles

## What We're Building

Based on the uploaded PDF "Nsayi a l'ecole et a la foret", we'll expand the comic-strip story from 6 panels to 14 panels, covering the full narrative arc from the book. Each panel will feature:

- Watercolor-style illustrations of Black Congolese characters (Nsayi with her ponytail, Sunda as her best friend)
- Speech bubbles containing **actual Mandombe script** using the Masono Mandombe font already installed
- Four-way text: Mandombe script, Kikongo Lari (Latin), French, and English

## Story Arc (14 Panels)

The PDF tells a rich story across several chapters. Here's the panel breakdown:

### Free Panels (1-3) -- Existing, will update text from PDF

1. **Introduction** -- "Once upon a time in the Kongo..." Nsayi and Sunda together in their village (wide layout)
2. **School life** -- Nsayi loves school, reads books, writes stories (right layout)
3. **In the classroom** -- She listens to teachers, takes notes in her notebook (left layout)

### Premium Panels (4-14) -- New content from PDF

4. **Telling time by the sun** -- In the old days, people used the sun's position and their shadow to know the time (wide layout, speech bubble from Nsayi in Mandombe)
5. **Writing at home** -- Nsayi spends hours reading and writing stories for her friends (right layout)
6. **Letters for family** -- Her parents have her write letters for the family (left layout, speech bubble from Mama in Mandombe)
7. **Dream of becoming a doctor** -- She dreams of healing children in her village (wide layout, speech bubble from Nsayi in Mandombe)
8. **Going to the savanna** -- Nsayi loves exploring the savanna with Sunda (right layout)
9. **Picking mushrooms** -- Her favorite activity: gathering mushrooms, especially the bright orange "nsempela" (left layout, speech bubble from Sunda in Mandombe)
10. **The nsempela mushroom** -- The nsempela has a unique flavor, a delight every time (wide layout)
11. **Gathering fruits and vegetables** -- They also pick seasonal fruits in the savanna (right layout)
12. **The musekeni plant** -- Her favorite vegetable, delicious cooked in palm sauce (left layout, speech bubble from Nsayi in Mandombe)
13. **The ntinia vine** -- She also loves the ntinia, a vine with tender edible tips (right layout)
14. **Story ending** -- Nsayi shares everything with her friends (wide layout)

## Technical Implementation

### 1. Update the ComicPanel Component

- Add a `mandombeBubble` prop for speech bubbles that render in Mandombe font
- The speech bubble will show Mandombe script as the primary text (large, using `font-mandombe` class), with a small Latin transliteration underneath
- This creates the immersive bilingual experience the user wants

### 2. Generate 8 New Illustration Panels

Create new panel images (story-panel-7 through story-panel-14) using consistent prompts:
- Watercolor style with earthy palette (terracotta, gold, cream, green)
- Nsayi: young Black Congolese girl with **ponytail hairstyle**, always recognizable
- Sunda: her best friend, slightly different hair/outfit
- Congolese village, savanna, and forest settings
- Bold outlines, warm lighting

### 3. Update Existing Panels 1-3

- Regenerate panels 1-3 to ensure Nsayi has a clear ponytail hairstyle
- Update the text content to match the PDF more closely

### 4. Mandombe in Bubbles

The speech bubbles will use the existing `font-mandombe` CSS class (Masono Mandombe font) to render actual Mandombe script characters. The bubble structure:

```
+---------------------------+
|  [Mandombe script text]   |  <-- large, font-mandombe
|  Latin transliteration    |  <-- small, italic
|  -- Speaker name          |
+---------------------------+
```

### 5. File Changes

| File | Action |
|------|--------|
| `src/assets/story-panel-1.jpg` through `story-panel-6.jpg` | Regenerate with ponytail for Nsayi |
| `src/assets/story-panel-7.jpg` through `story-panel-14.jpg` | New illustrations |
| `src/components/StoryPreview.tsx` | Expand to 14 panels, add Mandombe bubble support |

### 6. Content Accuracy

All Kikongo Lari text comes directly from the PDF to ensure linguistic authenticity. The Mandombe script in the bubbles will use the font to render the Lari text in its proper alphabet form.

