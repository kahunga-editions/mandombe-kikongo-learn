---
name: Mandombe y and double vowels
description: Rules for writing the mandombe field - no doubled vowels, y becomes i after a consonant
type: constraint
---
Dans tout champ `mandombe` (dictionnaire, lecons, traducteur, illustrations, livre) :

- JAMAIS deux voyelles identiques a la suite ("aa", "ee"...) : la police Mandombe
  affiche alors une lettre latine parasite. Ex : Iyaa -> mandombe "Iya".
- Apres une consonne, le "y" de la translitteration s'ecrit "i" :
  fyu -> "fiu", kya -> "kia". Sinon un "f" ou "k" latin reste visible.
- Le "y" initial de mot est conserve (ya, yandi, yokele) : la police le rend
  correctement ; ne pas le transformer en "i" (ia -> latin parasite).

La fonction `cleanMandombe` (src/lib/mandombeText.ts) applique ces regles au rendu.
