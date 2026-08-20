# Dictionnaire v23 — ponctuation réellement composée en Mandombe

## Correction globale

- Repartir de la source v20 corrigée et conserver toutes les corrections lexicales, sémantiques et typographiques déjà intégrées à la v22.
- Garder la ponctuation terminale avec le texte Mandombe dans le même segment de style `HapaxMandombe`, en brun, au lieu de l’ajouter comme texte latin non stylé.
- Appliquer cette correction à **toutes** les entrées concernées, et pas uniquement à `Abue tele?` :
  - Index I ;
  - Index II et III ;
  - annexe des conjugaisons ;
  - exemples Mandombe des pages introductives.
- Respecter les règles validées : `?` reste `?`, `.` reste `.`, et `!` devient un point simple `.` dans la partie Mandombe.
- Ne pas ajouter artificiellement de ponctuation aux simples mots ou lemmes qui n’en ont pas.

## Validation bloquante

- Étendre le rapport de QA pour vérifier simultanément, pour chaque phrase :
  1. la présence du bon signe terminal ;
  2. son appartenance au même `text:span` Mandombe ;
  3. l’application effective de la police `HapaxMandombe` et de la couleur Mandombe.
- Bloquer la génération si un signe Mandombe est rendu hors du segment Mandombe, en police latine, ou s’il manque.
- Vérifier spécifiquement `Abue tele?`, puis contrôler automatiquement toutes les questions, déclaratives et conjugaisons.
- Convertir en PDF et inspecter visuellement toutes les pages afin de repérer les signes latins noirs, signes manquants, débordements et ruptures de ligne.

## Livrables

- `dictionnaire-lari-v23.odt`, éditable, avec ponctuation intégrée à la police Mandombe partout.
- `dictionnaire-lari-v23.pdf`, prêt pour contrôle et impression.
- Rapport de validation recensant les questions, déclaratives, conjugaisons et éventuelles erreurs de style de ponctuation.

## Détails techniques

Le défaut est confirmé dans le générateur v22 : `mterminal` est ajouté avec `runs.append(e["mterminal"])`, `rp.addText(...)` et leurs équivalents dans les index inversés. Ces appels créent du texte hérité du style latin du paragraphe. La v23 placera le signe normalisé dans le même `Span(Mand, ...)` ou `Span(MandS, ...)` que le texte Mandombe, puis contrôlera directement le XML de l’ODT pour garantir que le signe ne sort jamais du span Mandombe.