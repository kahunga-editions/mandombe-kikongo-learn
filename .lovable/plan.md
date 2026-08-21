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
| `Mulumba · milumba lapin().` | `Mulumba · milumba` | lapin |
| `Belesa quelque chose qui rend malade.` | `Belesa` | ce qui rend malade |
| `Vuku + verbe.` | `Vuku` | Vuku + verbe |
| `Bi signifie la multiplication de l'être intérieur.` | `Bi` | glose française |
| `Dia ni ta dia buaubu. J.` | `Dia ni ta dia buaubu.` | le `J` est supprimé |
| `Mpumbu nom d'origine de Kinshasa.` | `Mpumbu` | Mpumbu, nom d'origine de Kinshasa. |
| `Kinkala, près de Mbamou in Kongo Mfoa.` | `Kinkala` | Kinkala, près de Mbamou, Kongo Mfoa. |
| `We keti St Pierre kelaka muelo zulu.` | à trancher (voir ci-dessous) | |

Aucune substitution de son n'est faite nulle part. Je ne répare que la frontière
Lari / français et les lettres orphelines.

## Ce qui reste bloqué, en attente de ta réponse

Les blocs 1 à 7 du rapport (~270 occurrences) sont d'une autre nature : ce sont des
suites que la police ne compose pas. Je n'y touche pas tant que tu ne m'as pas dit
quoi taper.

- `nj` : njila, njeka, nje, njunini, lunjungu, njundu…
- `dz` : dzuna, budziya, budzakata, budzoki, budzua, budzulu, budzabu
- `ts` : tseki, tsaba, tsala, tsamuna, tsika, ntsari, tsadila, tsaka
- `th` : nthsi, thiminu, thsilo, thsilongisi
- `lw` / `fw` : lwonesa, lwoni, bilwoni
- `N'` + l/m : n'lemvo, n'mvu
- divers : ntshiya, bendji, ntsha, makonfo, mundjula, ndjokele, nfinini, ntshila,
  pfuka, mzansi, ndje, ntshangu…

Et un cas nommé : `We keti St Pierre kelaka muelo zulu.` — je tape `St Pierre` tel quel,
je l'écris `Santu Piero`, ou je sors le nom du bloc Mandombe ?

## Suite

Dès que tu réponds, j'applique le bloc 0 ci-dessus, tes graphies pour les blocs 1 à 7,
puis je génère la version finale avec l'audit HarfBuzz bloquant : zéro lettre latine
résiduelle, ponctuation composée en Mandombe, sortie ODT uniquement.

## Détail technique

- `scripts/audit-odt-mandombe.py` reste la vérité terrain (shaping réel de la police).
- Les corrections du bloc 0 sont écrites comme une table de cas nommés dans le script de
  build, pas comme une règle générale de nettoyage.
- La skill `taper-le-mandombe` est complétée avec le cas nommé « le champ Mandombe ne
  contient jamais de français » et l'entrée `M'vu → Muvu / Mvu`.
