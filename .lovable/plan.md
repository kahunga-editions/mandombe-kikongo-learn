## Plan — 7 corrections groupées

### 1. Bouton QCM 00-01 : ne garder que le champ "Nkumbu ani ___"
Dans `supabase/functions/_shared/mbuta-lecon-00.json`, échange `00-01` :
- Supprimer les deux distracteurs `Ka nzebi a ko.` et `Matondo.`.
- Conserver uniquement la réponse à blanc `Nkumbu ani ___` (le champ libre suffit, pas besoin de QCM à 3 boutons pour saisir son prénom).

### 2. Fusionner les bulles simultanées
Dans `src/components/MbutaMatondoChat.tsx`, quand un message assistant contient plusieurs paires `<lari>/<fr>` (ex. félicitation + question suivante), n'afficher qu'**une seule bulle** : concaténer tous les `lari` (séparés par un espace) et tous les `fr`. Modifier la boucle `blocks.map(...)` pour rendre une seule `MandombeBubble` issue d'un bloc fusionné.
Effet : plus jamais deux cartes empilées comme dans la capture (Ni buna ! Mbote Meli! / Kue wa tuka?).

### 3. Règles TTS Lari supplémentaires
Dans `src/lib/lari-phonetic-engine.ts` ET `supabase/functions/elevenlabs-tts-lari/index.ts` (les deux moteurs doivent rester synchronisés) :

- **`mungua` → `mougnoua`** (override mot, pour /muⁿɡwa/).
- **`ngie` → `ndjé`** (override mot, pour /ndje/) — actuellement seuls `nge`, `ngiena`, `ngiele` sont mappés.
- **Liaisons obligatoires** : ajouter une règle de pré-traitement qui colle certains pairs en un seul bloc avant les autres règles :
  - `nkumbu ani` → `nkumbouani`
  - `nkumbu andi` → `nkumbouandi`
  - `nkumbu aku` → `nkumbouaku`
  Implémenté en tête de `preprocessForElevenLabs` via une table `LIAISONS` : `{ /\bnkumbu\s+ani\b/gi: 'nkumbouani', ... }`.

### 4. Interdire "langues bantoues" / "peuples bantous" dans le traducteur
Dans `supabase/functions/translate-lari/index.ts`, ajouter au `SYSTEM_PROMPT` une interdiction explicite :
> INTERDICTION ABSOLUE : Ne jamais utiliser les expressions "langue bantoue", "langues bantoues", "peuple bantou", "peuples bantous", ni le mot "bantou(e/s)" sous quelque forme que ce soit. Parler simplement de "langue kongo", "langue kikongo", "langue lari", ou "famille kongo".

Et corriger l'occurrence existante dans le code corpus : `src/data/lessons.ts` ligne 931–933 (`hint`, `hintFr`, `hintPt`) — remplacer "many Bantu languages" / "nombreuses langues bantoues" / "muitas línguas bantas" par "plusieurs langues de la famille kongo" (et équivalents EN/PT).

### 5. Retirer "Falanse" du corpus
Aucune occurrence détectée par `rg -i falanse` dans `supabase/functions/`, `src/`, `public/`. Rien à supprimer — je le confirmerai au moment de l'implémentation et passerai un grep final pour être sûr.

### 6. Ajouter les 3 JSON uploadés au prompt de Mbuta Matondo
- Copier les fichiers uploadés vers `supabase/functions/_shared/` :
  - `lecon_se_presenter.json` → `mbuta-lecon-se-presenter.json`
  - `lecon_ku_nzari_mungua.json` → `mbuta-lecon-ku-nzari-mungua.json`
  - `conjugaisons_zololo.json` → `mbuta-conjugaisons-zololo.json`
- Dans `supabase/functions/_shared/mbuta-lecons.ts` : importer les 2 nouvelles leçons et les ajouter au tableau `LECONS` (ainsi elles entrent dans `MBUTA_LECONS` injecté côté serveur).
- Pour les conjugaisons (format différent — pas une leçon, c'est un paradigme verbal) : ajouter une fonction `fmtConjugaison(c)` qui sérialise `affirmatif_present` / `negatif_present` / `interrogatif` / `affirmatif_manisa` en texte « fr = kikongo », et injecter ce bloc à la fin de la string exportée `MBUTA_LECONS` sous une section `=== PARADIGMES VERBAUX VALIDÉS ===`.
- Côté client, ajouter aussi `lecon_se_presenter` et `lecon_ku_nzari_mungua` à la rotation `LECONS_DU_JOUR` dans `MbutaMatondoChat.tsx` pour qu'elles puissent être tirées comme leçon du jour.
- **Note** : le JSON conjugaison contient `Mayela mpashi` (interdit). À l'import, je convertirai aussi cette occurrence en `Ni buna` côté fichier copié, conformément à la règle déjà mémorisée.
- **Note 2** : `lecon_ku_nzari_mungua` contient `Mayela mpashi!` ligne 36 — même conversion en `Ni buna!`.

### 7. Redéploiement
Redéployer les edge functions modifiées : `mbuta-matondo`, `translate-lari`, `elevenlabs-tts-lari`.

---

### Détails techniques

**Fusion de bulles (étape 2)** — pseudocode :
```ts
const merged: Block = blocks.reduce((acc, b) => ({
  lari: acc.lari ? `${acc.lari} ${b.lari}` : b.lari,
  fr:   acc.fr   ? `${acc.fr} ${b.fr}`   : b.fr,
}), { lari: '', fr: '' });
// rendre <MandombeBubble block={merged} ... /> au lieu du blocks.map
```

**Liaisons TTS (étape 3)** — appliquées AVANT les overrides de mots (sinon `nkumbu` est remplacé en isolation et la règle de liaison ne matche plus) :
```ts
const LIAISONS: Array<[RegExp, string]> = [
  [/\bnkumbu\s+ani\b/gi, 'nkoumbouani'],
  [/\bnkumbu\s+andi\b/gi, 'nkoumbouandi'],
  [/\bnkumbu\s+aku\b/gi, 'nkoumbouaku'],
];
function preprocessForElevenLabs(text) {
  let r = text;
  for (const [re, to] of LIAISONS) r = r.replace(re, to);
  // ... overrides + ELEVENLABS_RULES existants
}
```

**Fichiers modifiés** (récapitulatif) :
- `supabase/functions/_shared/mbuta-lecon-00.json`
- `supabase/functions/_shared/mbuta-lecon-ku-nzari-mungua.json` (nouveau)
- `supabase/functions/_shared/mbuta-lecon-se-presenter.json` (nouveau)
- `supabase/functions/_shared/mbuta-conjugaisons-zololo.json` (nouveau)
- `supabase/functions/_shared/mbuta-lecons.ts`
- `supabase/functions/translate-lari/index.ts`
- `supabase/functions/elevenlabs-tts-lari/index.ts`
- `src/lib/lari-phonetic-engine.ts`
- `src/components/MbutaMatondoChat.tsx`
- `src/data/lessons.ts`

Une fois le plan approuvé, je passe en mode build et j'exécute le tout d'un coup.
