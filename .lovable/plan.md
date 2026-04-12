

# Rendu Mandombe automatique pour le Lingala

## Résumé
Quand la langue est réglée sur Lingála (`ln`), le texte traduit en lingala sera affiché en écriture Mandombe (via la police `font-mandombe`), en plus du rendu Mandombe existant pour le Lari.

## Changements

### 1. `src/pages/LessonDetail.tsx`
- **Vocabulaire** : quand `language === "ln"`, afficher la traduction lingala avec `font-mandombe` au lieu du texte brut. Ajouter un bloc dédié sous le texte Lari mandombe, avec le drapeau 🇨🇩 et la classe `font-mandombe text-2xl`.
- **Syntaxe** : même traitement pour les exemples — la traduction lingala apparaît en Mandombe.
- **Conjugaisons** : idem pour les significations traduites.

### 2. `src/pages/Dictionary.tsx`
- Quand `language === "ln"`, afficher la traduction dynamique du mot français en lingala avec le rendu Mandombe sous l'entrée existante.

### 3. `src/pages/Lessons.tsx`
- Quand `language === "ln"`, remplacer le `titleMandombe` Lari par le titre traduit en lingala rendu en `font-mandombe` sur les cartes de leçons.

### 4. Logique commune
- Créer un helper `MandombeText` ou une logique inline : si `language === "ln"` et qu'un texte traduit est disponible, le rendre avec `className="font-mandombe text-2xl text-gold"`.
- Le texte Lari mandombe existant reste visible en tant que référence Lari, et le texte Lingala mandombe s'affiche en dessous avec un label distinctif (ex: drapeau 🇨🇩).

### Fichiers modifiés
- `src/pages/LessonDetail.tsx`
- `src/pages/Dictionary.tsx`  
- `src/pages/Lessons.tsx`

