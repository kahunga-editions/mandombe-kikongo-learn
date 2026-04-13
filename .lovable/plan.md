

# Révision des titres des 4 leçons

## Corrections demandées

| Leçon | Ancien titre | Nouveau titleLari | Nouveau titleFr |
|-------|-------------|-------------------|-----------------|
| 1 | Sala na bisalu (Travailler et conjuguer) | Sala na Longoka | Travailler et apprendre |
| 2 | Nitu na kimbevo (Le corps et la santé) | Nitu na kimbevo | Le corps et la maladie |
| 3 | Bikila na nzonzela (Saluer, se présenter, voyager) | Bika, zonza na zeba | Saluer, parler et voyager |
| 4 | Meso na nene (Descriptions, possession et actions) | Bisalu bia lumbu tsha mukaka | Le travail d'une journée entière |

## Contenu inchangé

Le contenu pédagogique, vocabulaire, conjugaisons, exercices, overrides phonétiques TTS et entrées dictionnaire restent identiques au plan précédent — seuls les 4 titres sont corrigés.

## Fichiers modifiés

1. **`src/data/lessons.ts`** — 4 nouvelles leçons avec les titres corrigés (~2000 lignes)
2. **`supabase/functions/elevenlabs-tts-lari/index.ts`** — ~25 overrides phonétiques
3. **`src/lib/lari-phonetic-engine.ts`** — mêmes overrides côté client

