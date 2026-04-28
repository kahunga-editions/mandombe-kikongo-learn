---
name: AI Teacher
description: Mbuta Matondo solo (Théo retiré). Bulle 3 couches Mandombe typewriter → Lari → FR sous-titre. Corpus v2 strict + corrections persistantes via translation_corrections.
type: feature
---
Mbuta Matondo est seul (Théo a été retiré). Il parle UNIQUEMENT Kikongo Lari, le français n'est qu'un sous-titre d'affichage.

Format de sortie (edge mbuta-matondo) :
- <lari>...</lari> : texte parlé (Kikongo Lari uniquement, jamais de FR)
- <fr>...</fr> : sous-titre français STRICT du <lari> précédent — jamais lu par TTS
- <choices correct="N">opt1|opt2|...</choices> : QCM (toutes options en Lari)
- <theo> est strippé par sanitizeOutput (legacy)

Corpus :
- Statique : supabase/functions/_shared/mbuta-corpus-v2.ts (importe mbuta-corpus-v2.json)
- Dynamique : table translation_corrections (lari↔fr) injectée à chaque appel via buildSystemPrompt
- Le bouton crayon dans chaque bulle (admin) ouvre un dialog qui INSERT dans translation_corrections → Mbuta s'en souvient à la session suivante

UI (MbutaMatondoChat.tsx) :
- MandombeBubble : 3 couches synchronisées
  1. Mandombe en typewriter (font-mandombe), durée = audio TTS si connue, sinon ~45ms/char
  2. Kikongo Lari latin en fade-in après le typewriter
  3. Français en italique petit (text-cream/50) en fade-in après le Lari
- QCM : sur mauvaise réponse, le bouton se RÉDUIT à un seul (la bonne réponse) jusqu'à validation. Jamais de demande de répétition sans bouton.
- Voix unique : elevenlabs-tts-lari (Gz9w9RNGNUZjVYbvzXY7). TTS Théo supprimé.

TTS Lari (G dur Ng) :
- nge→nghe, ngi→nghi, nga→ngha, ngo→ngho, ngu→nghu (tous mappés explicitement)

Règles absolues du prompt :
1. Zéro français écrit par Mbuta hors balise <fr> (sous-titre technique)
2. Production exclusive depuis le corpus (pas de génération libre)
3. Pas de Markdown
4. "Ngiele" = je vais (pas "je suis") — note explicite
