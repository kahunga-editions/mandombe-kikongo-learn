

# Plan : Ajouter ~350 nouvelles entrées au dictionnaire

## Approche

Créer **3 nouvelles leçons thématiques** à la fin du tableau `lessons` (avant le `];` final, ligne 16643), chacune regroupant les entrées par thème pour faciliter la navigation dans les leçons et le dictionnaire.

## Leçons à créer

### 1. `"verbes-actions-etendus"` — Verbes & Actions (Extended)
Regroupe les verbes d'action et d'état :
- fomba, defa, kinkasa, nimba, fumba, fumbama, fumfula, fulamana, fulamasa, defesa, dekakana, buota, buotana, buotasa, buotoka, buoboka, buongozoka, buila, buirila, buela, buesa, bueyesa, bueza, vuza, vuama, vuanda, vuaza, vueza, vuika, kola, bambuka, potesa, muisa, muala, yakamba, mueta, muesa, muina, diata, duka, burika/budika, pinzumuka, koseka, haula, sakalala, sompa, telama, diama, bvuama, djunisa, bueta, bumba, bonga, yumisa, sosa, handa, sungamana, tisama, wakasa, djoka, zinga, shisa, buisa, jingila, kuna, lobola, leboka, lambula, lambalala, lamina, lamuna, lema, lembama, lemesa, lemvokela, lenga, kubama, kubuka, kuluku, fimpa, fimba, sabika, karisa
- Plus les noms dérivés : nsululu, n'kelo, kinimbi, kinkenene, kinkento, ngantu/nganti, buimi, lukokoto, lunomo, mvuamvua, mvuaza, mvuo, mvuemba, bulebua, bunokena, mvuemvue, nieka, mvuomvuo, vuotona, muendo, muendololo, muemuenge, humumu, muisu, nkuizulu, muonso, muyibi, muini, mueni, nsambi, muaka, muakila, muamba, etc.

### 2. `"nature-animaux-objets-etendus"` — Nature, Animaux & Objets
- Animaux : nsumba, ngola, make, lembe, munkiobo, munganga, mushikimbila, minsala, nkusu, muana mbua, muana nsusu, bimpete, binienia, munturia, musonia
- Nature : mpolo, tisama, kikuku/bikuku, nsende, makaya, kifulu, luvu, kuluku, mfiela, nsati, tshiba tsha nioshi, tshitari, makenko
- Objets : kitunga, kalu, mpu, kisu/su, bikanga, muiku, muina (lance), muinga, muindu, muidila, dimbu, bitenda, sabukulu, lukuni/nkuni, tshitari (miroir), lulembeso, buatu, buluku
- Corps : tshivumu/kivumu, disu dia kulu, nlembo wa nguri, tshinkoso tia koko, lutambi, mutu beni, bunda, bito, ndia/mudia, lundindi
- Nourriture : muamba, muamba ngumba, makayabu, meki, bimpete karingu, mbiji mamba, mbiji sangi, mampa, mfunmfungu

### 3. `"tradition-kongo-societe"` — Tradition Kongo & Société
- Tradition : mbawu, mba, nza dia kenza, nza kingunda, simbi/bisimbi, mahasimbi, walesa, lowa, ntemo, kinkeko, bukongo, ntuni, kintamina, ntela, kinzo, adi, nsi ya ya, bena nsilulu, banzayi, kundu, kimvuama, mvuanungunu, mpungu mvuaza
- Société : nsendo, kinselia, ngeli, nduya, bununu, bukuluntu, buyaya, buzitu, luyalu, kimayala, kinkodia, bibutu, bishi, diatulu, bungungu, ntantu, ntalu, nkana, lumingu, ngonda
- Expressions : bue ba tele, lumingu lu kwiza, ngonda yi kuiza, buedi ntama, buedi ntete, ha manima, mu pari, ku manima, ku nima, ma landila, tsha nkoyi, muaumun, na tendi, etc.
- Lieux & noms : Kinimbi, Mbanza Kongo, Mzansi, Mutshila Mamba, tshibuka, mbuka, funda na nkama nsambuadi na nsambuadi

## Détails techniques

- **Fichier** : `src/data/lessons.ts` — insertion avant la ligne 16643 (`];`)
- **Doublons** : Le dictionnaire (`Dictionary.tsx`) dédoublonne déjà via `seen.has(key)` sur `lari.toLowerCase().trim()`. Je vérifierai manuellement les entrées les plus courantes (kola, kala, bonga, nimba, etc.) qui existent déjà et ajouterai une `note` pour désambiguër les homonymes.
- **Traductions** : Chaque entrée aura `lari`, `mandombe`, `french`, `english`, `portuguese`, et `note` quand pertinent.
- **Pas de leçons inventées** : Pas de phrases ni d'exercices ajoutés sauf ceux fournis explicitement.

