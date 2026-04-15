

# Ancrer Mbuta Matondo sur le corpus Nzo Mikanda — injection du vocabulaire réel

## Problème

Le prompt actuel donne des règles grammaticales abstraites mais **aucun vocabulaire concret** des leçons. L'IA invente donc des formes fausses :
- "sangu" (= maïs) au lieu de **"nsangu"** (= nouvelles)
- "Saangu mbote" — n'existe pas
- Salutations incorrectes non attestées dans le corpus

## Solution

Injecter directement dans le SYSTEM_PROMPT les **salutations et phrases réelles** tirées de `src/data/lessons.ts`, et ajouter une règle stricte : ne JAMAIS inventer de vocabulaire — utiliser UNIQUEMENT les formes attestées dans les leçons Nzo Mikanda.

## Étapes

### 1. Réécrire le SYSTEM_PROMPT (`supabase/functions/mbuta-matondo/index.ts`)

Modifications :
- Remplacer toutes les mentions "Jacquot & Lumwamu" → "corpus Nzo Mikanda"
- Supprimer les voyelles longues (aa, ee, ii, oo, uu) de la phonologie
- Corriger les termes de parenté : taata→tata, maama→mama, mwaana→mwana, **giaagia→yaya**, mbuutu→mbutu, nkaazi→nkaji
- Ajouter une **section "Salutations attestées"** avec le vocabulaire exact des leçons :
  - Mbote = Bonjour
  - Kolele? = Ça va ?
  - Nkolele = Je vais bien
  - Mbote mpangi, nkumbu aku nani? = Bonjour, quel est ton nom ?
  - Lumbu kia kibote = Bonne journée
  - Mpimpa ya mbote = Bonne nuit
  - Mbaji kua = À demain
  - Ntangu ka kua = À bientôt
  - Nsangu za mbote = Les bonnes nouvelles
- Ajouter une **interdiction explicite** : "Le mot 'sangu' signifie MAÏS. Pour 'nouvelles', utiliser 'nsangu' (singulier) ou 'binsangu' (pluriel). 'Saangu mbote' N'EXISTE PAS."
- Renforcer la règle : "Ne JAMAIS inventer de salutations. Utiliser UNIQUEMENT les formes attestées ci-dessus."
- Renforcer encore l'interdiction Kituba avec mention en début ET fin de prompt
- Ajouter la règle anti-doubles lettres pour TOUT le Lari écrit

### 2. Mettre à jour les leçons (`src/data/lessons.ts`)
- Remplacer ~20 occurrences de "Jacquot & Lumwamu" → "Nzo Mikanda"

### 3. Mettre à jour les commentaires sources
- `src/lib/g2p.ts` : commentaire → Nzo Mikanda
- `supabase/functions/elevenlabs-tts-lari/index.ts` : commentaire → Nzo Mikanda

### 4. Mettre à jour les mémoires projet
- Core memory : Jacquot & Lumwamu → Nzo Mikanda
- `mem://constraints/source-material` : mise à jour
- `mem://grammar/kinship-terms` : giaagia → yaya

### 5. Redéployer `mbuta-matondo`

## Fichiers modifiés

| Fichier | Action |
|---------|--------|
| `supabase/functions/mbuta-matondo/index.ts` | Prompt refondu : Nzo Mikanda, vocabulaire injecté, anti-invention, anti-Kituba |
| `src/data/lessons.ts` | ~20 substitutions Jacquot → Nzo Mikanda |
| `src/lib/g2p.ts` | Commentaire source |
| `supabase/functions/elevenlabs-tts-lari/index.ts` | Commentaire source |
| `mem://` | Core + source-material + kinship-terms |

