

# Ajouter ~200 nouvelles entrées au dictionnaire

## Approche

Ajouter les nouvelles entrées de vocabulaire dans `src/data/lessons.ts` en les répartissant dans les leçons existantes pertinentes et en créant de nouvelles leçons si nécessaire. Chaque entrée suit le format `VocabItem` existant avec `lari`, `mandombe`, `french`, `english`, `portuguese` (optionnel), et `note` (optionnel).

### Vérification des doublons

Plusieurs termes existent déjà dans la base :
- `Matanga` (ligne ~16018), `Malaki` (~16552 et ~17882), `Bunsana` (~2878), `Buntidi` (~3976), `Mpumbu` (~2383), `Makumasambanu` (~6087), `Luvua` (~6090), `Dukisa` (~8690), `Shimba` (multiple), `Zenga` (multiple), `Yaka` (multiple), `Mvu` (~827)
- Ces doublons seront exclus ou mis à jour si la définition fournie est plus riche.

### Répartition dans les leçons

1. **Tradition Kongo & Société** (`tradition-kongo-societe`) — ajout des termes culturels/spirituels :
   `bulombi`, `Bakadia mpemba`, `ngo`, `mbuta`, `Dikenga`, `kubenda`, `kilema`, `nsikumusu`, `kintuani`, `shiama`, `ama`, `Kuilu`, `Niari`, `Buenza`, `Bandundu`, `Kabinda`, `Bengo`, `Kuanza`, `Mpumbu` (note: nom originel de Kinshasa), `Mbanza Ngungu`, proverbe `Kifuani`, `Mulele mu moshi wa mbaki`

2. **Concepts abstraits Bu-** (`bu-abstract-concepts` ou leçon existante Bu-) — ajout :
   `bubondia`, `bueso`, `buimi`, `bumolo`, `buntidi` (mise à jour), `bunzenzenze`, `bubelo`, `mabela`, `budimbu`, `bupuekipueki`, `budjua`, `bumpalangani`, `bumpidikisi`/`bumpirikisi`, `bukindi`, `buya`, `bundakada`, `bumfuekena`, `bualangana`, `bulumuka`, `bulumukina`, `bumbalakana`, `kuma`

3. **Verbes & Actions (Extended)** (`verbes-actions-etendus`) — ajout des ~80 verbes :
   `batisa`, `longa`, `tengama`, `fina`, `singana`, `teba`, `bendengela`, `fusakana`, `yiza`, `yola`, `yoka`, `yauka`, `zika`, `fuofuokota`, `vuanzakana`, `nsualumuna`, `vuanganana`, `fumba`, `diengela`, `suasuana`, `fuamina`, `nsiantika`, `pepa`, `bvuka`, `nsonsa`, `fiela`, `vuanza`, `miamia`, `nsuika`, `kadinga`, `bindama`, `djakuna`, `nsonsola`, `nsundinga`, `diamisa`, `buaninga`, `suma`, `sumika`, `yaba`, `yabika`, `shimba`, `shimbika`, `tuta`, `pitakasa`, `tutakasa`, `kuta`, `kutakasa`, `pita`, `diatuka`, `zengoka`, `zingama`, `zinga`, `kuika`, `kuikama`, `bakana`, `benga`, `bengama`, `butuka`, `damuka`, `letoka`, `djomoka`, `dakasa`, `dadinga`, `tuema`, `tafunu`, `dakula`, `dakuka`, `derikisa`, `dekesa`, `puapua`, `yindula`, `nsemona`, `nsungutila`, `vulangana`, `vumbula`, `vumbuka`, `kakamasa`, `nsikulululu`, `nsika`

4. **Nature, Animaux & Objets (Extended)** ou nouvelle leçon — ajout des noms concrets :
   `makinu`, `matanga` (mise à jour: célébrations), `malaki` (mise à jour: célébrations liées au retrait de deuil), `maka`, `luhambu`, `lukandu`, `lumbumbuzi|tumbumbuzi`, `luila|tuila`, `lukilazi|tukilazi`, `lundala|mandala`, `luhe|mahe`, `lukoka|tukoka`, `lubumba|tubumba`, `luke|tuke`, `lubadi|tubadi`, `tuseho`, `buaku-maku`, `buala|mala`, `buatu|matu`, `buko|mako`, `koko|moko`, `kibabala|bibabala`, `kibalabala|bibalabala`, `kikola|bikola`, `kimvuinzingila|bimvuinzingila`, `kinkuelankuela|binkuelankuela`, `kindiongoloko|bindiongoloko`, `muniungutinunu|miniungutinunu`, `muntuboloko`, `boloko`, `kimfuameso`, `mubati|mibati`, `mubasa|mibasa`, `mukazu`, `ntongua`, `mbuata`, `ntientie`, `tufinia`, `kinionia|binionia`, `kimfinia|bimfinia`, `lubanji|mbanji`, `miangu`, `mbata`, `mpua`, `nkakamusu`, `mutima|mitima`, `nzindu`, `mvu` (siècle), `lungolobi`

5. **Nouveaux termes isolés** (ajoutés à la leçon la plus pertinente) :
   `lumungi`, `lukuta`, `lusambu`, `lunkazi`, `luvuezo`, `vueza`, `luniogiiiniongi`, `nsingani`, `ntebolo`, `yebo`, `nkunga`, `vua` (9), `vua` (posséder), `luvua` (90 — déjà existant), `dukisa menga`, `ba`, `zenga` (moquer), `longa` (conseiller/enseigner)

### Mandombe

Le champ `mandombe` reprend le texte latin (accent-free) car la police Mandombe effectue le rendu automatiquement. Les prononciations spéciales seront ajoutées dans le champ `note`.

## Fichiers modifiés
- `src/data/lessons.ts` — ajout de ~180-200 nouvelles entrées `VocabItem` réparties dans les leçons existantes, mise à jour de quelques entrées existantes dont la définition est enrichie

## Estimation
Un seul fichier modifié, mais avec de nombreuses insertions réparties sur plusieurs blocs du fichier (~22 000 lignes).

