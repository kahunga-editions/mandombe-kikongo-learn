

# Corriger l'ordre SOV et ajouter le Mandombe dans les réponses de Mbuta Matondo

## Résumé

Deux corrections au système prompt et au rendu du chat :
1. Corriger l'ordre canonique de SVO → **SOV** (S+O+P+V) dans le prompt
2. Permettre à Mbuta Matondo d'écrire en Mandombe et afficher ces passages avec `font-mandombe` dans le chat

## Étapes

### 1. Corriger le SYSTEM_PROMPT (`supabase/functions/mbuta-matondo/index.ts`)

- Remplacer toute mention de SVO par SOV (S+O+P+V) conformément au corpus Jacquot & Lumwamu
- Ajouter une section **Écriture Mandombe** dans le prompt, instruisant le professeur à :
  - Entourer tout texte Mandombe avec des balises `[mandombe]...[/mandombe]`
  - Utiliser le Mandombe pour écrire les mots/phrases Lari qu'il enseigne
  - Rappeler les règles d'orthographe Mandombe : pas d'accents/diacritiques, pas de doubles lettres, Title Case

### 2. Rendre le Mandombe dans le chat (`src/components/MbutaMatondoChat.tsx`)

- Ajouter un composant de rendu qui détecte les balises `[mandombe]...[/mandombe]` dans les réponses
- Remplacer ces segments par des `<span className="font-mandombe text-2xl text-gold">` avant le rendu ReactMarkdown
- Utiliser un pre-processing du contenu avant ReactMarkdown, ou un composant custom dans les `components` de ReactMarkdown

## Fichiers modifiés

| Fichier | Action |
|---------|--------|
| `supabase/functions/mbuta-matondo/index.ts` | Corriger SOV + ajouter instructions Mandombe |
| `src/components/MbutaMatondoChat.tsx` | Rendre les balises `[mandombe]` avec la police Mandombe |

## Détails techniques

- Le prompt instruira l'AI d'utiliser `[mandombe]Mbote[/mandombe]` au lieu de simples parenthèses
- Le parsing côté client utilisera un regex `/\[mandombe\](.*?)\[\/mandombe\]/g` pour extraire et styliser les segments
- Les règles Mandombe existantes s'appliquent : suppression des doubles lettres, pas de diacritiques, Title Case
- Le rendu réutilise la même classe CSS `font-mandombe` utilisée partout dans l'app

