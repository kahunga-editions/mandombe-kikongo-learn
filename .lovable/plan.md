# Champ Mandombe : ne taper que le Lari

## Ce que j'ai compris

Le bloc 0 du rapport n'est pas un problème de police : c'est du français et des lettres
orphelines qui ont atterri dans le champ Mandombe. La frontière Lari / français n'était
pas respectée. Règle unique : **le champ Mandombe contient exactement le mot ou la phrase
Lari, rien d'autre**. Tout ce qui est français reste en glose, en latin.

## Tes arbitrages, appliqués tels quels

| Entrée actuelle | Mandombe à taper | Glose |
| --- | --- | --- |
| `M'vu` | `Muvu` (ou `Mvu`) — sans apostrophe | inchangée |
| `Kanga munua. F.` | `Kanga munua.` | le `F` est supprimé |
| `Bantu bele. L.` | `Bantu bele.` | le `L` est supprimé |
| `Bua ka bua. · pisumuka.` | `Bua ka bua pisumuka.` | Il · elle est sur le point de tomber. |
| `Lubomo nom originel de.` | `Lubomo` | Lubomo, nom originel de Kinshasa. |
| `Banzila moyo. Fais attention.` | `Banzila moyo.` | Fais attention à ton ventre, prends soin de ton ventre. |
| `Batu kuiza. V.` | `Batu kuiza.` | le `V` est supprimé |
| `Bendi. Q` | `Bendi.` | le `Q` est supprimé |
| `Beri ta. Ils ·.` | `Beri ta.` | le `I` appartient au français |
| `Defesa Defisa p Sompesa` | `Defesa`, `Defisa`, `Sompesa` | le `p` est supprimé |
| `Mulumba · milumba lapin().` | `Mulumba · milumba` | lapin(s) — singulier / pluriel |
| `Belesa quelque chose qui rend malade.` | `Belesa` | ce qui rend malade |
| `Vuku + verbe.` | `Vuku` | Vuku + verbe |
| `Bi signifie la multiplication de l'être intérieur.` | `Bi` | glose française |
| `Dia ni ta dia buaubu. J.` | `Dia ni ta dia buaubu.` | le `J` est supprimé |
| `Mpumbu nom d'origine de Kinshasa.` | `Mpumbu` | Mpumbu, nom d'origine de Kinshasa. |
| `Kinkala, près de Mbamou in Kongo Mfoa.` | `Kinkala` | Kinkala, près de Mbamou, Kongo Mfoa. |
| `We keti St Pierre kelaka muelo zulu.` | tout en Mandombe sauf `St Pierre`, laissé en latin | c'est du français, pas du Lari |

Aucune substitution de son n'est faite nulle part. Je ne répare que la frontière
Lari / français et les lettres orphelines.

## Graphies validées pour les suites que la police ne compose pas

Chaque cas garde le Lari inchangé ; seule la graphie Mandombe change, et une note de
prononciation bilingue est ajoutée sous la forme `prononcé /njila/ · pronounced /njila/`.

| Suite | Graphie Mandombe | Note |
| --- | --- | --- |
| `nj` (njila, njeka, njunini, lunjungu, njundu, mbanji…) | `nz` : `Nzila` | prononcé /njila/ |
| `dz` (dzuna, budziya, budzakata, budzoki, budzua, budzulu, budzabu) | `dj` : `Djuna` | prononcé /dzuna/ |
| `ts` (tseki, tsaba, tsala, tsamuna, tsika, ntsari, tsadila, tsaka) | `ns` : `Nseki` | prononcé /tseki/ |
| `th` (nthsi, thiminu, thsilo, thsilongisi) | supprimé | graphie fautive, la ligne saute |
| `lw` / `fw` (lwonesa, lwoni, bilwoni) | `lu` / `fu` : `Luonesa` | pas de `w` en Mandombe |
| `n'lemvo` | `nlemvo` (ou `mulemvo`) | jamais d'apostrophe |
| `n'mvu` | supprimé | n'existe pas |
| `ntshiya` / `nkia` | `Nkiya` | prononcé /ntshia/ |
| `bendji` | `Bendzi` | prononcé /benji/ |
| `makonfo` | `Makomfo` | prononcé /makonfo/ |
| `mundjula` · `mindjula` | `Mundzula` · `Mindzula` | prononcé /mundjula/ |
| `nfinini` | `Mfinini` | prononcé /nfinini/ |
| `ntshila` | `N'kila` (N majuscule) | prononcé /ntshila/ |
| `pfuka` | `Fuka` | prononcé /pfuka/ |
| `mzansi` | `Nzansi` | prononcé /mzansi/ |
| `ntshangu` | `Nkangu` | prononcé /ntshangu/ |

## Trois points à confirmer avant de lancer

- `ndje` : tu m'as dit de taper `Ngie`, prononcé /nje/. Je confirme `N-G-I-E` ?
- `ndjokele` : la correction validée plus tôt était `nzokele`, prononcé /ndjokele/.
  Je garde `Nzokele` ?
- `ntsha` / `ntshi` / `nthsi` restants : même traitement que `ts` (→ `ns`), ou ils
  tombent aussi comme la ligne `th` ?

## Suite

Dès que tu réponds à ces trois points, j'applique tout le tableau, puis je génère la
version finale (Lari · français · anglais, ODT uniquement) avec l'audit HarfBuzz
bloquant : zéro lettre latine résiduelle, ponctuation composée en Mandombe.

## Détail technique

- `scripts/audit-odt-mandombe.py` reste la vérité terrain (shaping réel de la police).
- Les corrections sont écrites comme une table de cas nommés dans le script de build,
  jamais comme une règle générale de remappage de sons.
- La skill `taper-le-mandombe` est complétée : « le champ Mandombe ne contient jamais de
  français », `M'vu → Muvu / Mvu`, et le tableau des graphies ci-dessus.

