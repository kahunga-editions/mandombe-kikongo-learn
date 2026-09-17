---
name: Pas de mentions de validation dans l'UI apprenant
description: Ne pas afficher de badges/notes de provenance (« validé par l'expert », « validé par l'utilisateur ») dans l'interface apprenant
type: preference
---
Ne pas afficher de mentions de provenance ou de validation (« validé par l'expert », « validé par l'utilisateur », etc.) dans les pages visibles par l'apprenant (conjugaisons, leçons, traducteur). Elles n'apportent rien à l'apprenant.
**Pourquoi :** demande explicite de l'utilisateur — on se doute que c'est validé, ça ne rapporte rien de plus.
**Comment appliquer :** filtrer côté affichage/hook les notes de ce type (ex. filtre regex dans useValidatedForms), et ne pas en ajouter dans les nouvelles vues.
