

# Plan : Créer 6 nouvelles leçons à partir du contenu fourni

## Leçons à créer

### 1. `"saisons-kongo"` — Les saisons Kongo
**Titre Lari** : « Mbangala » (une saison tirée de la liste)
12 entrées de vocabulaire (kintombo, nkiela, luanza, shihu, lunkiesa, senza kiamasanza, mbangala, kumpua, vila, akunde, kundi, kundi kianene) avec les périodes correspondantes.
Exercices : QCM + matching + reconnaissance Mandombe.

### 2. `"binama-bia-nitu"` — Binama bia nitu
**Titre Lari** : « Binama bia nitu » (fourni par l'utilisateur)
Vocabulaire : moyo, bubelo, nsuki, disu dia kulu, meso ma kulu, ntu, bunda, etc.
Phrases : les conjugaisons « muana shiri ku nima », « sakalala », « nsuki ni sukula », les expressions de douleur/maladie.
Conjugaisons : « sakalala » (6 personnes), « nsuki ni … sukula » (6 personnes).
Exercices : QCM + fill-in-blank + reconnaissance Mandombe.

### 3. `"mpashi-zo-ntama"` — Mpashi zo ntama za tuka
**Titre Lari** : « Mpashi zo ntama za tuka »
Vocabulaire : ntama, tuka, nsoni, mpasi, vuka, tambula, matondo, nsaba, dema, fumu, ndala, etc.
Phrases : les conjugaisons « Ku Mputu tukidi » (6 personnes), les proverbes (malavu, ngunza), expressions temporelles (mazono, buaubu, mbaji).
Conjugaisons : « tuka » venir de (6 personnes).
Exercices : QCM + matching + fill-in-blank + reconnaissance Mandombe.

### 4. `"nkombo-kue-ye"` — Nkombo kue ye?
**Titre Lari** : « Nkombo kue ye? »
Vocabulaire : nkombo, ngulu, nuni, binkuti, mampa, dimpa, mbua, mbuma, nsafu, luzala, lukuba, bitenda, etc.
Phrases : les questions « kue ye/kue yena/kue ze/kue zena » pour singulier/pluriel, les nombres (bole, tatu, makumatatu na tanu), « Djoka Milou! ».
Syntaxe : le système de localisation « kue ye » vs « kue yena ».
Exercices : QCM + matching + fill-in-blank + reconnaissance Mandombe.

### 5. `"bala-ba-ngulu-bia-bitatu"` — Bala ba ngulu bia bitatu
**Titre Lari** : « Bala ba ngulu bia bitatu »
Vocabulaire : bilongo, nsayi, tolo, duka, dia, telama, zakala, sala, diama, bangula, nsamba, bikua, nsatu, tshibete, nkekoso, tshivvuadangu, etc.
Phrases : conjugaisons « nsayi ye na- » (6 personnes), impératifs (duka/dukeno, telama/telameno, zakala/zakaleno, sala/saleno, dia/dieno), proverbes (« Bo bu wa tshiri na meno, dia masangu »), négation (« ka njena na nsatu ko »).
Exercices : QCM + matching + fill-in-blank + reconnaissance Mandombe.

### 6. `"mvula-ze-nani"` — Mvula makumatatu na tanu ze nani
**Titre Lari** : « Mvula makumatatu na tanu ze nani »
Vocabulaire : mvula, mvuka, muatu, mpeho, yelo, binsono, ndinga, vuku, etc.
Phrases : dire son âge (« mvula … ze nani/naku »), démonstratifs (« ba wu bo, wa wu wo, koko ku, kulu ku, buku dio, ndinga yo »), possessifs (« ya me, ya nge, ya yandi, ya beto, ya beno, ya bawu »), « est en train de » (yeka/keka), « vuku » (faillir).
Exercices : QCM + matching + fill-in-blank + reconnaissance Mandombe.

## Détails techniques

- **Fichier** : `src/data/lessons.ts` — insertion avant `];` (ligne 17326)
- **Mandombe** : champ `mandombe` = spelling latin exact du `lari` (pas d'Adlam)
- **Titres** : tous tirés directement des phrases fournies par l'utilisateur
- **Doublons** : vérification contre les entrées existantes, ajout de `note` pour les homonymes
- **Exercices par leçon** : 3-4 QCM, 1-2 matching, 1-2 fill-in-blank, 1 reconnaissance Mandombe
- **Intégralité** : toutes les phrases, conjugaisons et vocabulaire fournis seront inclus

