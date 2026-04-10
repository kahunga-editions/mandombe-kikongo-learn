

# Créer 2 nouvelles leçons : "Keri" (retour/passé) et "Ta longoka mu zaba zonza" (pronoms & possession)

## Fichier modifié
- `src/data/lessons.ts` — insertion de 2 leçons avant `];` (ligne 25047)

---

## Leçon 1 : `keri-kala` — "Keri — Being back / The past form"

**Métadonnées :**
- icon: 👍, level: intermediate
- titleLari: "Keri na ba ngolo", titleMandombe: "Keri na ba ngolo"

**Vocabulaire (~10 entrées) :**
Keri (tu es de retour), Kala (être de retour), Ngolo (force), Babakala (hommes), Bakento (femmes), Ngombe (bœuf), Hata (village/ville), Kampe (peut-être), Nzila (route), Tuila (élever)

**Syntaxe (3 blocs) :**
1. **Keri — forme passée de Kena (BA)** : Exemples avec Tata Nzonzi, Biebie, élevage de bœufs
2. **Ba ngolo — Qualificatif avec "ba"** : Bantu ba ngolo, Babakala ba ngolo, Bakento ba ngolo + note sur la traduction littérale "de la force"
3. **Hata dia di nene — Décrire une ville** : Nkayi hata dia di nene, Lubomo hata dia di nene, Nkayi mu nzila ya Lubomo kampe + note culturelle sur Biebie/Mbamu

**Phrases clés :**
- Tata Nzonzi ngombe keri tuila.
- Tata Nzonzi ngombe keri tuila ku Biebie.
- Nkayi hata dia di nene.
- Nkayi mu nzila ya Lubomo kampe.

**Exercices (4) :**

1. **Multiple-choice** : "D'où vient 'Keri' ?" → Kala / Kena / Kwiza / Kwenda (correct: 0, explication: Keri vient de Kala = être de retour, forme passée de BA)

2. **Fill-in-blank** : "Bantu ______ ngolo = des personnes fortes" → `ba` (indice: particule de liaison pour les humains)

3. **Matching (5 paires)** : Keri↔Tu es de retour, Kala↔Être de retour, Ngombe↔Bœuf, Kampe↔Peut-être, Hata↔Village/ville

4. **Mandombe-recognition (8 items)** :
   - Keri (g2l), Kala (g2l), Babakala ba ngolo (g2l), Bakento ba ngolo (g2l)
   - Ngombe (l2g), Nzila (l2g), Hata (l2g), Kampe (l2g)

---

## Leçon 2 : `pronoms-possession` — "Ta longoka mu zaba zonza"

**Métadonnées :**
- icon: 🗣️, level: beginner
- titleLari: "Ta longoka mu zaba zonza", titleMandombe: "Ta longoka mu zaba zonza"

**Vocabulaire (~12 entrées) :**
Me/Mono (je/moi), Nge (tu), Yandi (il/elle), Beto (nous), Beno (vous), Bawu (eux), Mwana (enfant), Tata (père), Yaya (aîné/e), Mama (mère), Nzo (maison), Mbele (couteau)

**Syntaxe (2 blocs) :**
1. **Pronoms personnels** : Me(no), Nge, Yandi, Beto, Beno, Bawu + note sur l'omission fréquente
2. **Particules possessives** : -ani (mon), -aku (ton), -andi (son), -eto (nos), -eno (vos), -awu (leurs) + exemples avec liaison : Mwana andi (mwanandi), Tata ani (tatani), Tata aku (tataku), Yaya ani (yayani) + note sur la liaison obligatoire à l'oral

**Phrases clés :**
- Mwana andi = son enfant
- Tata ani = mon père
- Tata aku = ton père
- Yaya ani = mon aîné(e)

**Exercices (4) :**

1. **Multiple-choice** : "Quelle particule signifie 'mon/ma/mes' ?" → -aku / **-ani** / -andi / -eto (correct: 1)

2. **Fill-in-blank** : "Tata ______ = ton père" → `aku` (indice: particule possessive 2e personne)

3. **Matching (6 paires)** : -ani↔Mon/ma, -aku↔Ton/ta, -andi↔Son/sa, -eto↔Nos, -eno↔Vos, -awu↔Leurs

4. **Mandombe-recognition (8 items)** :
   - Mwana andi (g2l), Tata ani (g2l), Yaya ani (g2l), Beto (g2l)
   - Bawu (l2g), Nge (l2g), Yandi (l2g), Beno (l2g)

---

## Détail technique
- Toutes les entrées trilingues (FR/EN/PT)
- `as const` sur tous les types d'exercices
- Notes culturelles sur Biebie, Mbamu, liaison phonétique
- Insertion avant la fermeture `];` à la ligne 25047

