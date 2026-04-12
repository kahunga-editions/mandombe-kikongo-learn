

# Corrections Mandombe Lingala + Audio conjugaisons

## 3 changements demandés

### 1. Supprimer les accents du texte Lingala pour le rendu Mandombe
La police Mandombe ne gère pas les caractères accentués (é, è, ê, ô, etc.). Le composant `LingalaMandombe` doit supprimer les diacritiques du texte Lingala avant de le rendre en `font-mandombe`.

**Fichier** : `src/components/LingalaMandombe.tsx`
- Ajouter une fonction `stripAccents` utilisant `normalize("NFD").replace(/[\u0300-\u036f]/g, "")`
- L'appliquer au `lingalaText` avant le rendu Mandombe
- Appliquer la même logique partout où du texte Lingala est rendu en `font-mandombe` (exercices MultipleChoice, FillInBlank, MatchingExercise)

### 2. Ajouter l'audio (`TranslationSpeaker`) dans les conjugaisons
Actuellement les conjugaisons n'ont que le `MandombeSpeaker` pour le Lari. Il faut ajouter un `TranslationSpeaker` pour la signification traduite du verbe.

**Fichier** : `src/pages/LessonDetail.tsx` (section conjugaisons, lignes 258-294)
- Ajouter `<TranslationSpeaker text={getConjMeaning(conj.meaning)} lang={language} />` à côté du titre du verbe (ligne 270)

### 3. Tester l'audio Lingala
L'edge function a répondu 200 au test — le TTS Lingala fonctionne. Mais vérification visuelle dans l'app après déploiement.

## Fichiers modifiés
- `src/components/LingalaMandombe.tsx` — ajout `stripAccents`
- `src/components/exercises/MultipleChoice.tsx` — strip accents sur texte Lingala Mandombe
- `src/components/exercises/FillInBlank.tsx` — idem
- `src/components/exercises/MatchingExercise.tsx` — idem
- `src/pages/LessonDetail.tsx` — audio dans conjugaisons

