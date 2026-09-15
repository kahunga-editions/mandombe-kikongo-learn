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
  JAMAIS de progressif nu : « ni ta sala » seul est faux. Il faut toujours un theme devant, soit le verbe repete
  (sala ni ta sala), soit un complement atteste : `Binkuti ni ta sala` = je fabrique des habits ;
  `Binkuti ni ta sukula` = je lave des habits ; theme de kwiza = `mwizu`.

Serie attestee « pouvoir se battre » (nuana), ajoutee par l'autrice :
- Present : Ndendi nuana / Lendi nuana / Lendi nuana / tu lendi nuana / lu lendi nuana / ba lendi nuana.
- Passe : na lendi nuana / wa lendi nuana / wa lendi nuana / ta lendi nuana (variante tua lendi nuana) /
  lua lendi nuana / ba lendi nuana.

Particules : je = ni, tu = (aucune), il/elle = ka, nous = tu, vous = lu, ils/elles = ba.

Serie attestee ajoutee par l'autrice pour « pouvoir commencer » :
- Je peux commencer = `Ndendi batika`
- Tu peux commencer = `Lendi batika`
- On peut commencer = `tu lendi batika`
- Nous pouvons commencer = `tu lendi batika`
- Vous pouvez commencer = `lu lendi batika`
- Ils peuvent commencer = `ba lendi batika`

Verbe etre : nje(na), we(na), ke(na), tue(na), lue(na), be(na) ; passe mbele, bele, ka bele, tu bele, lu bele, ba bele.

Points a arbitrer (repris tels quels, jamais harmonises) :
- lenda (pouvoir) et landa (suivre) ont le meme passe : ndendi / lendi.
- sa (faire) et sa:la (rester) ont le meme passe : ntshiri / shiri.
- zakasa : le document ecrit « tu zakase » pour la 2e personne du pluriel.
- Les « : » du document notent l'allongement a l'oral, pas l'orthographe : ils deviennent des notes.

Serie attestee « pouvoir commencer » au passe (ajoutee par l'autrice) :
- na lendi batika / wa lendi batika (tu) / wa lendi batika (il) / ta lendi batika (variante tua lendi batika) / lua lendi batika / ba lendi batika.
- Demain je pourrai commencer = `mbaji ndendi batika`.

Verbe Batika (commencer), formes attestees uniquement :
- Mbo ni batika = je commencerai.
- Nkokela mbo ni batika = je commencerai ce soir.

Serie attestee « devoir travailler » (fueti), ajoutee par l'autrice, deux formes equivalentes :
- Mfueti sala / sala mfueti sala ; Fueti sala / sala fueti sala ; fueti sala / sala ka fueti sala ;
  tu fueti sala / sala tu fueti sala ; lu fueti sala / sala lu fueti sala ; ba fueti sala / sala ba fueti sala.

Serie attestee « pouvoir travailler » : ndendi sala / lendi sala / lendi sala / tu lendi sala /
lu lendi sala / ba lendi sala.
