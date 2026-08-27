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

Organisation en sections, chacune affichant un **Mazita complet** : glyphe Mandombe doré + translittération + FR + EN. **Jamais une Mvuala seule** : chaque Mvuala est toujours présentée avec ses Bisimba, dans l'**ordre canonique du Kilolaka — i, u, e, o, a** (ordre de l'incarnation de la conscience unique dans la matière), puis les Nkoma-nkoma quand la grille les atteste.

```text
Bisimba (voyelles)
  i, u, e, o, a

Mazita du premier groupe — clés du premier temps
  bi bu be bo ba | di du de do da | gi gu ge go ga | fi fu fe fo fa

Mazita du deuxième groupe — clés du deuxième temps, angle 45°
  mi mu me mo ma | ki ku ke ko ka | pi pu pe po pa | li lu le lo la

Mazita du troisième groupe — clés du troisième temps, angle 90°
  vi vu ve vo va | ni nu ne no na | ti tu te to ta | si su se so sa

Mazita du quatrième groupe — clés du quatrième temps, angle 135°
  ri ru re ro ra | wi wu we wo wa | zi zu ze zo za | yi yu ye yo ya

Mazita du cinquième groupe — Mvuala diverses
  hi hu he ho ha, et les Nkoma-nkoma attestés (ie, io, ia, iu, ue, ui, ua)

Mvuala za Kimbangu — groupes consonantiques
  mbi mbu mbe mbo mba | ndi ndu nde ndo nda | ngi ngu nge ngo nga
  mfi mfu mfe mfo mfa | mpi mpu mpe mpo mpa | mvi mvu mve mvo mva
  nki nku nke nko nka | nli nlu nle nlo nla | nsi nsu nse nso nsa
  nti ntu nte nto nta | nyi nyu nye nyo nya | nzi nzu nze nzo nza | mwi mwu mwe mwo mwa

Mazita ma mazindinga — caractères migratoires (de Pelekete piluka à Ndungu)
  shi shu she sho sha | tshi tshu tshe tsho tsha
  ji ju je jo ja | dji dju dje djo dja

Ntentia — l'apostrophe (N majuscule) : N'ki N'ku N'ke N'ko N'ka
  exemples attestés : N'sita, N'sele, N'kamba, N'samu

Ntalu — chiffres, avec leur graphie : mpamvala (0, triangle),
  puis 1 = i, 2 = u, 3 = e, 4 = o, 5 = a
```

Notes accompagnant l'annexe :

- **Mazita makibaba** (syllabes occlusives, type gba, pka, kto) : mentionnées comme existantes dans le Mandombe mais absentes du Kikongo, donc non listées.
- **Nsakuameso** : les diminutifs manuscrits, forme abrégée employée à la main, distincte de la saisie typographique.


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
