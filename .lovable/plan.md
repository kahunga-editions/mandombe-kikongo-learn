

# Tester le TTS et repositionner le bouton 🔊 à côté du Mandombe

## Contexte

Le bouton speaker est actuellement entre le texte Lari et le Mandombe (ligne 288). L'utilisateur veut le déplacer **à côté du Mandombe** (après le texte Mandombe). Un nouveau fichier audio a été uploadé — même voix Kikongo Lari woman avec les mêmes paramètres.

## Plan

### 1. Repositionner le speaker dans Dictionary.tsx
Déplacer `<MandombeSpeaker>` de la ligne 288 (entre Lari et Mandombe) vers **après** le `<span>` Mandombe (après ligne 291) :

```
<h3>entry.lari</h3>
<span class="font-mandombe">entry.mandombe</span>
<MandombeSpeaker lariText={entry.lari} />
```

### 2. Tenter le clonage avec le nouvel échantillon
- Copier le fichier uploadé vers `/tmp/`
- Appeler l'edge function `elevenlabs-clone-voice` avec ce fichier
- Si réussi → stocker le `voice_id` comme secret `LARI_VOICE_ID` et mettre à jour l'edge function TTS
- Si échec (permissions) → informer l'utilisateur

### 3. Tester le TTS
- Appeler `elevenlabs-tts-lari` avec quelques mots pour vérifier la qualité audio avec les paramètres actuels

## Fichiers modifiés
1. **`src/pages/Dictionary.tsx`** — déplacer le speaker après le Mandombe
2. **Potentiellement** `supabase/functions/elevenlabs-tts-lari/index.ts` si le clonage réussit

