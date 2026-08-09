# Dictionnaire v14 — corrections du corpus + reprise du visuel

## 1. Règle absolue : jamais de latin mêlé au Mandombe

Nouvelle règle non négociable appliquée partout (site, dictionnaire en ligne, traducteur, Mbuta Matondo, livre ODT/PDF) :

- Un bloc Mandombe ne contient **que** du Mandombe. Aucune lettre latine, aucun chiffre, aucune abréviation ne peut se promener à l'intérieur ou à côté immédiat d'un mot Mandombe.
- Séparateurs de lettres du livre (le « N » isolé) : remplacés par l'**illustration dorée sur fond marron** seule, sans lettre latine. Idem pour les onglets/têtes de section.
- Le Mandombe peut différer de la translittération latine quand la prononciation l'exige (champ Mandombe distinct du champ latin) :
  - `nzansi` en Mandombe, translittération `Nzansi`, note : « se prononce Mzansi ».
  - `mfiyela` en Mandombe, translittération `Mfiela`.
- Un **script d'audit** parcourt `dictionary.json`, `lessons.ts`, le corpus du traducteur et le corpus Mbuta pour détecter tout champ Mandombe contenant des caractères latins/ponctuation parasite. Le rapport complet de ces cas te sera donné dans le chat pour que tu tranches les graphies douteuses.

## 2. Typographie des sens

- Majuscule **uniquement** en début de phrase. Pas de majuscule après un point-virgule, ni après « ; » séparant deux sens.
- Les simples mots/syntagmes restent en minuscules, sans point final.
- Suppression des doublons stricts dans une même entrée (cas « champignons Buwa · Mushrooms ; Mushrooms (pl.) » : un seul sens conservé, le pluriel indiqué une fois).
- Reprise de ta version amendée du v12 comme référence visuelle pour l'index I.

## 3. Corrections lexicales (dictionnaire en ligne + traducteur + Mbuta + livre)

**Corrections**
- `kabila` = offrir, donner (retirer le sens « à »).
- `à gauche` = **Ku lumoso / Ku lukento** (les deux options affichées).
- `lufutu` : retirer « à pousser ». Sens réels + exemples : Lufutu lu buiri ku zandu = il s'est passé quelque chose de dur au marché ; Lufutu buiri = on a bien dansé ; Lufutu lu buiri kuna = il y avait une bonne ambiance ; Ba mu futiri = on l'a payé / récompensé / remboursé ; Mbo ka ku mfuta / Mbo ka ku mvuturila = elle va me rembourser.
- `à tout moment` = **Laki ni laki / Ntangu ni ntangu** (les deux affichés).
- `dukila` = sortir par, sortir à travers un endroit (pas « à travers » seul).
- `luvuezo` = la maltraitance (pas l'abandon), de `vueza` = maltraiter.
- `mpene` = nu uniquement (retirer « allure débraillée »).
- `mankondi` = les bananes ; `mankondi ma kalungu` = les alocos / fried plantains.
- `muala` = passage fait par un rongeur dans la forêt (retirer « amphibien »).
- `mputa` = plaie, blessure (retirer le sens « amputation » ; on nomme la partie coupée : `kulu ba mu zengele` = on lui a coupé la jambe/le pied).
- `funi` = anus ; forme informelle `muana taku` (litt. la bouche des fesses).
- `loko` = champignon vénéneux, pluriel `maloko`.
- `mfiela` = 1) sens actuel conservé ; 2) **le plongeon** — note : intonation montante sur « mfie », /ie/ bref.
- Retirer `amuser = kekisa`. Conserver : `sakasa` = amuser quelqu'un ; `sakana` = s'amuser ; `sakanana` = se jouer de quelqu'un, prendre pour un idiot.
- Supprimer l'entrée « corps étranger » (à renommer en kilari plus tard).

**Ajouts**
- `niekona`, `yambirika` = abandonner.
- `kuanga` = stopper (arrêter la démangeaison).
- `yaya` / `mukuluntu` (var. `mukuruntu`) = l'aîné, celui qui vient avant.
- amitié : `tshindiku`, `tshinduku`.
- `jundika` / `djundika` = amonceler (prononcé /dzundika/) ; `tentsakasa` = empiler, entasser.
- `kekete` = petite fourmi termitière, pluriel `makekete`.
- angle des murs : `fuma`, synonymes `tshikonko` / `bikonko` ; `Bikonko bia nzo` = les coins des maisons.
- `kituizi` / `kituiji` = animal domestique/d'élevage, pluriel `bituizi` / `bituiji` ; `tuila` = élevage, élever ; Tuila dia bindongo = un élevage de moutons ; Tuila dia bindongo die nandi = il a un élevage de moutons ; Tuila dia dingi die nani = j'ai un grand élevage ; Tuila dia ngombe dia di nene die nani = j'ai un grand élevage de bœufs.
- `bingulu` = un appel ; `bingula` = annoncer, héler.
- `kabakasa` = empêcher de.
- `singasa` = approuver ; Njila aku ya nsingase = j'approuve ton chemin.
- `muisa` = infliger, faire subir.
- `kamu` = la fièvre (premier /a/ long).

Chaque ajout reçoit sa graphie Mandombe, sa translittération, le français et l'anglais, plus la note de prononciation quand elle est indiquée. Les entrées passent par le contrôle anti-doublons existant.

## 4. Prononciation (TTS)

Ajout des règles issues des corrections : `jundika` → /dzundika/, `kamu` avec /a/ long, `nzansi` → /mzansi/, `mfiela` (plongeon) avec /ie/ bref et intonation montante.

## 5. Détails techniques

- `supabase/functions/_shared/dictionary.json`, `src/data/lessons.ts`, `supabase/functions/translate-lari/index.ts`, `supabase/functions/_shared/mbuta-corpus-v2.json` mis à jour de façon cohérente, puis redéploiement des fonctions concernées.
- Overrides phonétiques dans `supabase/functions/elevenlabs-tts-lari` et `src/lib/lari-phonetic-engine.ts`.
- `scripts/build-dictionary-odt-v13.py` dupliqué en `build-dictionary-odt-v14.py` :
  - `normalize_sentence()` corrigé pour ne plus capitaliser après `;`
  - déduplication stricte des sens identiques FR/EN au sein d'une entrée
  - séparateurs de lettres = illustration seule, plus aucun caractère latin isolé
  - couverture pleine page conservée, Mandombe toujours en premier
- Nouveau script d'audit `scripts/audit-mandombe-latin.ts` : liste tout mélange latin/Mandombe restant.
- Regénération ODT + PDF v14, QA page par page (rendu Mandombe, majuscules, doublons, séparateurs), puis lien de téléchargement dans le chat. Cible KDP : rester sous 550 pages.
