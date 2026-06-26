## Objectif

Transformer **« Évaluer ma prononciation »** d'un simple score % en un **diagnostic actionnable** (sons/syllabes ratés, contre-exemple correct en Mandombe + translittération + traduction), et **déployer ce STT partout dans Nzo Mikanda**, pas seulement dans la bulle Mbuta.

---

## 1. Backend — `stt-lari` : passer du score plat au diagnostic syllabique

Édition de `supabase/functions/stt-lari/index.ts`.

### a. Syllabification Lari (CV / CCV / CVN)
Petit segmenteur déterministe basé sur la phonotactique Lari du `lari-phonetic-engine` (clusters initiaux `mb, mp, nd, nt, nk, ng, nz, ns, ts, tsh, sh`, voyelles `a e i o u`, nasale finale). Découpe `bujitu` → `bu-ji-tu`, `nzila` → `nzi-la`, `nsoneka` → `nso-ne-ka`.

### b. Alignement attendu vs entendu
Algorithme de Needleman–Wunsch sur les syllabes (gap = 1, mismatch = distance Levenshtein normalisée entre syllabes). Produit un tableau :

```text
[
  { expected: "bu",  heard: "bu",  status: "ok" },
  { expected: "ji",  heard: "zi",  status: "wrong", hint: "ji-rule" },
  { expected: "tu",  heard: "tou", status: "ok" }
]
```

### c. Règles de coaching ciblées
Map `phoneme → conseil FR` dérivée des règles déjà mémorisées (`mem://audio/ipa-ssml-table`, `mem://audio/tts-phonetics-g-logic`). Exemples :

| Erreur détectée | Conseil renvoyé |
|---|---|
| `ji` entendu `zi` / `dzi` | « Le **j** se prononce comme dans *Julien* (/ʒ/), pas /z/ ni /dz/ » |
| `sh` entendu `s` / `ts` | « **sh** = *shoes* en anglais (/ʃ/) » |
| `g` entendu `j` | « **g** est toujours dur, comme dans *gare* » |
| `nz` simplifié en `z` | « Garde la nasale **n** avant **z** : *n-zi-la* » |
| voyelle longue manquée | « Allonge la voyelle : *zââba* » |

### d. Réponse JSON enrichie
```json
{
  "text": "buzitou",
  "expected": "bujitu",
  "score": 0.62,
  "verdict": "good",
  "syllables": [...],
  "issues": [
    { "syllable": "ji", "heard": "zi", "tip": "Le j se prononce comme Julien (/ʒ/)" }
  ]
}
```

---

## 2. Frontend — `PronunciationCheck` : panneau de feedback

Refonte de `src/components/PronunciationCheck.tsx`.

- Score coloré conservé.
- **Bande syllabique** : chaque syllabe rendue avec couleur verte (ok) / rouge (faute), survol = la syllabe entendue.
- **Liste de conseils** : 1–3 puces FR ciblées tirées des `issues`.
- **Carte « exemple correct »** :
  - Mandombe (grande police `font-mandombe`, le mot attendu),
  - translittération latine,
  - traduction FR (résolue via dictionnaire — voir §3),
  - bouton 🔊 réutilisant `tts-lari-cached` (zéro crédit EL si déjà en cache).
- Bouton « Réessayer » qui relance directement l'enregistrement.

---

## 3. Brancher le STT partout dans Nzo Mikanda

Le composant `PronunciationCheck` accepte déjà `expected: string`. Pour qu'il sache afficher la traduction FR dans la carte « exemple correct », on lui ajoute un prop optionnel `meaning?: string`. Sinon, lookup auto dans le dictionnaire local (`src/data/dictionary.json`).

Points de montage :

| Surface | Où | Mot attendu |
|---|---|---|
| **Dictionnaire** (`src/pages/Dictionary.tsx`) | Sous chaque entrée, à côté du bouton 🔊 | l'entrée Lari |
| **Traducteur** (`src/pages/Translator.tsx`) | Sous la sortie Lari quand direction = vers Lari | le texte traduit |
| **Leçons** (composants d'exercices vocabulaire) | À côté du mot à apprendre | le mot Lari |
| **Mbuta chat** (déjà fait) | inchangé | bloc Lari |

Tous les appels passent par la fonction edge unique `stt-lari` → un seul point d'entrée à maintenir.

---

## 4. Détails techniques

- Pas de nouveau secret, pas de migration DB.
- Lovable AI Gateway (`openai/gpt-4o-mini-transcribe`) reste le seul provider STT → **zéro crédit ElevenLabs consommé** pour l'évaluation.
- Le `tts-lari-cached` existant fournit l'audio de l'« exemple correct » → 0 crédit EL après la première écoute.
- Pas de changement de config.toml (`stt-lari` reste public sans JWT, comme ses pairs `mbuta-matondo` et `translate-lari`).
- Tests post-déploiement : `supabase--curl_edge_functions` sur `/stt-lari` avec un blob de test pour vérifier la nouvelle réponse JSON.

---

## Hors-scope (à voir plus tard si besoin)

- Évaluation **prosodique** (intonation, durée) — Whisper-mini ne renvoie pas les timestamps phonèmes.
- Historique de progression par syllabe par utilisateur (table dédiée + dashboard).
- Mode « drill » qui propose 5 mots ciblant le son raté.
