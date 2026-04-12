

# Traductions multilingues et audio pour la section Histoires

## Résumé
Ajouter la traduction dynamique des textes français de chaque panneau dans la langue choisie par l'utilisateur (8 langues), avec un bouton audio pour écouter la traduction via `TranslationSpeaker`. Le texte Lari, le Mandombe et l'audio Lari restent inchangés.

## Changements — fichier unique : `src/components/StoryPreview.tsx`

### 1. Importer les outils existants
- `useTranslatedContent` pour la traduction dynamique (ES, IT, LN, EL, KO)
- `TranslationSpeaker` pour l'audio dans toutes les langues
- `LingalaMandombe` pour le rendu Mandombe quand la langue est Lingála

### 2. Modifier `ComicPanel` pour accepter et afficher la traduction
- Ajouter des props : `english`, `portuguese` (champs natifs EN/PT tirés du texte français — ici on n'a que le français, donc on utilisera `getTranslation` pour toutes les langues dynamiques et le français comme fallback pour EN/PT aussi, traduit à la volée)
- Remplacer la ligne statique `FR: {french}` par une ligne dynamique qui affiche :
  - Le drapeau de la langue active (🇫🇷, 🇬🇧, 🇵🇹, 🇮🇹, 🇨🇩, 🇬🇷, 🇰🇷, 🇪🇸)
  - Le texte traduit (via `getTranslation(french)` pour les langues dynamiques, le français tel quel pour `fr`)
  - Un bouton `TranslationSpeaker` pour écouter la traduction dans la langue active
- Si la langue est Lingála, afficher aussi le texte en Mandombe via `LingalaMandombe`

### 3. Logique de traduction dans `StoryPreview`
Utiliser le même pattern que `LessonDetail.tsx` :
```typescript
const { getTranslation, isDynamic, isTranslating } = useTranslatedContent();
const { language } = useLanguage();

// Pour chaque panneau, le texte traduit sera :
// - fr → french (tel quel)
// - en/pt/es/it/ln/el/ko → getTranslation(french) via translate-batch
```

Note : les données ne contiennent que `lari` et `french`. Les 8 langues autres que FR seront toutes traduites dynamiquement depuis le français via `translate-batch`. Cela inclut EN et PT qui, contrairement aux leçons, n'ont pas de champ natif ici.

### 4. Indicateur de chargement
Afficher un petit indicateur "Traduction en cours..." (comme sur les pages Leçons) quand `isTranslating` est vrai.

### 5. Aucune modification backend
Le système `translate-batch` + cache localStorage existe déjà et gère les 25 panneaux (25 textes français à traduire, soit 1 batch).

## Détail technique

Le `ComicPanel` passera de :
```tsx
<p><span>FR:</span> {french}</p>
```
à :
```tsx
<div className="flex items-start gap-2">
  <TranslationSpeaker text={translatedText} lang={language} />
  <p><span>{flag} {langLabel}:</span> {translatedText}</p>
</div>
{language === "ln" && <LingalaMandombe frenchText={french} />}
```

Pour EN et PT qui n'ont pas de champs natifs dans les story panels, on utilisera aussi `getTranslation` — le hook détectera que EN et PT ne sont pas dans `DYNAMIC_LANGS` et retournera le `frenchText` (fallback). Pour éviter cela, on ajoutera EN et PT temporairement au flux de traduction dynamique **uniquement pour les stories**, ou plus simplement : pour `fr` on affiche le français, pour toutes les autres langues on appelle `getTranslation(french)`.

Correction : `useTranslatedContent` ne traduit que les langues dans `DYNAMIC_LANGS` (es, it, ln, el, ko). Pour EN et PT, le hook retourne le fallback français. Comme les story panels n'ont pas de champs `english`/`portuguese`, il faudra **ajouter `"en"` et `"pt"` à `DYNAMIC_LANGS`** dans `useTranslatedContent.ts` pour que ces langues soient aussi traduites dynamiquement dans ce contexte.

## Fichiers modifiés
1. `src/components/StoryPreview.tsx` — traduction + audio + Mandombe
2. `src/hooks/useTranslatedContent.ts` — ajouter `"en"` et `"pt"` à `DYNAMIC_LANGS`

## Impact sur les autres pages
Ajouter EN/PT à `DYNAMIC_LANGS` signifie que les pages Leçons/Dictionnaire utiliseront aussi la traduction dynamique pour EN/PT au lieu des champs natifs. Or ces pages ont des champs `english`/`portuguese` natifs. Le hook `getTranslation(frenchText, nativeText)` retourne `nativeText` quand il est fourni ET que la langue n'est pas dynamique. Si on ajoute EN/PT à DYNAMIC_LANGS, il ignorera les champs natifs.

**Solution correcte** : ne PAS modifier `DYNAMIC_LANGS`. À la place, dans `StoryPreview`, pour EN et PT, appeler directement `supabase.functions.invoke("translate-batch")` ou simplement utiliser `getTranslation(french)` avec un wrapper local qui force la traduction pour EN/PT. Plus simple : créer une fonction locale `getStoryTranslation(french)` qui :
- Pour `fr` → retourne `french` tel quel
- Pour toutes les autres langues → appelle `getTranslation(french)` si la langue est dynamique, sinon appelle `queueTranslation` manuellement

**Solution la plus simple** : exposer `queueTranslation` depuis le hook, et dans StoryPreview, forcer la traduction pour EN/PT en appelant directement le hook avec un flag `forceTranslate`.

**Solution retenue** : Modifier `useTranslatedContent` pour accepter un paramètre optionnel `alwaysDynamic?: boolean`. Si `true`, toutes les langues sauf `fr` sont traitées comme dynamiques. Cela n'affecte que les composants qui passent ce flag.

## Plan final

### Fichier 1 : `src/hooks/useTranslatedContent.ts`
- Ajouter un paramètre optionnel `options?: { alwaysDynamic?: boolean }`
- Si `alwaysDynamic` est `true`, traiter toutes les langues sauf `fr` comme dynamiques

### Fichier 2 : `src/components/StoryPreview.tsx`
- Importer `useTranslatedContent`, `TranslationSpeaker`, `LingalaMandombe`
- Appeler `useTranslatedContent({ alwaysDynamic: true })` pour forcer la traduction de EN/PT aussi
- Dans `ComicPanel` : remplacer la ligne FR statique par une ligne dynamique avec drapeau, traduction et audio
- Afficher un indicateur de chargement pendant la traduction

