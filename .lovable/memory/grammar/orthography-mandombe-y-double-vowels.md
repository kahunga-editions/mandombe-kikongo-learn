---
name: Mandombe writing rules (transliteration to font)
description: Rules for the mandombe field - tshio/tshie, final ia, apostrophes, double vowels, proper names, sound notation
type: constraint
---
Dans tout champ `mandombe` (dictionnaire, lecons, traducteur, illustrations, livre) :

- JAMAIS deux voyelles identiques a la suite ("aa", "ee"...) : Iyaa -> "Iya",
  Laadi -> "Ladi". Sinon la police affiche une lettre latine parasite.
- "tshio" s'ecrit "kio" et "tshie" s'ecrit "kie" (sinon un "e" latin se balade).
  Ex : Tshioni -> "Kioni".
- Un "ia" final se tape TEL QUEL (nkia, kozia, kimfinia, bimfinia). On ne passe
  par "iya" QUE pour JIA, WIA, PIA, RIA, HIA : ces glyphes n'existent pas dans
  la police (ex. tilapia -> "tilapiya"). Aucune autre suite ne recoit "iya" ;
  "iya" n'est jamais un repli "au cas ou". "nkia" se tape "nkia" (jamais nkiya).
- "Ama" (ma chere) s'ecrit en un seul mot.
- Pas d'apostrophe : n'lemvo -> "nlemvo" (sinon le "n" initial reste visible).
- "nje" peut s'ecrire "nze" en mandombe, mais PAS systematiquement (au cas par cas).
- Les noms propres prennent une majuscule ; "Paul" s'ecrit "Paulo" en mandombe.
- N'kila mulemvo se tape "Ntshila mulemvo".

La fonction `cleanMandombe` (src/lib/mandombeText.ts) applique ces regles au rendu.

Notation des sons : toujours entre barres obliques, /a/, /ʒ/ — jamais "a:" ni
des points-virgules.

Lexique a ne pas inventer :
- Kue = ou ? Ce n'est PAS une abreviation de Kuena (= il/elle est).
- Lowa = les etres du Soleil dans la tradition Kongo (jamais "etre au soleil").
- Lupungunzala = libellule / dragonfly (jamais "libel").
- Tshioni = la grippe aviaire. Nganda = bar, pub, discotheque ; exterieur, dehors.
- "Bunutnu" (vieillesse) n'existe pas. "Tueri" ne veut pas dire quatre.
