# Corriger `ndjokele` en Mandombe et partager les conjugaisons

## Résultat attendu

- La forme « J'ai couru » affichera **`nzokele` dans le champ Mandombe**, **`ndjokele` en transcription latine** et conservera **`ndjokele` pour la prononciation**.
- Cette correction sera appliquée partout où cette forme exacte apparaît, sans inventer ni généraliser une substitution à d'autres mots.
- Le traducteur, le tableau des conjugaisons et Mbuta Matondo utiliseront la même source de conjugaisons.
- Mbuta Matondo pourra retrouver une conjugaison attestée, la réciter et l'enseigner sans fabriquer de forme.

## Mise en œuvre

1. **Corriger la source des conjugaisons**
   - Remplacer la transformation générale actuelle par des graphies Mandombe explicitement attestées.
   - Ajouter le cas nommé `ndjokele` → `nzokele` uniquement pour le Mandombe.
   - Régénérer les données de conjugaison et vérifier les autres occurrences exactes de `ndjokele` dans l'application.

2. **Conserver les trois informations séparées**
   - Étendre le corpus partagé afin qu'une conjugaison transporte séparément sa forme lari, sa graphie Mandombe et sa traduction.
   - Faire utiliser au traducteur la graphie Mandombe du corpus au lieu de recopier automatiquement la transcription latine.
   - Ne pas modifier le texte envoyé au bouton audio : il restera `ndjokele`.

3. **Donner les conjugaisons à Mbuta Matondo**
   - Brancher Mbuta Matondo sur le corpus partagé de conjugaisons.
   - Ajouter un accès dédié qui recherche uniquement les tableaux de conjugaison, par verbe, temps, personne ou traduction.
   - Encadrer son enseignement : reprendre les formes attestées mot pour mot, ne jamais compléter une conjugaison par analogie et signaler une forme absente.
   - Ne pas mélanger les phrases libres mémorisées par le traducteur avec ce corpus de conjugaisons.

4. **Rendre la règle permanente**
   - Mettre à jour la règle de saisie Mandombe avec le cas nommé `ndjokele` → `nzokele`.
   - Y préciser que la transcription et la prononciation restent `ndjokele`, et qu'aucune règle générale `ndj` → `nz` ne doit en être déduite.
   - Activer cette mise à jour pour les prochaines interventions.

5. **Vérifier**
   - Lancer l'audit Mandombe et une sonde avec la vraie police pour confirmer qu'aucune lettre latine résiduelle n'apparaît dans `nzokele`.
   - Contrôler visuellement la recherche « J'ai couru » dans les conjugaisons, sur ordinateur et mobile.
   - Tester le traducteur dans les deux sens et vérifier la graphie Mandombe ainsi que l'audio.
   - Tester Mbuta Matondo sur `Djoka`, le passé et la première personne, puis déployer les fonctions concernées.

## Détails techniques

- La correction partira du générateur, pas du fichier généré, afin de survivre aux prochaines régénérations.
- Le corpus partagé recevra un champ `mandombe` explicite et des fonctions de recherche réutilisables.
- Les contrôles porteront aussi sur les occurrences présentes dans les leçons et le dictionnaire, sans modifier les formes différentes non validées par l'utilisateur.
