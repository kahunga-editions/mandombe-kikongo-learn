
# Correction audio Lari pour faire entendre le /g/ dans « mpa-n-gi »

## Diagnostic
Le problème ne vient plus de la graphie transformée : l’edge function envoie déjà `Mpangi` tel quel au moteur TTS.

Les logs le montrent :
```text
TTS Lari: "Mpangi" → French phonetic: "Mpangi"
```

Donc le souci actuel vient du moteur/paramétrage TTS :
- on force encore `language_code: "fr"`
- la voix clonée interprète mal `ngi`
- le `g` disparaît ou s’adoucit dans des séquences comme `mpangi`

## Ce que je vais corriger
Je vais modifier `supabase/functions/elevenlabs-tts-lari/index.ts` pour ne plus “faire comme si c’était du français pur”, et introduire une correction phonétique ciblée qui conserve la syllabation.

### Changement principal
Ajouter une règle phonétique spécifique pour les séquences `ngi`, `nge`, `ngy` afin de faire entendre le `g` sans insérer un `u` visible dans la chaîne simple.

L’objectif est de guider la voix vers :
```text
mpa - n - gi
```
au lieu de :
```text
mpa - ni
```
ou
```text
mpa - ngou - i
```

## Implémentation proposée
### Dans `supabase/functions/elevenlabs-tts-lari/index.ts`
1. Garder la suppression de la règle fautive `g -> gu`
2. Ajouter une règle spéciale avant les autres substitutions pour traiter :
   - `ngi`
   - `nge`
   - `ngy`
3. Tester une réécriture phonétique non graphique, orientée son, par exemple avec séparation contrôlée pour empêcher l’effacement du `g`
4. Ajuster aussi le payload ElevenLabs si nécessaire :
   - tester sans `language_code: "fr"` sur `eleven_v3`
   - ou passer sur le fallback si la voix rend mieux ces groupes consonantiques
5. Mettre à jour les commentaires pour documenter la règle métier :
   - en Lari, le `g` est toujours dur
   - on doit préserver le son /g/ dans les groupes `ngi/nge/ngy`
   - on ne doit pas casser la syllabation avec `gu`

## Vérifications après correction
Je testerai au minimum :
- `Mpangi`
- `Nge`
- `Ngiele`

Je vérifierai :
- que le log ne réintroduit pas `mpangui`
- que le `g` est audible dans `ngi`
- que la voix ne réduit plus `mpangi` à `mpani`
- que les autres mots Lari déjà corrects ne régressent pas

## Fichier concerné
- `supabase/functions/elevenlabs-tts-lari/index.ts`

## Détail technique
Le vrai problème semble être l’association suivante :
```text
voix clonée + model eleven_v3 + language_code "fr"
```
Cette combinaison force une lecture trop française du groupe `ngi`.

La correction la plus probable sera donc un mix de :
- règle phonétique ciblée sur `ngi/nge/ngy`
- léger changement du payload envoyé à ElevenLabs
- sans modifier le texte affiché dans l’app

## Risque / portée
- portée très ciblée : 1 seul fichier
- aucun changement UI
- faible risque sur le reste de l’app
- seul point délicat : il faudra tester plusieurs formulations phonétiques jusqu’à obtenir un vrai /g/ audible
