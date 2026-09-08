---
name: Zonza Lari - verbes de survie
description: Corpus de conjugaison (37 verbes, 3 temps, 6 personnes) et les deux regles mbo / ta
type: feature
---

Source : document « Zonza Lari — verbes de survie » (methode Kiri) fourni par l'autrice.
Genere dans `src/data/survivalVerbs.ts` par `scripts/build_survival_verbs.py`. Affiche sur `/conjugations`.

Deux regles productives :
- Futur = `mbo` + particule du pronom + infinitif (mbo ni dia, mbo dia, mbo ka dia, mbo tu dia, mbo lu dia, mbo ba dia).
- Present en cours = theme + particule du pronom + `ta` + verbe (dia ni ta dia, dia ta dia, dia ka ta dia...).

Particules : je = ni, tu = (aucune), il/elle = ka, nous = tu, vous = lu, ils/elles = ba.

Verbe etre : nje(na), we(na), ke(na), tue(na), lue(na), be(na) ; passe mbele, bele, ka bele, tu bele, lu bele, ba bele.

Points a arbitrer (repris tels quels, jamais harmonises) :
- lenda (pouvoir) et landa (suivre) ont le meme passe : ndendi / lendi.
- sa (faire) et sa:la (rester) ont le meme passe : ntshiri / shiri.
- zakasa : le document ecrit « tu zakase » pour la 2e personne du pluriel.
- Les « : » du document notent l'allongement a l'oral, pas l'orthographe : ils deviennent des notes.
