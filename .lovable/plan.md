

## Plan: Expand Body Vocabulary & Create Body Parts Lesson

### What to do

**1. Update VocabularyPreview.tsx — Body section**

Replace the current limited body vocabulary (lines ~230-248) with the full list of ~70+ body parts provided, organized with a few free words and the rest as `premiumWords`. Each entry includes French, English, and Portuguese translations.

**2. Create a new lesson in `src/data/lessons.ts` — "Nitu" (The Human Body)**

Add a dedicated body parts lesson with:
- **Vocabulary**: All ~70+ terms organized by body region (Head & Face, Torso, Arms & Hands, Legs & Feet, Internal Organs, Reproductive, Fluids & Tissues)
- **Exercises** (~15-20): Mix of matching, multiple-choice, and fill-in-blank covering:
  - Singular/plural pairs (e.g., hembo/mahembo, koto/makoto, disu/meso)
  - Body part identification
  - Internal organs matching
  - Head/face vocabulary
  - Hands & feet details
- All exercises with English + Portuguese translations for instructions, explanations, and hints

### Key vocabulary to add (sample groupings)

- **Head**: Ntu (head), Nsuki (hair), Mbunzu (forehead), Ntumpa (fontanelle), Disu/Meso (eye/eyes), Nse (eyebrow), Bundi/Mabundi (cheek/cheeks), Mbombo (nose), Kutu/Makutu (ear/ears), Nua (mouth), Mfinini (gums), Banga/Mabanga (jaw), Tshibanga/Bibanga (chin/chins), Yevo/Yelo/Kiyelo/Tshiyelo (beard), Biyelo (beards)
- **Neck/Torso**: Nsingu (neck), Koshi (nape), Hembo/Mahembo (shoulder/s), Ntulu (chest), Beni/Mabeni (breast/s), Nima (back), Moyo (belly), Nkumba (navel), Luketo (kidneys/lower back), Taku/Mataku (buttock/s)
- **Arms/Hands**: Koko (hand/arm), Nima koko (back of hand), Mbata (palm), Lembo/Mulembo/Milembo (finger/s), Luzala/Nzala (nail/s)
- **Legs/Feet**: Kulu (foot), Ntanga/Mitanga (calf/calves), Tshinkoso/Binkoso (heel/s), Koto/Makoto (knee/s)
- **Internal/Tissues**: Ntima/Mitima (heart/s), Sakafulu (lung), Tshifundu (stomach), Midia (entrails), Nkanda (skin), Yisi/Biyisi (bone/s), Tidi/Matidi (tendon/s), Muelo/Mielo (chakra/s)
- **Reproductive**: Sondo (clitoris), Mbula (vagina), Kata/Makata (testicle/s), Mvia (penis)
- **Fluids**: Menga (blood), Tiafuta (sweat), Masuba (urine), Maluma (sperm), Mante (saliva), Tuvi (feces)

### Files to modify
- `src/components/VocabularyPreview.tsx` — expand body section
- `src/data/lessons.ts` — add new "Nitu" lesson with vocabulary + exercises

