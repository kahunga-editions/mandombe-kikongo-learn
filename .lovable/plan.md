

# Correction : "njila" en Lari, "nzila" en Mandombe

## Règle linguistique

- **Prononciation Kikongo Lari** : /njila/ → champs `lari` utilisent **"njila"**
- **Écriture Mandombe** : → champs `mandombe` utilisent **"nzila"**
- Note de prononciation : "Se prononce /njila/ en Lari, s'écrit nzila en Mandombe"

## Modifications dans `src/data/lessons.ts`

### 1. Champs `lari` : remplacer "nzila" par "njila" (~12 occurrences)
- Ligne 4336 : `lari: "Hambana bua nzila"` → `"Hambana bua njila"`
- Ligne 4566 : `lari: "Kuenda na nzila"` → `"Kuenda na njila"`
- Ligne 11844 : `lari: "...mu nzila ya Mfua."` → `"...mu njila ya Mfua."`
- Ligne 11852 : `lari: "...ma nzila ya Boko..."` → `"...ma njila ya Boko..."`
- Ligne 17367-17372 : 6 conjugaisons `lari: "...mu nzila Kongo."` → `"...mu njila Kongo."`
- Ligne 17364-17365 : titres de section `"mu nzila Kongo"` → `"mu njila Kongo"`

### 2. Champs `mandombe` : garder "nzila" (déjà correct partout)

### 3. Vocabulaire : corriger les entrées doubles
- Ligne 11800 : `lari: "Njila / Nzila"` → `lari: "Njila"`, `mandombe: "Nzila"` + note de prononciation
- Ligne 13622 : `lari: "Njila"` déjà correct, `mandombe: "Njila"` → `mandombe: "Nzila"`
- Ligne 12030 : item recognition `mandombe: "Njila / Nzila"` → `mandombe: "Nzila"`, `lari: "Njila"`

### 4. Distracteurs
- Ligne 3419 : distracteur `"Njila Mbamu..."` — contexte Mandombe (latin-to-glyph) → garder ou corriger selon le contexte d'affichage
- Ligne 5114 : distracteur `"Hambana bua nzila"` en mode glyph-to-latin → `"Hambana bua njila"`
- Ligne 16998 : distracteur `"Bele mu nzila Kongo."` en mode glyph-to-latin → `"Bele mu njila Kongo."`
- Ligne 17661 : distracteur `"Njila"` en mode glyph-to-latin → reste "Njila" (correct)

### 5. Cas spéciaux à ne PAS toucher
- Ligne 16177 : `"Bisinzila"` — mot différent (petites souches), ne pas modifier
- Ligne 17456 : item en mode `latin-to-glyph` → les champs `mandombe` et `lari` affichent dans leur contexte respectif

## Fichier modifié
- `src/data/lessons.ts` — ~20 remplacements ciblés

