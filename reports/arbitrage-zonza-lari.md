# Arbitrage Zonza Lari — Verbes de survie

Document source : « Zonza Lari — verbes de survie » (méthode Kiri).  
Date de l'arbitrage : 2026-09-08.

## Points soumis et décisions

| # | Forme | Contexte | Décision | Justification |
|---|-------|----------|----------|---------------|
| 1 | **ndendi / lendi** | Passé de *lenda* (pouvoir) et de *landa* (suivre). | **Validé tel quel** | Ce sont des homographes. Les deux verbes partagent la même forme passée. |
| 2 | **ntshiri / shiri** | Passé de *sa* (faire) et de *sa:la* (rester). | **Validé tel quel** | Homographes. Le contexte et le thème (sa vs sa:la) suffisent à lever l'ambiguïté. |
| 3 | **tu zakase** | Forme écrite au pluriel pour « nous avons assis » (zakasa). | **Validé tel quel** | Le document écrit *tu zakase* / *touzacassé* pour le pluriel. Exemple attesté : **Biba tu zakase** = « Nous avons assis les ancêtres », c'est-à-dire installer un petit autel dans une nouvelle maison pour que les ancêtres s'y asseyent. |
| 4 | **mbele** | Passé de *ba* (être, « j'ai été ») et nom « couteau ». | **Validé tel quel** | Homographe. Le sens se déduit du contexte. |

## Conséquences intégrées

- `scripts/build_survival_verbs.py` : notes d'homographes ajoutées pour *ba*, *sa*, *lenda*, *landa*, *sa:la* (rester), *zakasa*.
- `src/data/survivalVerbs.ts` : régénéré avec ces notes.
- `data/dictionary-entries.json` : entrée **Biba** enrichie (« Ancêtres désincarnés ») ; nouvelle entrée **Biba tu zakase** avec la traduction et la note culturelle.
- Aucune harmonisation n'a été appliquée : les formes du document sont conservées telles quelles.
