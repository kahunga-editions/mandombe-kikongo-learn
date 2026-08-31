# Restaurer la mise en page de la v26 + corriger le tri (v33)

Vous avez raison sur les trois points. Voici ce que la comparaison v26 / v32 montre, et ce qui sera corrigé.

## 1. Le design a changé — ce n'est pas voulu, c'est une perte

En reconstruisant le livre depuis la source JSON, le générateur n'a repris du gabarit que les styles de texte. Résultat mesuré :

- v26 : **23 images** — la couverture **plus les 22 lettrines illustrées** (glyphe Mandombe doré sur fond marron, une par lettre).
- v32 : **1 seule image** — la couverture. Les 22 lettrines illustrées ont disparu.
- Index I : la v26 ouvrait chaque lettre avec la grande lettrine (`LetterHead`, 22 pt, filet doré) et son illustration ; la v32 utilise le petit intertitre compact (`LetterHeadSmall`) réservé aux index II et III.

C'est là que le Mandombe a disparu : pas dans les entrées (il y est, dérivé du Lari), mais dans les **ouvertures de lettres**.

Correction : le générateur réinsère, en tête de chaque lettre de l'Index I, l'illustration Mandombe correspondante et rétablit `LetterHead` (grand format) pour l'Index I. Les index II et III gardent leur intertitre compact, comme en v26. Aucune autre modification de style.

## 2. La phrase en tête de l'ouvrage

Une seule entrée du corpus commence par un point parasite :

```text
".N'samu we nani ni ku tela."   J'ai quelque chose à te dire.
```

Ce point initial (résidu des anciennes corruptions type `B.awu`) fait que l'entrée ne tombe sous aucune lettre : elle est rangée dans un bucket `#` que le tri place **avant A**, donc en toute première page. La v26 n'avait pas de `#` : les rares cas allaient dans « Autres · Other », à la fin.

Correction :
- nettoyer l'entrée dans `data/dictionary-entries.json` → `N'samu we nani ni ku tela.`, qui se range normalement sous **N** ;
- supprimer le bucket `#` : rétablir « Autres · Other » **en fin d'index**, comme en v26 ;
- ajouter un contrôle bloquant : aucune entrée ne peut commencer par un signe de ponctuation. La génération échoue plutôt que de produire ce genre de page.

## 3. Cédille de la couverture

Point signalé précédemment, corrigé dans la même passe : l'image de couverture est un PNG dont le texte est écrit en ASCII (`Francais`) dans `scripts/generate-letter-illustrations.py`. On repasse ce texte en Unicode accentué (« Français », tiret cadratin) et on régénère uniquement la couverture.

## Vérification avant livraison

- Page 1 de l'index I = lettre **A** avec son illustration Mandombe, plus aucune page `#`.
- `N'samu we nani ni ku tela.` présent sous **N**, sans point initial.
- Comptage des images du document = 23, comme la v26.
- Couverture rendue en image et relue : « Français » avec cédille.
- Corpus inchangé : 4693 entrées, aucun sens touché.

Sortie : `Buku-dia-Binsono-dictionnaire-Lari-v33.odt` + PDF.
