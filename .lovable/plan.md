# Recentrer verticalement le Mandombe du traducteur

## Problème confirmé

Le texte est bien centré horizontalement, mais sa hauteur de ligne très importante (`2.2`) et l'espace ajouté sous la ligne décalent visuellement les glyphes vers le bas du cadre doré.

## Correction

- Conserver le centrage horizontal actuel.
- Donner au cadre une hauteur intérieure stable et centrer son contenu verticalement.
- Ajuster uniquement la hauteur de ligne et l'espace vertical du texte Mandombe afin que les glyphes soient réellement au milieu, sans toucher aux boutons audio et copie.
- Garder assez d'espace autour des glyphes pour éviter toute coupure ou superposition.

## Vérification

- Tester une traduction courte et une traduction sur plusieurs mots.
- Vérifier visuellement que le Mandombe est centré horizontalement et verticalement dans le cadre, sans débordement sur la translittération latine.
