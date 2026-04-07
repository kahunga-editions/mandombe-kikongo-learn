

# Régénérer les 25 illustrations avec des scènes visuellement distinctes

## Problème

Les 25 images sont bien des fichiers différents, mais le modèle AI a produit des compositions très similaires (même pose, même angle, même décor) car les prompts se ressemblaient trop. Résultat : visuellement, on a l'impression que c'est toujours le même dessin.

## Solution

Régénérer les 25 panneaux avec des prompts radicalement différenciés pour chaque scène. Chaque prompt précisera :
- Un **angle de caméra** unique (plan large, gros plan, vue plongeante, contre-plongée, profil, etc.)
- Une **action spécifique** fidèle au texte Lari
- Un **décor distinct** (intérieur classe, cour d'école, chemin de village, savane, forêt dense, cuisine, etc.)
- Une **palette dominante** différente pour chaque scène

### Éléments constants (cohérence des personnages)
- Nsayi : peau #4f2903, queue de cheval avec ruban rose, robe rose
- Sunda : peau #4f2903, cheveux courts bouclés avec serre-tête blanc, tenue bleue
- Style : illustration colorée de livre pour enfants, trait net

### Prompts par panneau (résumé)

| # | Scène | Angle / Cadrage | Décor |
|---|-------|----------------|-------|
| 1 | Nsayi et Sunda se tiennent la main, sourires | Plan moyen, face | Village congolais, palmiers |
| 2 | Elles marchent vers l'école | Plan large, de dos avec école au fond | Chemin de terre, verdure |
| 3 | Villageois regardant le soleil | Plan large, contre-plongée | Ciel bleu, ombres au sol |
| 4 | Enfant regarde son ombre au sol | Vue plongeante du dessus | Sol en terre battue, soleil |
| 5 | Enfants noirs courant dans la cour d'école | Plan large latéral | Cour d'école, arbre |
| 6 | Soleil au zénith au-dessus des têtes | Contre-plongée forte | Ciel, silhouettes |
| 7 | Nsayi seule, sourire, devant l'école | Portrait rapproché (buste) | Porte de classe |
| 8 | Nsayi lit un livre, assise | Plan moyen, 3/4 | Sous un arbre, livre ouvert |
| 9 | Classe : maîtresse noire au tableau, élèves noirs | Plan large intérieur | Salle de classe, tableau |
| 10 | Nsayi écrit dans un cahier à la maison | Gros plan mains + visage | Table en bois, cahier |
| 11 | Parents de Nsayi lui dictent une lettre | Plan moyen, famille | Intérieur maison, lampe |
| 12 | Nsayi adulte en blouse de médecin, soigne un enfant | Plan moyen | Dispensaire de village |
| 13 | Nsayi et Sunda marchent dans la savane | Plan large | Savane, herbes hautes, ciel |
| 14 | Elles explorent, pointent du doigt | Plan moyen dynamique | Savane avec fleurs |
| 15 | Nsayi ramasse des champignons, accroupie | Plan rapproché bas | Sol de savane, champignons |
| 16 | Nsayi examine un champignon, visage visible | Gros plan visage + mains | Champignon en premier plan |
| 17 | Groupe d'enfants diversifiés partagent champignons | Plan moyen, groupe | Sous un grand arbre |
| 18 | Nsayi tient un champignon orange, fière | Portrait buste | Fond de savane doré |
| 19 | Gros plan champignon nsempela orange vif | Nature morte, macro | Sol de savane, feuilles |
| 20 | Nsayi et Sunda mangent ensemble | Plan moyen | Nappe au sol, bols |
| 21 | Elles cherchent dans les buissons | Plan large | Savane dense, buissons |
| 22 | Nsayi goûte le nsempela, expression de plaisir | Gros plan visage | Fond flou savane |
| 23 | Nsayi explore la forêt | Plan large, dos + forêt devant | Forêt tropicale dense |
| 24 | Feuilles de musekeni dans la sauce de palme | Gros plan plat | Marmite, feuilles vertes |
| 25 | Liane ntinia, Nsayi cueille les extrémités | Plan moyen | Lisière de forêt |

Modèle : `google/gemini-3-pro-image-preview` pour la qualité. Génération par lots de 5 pour éviter les timeouts.

## Fichiers modifiés
- `src/assets/nsayi-panel-1.jpg` à `nsayi-panel-25.jpg` — 25 images régénérées avec prompts uniques

