# Page Conjugaisons — traductions, débordement Mandombe, et vrais verbes

## 1. Chaque ligne doit porter sa traduction

Aujourd'hui chaque ligne montre le pronom (« Je », « Tu »…), le Mandombe et la forme latine, mais jamais le sens de la forme conjuguée. Ajout d'une glose FR + EN sur chaque ligne des tables (`rows` de `ConjugationTable`), à côté de la forme.

```text
Je
[mandombe]  ni ta nua
ni ta nua
Je bois. · I drink.
```

Les séries de personnes (`conjugationSeries.ts`) ont déjà `fr`/`en` : elles restent telles quelles.

## 2. Le Mandombe déborde sur le latin

Le bloc Mandombe passe sur sa propre ligne, pleine largeur, avec la hauteur de ligne et le débord déjà prévus par la règle `.font-mandombe` ; la transcription latine et la glose se placent en dessous, plus jamais côte à côte.

## 3. Bilongo n'est pas un verbe

Une table est intitulée « Bilongo (medicine) — Prendre des médicaments ». **Bilongo, ce sont les médicaments** ; le verbe est **nua** (boire). Correction : la table est rattachée au verbe **Nua**, sens « boire », et les formes deviennent des exemples d'emploi « boire des médicaments » et non une conjugaison du nom.

Même vérification pour les autres têtes de table qui ne sont pas des verbes et qui portent aujourd'hui un nom entre parenthèses : « Mululu (nosebleed) », « Nsayi (joie) », « Ndambu loso…didi », « Manga za jingi ze… », « Hana musua », « Sukula nsuki », « Yumisa nsuki », « Shiri ku nima », « Luika lue / lueri ». Chacune est soit rattachée au verbe réel, soit sortie des conjugaisons et présentée comme expression. Aucune forme kikongo n'est modifiée ni inventée — seuls le titre et le classement changent. Je vous soumets la liste des rattachements avant de trancher les cas douteux.

## 4. Le verbe être n'a pas six formes

La table « Ba » présente le verbe être comme en français : je / tu / il-elle / nous / vous / ils. C'est faux : le verbe être s'accorde à la **classe du nom**, pas à une personne — d'où *wena, kena, yena, bena, mena, diena, kiena, biena, luena, tuena, zena, miena, kuena, buena, hena*, avec leurs contractés (*we, ke, ye, be…*) et leurs passés (*weri, keri, yeri…*).

Ces formes existent déjà sur le site dans le tableau « Le verbe être dans tous ses états » (`VerbeBaSection`, page d'accueil). La page Conjugaisons reprend **ce tableau-là** comme référence du verbe être : une section dédiée par classe (contracté · présent · passé, avec la phrase-exemple et sa traduction), à la place de la fausse table à six personnes.

## Détails techniques

- `src/data/lessons.ts` : `ConjugationTable.rows` reçoit `fr?: string; en?: string` ; gloses renseignées à partir du sens du verbe et du temps déjà présents (aucune invention lexicale) ; correction du titre de la table Bilongo → Nua et des autres têtes non verbales.
- `src/pages/Conjugations.tsx` : affichage de la glose, mise en page Mandombe sur sa propre ligne, nouvelle section « Verbe être » alimentée par les données de `src/components/VerbeBaSection.tsx` (données extraites dans un module partagé pour éviter la duplication).
- Le tableau du verbe être reste inchangé sur la page d'accueil.
- Aucun document ODT/PDF régénéré, aucune entrée du dictionnaire supprimée.
