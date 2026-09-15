# Simplifier les cartes de conjugaison et traduire à la demande

## Affichage des conjugaisons

- Retirer les pronoms personnels isolés (« je », « tu », « nous », « il/elle », etc.) de toutes les cartes de conjugaison : tableaux principaux, séries et résultats de recherche.
- Conserver uniquement, dans cet ordre : le temps, la phrase en Mandombe, sa translittération latine avec le bouton audio, puis sa traduction.
- Ne pas modifier les formes conjuguées elles-mêmes : le pronom ou marqueur qui appartient à la phrase reste naturellement visible dans la phrase.

## Traduction à la demande

- Ajouter un interrupteur de traduction sur la page Conjugaisons.
- Par défaut, afficher la traduction française.
- Lorsque l'utilisateur active l'interrupteur, remplacer le français par la traduction dans la langue qu'il a choisie dans le sélecteur général du site.
- Pour l'anglais, utiliser les traductions déjà présentes. Pour le portugais, l'italien, l'espagnol, le lingala, le grec, le coréen et l'allemand, utiliser le système de traduction à la demande déjà présent dans l'application, avec son cache.
- Si le français est la langue choisie, l'interrupteur n'ajoute pas de ligne en double.

## Vérification

- Vérifier qu'aucun pronom personnel isolé ne subsiste dans les trois affichages de conjugaisons.
- Vérifier le remplacement français → langue choisie avec au moins l'anglais et une langue traduite à la demande.
- Contrôler visuellement sur ordinateur et mobile que le Mandombe, la translittération, l'audio et la traduction restent bien espacés.

## Détails techniques

- Modification ciblée de `src/pages/Conjugations.tsx`.
- Réutilisation de `useLanguage`, `useTranslatedContent` et du composant d'interrupteur existant.
- Aucune donnée de conjugaison, entrée du dictionnaire ou règle grammaticale ne sera modifiée.
