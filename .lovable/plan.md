

# Ajouter des exercices de reconnaissance Mandombe à toutes les leçons

## Constat

- **124 leçons** au total, dont seulement **9** possèdent déjà des exercices `mandombe-recognition`.
- **115 leçons** doivent recevoir un exercice de déchiffrage des glyphes Mandombe.
- Le fichier `lessons.ts` fait déjà 18 438 lignes.

## Approche

Écrire un script Python qui parcourt toutes les leçons, et pour chacune qui n'a pas encore d'exercice `mandombe-recognition`, en génère un automatiquement à partir du vocabulaire existant de la leçon :

1. **Extraire 6-8 mots** du `vocabulary` de chaque leçon (ceux qui ont un champ `mandombe`).
2. **Générer des distracteurs** à partir du vocabulaire des autres leçons (mots Lari similaires en longueur/sonorité).
3. **Alterner les modes** `glyph-to-latin` et `latin-to-glyph` pour varier l'exercice.
4. **Insérer** l'exercice à la fin du tableau `exercises` de chaque leçon.

## Structure de chaque exercice généré

```typescript
{
  type: "mandombe-recognition" as const,
  titleFr: "Déchiffrer le Mandombe – [Nom de la leçon]",
  title: "Read Mandombe – [Lesson name]",
  titlePt: "Decifrar o Mandombe – [Nome da lição]",
  items: [
    { mandombe: "mbote", lari: "mbote", distractors: ["mboji", "mbele", "mbazi"],
      french: "Bonjour", mode: "glyph-to-latin" },
    // ... 5-7 autres items alternant les modes
  ]
}
```

## Règles respectées

- Pas de doublons avec les exercices existants.
- Les indices (`french`, `english`, `portuguese`) restent cachés jusqu'à la sélection (conformément aux principes pédagogiques).
- Les distracteurs sont des vrais mots Lari (pas inventés) pour que le font Mandombe les affiche correctement.
- Les mots avec `|` (pluriels) sont nettoyés pour ne garder que la forme simple.

## Fichier modifié

- `src/data/lessons.ts` — insertion d'un bloc `mandombe-recognition` dans le tableau `exercises` de chaque leçon manquante.

## Volume estimé

~115 insertions × ~15 lignes chacune ≈ **~1 700 lignes ajoutées**.

