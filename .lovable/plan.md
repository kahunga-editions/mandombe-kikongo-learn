
Objectif

Arrêter le faux “Lari via Lingala” et passer à une sortie audio basée sur une vraie voix Lari. D’après le code actuel, le mauvais rendu vient de 3 points combinés :
- la fonction TTS force encore `language_code: "ln"` ;
- le client envoie une version transformée via `lariToBantu(...)` au lieu du texte Lari brut ;
- aucun secret `LARI_VOICE_ID` n’est configuré, donc l’app utilise encore une voix par défaut non native.

Plan

1. Couper immédiatement l’approximation Lingala
- Dans `supabase/functions/elevenlabs-tts-lari/index.ts`, retirer `language_code: "ln"`.
- Ne plus présenter la synthèse actuelle comme du Lari “correct”.
- Si aucune vraie voix Lari n’est configurée, renvoyer une erreur propre ou désactiver l’audio au lieu de produire une mauvaise prononciation.

2. Envoyer le vrai texte Lari
- Dans `src/components/MandombeSpeaker.tsx`, arrêter d’envoyer `lariToBantu(lariText)` au TTS.
- Envoyer `lariText` directement.
- Garder `lariToIpa(...)` uniquement pour l’affichage/tooltip si utile.

3. Activer une vraie voix clonée à partir des enregistrements
- Réutiliser `supabase/functions/elevenlabs-clone-voice/index.ts`.
- Refaire le clonage avec les enregistrements Lari (ils devront être re-uploadés si indisponibles au moment de l’exécution).
- Stocker le `voice_id` obtenu dans le secret `LARI_VOICE_ID`.
- Faire de cette voix la source par défaut du TTS.

4. Rendre l’UI honnête tant que la voix native n’est pas prête
- Désactiver ou masquer temporairement le bouton audio sur les mots/phrases tant que `LARI_VOICE_ID` n’est pas configuré.
- Ou afficher un message du type “audio natif en préparation” plutôt qu’une lecture erronée.

5. Vérification ciblée
- Tester au minimum : `Mbote`, `Mbaji kua`, `Nkokela kua`, `Ntangu ka kua`.
- Vérifier surtout :
  - pas de `/dʒ/` sur `j` ;
  - pas de glide parasite `/w/` dans `kua` ;
  - prosodie moins “Lingala” et plus proche des enregistrements fournis.
- Vérifier le flux complet sur `/lessons/greetings`.

Fichiers concernés
- `supabase/functions/elevenlabs-tts-lari/index.ts`
- `src/components/MandombeSpeaker.tsx`
- secret backend : `LARI_VOICE_ID`

Détail technique important
- Le problème principal n’est pas seulement le G2P : c’est surtout que le système n’utilise pas encore une vraie voix Lari.
- Tant que `LARI_VOICE_ID` n’existe pas, toute tentative de “corriger” le rendu avec Lingala/Zulu restera artificielle.
- Donc la bonne correction est : enlever la couche Lingala, cloner/configurer la voix Lari, puis tester avec les mots problématiques.
