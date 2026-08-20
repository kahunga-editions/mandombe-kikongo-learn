# Index IV : ajouter l'anglais

## Pourquoi l'anglais manque

L'Index IV a été construit avec quatre colonnes seulement : coréen, Mandombe, Kikongo Lari, français. La glose anglaise n'a jamais été insérée dans les lignes de cet index (contrairement aux index I, II et III), et le titre de l'index annonce lui-même « 한국어 → Kikongo Lari → Français ». Ce n'est donc pas une perte à la scission en deux tomes : l'anglais était déjà absent dans la v25 coréenne.

## Correction proposée

1. Ajouter la glose anglaise à chaque ligne de l'Index IV, dans l'ordre déjà utilisé partout ailleurs :
   `한국어 · Mandombe · Kikongo Lari · Français · English`
2. Renommer l'index : « Index IV — 한국어 → Kikongo Lari → Français · English ».
3. Reconstruire uniquement le tome II (l'Index IV n'existe que là), puis régénérer les deux tomes pour garder une paire cohérente.

Aucune autre modification : même mise en page, mêmes polices, mêmes marges, ponctuation Mandombe et étiquettes `EN —` inchangées.

## Détails techniques

- `scripts/build-dictionary-odt-v25.py`, fonction `korean_index` : la ligne construite n'émet que `KoT / MandT / LariT / FrT`. Ajouter un span `EnT` avec `e["en"]` (déjà lu par `read_entries`), en le laissant vide quand l'entrée n'a pas de glose anglaise.
- Régénérer `dictionnaire-lari-v25-ko.odt` à partir de la v24 validée et du cache coréen existant (pas de nouvel appel de traduction).
- Relancer `scripts/build-dictionary-odt-v26-ko.py` pour produire `dictionnaire-lari-ko-vol1-v2.odt` et `dictionnaire-lari-ko-vol2-v2.odt`.
- Contrôle : conversion PDF, vérification que chaque ligne d'Index IV affiche l'anglais et que la pagination des deux tomes reste sous la limite KDP de 828 pages.
