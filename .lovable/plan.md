

# Traducteur Kikongo Lari — Style Papago

## Résumé
Créer une page `/translator` avec une interface de traduction bidirectionnelle (Français ↔ Kikongo Lari) qui affiche aussi le rendu en écriture Mandombe et permet l'écoute audio. Le traducteur utilisera une edge function basée sur Lovable AI, alimentée par le vocabulaire/phrases du site et des connaissances linguistiques universitaires sur le Kikongo Lari.

## Interface utilisateur

```text
┌──────────────────────────────────────────────────────┐
│  [FR ▼]  ──── ⇄ ────  [Lari]                        │
├──────────────────────┬───────────────────────────────┤
│                      │                               │
│  Bonjour, comment    │  Mbote, bwe bweno ?           │
│  allez-vous ?        │                               │
│                      │  ꤰꤱꤲ  (Mandombe)    🔊       │
│                      │                               │
│  [Traduire]          │  /ᵐbote bwe bweno/  (IPA)    │
│                      │                               │
├──────────────────────┴───────────────────────────────┤
│  ℹ Note: Traduction basée sur le corpus Nzo Mikanda │
│  et les travaux de Jacquot sur le Kikongo Lari       │
└──────────────────────────────────────────────────────┘
```

## Architecture technique

### 1. Edge function `translate-lari` (nouveau)
- Reçoit `{ text, direction: "fr-to-lari" | "lari-to-fr" | "en-to-lari" | "lari-to-en" }`
- Utilise Lovable AI (`google/gemini-2.5-flash`) avec un system prompt riche contenant :
  - Le vocabulaire complet du site (extrait de `lessons.ts` — ~800+ termes)
  - Les règles de grammaire/syntaxe (préfixes nominaux, concordances, conjugaisons)
  - Les travaux de Jacquot (phonologie, morphologie) et Lumwamu (grammaire)
  - Instruction stricte : ne jamais inventer de vocabulaire, signaler les mots inconnus
- Retourne `{ translation, mandombe, notes }`

### 2. Page `src/pages/Translator.tsx`
- Interface split-pane façon Papago/Google Translate
- Sélecteur de langue source (FR / EN / PT) et cible fixe (Lari), avec bouton ⇄ pour inverser
- Zone de saisie à gauche, résultat à droite
- Affichage Mandombe (font-mandombe) + transcription IPA + bouton audio (MandombeSpeaker)
- Note de confiance / avertissement quand le modèle n'est pas sûr
- Debounce ou bouton "Traduire" pour éviter les appels excessifs

### 3. Intégration
- Ajouter la route `/translator` dans `App.tsx`
- Ajouter le lien dans `Navbar.tsx`
- Ajouter les traductions i18n dans `LanguageContext.tsx`

## Fichiers créés/modifiés
- **Créé** : `supabase/functions/translate-lari/index.ts`
- **Créé** : `src/pages/Translator.tsx`
- **Modifié** : `src/App.tsx` (route)
- **Modifié** : `src/components/Navbar.tsx` (lien nav)
- **Modifié** : `src/contexts/LanguageContext.tsx` (clés i18n)

## Contraintes respectées
- Pas d'invention de vocabulaire — le prompt AI inclut un corpus vérifié et l'instruction de ne pas fabriquer
- Mandombe rendu via le champ latin exact (Title Case pour ligatures)
- Audio via le composant MandombeSpeaker existant
- Trilingue (FR/EN/PT) pour l'interface

