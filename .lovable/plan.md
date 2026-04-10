

# Créer 2 nouvelles leçons : "Kue? = Where?" et compléments grammaticaux

## Fichier modifié
- `src/data/lessons.ts` — insertion de 2 leçons avant `];` (ligne 25345)

---

## Leçon 1 : `kue-where` — "Kue? = Where?"

**Métadonnées :**
- icon: ❓, level: beginner
- titleLari: "Kue?", titleMandombe: "Kue?"

**Vocabulaire (~20 entrées) :**
Kue (où), Vumbuka (aller bien / se réveiller), Nzonzolo (façon de parler), Bambuka (se souvenir), Muntu (personne), Nto (rivière), Mamba (eau), Mwana (enfant), Buyele (intelligent), Djuna (calme), Kinzu/Binzu (marmite en terre), Lukaya (feuille), Bima (nourriture), Tolo (sommeil), Baka (gagner/attraper/trouver), Tabuka (casser), Bua (tomber), Ya/Yiri (cuire/brûler), Tata (brûler/cuire)

**Syntaxe (6 blocs) :**

1. **Kue? — Pronoms interrogatifs locatifs** :
   - Kue nge? = Où suis-je?, Kue we? = Où es-tu?, Kue ke? = Où est-il/elle?, Kue tue? = Où sommes-nous?, Kue lue? = Où êtes-vous?, Kue be? = Où sont-ils/elles?

2. **Vumbuka — Conjugaison au passé** :
   - Mvumbukiri = je vais bien, Vumbukiri = tu vas bien, vumbukiri = il/elle va bien, Tu vumbukiri = nous allons bien, Lu vumbukiri = vous allez bien, Ba vumbukiri = ils/elles vont bien
   - Note: Parfois prononcé /vumbukidi/

3. **Bambuka — Se souvenir & forme négative** :
   - Mbambukiri = je me souviens
   - Ka ni ta bambuka ko = je ne me souviens pas, Ku ta bambuka ko, Ka ta bambuka ko, Ka tu ta bambuka ko, Ka lu ta bambuka ko, Ka ba ta bambuka ko
   - Note: Structure négative Ka...ko

4. **Démonstratifs et adjectifs** :
   - Muntu wu = cette personne, Nto yi = cette rivière, Mamba ma = cette eau
   - Mwana buyele we = Cet enfant est intelligent, We na buyele = il/elle est intelligent(e), Wa djuna = il/elle est calme

5. **États et résultats (stative)** :
   - Kinzu ki tabukidi = La marmite est cassée, Binzu bi tabukidi = Les marmites sont cassées
   - Lukaya lu buidi = La feuille est tombée
   - Bima bi yiri = La nourriture est prête, Bima bi tatiri = La nourriture a brûlé
   - Ba muntu = Sois humain
   - Ntomono dia / Ntomene dia / Ndiri bu bote = j'ai bien mangé

6. **Tolo tua bakiri? — Idiome du sommeil** :
   - Tolo tua mbakiri? = Ai-je bien dormi?, Tolo tua bakiri?, Tolo tua ka bakiri?, Tolo tua tu bakiri?, Tolo tua lu bakiri?, Tolo tua ba bakiri?
   - Note: BAKA polysémique (gagner, attraper, trouver). Idiome littéral: "as-tu attrapé le sommeil?"

**Exercices (4) :**

1. **Multiple-choice** : "Quel type d'extension verbale est '-uka' dans 'Vumbuka' ?" → Applicative (-ela) / Causative (-esa) / **Reversive passive (-uka)** / Reciprocal (-ana) (correct: 2)
   - Explication: -uka est l'extension réversive passive, indiquant le résultat d'un changement d'état

2. **Fill-in-blank** : "Vumb______ = se réveiller / aller bien" → `uka` (indice: extension réversive passive)

3. **Matching (6 paires)** : Kue nge?↔Où suis-je?, Mvumbukiri↔Je vais bien, Mbambukiri↔Je me souviens, Kinzu ki tabukidi↔La marmite est cassée, Tolo↔Sommeil, Baka↔Attraper/gagner

4. **Mandombe-recognition (8 items)** :
   - Mvumbukiri (g2l), Kue we? (g2l), Mbambukiri (g2l), Kinzu ki tabukidi (g2l)
   - Tolo tua bakiri? (l2g), Bima bi yiri (l2g), Lukaya lu buidi (l2g), Ka ni ta bambuka ko (l2g)

---

## Leçon 2 : `kue-demonstratifs` — "Muntu wu, Nto yi — Demonstratives & States"

Cette leçon n'est PAS nécessaire — tout le contenu tient dans la leçon 1 ci-dessus qui est déjà riche. Le contenu sera regroupé en une seule leçon `kue-where`.

---

## Détail technique
- Toutes les entrées trilingues (FR/EN/PT)
- `as const` sur tous les types d'exercices
- Vocabulaire strictement issu du matériel fourni (aucune invention)
- Notes culturelles/linguistiques (polysémie de BAKA, prononciation /ndje/, /vumbukidi/, structure négative Ka...ko)
- Insertion avant `];` à la ligne 25345

