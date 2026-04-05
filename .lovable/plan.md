

# Plan : Corriger les glyphes Mandombe (Adlam → Latin)

## Problème

Les 3 leçons ajoutées récemment (`verbes-actions-etendus`, `nature-animaux-objets-etendus`, `tradition-kongo-societe`) utilisent des caractères Unicode **Adlam** (𞤢, 𞤦, 𞤥…) dans le champ `mandombe` au lieu des **spellings latins** que la police Masono Mandombe attend.

La police Masono Mandombe fonctionne par mapping interne : elle prend du texte latin (ex: `"Adi"`) et affiche le glyphe Mandombe correspondant. Les caractères Adlam ne sont pas reconnus par la police, d'où les glyphes aléatoires/carrés affichés.

**~258 lignes sont affectées** dans les 3 nouvelles leçons (lignes 16643–17061).

## Correction

Pour chaque entrée dans ces 3 leçons, remplacer le champ `mandombe` par la valeur du champ `lari` avec la casse appropriée (première lettre en majuscule pour les noms propres, sinon identique au `lari`).

**Règle** : `mandombe` = spelling latin exact du mot Lari, car c'est ce que la police convertit en glyphes Mandombe.

### Exemples de corrections :
- `mandombe: "𞤬𞤮𞤥𞤦𞤢"` → `mandombe: "fomba"`
- `mandombe: "𞤢𞤣𞤭"` → `mandombe: "Adi"`
- `mandombe: "𞤲𞤧𞤵𞤥𞤦𞤢"` → `mandombe: "nsumba"`

## Fichier modifié

- `src/data/lessons.ts` — lignes 16643 à 17061 : remplacement systématique de tous les champs `mandombe` contenant des caractères Adlam par le spelling latin correspondant (copié depuis le champ `lari`).

## Résultat attendu

Tous les mots du dictionnaire affichent les vrais glyphes Mandombe via la police Masono Mandombe, au lieu de caractères Adlam non reconnus.

