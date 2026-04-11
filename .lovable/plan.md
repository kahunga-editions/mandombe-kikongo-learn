

# Intégrer le TTS Lari avec G2P + voix Lingala/Zulu ElevenLabs

## Changement par rapport au plan précédent

Au lieu d'une voix française, on utilisera une voix **Lingala ou Zulu** d'ElevenLabs — langues bantoues proches du Lari, avec des phonèmes beaucoup plus compatibles. Le G2P adaptera le texte pour ces voix plutôt que pour le français.

## Plan d'implémentation

### 1. Créer `src/lib/g2p.ts` — Moteur G2P TypeScript
Port du fichier Python `lari_g2p.py` :
- Tables de phonèmes (prénasalisées, affriquées, voyelles longues)
- `tokenise(word)` → tokenisation greedy
- `g2pWord(word)` → orthographe → phonèmes
- `phonemesToIpa(phonemes)` → transcription IPA visuelle (`/ᵐboka/`)
- `phonemesToBantu(phonemes)` → approximation optimisée pour une voix Lingala/Zulu (phonèmes très proches, pas besoin de forcer des clusters français)

### 2. Mettre à jour `elevenlabs-tts-lari/index.ts`
- Utiliser une voix Lingala ou Zulu au lieu de française (voix par défaut configurable)
- Le `voiceId` sera passé depuis le client ou utiliser un ID par défaut
- Garder le modèle `eleven_multilingual_v2` (supporte Lingala et Zulu)

### 3. Créer `src/components/MandombeSpeaker.tsx`
Composant réutilisable :
- Icône 🔊 au clic → convertit le mot Lari via G2P, appelle l'edge function TTS
- Tooltip IPA au survol
- Animation pendant la lecture
- Cache audio en mémoire (évite les appels répétés)

### 4. Intégrer dans Dictionary et LessonDetail
- **Dictionary.tsx** : bouton speaker à côté de chaque entrée
- **LessonDetail.tsx** : bouton speaker dans les sections vocabulaire

## Détails techniques

- Le Lingala et le Zulu sont des langues bantoues comme le Lari — mêmes types de consonnes prénasalisées (mb, nd, ng), mêmes voyelles ouvertes
- L'approximation G2P→Bantu sera plus fidèle qu'une approximation française car les systèmes phonologiques sont proches
- On testera d'abord avec quelques mots pour valider la qualité avant l'intégration complète

## Fichiers créés/modifiés
1. **Nouveau** : `src/lib/g2p.ts`
2. **Nouveau** : `src/components/MandombeSpeaker.tsx`
3. **Modifié** : `supabase/functions/elevenlabs-tts-lari/index.ts`
4. **Modifié** : `src/pages/Dictionary.tsx`
5. **Modifié** : `src/pages/LessonDetail.tsx`

