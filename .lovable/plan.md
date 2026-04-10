

# Ajouter exercices singulier/pluriel, reconnaissance Mandombe et illustrations — Leçon animaux-habitats

## Résumé

Ajouter à la leçon `animaux-habitats` :
- 4 nouveaux exercices sur les accords singulier/pluriel des classes nominales
- 1 exercice de reconnaissance Mandombe supplémentaire ciblant les accords
- Des illustrations générées par IA pour les animaux du vocabulaire

## Fichiers modifiés

### 1. `src/data/lessons.ts`

**a) Ajouter un champ optionnel `image` à `VocabItem` (ligne 7)**
```typescript
image?: string; // path to illustration image
```

**b) Ajouter des images aux entrées vocabulaire de `animaux-habitats` (lignes 24536-24564)**
- Utiliser les images existantes pour : `nioka-snake.jpg`, `ngongolo-caterpillar.jpg`
- Générer via Lovable AI (~12 illustrations watercolor) pour : Nsusu (poule), Nkombo (chèvre), Tshindongo (mouton), Ngo (panthère), Ngombulu (lion), Nkabi (antilope), Mbulu (chacal), Tshimbungu (hyène), Tshibibu (gorille), Nguvu (hippopotame), Ngandu (crocodile), Nzau (éléphant), Mpakasa (buffle), Mpangu (grenouille), Lembe (cigogne), Tutu (souris)

**c) 4 nouveaux exercices à insérer dans `animaux-habitats` (après ligne 24806)**

**Multiple-choice 1 — Accord yi/ji vs ka/bi :**
"Quel accord utilise-t-on pour 'Tshindongo' (mouton) au singulier ?" → yi ba / **ka ba** / bi ba / wu ba (correct: 1)

**Multiple-choice 2 — Accord di/ma :**
"Comment dit-on 'Les souris habitent au village' ?" → Tutu ku hata di ba / **Matutu ku hata ma ba** / Tutu ku hata yi ba / Matutu ku hata ji ba (correct: 1)

**Multiple-choice 3 — Accord wu/ba :**
"Quel accord pour 'Muntu' (personne) au pluriel ?" → wu ba / ji ba / ma ba / **ba ba** (correct: 3)

**Matching — Accords par classe :**
6 paires : Nsusu → yi/ji, Tshindongo → ka/bi, Lembe → di/ma, Muntu → wu/ba, Tshibibu → tshi/bi, Nkabi → ka/ji

**d) 1 exercice mandombe-recognition supplémentaire (accords) — 8 items :**

| Mandombe | Réponse | Distracteurs | Mode |
|----------|---------|-------------|------|
| Nkombo ku tshikaku yi sekela | yi sekela | ji sekela, ka sekela, ba sekela | glyph-to-latin |
| Bindongo ku tshikaku bi sekela | bi sekela | ka sekela, yi sekela, ji sekela | glyph-to-latin |
| Matutu ku hata ma ba | ma ba | di ba, yi ba, ba ba | glyph-to-latin |
| Bibibu ku sangi bi ba | bi ba | tshi ba, yi ba, ji ba | glyph-to-latin |
| Muntu ku hata wu ba | wu ba | ba ba, di ba, ka ba | latin-to-glyph |
| Lembe ku mukobo di ba | di ba | ma ba, yi ba, ka ba | latin-to-glyph |
| Ngo ku sangi ji ba | ji ba | yi ba, ka ba, bi ba | latin-to-glyph |
| Tshimbungu ku mukobo tshi ba | tshi ba | bi ba, ka ba, yi ba | latin-to-glyph |

### 2. `src/pages/LessonDetail.tsx`

Modifier le rendu des cartes vocabulaire (lignes 134-145) pour afficher l'image si `item.image` est défini :
```tsx
{item.image && (
  <img src={item.image} alt={item.lari} className="w-full h-32 object-cover rounded-t-lg mb-2" />
)}
```

### 3. Génération d'illustrations

Utiliser Lovable AI (google/gemini-3.1-flash-image-preview) pour générer ~14 illustrations watercolor d'animaux africains, style cohérent avec les illustrations existantes. Les sauvegarder dans `public/images/`.

## Estimation
- ~14 images à générer
- ~5 exercices à ajouter
- 2 fichiers à modifier (lessons.ts, LessonDetail.tsx)
- 1 interface à étendre (VocabItem)

