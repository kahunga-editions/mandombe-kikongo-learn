

# Ajouter 4 langues (Italien, Lingala, Grec, Coréen) — Interface + Contenu pédagogique + Mandombe pour le Lingala

## Ampleur du projet

Le fichier `lessons.ts` fait **25 905 lignes** avec des milliers de champs textuels (titres, descriptions, questions, indices, explications). Ajouter 4 langues en dur multiplierait ce fichier par ~2x et nécessiterait la traduction manuelle de ~20 000 chaînes. La solution recommandée est **hybride** : traductions statiques pour l'interface + traduction dynamique avec cache pour le contenu pédagogique.

## Architecture proposée

```text
┌─────────────────────────────────────────────┐
│  Interface (i18n statique)                  │
│  LanguageContext.tsx : +4 blocs de ~145 clés│
│  Navbar.tsx : +4 langues dans le sélecteur  │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  Contenu pédagogique (traduction dynamique) │
│  Hook useTranslatedContent() qui :          │
│  1. Vérifie si le champ natif existe (fr/en/pt) │
│  2. Sinon, appelle translate-batch          │
│  3. Cache en localStorage par langue        │
│  Fonctionne pour IT, LN, EL, KO            │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  Lingala en Mandombe                        │
│  Quand langue = "ln", le rendu Mandombe     │
│  utilise le texte Lingala (pas le Lari)     │
└─────────────────────────────────────────────┘
```

## Fichiers modifiés

### 1. `src/contexts/LanguageContext.tsx`
- Étendre `Language` : `"fr" | "en" | "pt" | "it" | "ln" | "el" | "ko"`
- Ajouter 4 blocs de ~145 clés i18n chacun (italien, lingala, grec, coréen)
- Les traductions seront générées par l'AI Gateway pendant l'implémentation

### 2. `src/components/Navbar.tsx`
- Ajouter au tableau `languages` :
  - `{ code: "it", label: "Italiano" }`
  - `{ code: "ln", label: "Lingála" }`
  - `{ code: "el", label: "Ελληνικά" }`
  - `{ code: "ko", label: "한국어" }`

### 3. `src/hooks/useTranslatedContent.ts` (nouveau)
- Hook qui prend un texte français et la langue cible
- Si langue = fr/en/pt → retourne le champ natif existant
- Si langue = it/ln/el/ko → vérifie le cache localStorage, sinon appelle `translate-batch` et met en cache
- Batch les requêtes pour traduire plusieurs textes en une seule requête

### 4. `supabase/functions/translate-batch/index.ts`
- Ajouter le mapping des nouvelles langues dans `langName` :
  - `"it"` → `"Italian"`
  - `"ln"` → `"Lingala"`
  - `"el"` → `"Greek"`
  - `"ko"` → `"Korean"`

### 5. `src/pages/Translator.tsx`
- Ajouter les 4 langues au type `SourceLang` et à `langLabels`

### 6. Composants pédagogiques (LessonDetail, Dictionary, VocabularyPreview, etc.)
- Intégrer `useTranslatedContent` pour afficher les traductions dynamiques quand la langue active est IT/LN/EL/KO
- Pour le Lingala : quand `language === "ln"`, afficher le texte lingala avec la classe `font-mandombe` (rendu Mandombe du lingala)

### 7. `src/data/lessons.ts` — Interfaces
- Ajouter les champs optionnels `italian?`, `lingala?`, `greek?`, `korean?` aux interfaces `VocabItem`, `SyntaxExample`, etc. pour permettre des traductions statiques futures si nécessaire

## Lingala en Mandombe — Détail technique
Le Mandombe est une police qui mappe des syllabes latines vers des glyphes. Le lingala s'écrit aussi en alphabet latin, donc la police Mandombe peut le rendre directement. Quand `language === "ln"`, le composant affichera le texte lingala traduit avec `className="font-mandombe"` au lieu du texte Lari habituel.

## Stratégie de cache
- Clé localStorage : `content_translations_{lang}` (ex: `content_translations_it`)
- Structure : `Record<string, string>` (hash du texte source → traduction)
- Expiration : 30 jours
- Limite : les traductions sont batchées par groupes de 40 textes max

## Estimation
- ~145 × 4 = 580 clés i18n statiques à générer
- Le contenu pédagogique (~5000 chaînes) sera traduit dynamiquement à la demande
- Aucune modification massive de `lessons.ts` nécessaire

