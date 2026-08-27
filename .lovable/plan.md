# Skill « comprendre-le-mandombe » finalisée, puis Dictionnaire v30 FR/EN + livre coréen séparé

## 1. Fondamental : corrections de nomenclature intégrées

- **Ndungu** — `N-D-U-N-G-U`. « Ndungi » n’existe pas.
- **Bisinsu** — un seul mot, `B-I-S-I-N-S-U`.
- **Mahanza** (nkenge, nsona, konzo, nkandu) relève de la **tradition Kongo**, pas de la nomenclature Mandombe. Il ne structure pas l’annexe.
- **Kimbangu** est présenté comme terme Mandombe (groupe consonantique), avec une note de tradition Kongo distincte.
- L’écriture reste découverte en 1978 par Wabeladio Payi à Mbanza-Ngungu, à partir des deux formes mur-de-briques : **Pakudungu** (5) et **Pelekete** (2), du chant « Ngiele, ngiele mu nzila Kongo ».

## 2. Skill « comprendre-le-mandombe »

Déjà activée ; cette itération la met à jour avec :

- Nomenclature exacte : Mvuala, Bisimba, Nkoma-nkoma, Mazita, Bisinsu, Pakudungu, Pelekete.
- Les trois sortes de Mvuala : za mpamba, za piluka, za mpimpita (lambuka, Kimbangu, mazindinga).
- Les cinq groupes de Mazita par « temps / angle » tels que définis par l’auteur.
- Les termes complémentaires : **Ntentia** (apostrophes), **Mazita ma mazindinga** (caractères migratoires), **nsakuameso** (diminutifs manuscrits, signalés comme hors typage).
- Renvoi à **taper-le-mandombe** pour la saisie.
- Interdiction absolue d’inventer un terme, une graphie ou une signification.

## 3. Dictionnaire v30 — français / anglais

Repartir du fichier ODT v29.

### 3.1 Annexe Kilolaka à insérer après l’annexe Conjugaisons

Introduction bilingue : le son qui donne forme à la matière, le Kilolaka comme art de décoder cette manifestation, présenté comme une **cymatique graphique** dans la tradition Kongo.

Organisation en sections, chacune affichant un **Mazita complet** : glyphe Mandombe doré + translittération + FR + EN. Jamais une Mvuala seule.

```text
Bisimba (voyelles)
  i, u, e, o, a

Masita du premier groupe (clés du premier temps)
  B, D, G, F

Masita du deuxième groupe (clés du deuxième temps / 45°)
  M, K, P, L

Masita du troisième groupe (clés du troisième temps / 90°)
  V, N, T, S

Masita du quatrième groupe (clés du quatrième temps / 135°)
  R, W, Z, Y

Masita du cinquième groupe / Nkoma-nkoma (voyelles complémentaires)
  ie, io, ia, iu, ue, ui, ua

Mazita ma Kimbangu — groupes consonantiques
  MB, ND, NG, MF, MP, MV, NK, NL, NS, NT, NY, NZ, MW

Mazita ma mazindinga — caractères migratoires
  SH, TSH, J, DJ

Ntentia — apostrophes
  N'K

Ntalu — chiffres (option, en note bilingue)
```

### 3.2 Données et saisie

- Source : `public/kilolaka_grille.html` pour les sens FR.
- Passage en Mandombe via `mandombe_typing.py` / `mandombe_graphies.py` ; audit HarfBuzz avant génération.
- Traduction EN : mapping déterministe validé sur le dictionnaire existant, sans invention. Les cas non couverts par le mapping sont signalés, pas devinés.

### 3.3 Validation

- 0 résidu latin dans les blocs Mandombe.
- Inspection visuelle de toutes les pages de l’annexe.
- Pas de coréen dans la v30.

## 4. Livre coréen séparé

Après validation de la v30, produire la version coréenne équivalente :

- Mêmes index Kikongo / FR / EN, plus index coréen.
- Annexe Kilolaka traduite en coréen (pas dans le livre FR/EN).
- Respect de la limite Amazon KDP (828 pages) ; scinder en deux volumes si nécessaire.

## 5. Livraison

- `dictionnaire-lari-v30.odt` / `.pdf` (FR/EN).
- `dictionnaire-lari-v30-ko-vol1.odt` / `.pdf` et `vol2` si dépassement.
- Lien de téléchargement dans le chat via `<presentation-artifact>`.
