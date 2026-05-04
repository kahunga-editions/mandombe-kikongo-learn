## 1. Correction TTS — « zingi » avec G dur

**Constat**
La règle générale `ngi → nghi` existe déjà dans `supabase/functions/elevenlabs-tts-lari/index.ts`, mais ElevenLabs continue parfois à palataliser quand le `ngi` est précédé d'une voyelle dans un mot court fréquent comme « zingi ». Pour les mots à problème connus, on ajoute déjà des overrides explicites (ex : `mpangi → mpan-ghi`).

**Action**
- Ajouter dans la liste des overrides word-level :
  - `zingi → zin-ghi`
  - `bizingi → bi-zin-ghi`
  - `nzingi → nzin-ghi`
- Ajouter une note de mémoire dans `.lovable/memory/audio/` (règle G dur pour la famille « zingi »).
- Redéployer `elevenlabs-tts-lari`.

Test rapide après déploiement avec « Mbote za zingi » pour valider.

## 2. Mots croisés interactifs depuis PDF — Oui, c'est faisable

**Réponse courte** : oui, je peux générer des mots croisés interactifs respectant exactement la grille du PDF, à condition d'extraire fiablement : (a) la grille (positions des cases noires/blanches et numérotation), (b) la liste des définitions horizontales/verticales en français, (c) les réponses en Lari, (d) les illustrations associées.

**Le PDF fourni** fait 78 pages, généré par LibreOffice Draw, sans couche texte exploitable directement (`pdftotext` ne renvoie quasi rien). Il faudra donc passer par une extraction visuelle (OCR + lecture de grille) page par page.

### Pipeline proposé

```text
PDF → split par page → pour chaque planche :
  1. Détection grille (OpenCV) → matrice {noir, blanc, numéro}
  2. OCR définitions (FR) + réponses (Lari) via Lovable AI (Gemini vision)
  3. Extraction illustrations → src/assets/crosswords/
  4. JSON normalisé { id, titre, grille, mots:[{num,dir,def,reponse,image?}] }
→ stockage : supabase/functions/_shared/crosswords/<id>.json
→ composant React réutilisant CrosswordPuzzle existant (src/components/exercises/CrosswordPuzzle.tsx)
```

### Schéma JSON cible

```json
{
  "id": "mc-01-famille",
  "titre": "Mots croisés - La famille",
  "rows": 10, "cols": 10,
  "grid": [[".","#","A",...]],
  "clues": {
    "across": [{ "num": 1, "row": 0, "col": 0, "answer": "TAATA", "clue_fr": "Père", "clue_image": "/assets/crosswords/mc01/pere.png" }],
    "down":   [{ "num": 1, "row": 0, "col": 0, "answer": "TATA", "clue_fr": "..." }]
  }
}
```

### Intégration UI

- Nouvelle page `/mots-croises` (liste) + `/mots-croises/:id` (jeu).
- Réutilise et étend `CrosswordPuzzle.tsx` : support grille rectangulaire arbitraire, indices avec image+texte, validation case par case, audio Lari de la réponse via `MandombeSpeaker`/`elevenlabs-tts-lari`, score & objectif (même logique que Mbuta).
- Entrée admin pour téléverser un nouveau PDF, lancer l'extraction, prévisualiser et corriger la grille avant publication.

### Étapes d'implémentation après ton OK

1. Patch TTS « zingi ».
2. Script d'extraction `scripts/extract-crossword-pdf.ts` (OpenCV + Gemini vision via gateway) — exécuté hors-app, sortie = JSON + assets.
3. Lancer extraction sur le PDF fourni (78 pages → ~plusieurs grilles), QA visuelle planche par planche, corrections manuelles.
4. Refacto `CrosswordPuzzle` pour grilles libres + indices image.
5. Pages `/mots-croises` + admin upload + persistance progression (localStorage par grille).

### Ce dont j'ai besoin de toi avant l'étape 2

- Confirmation que le PDF contient bien grille + définitions + réponses + illustrations sur les mêmes pages (pour que l'OCR fasse tout en une passe).
- Préférence : génère **toutes** les grilles du PDF d'un coup, ou commence par 1–2 planches pilotes pour valider la qualité avant de passer à l'échelle ?

Dis-moi si je pars sur (A) juste le fix TTS maintenant et on traite les mots croisés ensuite, ou (B) tout enchaîné dans la même passe.
