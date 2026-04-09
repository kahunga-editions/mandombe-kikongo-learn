

# Créer des leçons avec le contenu LONGOKA

## Contenu à intégrer

Le matériel couvre plusieurs thèmes grammaticaux distincts, qui seront répartis en **3 leçons** pour respecter la progression pédagogique.

---

## Leçon 1 : Mia mingi longokele — Le passé composé avec LONGOKA

**ID** : `mia-mingi-longokele`
**Niveau** : intermediate
**Contenu** :

- **Vocabulaire** : `longoka`, `mia`, `mabanza`, `nzololo`, `yika`, `diambu`, `tshimoko`, `bimoko`, `nzo`, `bua`, `mbazi`, `huma`
- **Conjugaison** : Passé composé de LONGOKA (ndongokele / longokele / ka longokele / tu longokele / lu longokele / ba longokele)
- **Syntaxe** — Bloc "Mia + conjugaison passée" :
  - Mia mingi ndongokele / Mia mingi longokele / Mia mingi ka longokele / etc.
- **Syntaxe** — Bloc "Démonstratifs et propositions relatives avec MA, DI, TSHI, BI, MU, KU, HO" :
  - Mabanza ma nzololo yika ni ma we ma
  - Diambu di nzololo yika ni dia we di
  - Diambu di na zolo yika ni dia we di
  - Tshimoko tshi na zolo yika ni tsha we tshi
  - Bimoko bi na zolo ni bia we bi
  - Tshimoko tshi na zolo yika, ka tsha wa ko
  - Mu nzo mu mua mubote mue
  - Bua buingi ka sadidi
  - Ku mbazi kua kubi
  - Huma ho ha habote he
- **Phrases** : toutes les phrases exemples ci-dessus
- **Exercices** :
  1. Multiple-choice (conjugaison passée de longoka)
  2. Fill-in-blank (compléter les particules d'accord)
  3. Matching (phrases ↔ traductions)
  4. Mandombe-recognition (glyph-to-latin + latin-to-glyph, 8 items)

---

## Leçon 2 : Particules d'accord — Substantif + particule + verbe/pronom

**ID** : `particules-accord-substantif`
**Niveau** : intermediate
**Contenu** :

- **Vocabulaire** : `tshinkuti`, `lukaya`, `binzu`, `mbua`, `tari`, `bititi`, `bubelo`, `malala`, `ba` (palmier), `muti`, `nti`, `mutima`, `dinu`, `kiamvu`, `nsusu`, `ludimi`, `buatu`, `kulu`
- **Syntaxe** — Bloc "Substantif + particule d'accord + verbe" :
  - Tshinkuti tshi nzololo / Lukaya lu buidi / Binzu bi tabukidi / Mbua yi tatikidi / Tari tshi nene / Bititi bike
- **Syntaxe** — Bloc "Substantif + particule d'accord + pronom possessif" :
  - Bubelo buaku / Malala mandi / Ba diaku / Muti eno (nti eno)
- **Syntaxe** — Bloc "Classe nominale + moshi (un/une)" :
  - mutima mu moshi / dinu dimosi / kiamvu kimoshi / nsusu moshi / ludimi lumoshi / buatu bumoshi / kulu kumoshi
- **Phrases** : Buatu bumoshi mu nzari bue (La pirogue est sur le fleuve)
- **Exercices** :
  1. Multiple-choice (quelle particule d'accord ?)
  2. Fill-in-blank (compléter la particule)
  3. Matching (substantif ↔ particule d'accord)
  4. Mandombe-recognition (8 items avec les substantifs)

---

## Leçon 3 : Dérivation verbale — Extensions et formes passives

**ID** : `derivation-verbale-extensions`
**Niveau** : advanced
**Contenu** :

- **Vocabulaire** : tous les verbes fournis (`ta/tela`, `sa/sila`, `tala/tadila`, `londa/londela`, `gana/ganina`, `nata/natina`, `diata/diatila`, `tsala/tsadila`, `yabama/yabamana`, `pokama/pokamana`, `bemba/bembesa`, `bua/buisa`, `kia/kiesa`, `dika`, `bulasa`, `bula`, `buta/butasa`, `djuta/djutasa`, `baka`, `sasuna/sasuka`, `yakuna/yakuka`, `zingumuna/zingumuka`, `kela/kelana`, `zaba/zabana`, `salaka`, `salanga`)
- **Syntaxe** — Bloc "Extension applicative (-ela, -ila, -ina)" avec explication :
  - ta → tela / sa → sila / tala → tadila / londa → londela / gana → ganina / nata → natina / diata → diatila / tsala → tsadila
- **Syntaxe** — Bloc "Extension passive/réflexive (-ama, -amana)" :
  - yabama → yabamana / pokama → pokamana
- **Syntaxe** — Bloc "Extension causative (-esa, -isa, -asa)" :
  - bemba → bembesa / bua → buisa / kia → kiesa / bula → bulasa / buta → butasa / djuta → djutasa
- **Syntaxe** — Bloc "Extension réversive active/passive (-una/-uka)" :
  - sasuna/sasuka / yakuna/yakuka / zingumuna/zingumuka
- **Syntaxe** — Bloc "Extension réciproque (-ana) et habituelle (-aka, -anga)" :
  - kela → kelana / zaba → zabana / salaka / salanga
- **Phrases avec verbes conjugués** :
  - Nzo yi yidi / Makondi ma bueki / Nuni zi tilumukini / Tolo tua bakiriki?
- **Syntaxe** — Bloc "Nombres : bole (deux) avec classes nominales" :
  - Bantu bole / Bala bole / Mitu miole / Maba mole / Mbu zole / Biteko biole / Tumpunguzala tuole
  - Note sur Bantu ≠ hommes (babakala = hommes)
- **Phrase** : Muntu we na bukindi (une personne brave)
- **Exercices** :
  1. Multiple-choice (identifier le type d'extension verbale)
  2. Fill-in-blank (former la dérivation)
  3. Matching (verbe de base ↔ forme dérivée)
  4. Mandombe-recognition (8 items, latin-to-glyph avancé)

---

## Fichier modifié
- `src/data/lessons.ts` — ajout de 3 nouvelles leçons à la fin du tableau `lessons[]`

## Principes respectés
- Aucun contenu inventé, strictement le matériel fourni
- Champ `mandombe` = texte latin accent-free
- Notes de prononciation dans le champ `note`
- Trilingual (FR/EN/PT) pour tous les champs d'exercices
- Exercices mandombe-recognition avec distracteurs tirés du vocabulaire existant

