

# Plan : Extraction pages 151-200, nouvelles leçons, et AI Professeur Mbuta Matondo

## Partie 1 — Corriger les erreurs TS résiduelles

Les erreurs `ipa`, `label`, `description`, `explanation` ne sont plus présentes dans le fichier (déjà corrigées). Cependant, la propriété `credit` est utilisée sur 3 leçons mais n'existe pas dans l'interface `Lesson`. 

**Action** : Ajouter `credit?: string` à l'interface `Lesson` (ligne 158 de `src/data/lessons.ts`).

---

## Partie 2 — Extraire les pages 151-200 du corpus Jacquot

1. Copier `user-uploads://12138-3.pdf` → `/tmp/jacquot.pdf`
2. Script Python `pypdf` pour extraire pages 151-200 → `/tmp/jacquot_p151_200.pdf`
3. Parser avec `document--parse_document`
4. Sauvegarder le texte brut dans `/mnt/documents/jacquot_pages_151_200.md`

Contenu attendu : suite de la morphologie (§4.5+), syntaxe, probablement syntagmes verbaux et nominaux.

---

## Partie 3 — Créer 2-3 leçons avec exercices progressifs

Niveaux débutant → bilingue avec exercices variés :
- `multiple-choice` (débutant)
- `fill-in-blank` (intermédiaire)  
- `matching` (intermédiaire)
- `mandombe-recognition` (avancé)

Consignes strictes :
- Contenu strictement extrait du corpus Jacquot & Lumwamu
- Graphie Mandombe sans voyelles doubles
- Voyelles doubles conservées dans `lari:` et `ipa:`
- Exercices bilingues (FR/EN/PT)

---

## Partie 4 — Créer l'AI Professeur Mbuta Matondo

### 4a. Edge function `supabase/functions/mbuta-matondo/index.ts`
- Utilise Lovable AI Gateway (`google/gemini-3-flash-preview`)
- System prompt : Mbuta Matondo est un professeur bienveillant de Kikongo Lari, patient, qui guide les élèves selon leur progression
- Reçoit : le message de l'élève + contexte de progression (leçons complétées, score)
- Streaming SSE pour réponses en temps réel
- Le prompt inclut les données linguistiques clés du corpus pour que Mbuta Matondo puisse corriger et enseigner

### 4b. Page `src/pages/MbutaMatondo.tsx`
- Interface de chat avec avatar de Mbuta Matondo
- Affiche les messages en streaming (token par token)
- Bouton micro optionnel (via ElevenLabs TTS existant)
- Indicateur de frappe pendant la réponse
- Historique de conversation en session

### 4c. Composant `src/components/MbutaMatondoChat.tsx`
- Bulle de chat avec rendu Markdown (`react-markdown`)
- Input utilisateur avec envoi au clavier (Enter)
- Gestion des erreurs (429, 402)

### 4d. Route et navigation
- Ajouter `/mbuta-matondo` dans `src/App.tsx`
- Ajouter un lien dans la navigation (Navbar)
- Icône : 👨‍🏫 ou similar

---

## Fichiers créés/modifiés

| Fichier | Action |
|---------|--------|
| `src/data/lessons.ts` | Ajouter `credit?` à l'interface + 2-3 leçons |
| `supabase/functions/mbuta-matondo/index.ts` | Créer (edge function AI) |
| `src/pages/MbutaMatondo.tsx` | Créer (page chat) |
| `src/components/MbutaMatondoChat.tsx` | Créer (composant chat) |
| `src/App.tsx` | Ajouter route `/mbuta-matondo` |
| `src/components/Navbar.tsx` | Ajouter lien navigation |
| `src/contexts/LanguageContext.tsx` | Ajouter traductions UI |

## Artefact produit
- `/mnt/documents/jacquot_pages_151_200.md` — texte brut extrait

