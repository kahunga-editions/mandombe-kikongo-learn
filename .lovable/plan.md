# Conjugaisons : le son ne part pas, et le Mandombe déborde sur le latin

## 1. Le son

Vérifié : le service qui fabrique la voix (`tts-lari-cached`) refuse toutes les demandes venant du site tant que la personne n'est pas connectée — il répond « autorisation manquante » (erreur 401). C'est pour ça qu'on clique sur le haut-parleur et qu'il ne se passe rien : le bouton demande l'audio, reçoit un refus, et s'arrête en silence.

Correction :
1. Ouvrir ce service à tout le monde, comme les autres services de voix du site (`elevenlabs-tts-lari`, `stt-lari`, etc. sont déjà ouverts) : ajouter `[functions.tts-lari-cached] verify_jwt = false` dans `supabase/config.toml`, puis redéployer la fonction.
2. Faire en sorte que, si la voix échoue quand même, le bouton le montre au lieu de rester muet : petit message d'erreur discret dans `MandombeSpeaker` (et le même traitement dans `TranslationSpeaker` s'il appelle le même service).
3. Vérifier ensuite en cliquant réellement sur un haut-parleur de la page Conjugaisons (contrôle navigateur automatisé) et confirmer que l'audio est reçu.

## 2. Le Mandombe qui déborde sur la translittération

Sur la page Conjugaisons, seules certaines lignes Mandombe ont l'espacement vertical renforcé ; les cartes du verbe être, des séries et des verbes de survie utilisent l'interligne par défaut, trop serré pour les glyphes Mandombe, qui retombent sur la ligne latine juste en dessous.

Correction : appliquer partout sur cette page le même interligne généreux que la ligne de résultat de recherche (interligne d'environ 2,2 et un peu d'air en dessous de chaque bloc Mandombe), y compris pour le surlignage doré du verbe, puis contrôler visuellement chaque type de carte (résultat de recherche, verbe être, séries, verbes de survie) par capture d'écran.

## Fichiers concernés

- `supabase/config.toml` + redéploiement de `tts-lari-cached`
- `src/components/MandombeSpeaker.tsx` (retour d'erreur visible)
- `src/pages/Conjugations.tsx` (interlignes Mandombe)

Aucune donnée linguistique n'est modifiée, aucun document n'est régénéré.
