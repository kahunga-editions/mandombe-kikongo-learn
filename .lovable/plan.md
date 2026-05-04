## Problème

Dans des mots comme **bujitu** (« respect »), ElevenLabs ne rend pas le `j` comme un /ʒ/ français (« Julien »). On entend un /j/ semi-voyelle (/y/), au lieu du /ʒ/ attendu.

Cause : aucun override n'existe pour `bujitu`/`Bujitu` ni pour la série générale `j + voyelle` quand le mot n'a pas été listé. Seul `mbaji` est protégé. Le moteur `eleven_v3` (même avec `language_code: "fr"`) interprète parfois les `j` non encadrés comme /y/.

Note : il existe déjà une entrée `"buzitu": "bouzitou"` dans les overrides — c'est l'ancienne graphie avec `z`. On ajoute la graphie `j` séparément (pas de fusion : `z` reste `z`).

## Modifications

Fichier : `supabase/functions/elevenlabs-tts-lari/index.ts`

### 1. Overrides mot-par-mot (PHONETIC_OVERRIDES)

Ajouter, à côté de `mbaji` :

- `bujitu` → `bouji-tou`
- `bujidi` → `bouji-di` (forme verbale dérivée éventuelle)
- toutes nouvelles formes en `-ji-` rencontrées (extensible)

Le tiret coupe la syllabe et empêche le moteur de glisser sur `ji` comme semi-voyelle.

### 2. Règle générale `j + voyelle` → /ʒ/

Ajouter dans `ELEVENLABS_RULES`, **après** la règle `nj([aeiou]) → ndj$1` (ligne 148) pour ne pas casser les prénasalisées, et **avant** les autres règles génériques :

```ts
// /ʒ/ français (« Julien ») pour j + voyelle isolé.
// Ne s'applique pas après d (dj = /dʒ/) ni n (nj déjà traité).
{ from: /([^dn])ja/gi, to: '$1ja' },   // déjà /ʒa/ en FR, mais on stabilise via tiret si besoin
{ from: /([^dn])je/gi, to: '$1je' },
{ from: /([^dn])ji/gi, to: '$1-ji' },  // tiret avant ji isolé pour casser la lecture /yi/
{ from: /([^dn])jo/gi, to: '$1jo' },
{ from: /([^dn])ju/gi, to: '$1jou' },  // u → ou français
// Début de mot
{ from: /\bji/gi, to: 'ji' },
{ from: /\bju/gi, to: 'jou' },
```

Le tiret avant `ji` (en milieu de mot) est la clé : il force la syllabation `bou-ji-tou` et le moteur lit alors `ji` comme /ʒi/ français standard.

### 3. Mémoire

Créer `mem://audio/tts-j-rule.md` :
- Règle : `j + voyelle` en lari = /ʒ/ (jamais /y/, jamais /dʒ/)
- Stratégie : tiret avant `ji` isolé + override mots fréquents
- Exemples : bujitu /buʒitu/, mbaji /mbaʒi/

### 4. Test

Après déploiement, tester via l'app sur les mots :
- `bujitu` (attendu /buʒitu/)
- `mbaji` (régression — doit rester /mbaʒi/)
- `ndjeka`, `mpangi` (régression sur prénasalisées — inchangées)
- `djuna` (régression — doit rester /dzuna/)

## Hors-scope

- Pas de changement aux fichiers `lari-phonetic-engine.ts` (l'affichage IPA est déjà correct).
- Pas de changement de modèle/voix.
