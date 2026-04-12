

# Nouvelle leçon : Lubakusu

## Principe strict
- **titleLari** : `"Lubakusu"` — rien d'autre, pas de "ye", pas de mots inventés
- Tous les textes Lari proviennent exclusivement du contenu fourni par l'utilisateur
- Aucun titre, phrase ou mot Lari inventé

## Fichiers modifiés

### 1. `src/data/lessons.ts` — nouvelle leçon

**Métadonnées** :
- id: `"lubakusu"`
- title: `"Help & Emergencies"`
- titleFr: `"Aide et urgences"`
- titlePt: `"Ajuda e emergências"`
- titleLari: `"Lubakusu"`
- titleMandombe: `"Lubakusu"`
- level: `"intermediate"`
- icon: `"🆘"`

**Vocabulaire** (~18 entrées, toutes fournies par l'utilisateur) :
bakisa, sarisa, sadisa, lubakusu/tubakusu, lusalusu/tusalusu, luala, baluka, lemvoka, muivi/mivi, benga/mabenga, musualu, nzila, jimbakane, nsatu, mayela, mawasu, nlemvu/nlemvo, Benga dia Tiya

**Syntaxe** (3 blocs, conjugaisons exactes fournies) :
1. "Nzila yi ku jimbakane" — les 6 personnes (ku, ∅, mu, tu, lu, ba) avec notes de prononciation
2. "Lusalusu lue nani nsatu" — les 6 personnes (nani, naku, nandi, neto, neno, nawu)
3. "Nduele / Luele" — les 6 personnes avec note sur l'accent différentiel 2e/3e personne

**Phrases** (~12, toutes fournies) :
Mbakisa, Mbakisa eno, Tu bakisa eno, Ba bakisa eno, Yiza ku mbakisa sa malu, Sa malu, Sa mayela, Bua ka bua, Sa musualu, Sa mawasu, Mu baka eno, Mbakisa eno nlemvu eno — avec notes de liaison

**Exercices** (5) :
1. Multiple choice — identifier traductions des expressions d'aide
2. Fill-in-blank — compléter les pronoms dans les conjugaisons
3. Matching — expressions Lari ↔ traductions françaises
4. Mandombe recognition — reconnaître les mots du vocabulaire
5. Multiple choice — questions culturelles (Benga dia Tiya, parler de soi à la 3e personne)

### 2. `supabase/functions/elevenlabs-tts-lari/index.ts` — overrides phonétiques

Ajout au dictionnaire `PHONETIC_OVERRIDES` :
```typescript
"jimbakane": "djimbakané",
"mbakisa": "mbakissa",
"lusalusu": "loussaloussou",
"lubakusu": "loubakoussou",
```

## Impact automatique
- **Dictionnaire** : les 18 entrées vocabulaire + 12 phrases apparaîtront automatiquement
- **Traducteur** : enrichi par les nouvelles entrées
- **Audio** : fonctionne via les composants existants (MandombeSpeaker + TranslationSpeaker)

