# Plan : intégrer la présentation de conjugaisons

## En attente
Le fichier exporté de la présentation (PDF ou PPTX) doit être déposé dans le chat. Sans lui, aucune forme ne sera ajoutée : rien ne sera inventé ni complété par analogie.

## Ce qui sera fait, une fois le fichier reçu

### 1. Lecture et extraction
- Lire le document diapositive par diapositive et relever chaque forme conjuguée : verbe, temps, personne, phrase complète, traduction française (et anglaise si présente).
- Établir la liste des formes déjà présentes et des formes nouvelles, pour éviter les doublons avec les séries existantes.
- Vous soumettre les cas ambigus (formes incomplètes, traductions absentes, variantes) plutôt que de trancher seul.

### 2. Écriture en Mandombe
- Transcrire chaque phrase en Mandombe selon les règles en vigueur : `ia` tel quel sauf JIA, WIA, PIA, RIA, HIA (→ IYA), pas de lettres latines résiduelles, pas d'accents, pas de voyelles doublées.
- Les translittérations latines restent telles quelles (ex. mbendji reste mbendji même si le Mandombe s'écrit mbenji).

### 3. Page Conjugaisons
- Ajouter les nouvelles séries verbales : phrase complète en Mandombe, translittération, traduction, audio, avec la forme verbale mise en valeur par le surlignage doré déjà en place.
- Les nouvelles formes deviennent recherchables en français comme en kikongo (comme « tu seras »).

### 4. Dictionnaire
- Ajouter les verbes et formes manquants comme entrées propres, sans fusionner d'homographes ni de sens distincts.
- Passer les contrôles automatiques avant validation.

## Détails techniques
- Extraction via l'outil de lecture de document ; sources modifiées : `src/data/conjugationSeries.ts`, `src/data/verbeBa.ts` (si le verbe être est concerné), `src/pages/Conjugations.tsx` (uniquement si une nouvelle catégorie de temps l'exige), `data/dictionary-entries.json`.
- `scripts/dictionary_guards.py` doit rester vert ; vérification par compilation puis contrôle visuel de `/conjugations`.
- Aucun document ODT/PDF ne sera généré.
