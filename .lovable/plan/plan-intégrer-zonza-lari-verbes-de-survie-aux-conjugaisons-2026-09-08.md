# Plan : intégrer « Zonza Lari – Verbes de survie » aux conjugaisons

## Ce que contient le document (vérifié)
117 pages, structurées en fiches de six personnes (je, tu, il, nous, vous, ils), généralement trois temps par verbe : présent, passé, futur.

Verbes relevés : **ba** (être), **sa** (faire), **dia** (manger), **nua** (boire), **hana musua** (permettre), **lenda** (pouvoir), **bonga** (prendre), **zaba** (savoir), **kuiza** (venir), **banza** (penser), **futa** (payer), **wa** (sentir une odeur), **mona** (voir / sentir le froid, la chaleur), **baka** (avoir, obtenir), **zola** (aimer, vouloir), **sala** (travailler, fabriquer), **sa:la** (rester), **sukula** (laver), **soba** (changer), **teka** (vendre, trahir), **tanga** (lire, chanter), **sola** (choisir), **yela** (essayer), **bakisa** (aider), **lamba** (préparer, cuire), **landa** (suivre), **seha** (rire), **bua** (tomber), **fua** (mourir), **butuka** (naître), **djoka** (courir), **noka** (pleuvoir), **zakasa** (asseoir), **nanguna** (lever), **vutula** (rendre).

Règles générales confirmées par le document, à afficher sur la page :
- Futur = **mbo** + particule du pronom + infinitif (mbo ni ba, mbo ba, mbo ka ba…).
- Présent progressif = thème + particule + **ta** + verbe (dia ni ta dia).
- Verbe être : formes courtes/pleines nje(na), we(na), ke(na), tue(na), lue(na), be(na) ; passé mbele, bele, tu bele…

## Ce qui sera fait

### 1. Données de conjugaison
- Créer une série par verbe et par temps, avec les six personnes, la phrase telle qu'elle figure dans le document, la traduction française et sa version anglaise.
- Reprendre strictement les formes écrites : rien ne sera complété par analogie. Les cases laissées vides dans le document (« je confie », « je vis ») seront simplement omises.
- Conserver les variantes données (ndidi / ndiri, tu didi / tu diri, suaka pour laver, peu usité) comme variantes sur la même ligne.
- Les notations de longueur avec deux-points (ta:, sa:ridi, ba:nza) et les accents du document ne sont pas de l'orthographe : ils deviendront des notes de prononciation, la forme écrite restant sans allongement ni accent.

### 2. Écriture Mandombe
- Chaque phrase reçoit sa version Mandombe, avec la mise en valeur dorée de la forme verbale déjà en place.
- Règles appliquées : `ia` tel quel sauf JIA, WIA, PIA, RIA, HIA (→ iya) ; mbendji s'écrit **mbenji** en Mandombe, translittération latine inchangée ; pas d'accents, pas de voyelles doublées, pas de lettres latines résiduelles.

### 3. Page Conjugaisons
- Les nouvelles séries sont groupées par verbe, avec les onglets présent / passé / futur.
- Recherche par verbe, par temps, par forme kikongo et par traduction française (« tu seras », « j'ai mangé »…), avec affichage immédiat de la ligne en grand Mandombe, latin et traduction, comme pour « tu seras ».
- Un encart rappelle la formation du futur avec **mbo** et celle du présent progressif avec **ta**.

### 4. Dictionnaire
- Ajouter les verbes absents comme entrées propres (infinitif, sens, exemples), sans fusionner d'homographes ni de sens distincts.
- Signaler les sens polysémiques séparément : teka = vendre / trahir ; tanga = lire / chanter ; sala = travailler, fabriquer / rester ; wa = entendre, comprendre, sentir.
- Les contrôles automatiques du dictionnaire devront rester au vert.

## Points à arbitrer — résolus le 2026-09-08
1. **« j'ai suivi = ndendi / lendi »** identique à **« je peux = ndendi / lendi »** (*lenda*) : ce sont des **homographes**, validés tels quels.
2. **« je suis resté = ntshiri / shiri »** identique à **« j'ai fait »** (*sa*) : ce sont des **homographes**, validés tels quels.
3. **« mbele »** signifie aussi couteau : **homographe** validé.
4. **« j'ai assis = nzakase »** et **« vous avez assis = tu zakase / touzacassé »** : validés. Exemple culturel attesté : **Biba touzacassé** = « Vous avez assis les ancêtres » (installer un petit autel dans une nouvelle maison).

Résultat : aucune harmonisation appliquée, les formes du document sont conservées. Les notes d'homographes ont été ajoutées dans `scripts/build_survival_verbs.py`, `src/data/survivalVerbs.ts` et `data/dictionary-entries.json`. Le rapport d'arbitrage est disponible dans `reports/arbitrage-zonza-lari.md`.

## Détails techniques
- Fichiers touchés : `src/data/conjugationSeries.ts` (nouvelles séries), `src/data/verbeBa.ts` (compléments être), `src/pages/Conjugations.tsx` (regroupement par verbe et par temps, encart des règles), `data/dictionary-entries.json` (entrées verbales).
- Vérification : compilation, contrôle du journal de build, contrôle visuel de `/conjugations`, `scripts/dictionary_guards.py` au vert.
- Aucun document ODT/PDF ne sera généré.
