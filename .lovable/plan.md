

# Indicateur de chargement + Espagnol

## Changements

### 1. `src/hooks/useTranslatedContent.ts`
- Ajouter `"es"` au tableau `DYNAMIC_LANGS`
- Ajouter un state `isTranslating` (boolean) : mis à `true` quand `flushBatch` démarre, `false` quand il finit
- Retourner `isTranslating` depuis le hook

### 2. `src/contexts/LanguageContext.tsx`
- Étendre le type `Language` : ajouter `"es"`
- Ajouter un bloc de ~145 clés i18n en espagnol

### 3. `src/components/Navbar.tsx`
- Ajouter `{ code: "es", label: "Español" }` au tableau `languages`

### 4. `src/pages/Translator.tsx`
- Ajouter `"es"` au type `SourceLang` et `es: "Español"` à `langLabels`

### 5. `supabase/functions/translate-batch/index.ts`
- Ajouter `es: "Spanish"` au `langMap`

### 6. `src/pages/LessonDetail.tsx`
- Utiliser `isTranslating` du hook pour afficher un petit indicateur de chargement (spinner + texte) en haut de la page quand des traductions sont en cours

### 7. `src/pages/Dictionary.tsx`
- Même indicateur de chargement que LessonDetail

### 8. `src/pages/Lessons.tsx`
- Intégrer `useTranslatedContent` + indicateur de chargement pour la liste des leçons

