# Correction de `eN —` + deux versions ODT (v25)

## Correction

1. Préserver strictement les étiquettes bilingues `FR —` et `EN —` en majuscules : la règle « pas de majuscule après un point-virgule » ne doit jamais toucher un sigle de langue.
2. Repartir de VOTRE ODT v20 corrigé (empreinte SHA-256 vérifiée), en gardant tout ce qui a été validé : sens corrigés (`Bieri`, `Bele mpimpa`…), ponctuation composée dans le Mandombe, index II/III reconstruits depuis l'index I.
3. Aucune autre modification de sens.

## Livrables (ODT uniquement, pas de PDF)

- `dictionnaire-lari-v25.odt` — trilingue Kikongo Lari / Français / Anglais.
- `dictionnaire-lari-v25-ko.odt` — même contenu + coréen (4 index), généré à partir du même corpus corrigé pour qu'aucune divergence ne subsiste entre les deux.

## Contrôles bloquants avant livraison

- Zéro occurrence de casse mixte (`eN`, `fR`, etc.) dans les deux fichiers ; contrôle sur la note de `Bala` : `Pluriel de muana ; EN — Plural of muana`.
- Ponctuation Mandombe intacte (`Abue tele?`).
- Sens déjà corrigés vérifiés un par un : `Bieri`, `Bele mpimpa`, `Belesa`, `Mpua nani`, `Mbaji`, `Mfinda`, `Mulumba`, `Ngulu`, absence de `Bunutnu`.
- Index II et III sans entrée absente de l'index I.
- Contrôles identiques appliqués à la version coréenne.
- Inspection visuelle du rendu avant remise, pour ne pas repartir sur une version supplémentaire.

## Rapport

Un rapport unique listant : source utilisée et empreinte, nombre d'occurrences `eN` avant/après, résultats de chaque contrôle, pour les deux fichiers.
