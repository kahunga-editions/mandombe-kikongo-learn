

# Ajout de l'allemand (Deutsch) comme langue

## Résumé
Ajouter l'allemand (`de`) comme 9ème langue du site — interface, dictionnaire, traducteur, leçons et exercices.

## Fichiers modifiés

### 1. `src/contexts/LanguageContext.tsx`
- Ajouter `"de"` au type `Language`
- Ajouter un bloc complet de traductions allemandes (~100 clés) : navigation, héros, leçons, dictionnaire, flashcards, Mandombe, traducteur, footer, Kilolaka meanings

### 2. `src/components/Navbar.tsx`
- Ajouter `{ code: "de", label: "Deutsch" }` au tableau `languages`

### 3. `src/pages/Translator.tsx`
- Ajouter `"de"` au type `SourceLang`
- Ajouter `de: "Deutsch"` dans `langLabels`

### 4. `src/hooks/useTranslatedContent.ts`
- Ajouter `"de"` au tableau `DYNAMIC_LANGS` pour que le contenu pédagogique (leçons, exercices) soit traduit dynamiquement en allemand

### 5. `supabase/functions/translate-batch/index.ts`
- Ajouter `de: "German"` dans `langMap` pour que l'edge function de traduction gère l'allemand

## Ce qui fonctionne automatiquement
- **Dictionnaire** : les cartes afficheront les traductions en allemand via le système dynamique
- **Leçons & exercices** : traduits à la volée par `translate-batch`
- **Traducteur** : l'allemand sera disponible comme langue source et cible
- **Description du héros** : mise à jour pour mentionner l'allemand dans la liste des langues disponibles

## Portée
- 5 fichiers modifiés, aucune base de données, redéploiement edge function nécessaire

