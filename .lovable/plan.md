

# Ajouter les chiffres Mandombe dans l'en-tete du tableau Ntalu

## Ce qui change

Dans `src/components/NtaluSection.tsx`, modifier la ligne d'en-tete (`<thead>`) pour afficher au-dessus de chaque numero (1, 2, 3, 4, 5, 35) le glyphe Mandombe correspondant.

## Modification

Fichier : `src/components/NtaluSection.tsx`, ligne 172

Remplacer le contenu des `<th>` de nombres :
```
<th key={k} className="text-center px-4 py-3 text-muted-foreground font-medium">{k}</th>
```

Par une version avec le glyphe Mandombe au-dessus du chiffre latin :
```
<th key={k} className="text-center px-4 py-3">
  <span className="font-mandombe text-2xl text-gold block mb-1">{k}</span>
  <span className="text-muted-foreground font-medium text-xs">{k}</span>
</th>
```

La police Mandombe (`font-mandombe`) mappe directement les caracteres "1", "2", "3", "4", "5" vers les glyphes Mandombe correspondants. Pour "35", les deux glyphes 3 et 5 s'afficheront cote a cote.

## Resultat visuel

```text
┌──────────────┬───────┬───────┬───────┬───────┬───────┬───────┐
│ Classe nom.  │  𝟏   │  𝟐   │  𝟑   │  𝟒   │  𝟓   │  𝟑𝟓  │
│              │   1   │   2   │   3   │   4   │   5   │  35   │
├──────────────┼───────┼───────┼───────┼───────┼───────┼───────┤
│ mu/ba        │ ...   │ ...   │ ...   │ ...   │ ...   │ ...   │
```

(Les chiffres du haut seront en glyphes Mandombe dores, ceux du bas en petit texte latin gris)

## Fichier modifie
- `src/components/NtaluSection.tsx` — 1 ligne modifiee dans le `<thead>`

