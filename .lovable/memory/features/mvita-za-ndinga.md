---
name: Mvita za Ndinga
description: Vocabulary battle feature naming and Lari league tiers
type: feature
---
Feature de duels de vocabulaire (à construire) :

- **Nom officiel** : "Mvita za Ndinga" (Bataille de mots). Ne jamais utiliser "Mvita ya Bandinga".
- **Ligues Elo (5 paliers, ordre croissant)** : Nlongoki → Nlongi → Kinuani → Mbuta → Nganga
- **Modes** : async (24h), live (Realtime, 10 questions chronométrées 15s), vs IA (3 niveaux : facile 60% / moyen 80% / difficile 95%)
- **Types de questions** : QCM traduction FR↔Lari, reconnaissance Mandombe, fill-in-blank, audio→mot
- **Sources de questions** : dictionary, lessons (src/data/lessons.ts), translation_corrections
- **Elo** : K=32 classique
- **Route prévue** : /mvita
