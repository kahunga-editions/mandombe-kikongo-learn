

## Add Mandombe Script to Stories and Kilolaka Sections

Apply the same Mandombe header pattern used in the Vocabulary and Hero sections to the Stories and Kilolaka sections for visual consistency.

### Changes

**1. `src/components/StoryPreview.tsx`**
- Add a Mandombe script line ("Binsamu") above the "Binsamu — Stories" subtitle
- Add Mandombe rendering for the story title "Nsayi a l'ecole et a la foret" (accent-free) in the dark header area
- Add Mandombe text for each Kikongo Lari excerpt line alongside the existing italic Latin text

**2. `src/components/KilolakaPreview.tsx`**
- Add a Mandombe script line ("Kilolaka") above the main "Kilolaka" heading
- Add Mandombe rendering for the card titles "Ki-Lo-La-Ka" and "B-Series"
- Add Mandombe script next to each syllable/morpheme entry (Ki, Lo, La, Ka, Bi, Bu, Be, Bo, Ba)

All Mandombe text will use the `font-mandombe` Tailwind class with accent-free Latin characters, matching the style established in the Vocabulary and Hero sections.

