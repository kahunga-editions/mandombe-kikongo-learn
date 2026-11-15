# Roadmap

## En cours
- [x] Créer un visuel indicatif de la page PayPal Developer pour repérer le Client ID
- [ ] Ajouter le paiement PayPal unique de 37 EUR avec accès Premium à vie après confirmation du paiement
- [x] Vérifier les possibilités sans accès Stripe : aucun accès ni récupération de clé documenté pour la connexion actuelle
- [x] Indiquer où trouver le Client ID PayPal et distinguer test et paiements réels
- [ ] Tester la synchronisation Stripe → Premium de bout en bout — bloqué par l'absence de clé de signature
- [ ] Enregistrer la clé de signature du point Stripe créé en test — bloqué par l'absence d'accès au compte Stripe
- [x] Réparer l'ouverture du paiement Premium et vérifier le parcours connecté sans débit
- [x] Vérifier sur mobile que le Mandombe ne déborde ni ne chevauche la transcription dans Conjugaisons
- [x] Clarifier l'état vide de Conjugaisons quand aucun verbe ne correspond à la recherche
- [x] Restaurer `mbenji` / `benji` en Mandombe pour le passé de `Banza`, sans modifier la transcription `mbendji` / `bendji`
- [x] Corriger `ndjokele` : Mandombe `nzokele`, transcription et prononciation `ndjokele`
- [x] Partager uniquement le corpus de conjugaisons avec le traducteur et Mbuta Matondo
- [x] Étendre l'audit Mandombe aux données de conjugaison et vérifier les rendus
- [x] Simplifier l'accueil de Conjugaisons : recherche seule avant saisie
- [x] Retirer de Conjugaisons les phrases et mentions provenant du traducteur
- [x] Stabiliser la taille et l'espacement Mandombe dans les résultats de conjugaison
- [x] Ajouter les six formes attestees de « pouvoir commencer » aux conjugaisons
- [x] Afficher immédiatement les lignes de conjugaison correspondant à la recherche, avec Mandombe, latin et traduction
- [x] Retirer les formes fabriquees `Kue ka?` et `Kue lu?` (dictionnaire, lecons, traducteur)
- [x] Corriger les sens de `Kue ba?`, `Kue ba ka?`, `Kue ba kotela ka?` et de la serie `Nzo mikanda … kue ye(na)?`
- [x] Produire `reports/formes-a-arbitrer.md` : liste des formes susceptibles d'avoir ete derivees par analogie
- [x] Skill `lari-corpus-only` : interdiction d'inventer ou de conjuguer par analogie
- [ ] Arbitrage par l'autrice du rapport `reports/formes-a-arbitrer.md`, puis retraits
- [ ] Statuer sur `Kue na dingi` (« C'est silencieux ») — non rattachee au corpus

## Regles permanentes
- Aucun document ODT/PDF regenere sans demande explicite.
- `data/dictionary-entries.json` est la seule source de verite ; `scripts/dictionary_guards.py` doit rester vert.
- [x] Etiquetage de provenance abandonne (2026-09-05) : champ `provenance` retire, garde-fou supprime, artefacts effaces.
- [ ] Arbitrage par l'autrice des 12 series de `reports/dictionnaire-formes-a-arbitrer.md` (formes derivees par analogie)

